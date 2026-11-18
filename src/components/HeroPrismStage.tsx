import { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';
import { ArrowDownRight, Compass } from 'lucide-react';
import { STUDIO_SERVICES, type ServiceId } from '../data/studioData';
import { HeroParticleCanvas } from './HeroParticleCanvas';
import {
  playSoftTechPing,
  triggerInteractivePing,
} from '../utils/soundEngine';
import { useLocale } from '../i18n/LocaleContext';
import { getServiceCopy } from '../i18n/translations';
import { useTheme, type StudioTheme } from '../theme/ThemeContext';
import type { PrismRig } from '../three/createPrismRig';

interface HeroPrismStageProps {
  activeServiceId: ServiceId;
  soundEnabled: boolean;
  onSelectService: (id: ServiceId) => void;
  onStartProject: () => void;
}

type CameraPreset = 'overview' | 'core' | 'orbit';

const CAMERA_PRESETS: Record<
  CameraPreset,
  { label: string; pos: [number, number, number]; target: [number, number, number] }
> = {
  overview: { label: 'Overview', pos: [0.35, 1.35, 6.9], target: [0.45, 0.05, 0] },
  core: { label: 'Core Prism', pos: [1.65, 0.65, 4.15], target: [0.85, 0.15, 0] },
  orbit: { label: 'Orbit Plane', pos: [0.85, 4.8, 5.2], target: [0.85, 0.05, 0] },
};

export function HeroPrismStage({
  activeServiceId,
  soundEnabled,
  onSelectService,
  onStartProject,
}: HeroPrismStageProps) {
  const { locale, t } = useLocale();
  const { theme, isLight } = useTheme();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredServiceId, setHoveredServiceId] = useState<ServiceId | null>(null);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('overview');
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  // Refs bridging React UI state into stable Three.js animation loop without teardown
  const activeServiceRef = useRef<ServiceId>(activeServiceId);
  const hoveredServiceRef = useRef<ServiceId | null>(null);
  const soundEnabledRef = useRef<boolean>(soundEnabled);
  const themeRef = useRef<StudioTheme>(theme);
  const threeThemeUpdaterRef = useRef<((nextTheme: StudioTheme) => void) | null>(null);
  const onSelectServiceRef = useRef(onSelectService);
  const transitionTargetRef = useRef<{
    active: boolean;
    pos: [number, number, number];
    lookAt: [number, number, number];
  }>({
    active: false,
    pos: [...CAMERA_PRESETS.overview.pos],
    lookAt: [...CAMERA_PRESETS.overview.target],
  });

  useEffect(() => {
    activeServiceRef.current = activeServiceId;
  }, [activeServiceId]);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    themeRef.current = theme;
    threeThemeUpdaterRef.current?.(theme);
  }, [theme]);

  useEffect(() => {
    onSelectServiceRef.current = onSelectService;
  }, [onSelectService]);

  const triggerCameraFocus = (
    pos: [number, number, number],
    target: [number, number, number]
  ) => {
    transitionTargetRef.current.pos = [...pos];
    transitionTargetRef.current.lookAt = [...target];
    transitionTargetRef.current.active = true;
  };

  const handleDockServiceClick = (serviceId: ServiceId) => {
    if (soundEnabledRef.current) {
      triggerInteractivePing({ serviceId, variant: 'select', volume: 0.85 });
    }
    onSelectService(serviceId);
    const service = STUDIO_SERVICES.find((s) => s.id === serviceId);
    if (service) {
      triggerCameraFocus(service.cameraPosition, service.cameraTarget);
    }
  };

  const handlePresetClick = (preset: CameraPreset) => {
    setCameraPreset(preset);
    const cfg = CAMERA_PRESETS[preset];
    triggerCameraFocus(cfg.pos, cfg.target);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let disposed = false;
    let cleanupScene: (() => void) | undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // 1. Software-WebGL probe
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const initWebGLStage = () => {
      if (disposed) return;

      void Promise.all([
        import('three'),
        import('three/addons/controls/OrbitControls.js'),
        import('three/addons/environments/RoomEnvironment.js'),
        import('../three/createPrismRig'),
      ]).then(([THREE, { OrbitControls }, { RoomEnvironment }, { createPrismRig, applyPrismRigTheme }]) => {
        if (disposed || !mountRef.current) return;

        const _scratchDummy = new THREE.Object3D();
        const _scratchTargetPos = new THREE.Vector3();
        const _scratchTargetLook = new THREE.Vector3();
        const _scratchPointer = new THREE.Vector2();

        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        const isMobileViewport = width < 768;
        const deviceDpr = window.devicePixelRatio || 1;
        const maxDpr = isMobileViewport ? 1.5 : 2;

        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: !isSoftwareGl && !(isMobileViewport && deviceDpr > 1.5),
          alpha: true,
          powerPreference: 'high-performance',
        });
      } catch {
        setWebglUnavailable(true);
        return;
      }

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setClearColor(0x060913, 0);
      renderer.setPixelRatio(
        isSoftwareGl ? 1 : Math.min(deviceDpr, maxDpr)
      );
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = !isSoftwareGl;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

    // 2. Scene, Fog & Studio RoomEnvironment (transparent background so 2D particle canvas composites behind 3D prism)
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x060913, 0.042);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envRT = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRT.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // 3. Camera & OrbitControls
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(...CAMERA_PRESETS.overview.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.overview.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false; // Allow natural page vertical scroll
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.72;
    controls.update();

    const handleControlStart = () => {
      transitionTargetRef.current.active = false;
    };
    controls.addEventListener('start', handleControlStart);

    // 4. Three-point studio lighting (warm key + cool hemisphere + violet rim)
    const keyLight = new THREE.DirectionalLight(0xfff1e0, 2.3);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    const shadowRes = isMobileViewport ? 512 : 1024;
    keyLight.shadow.mapSize.set(shadowRes, shadowRes);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 22;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x090d1a, 0.9);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 1.45);
    rimLight.position.set(-5, 3.5, -5);
    scene.add(rimLight);

    // 5. Build Composite 3D Prism & Orbital Rig
    const rig: PrismRig = createPrismRig(
      isSoftwareGl,
      renderer.capabilities.getMaxAnisotropy()
    );
    scene.add(rig.root);

    const syncThreeTheme = (nextTheme: StudioTheme) => {
      const light = nextTheme === 'light';
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.setHex(light ? 0xf8fafc : 0x060913);
        scene.fog.density = light ? 0.032 : 0.042;
      }
      renderer.setClearColor(light ? 0xf8fafc : 0x060913, 0);
      renderer.toneMappingExposure = light ? 1.24 : 1.15;
      keyLight.intensity = light ? 2.6 : 2.3;
      hemiLight.color.setHex(light ? 0xe0f2fe : 0x38bdf8);
      hemiLight.groundColor.setHex(light ? 0xcbd5e1 : 0x090d1a);
      hemiLight.intensity = light ? 1.35 : 0.9;
      rimLight.color.setHex(light ? 0x6d28d9 : 0x8b5cf6);
      applyPrismRigTheme(rig, nextTheme);
      if (prefersReducedMotion || isSoftwareGl) {
        renderer.render(scene, camera);
      }
    };

    threeThemeUpdaterRef.current = syncThreeTheme;
    syncThreeTheme(themeRef.current);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 6. Raycasting strictly on layer 1 (orbital node proxy spheres)
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const proxyMeshes = rig.orbitalNodes.map((n) => n.proxyMesh);
    let lastRaycastMs = 0;

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      _scratchPointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      _scratchPointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRaycastMs < 50) return;
      lastRaycastMs = now;

      updatePointer(e.clientX, e.clientY);
      raycaster.setFromCamera(_scratchPointer, camera);
      const hits = raycaster.intersectObjects(proxyMeshes, false);

      if (hits.length > 0) {
        const sid = hits[0].object.userData.serviceId as ServiceId;
        if (hoveredServiceRef.current !== sid) {
          hoveredServiceRef.current = sid;
          setHoveredServiceId(sid);
          if (soundEnabledRef.current) {
            playSoftTechPing({ serviceId: sid, variant: 'hover', volume: 0.75 });
          }
        }
        renderer.domElement.style.cursor = 'pointer';
      } else {
        if (hoveredServiceRef.current !== null) {
          hoveredServiceRef.current = null;
          setHoveredServiceId(null);
        }
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const onClick = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
      raycaster.setFromCamera(_scratchPointer, camera);
      const hits = raycaster.intersectObjects(proxyMeshes, false);
      if (hits.length > 0) {
        const sid = hits[0].object.userData.serviceId as ServiceId;
        if (soundEnabledRef.current) {
          triggerInteractivePing({ serviceId: sid, variant: 'select', volume: 0.85 });
        }
        onSelectServiceRef.current(sid);
        const svc = STUDIO_SERVICES.find((s) => s.id === sid);
        if (svc) {
          transitionTargetRef.current.pos = [...svc.cameraPosition];
          transitionTargetRef.current.lookAt = [...svc.cameraTarget];
          transitionTargetRef.current.active = true;
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    // WebGL context loss safety
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
    };
    const onContextRestored = () => {
      setWebglUnavailable(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    // 7. Responsive ResizeObserver on container (Mobile, Tablet, Desktop)
    const applyResponsiveFraming = (w: number, h: number) => {
      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;
      camera.fov = isMobile ? 52 : isTablet ? 48 : 44;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      if (isMobile) {
        rig.root.scale.setScalar(0.74);
        rig.root.position.set(-0.72, 0.35, -0.8);
      } else if (isTablet) {
        rig.root.scale.setScalar(0.88);
        rig.root.position.set(-0.25, 0.15, -0.35);
      } else {
        rig.root.scale.setScalar(1.0);
        rig.root.position.set(0, 0, 0);
      }
    };

    applyResponsiveFraming(width, height);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      applyResponsiveFraming(w, h);
      renderer.setSize(w, h);
      const nextMaxDpr = w < 768 ? 1.5 : 2;
      renderer.setPixelRatio(
        isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, nextMaxDpr)
      );
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Animation Loop with off-screen/tab pause + software-WebGL afterDraw pacing
    let frameId = 0;
    let isHeroVisible = true;
    const clock = new THREE.Clock();

    function scheduleNextFrame() {
      if (disposed || !isHeroVisible || document.hidden) return;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed || !isHeroVisible || document.hidden) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed || !isHeroVisible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const motionFactor = prefersReducedMotion ? 0 : 1;

      // Rotate prism core & rings smoothly
      rig.outerGlassPrism.rotation.z = elapsed * 0.16 * motionFactor;
      rig.innerCore.rotation.y = -elapsed * 0.42 * motionFactor;
      rig.innerWire.rotation.y = -elapsed * 0.42 * motionFactor;
      rig.outerRing.rotation.z = elapsed * 0.22 * motionFactor;
      rig.innerRing.rotation.x = -Math.PI * 0.28 + elapsed * 0.18 * motionFactor;

      // Update 5 orbital nodes along tilted plane
      const activeId = activeServiceRef.current;
      const hoveredId = hoveredServiceRef.current;

      for (let i = 0; i < rig.orbitalNodes.length; i++) {
        const node = rig.orbitalNodes[i];
        const angle = node.baseAngle + elapsed * 0.18 * motionFactor;
        const x = Math.cos(angle) * node.orbitRadius;
        const z = Math.sin(angle) * node.orbitRadius;
        const y =
          Math.sin(angle) * Math.sin(node.orbitTilt) * node.orbitRadius * 0.65 +
          Math.sin(elapsed * 1.1 + node.verticalPhase) * 0.14 * motionFactor;

        node.group.position.set(x, y, z);
        node.coreMesh.rotation.y += dt * 0.8 * motionFactor;
        node.ringMesh.rotation.z -= dt * 0.6 * motionFactor;

        const isSelected = node.serviceId === activeId;
        const isHovered = node.serviceId === hoveredId;
        const targetScale = isSelected ? 1.28 : isHovered ? 1.18 : 1.0;
        const dampedScale = THREE.MathUtils.damp(
          node.group.scale.x,
          targetScale,
          8,
          dt
        );
        node.group.scale.setScalar(dampedScale);

        const coreMat = node.coreMesh.material as THREE.MeshStandardMaterial;
        coreMat.emissiveIntensity = THREE.MathUtils.damp(
          coreMat.emissiveIntensity,
          isSelected ? 1.5 : isHovered ? 1.2 : 0.6,
          8,
          dt
        );
      }

      // Gently drift ambient crystalline dust motes (zero allocations)
      if (!prefersReducedMotion) {
        const count = rig.dustInstanced.count;
        for (let i = 0; i < count; i++) {
          const bx = rig.dustBasePositions[i * 3];
          const by = rig.dustBasePositions[i * 3 + 1];
          const bz = rig.dustBasePositions[i * 3 + 2];
          const phase = rig.dustPhases[i];
          _scratchDummy.position.set(
            bx + Math.sin(elapsed * 0.35 + phase) * 0.16,
            by + Math.cos(elapsed * 0.42 + phase) * 0.22,
            bz + Math.sin(elapsed * 0.28 + phase) * 0.16
          );
          _scratchDummy.rotation.set(elapsed * 0.4 + phase, elapsed * 0.3, 0);
          _scratchDummy.scale.setScalar(rig.dustScales[i]);
          _scratchDummy.updateMatrix();
          rig.dustInstanced.setMatrixAt(i, _scratchDummy.matrix);
        }
        rig.dustInstanced.instanceMatrix.needsUpdate = true;
      }

      // Smooth damped camera preset transitions
      if (transitionTargetRef.current.active) {
        _scratchTargetPos.set(...transitionTargetRef.current.pos);
        _scratchTargetLook.set(...transitionTargetRef.current.lookAt);

        camera.position.x = THREE.MathUtils.damp(
          camera.position.x,
          _scratchTargetPos.x,
          4.5,
          dt
        );
        camera.position.y = THREE.MathUtils.damp(
          camera.position.y,
          _scratchTargetPos.y,
          4.5,
          dt
        );
        camera.position.z = THREE.MathUtils.damp(
          camera.position.z,
          _scratchTargetPos.z,
          4.5,
          dt
        );

        controls.target.x = THREE.MathUtils.damp(
          controls.target.x,
          _scratchTargetLook.x,
          5.0,
          dt
        );
        controls.target.y = THREE.MathUtils.damp(
          controls.target.y,
          _scratchTargetLook.y,
          5.0,
          dt
        );
        controls.target.z = THREE.MathUtils.damp(
          controls.target.z,
          _scratchTargetLook.z,
          5.0,
          dt
        );

        if (
          camera.position.distanceTo(_scratchTargetPos) < 0.03 &&
          controls.target.distanceTo(_scratchTargetLook) < 0.03
        ) {
          transitionTargetRef.current.active = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      scheduleNextFrame();
    }

    const resumeRenderLoop = () => {
      if (disposed || !isHeroVisible || document.hidden) return;
      clock.getDelta();
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      scheduleNextFrame();
    };

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible !== isHeroVisible) {
          isHeroVisible = visible;
          if (visible) {
            resumeRenderLoop();
          } else {
            cancelAnimationFrame(frameId);
            clearTimeout(frameId);
          }
        }
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
        clearTimeout(frameId);
      } else {
        resumeRenderLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (isSoftwareGl) {
      renderer.render(scene, camera);
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    cleanupScene = () => {
      threeThemeUpdaterRef.current = null;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObserver.disconnect();
      controls.removeEventListener('start', handleControlStart);
      controls.dispose();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener(
        'webglcontextrestored',
        onContextRestored
      );

      rig.disposables.geometries.forEach((g) => g.dispose());
      rig.disposables.materials.forEach((m) => m.dispose());
      rig.disposables.textures.forEach((t) => t.dispose());
      envRT.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      };
    });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleHandle = 0;
    let timeoutHandle = 0;
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleHandle = idleWindow.requestIdleCallback(initWebGLStage, { timeout: 140 });
    } else {
      timeoutHandle = window.setTimeout(initWebGLStage, 40);
    }

    return () => {
      disposed = true;
      if (idleHandle !== 0 && typeof idleWindow.cancelIdleCallback === 'function') {
        idleWindow.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== 0) {
        window.clearTimeout(timeoutHandle);
      }
      cleanupScene?.();
    };
  }, []);

  const highlightedService =
    STUDIO_SERVICES.find((s) => s.id === (hoveredServiceId ?? activeServiceId)) ??
    STUDIO_SERVICES[0];

  const highlightedServiceTitle = getServiceCopy(
    highlightedService,
    locale
  ).title;

  return (
    <section
      id="hero"
      className={`relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden lg:h-[100svh] ${
        isLight ? 'bg-[#f8fafc]' : 'bg-[#060913]'
      }`}
      aria-label="JoyaceXstudio 3D Prism Stage"
    >
      {/* Interactive cursor-reactive 2D canvas particle background */}
      <HeroParticleCanvas />

      {/* Dedicated isolated WebGL canvas container composited over particle layer */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-[1] h-full w-full"
        aria-hidden="true"
      />

      {/* Graceful fallback if WebGL is disabled */}
      {webglUnavailable && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center lg:justify-end lg:pr-16"
          aria-hidden="true"
        >
          <div
            className={`h-64 w-64 rotate-12 rounded-3xl border sm:h-80 sm:w-80 ${
              isLight
                ? 'border-sky-600/30 bg-gradient-to-br from-sky-200/50 via-violet-200/35 to-white/90'
                : 'border-sky-400/25 bg-gradient-to-br from-sky-500/15 via-violet-500/10 to-slate-900/80'
            }`}
          />
        </div>
      )}

      {/* Subtle directional scrim on left only so 3D prism stays crystal clear */}
      <div
        className={`pointer-events-none absolute inset-0 z-[2] ${
          isLight
            ? 'bg-gradient-to-b from-[#f8fafc]/85 via-[#f8fafc]/48 to-[#f8fafc]/92 lg:w-[60%] lg:bg-gradient-to-r lg:from-[#f8fafc]/92 lg:via-[#f8fafc]/55 lg:to-transparent'
            : 'bg-gradient-to-b from-[#060913]/80 via-[#060913]/45 to-[#060913]/90 lg:w-[60%] lg:bg-gradient-to-r lg:from-[#060913]/92 lg:via-[#060913]/50 lg:to-transparent'
        }`}
        aria-hidden="true"
      />

      {/* Hero Editorial Overlay */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-4 pt-20 pb-4 sm:px-8 sm:pt-28 sm:pb-8 lg:px-10 lg:pt-20 lg:pb-6">
        <div className="pointer-events-auto max-w-xl">
          <p className="font-mono-tabular text-[11px] tracking-wider text-sky-300/90 uppercase sm:text-xs">
            {t.hero.eyebrow}
          </p>

          <h1 className="mt-3 font-display text-[1.85rem] leading-[1.12] font-semibold tracking-tight text-slate-50 text-balance sm:mt-4 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            {t.hero.headline}
          </h1>

          <p className="mt-3.5 max-w-lg text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base lg:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-4">
            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 whitespace-nowrap shrink-0 cursor-pointer sm:px-5"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowDownRight className="h-4 w-4" />
            </button>

            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-[#0b1120]/85 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-sky-400/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 whitespace-nowrap shrink-0 sm:px-5"
            >
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 sm:mt-7">
            <span className="font-mono-tabular text-sky-300">
              {highlightedService.index}. {highlightedServiceTitle}
            </span>
            <span aria-hidden="true">·</span>
            <span>{t.hero.orbitHint}</span>
          </div>
        </div>
      </div>

      {/* Hero-scoped 3D Prism Control Bar */}
      <div className="pointer-events-none relative z-20 mx-auto w-full max-w-[960px] px-3.5 pb-4 sm:px-8 sm:pb-6">
        <div className="pointer-events-auto w-full rounded-xl webgl-dock-surface px-2.5 py-2 sm:px-4 sm:py-2.5">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-2.5">
            {/* Orbital Node Switcher — horizontally swipeable on < sm, wraps cleanly on tablet/desktop */}
            <div
              className="flex max-w-full flex-nowrap items-center justify-start gap-1 overflow-x-auto pb-0.5 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 lg:justify-start"
              role="tablist"
              aria-label="3D Orbital Service Nodes"
            >
              {STUDIO_SERVICES.map((svc) => {
                const active = svc.id === activeServiceId;
                const label = getServiceCopy(svc, locale).shortLabel;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleDockServiceClick(svc.id)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-sky-400/20 text-sky-200 border border-sky-400/40'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 border border-transparent'
                    }`}
                  >
                    <span className="font-mono-tabular mr-1 opacity-75">
                      {svc.index}
                    </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Camera Angle Presets */}
            <div className="flex flex-wrap items-center justify-center gap-1 border-t border-slate-800/80 pt-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-3">
              <Compass className="mr-1 h-3.5 w-3.5 text-slate-400 shrink-0" />
              {(Object.keys(CAMERA_PRESETS) as CameraPreset[]).map((key) => {
                const isPresetActive = cameraPreset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handlePresetClick(key)}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isPresetActive
                        ? 'bg-violet-500/25 text-violet-200 border border-violet-400/40'
                        : 'text-slate-400 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    {t.hero.presets[key]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

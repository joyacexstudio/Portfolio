import * as THREE from 'three';
import { STUDIO_SERVICES, type ServiceId } from '../data/studioData';

export interface OrbitalNodeHandle {
  serviceId: ServiceId;
  group: THREE.Group;
  coreMesh: THREE.Mesh;
  ringMesh: THREE.Mesh;
  proxyMesh: THREE.Mesh;
  baseAngle: number;
  orbitRadius: number;
  orbitTilt: number;
  verticalPhase: number;
}

export interface PrismRig {
  root: THREE.Group;
  prismAssembly: THREE.Group;
  innerCore: THREE.Mesh;
  innerWire: THREE.LineSegments;
  outerGlassPrism: THREE.Mesh;
  outerRing: THREE.Mesh;
  innerRing: THREE.Mesh;
  orbitalNodes: OrbitalNodeHandle[];
  dustInstanced: THREE.InstancedMesh;
  dustBasePositions: Float32Array;
  dustPhases: Float32Array;
  dustScales: Float32Array;
  themeMaterials: {
    innerEdgesMat: THREE.LineBasicMaterial;
    prismMat: THREE.MeshPhysicalMaterial;
    orbitGuideMat: THREE.MeshBasicMaterial;
    pedestalMat: THREE.MeshStandardMaterial;
    pedestalTrimMat: THREE.MeshBasicMaterial;
    dustMat: THREE.MeshStandardMaterial;
    haloMats: THREE.MeshStandardMaterial[];
  };
  disposables: {
    geometries: THREE.BufferGeometry[];
    materials: THREE.Material[];
    textures: THREE.Texture[];
  };
}

function createBrushedMetalRoughnessTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#555555';
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y++) {
      const shade = 65 + Math.floor(Math.sin(y * 0.45) * 18 + Math.random() * 28);
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(0, y, 256, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  tex.anisotropy = maxAnisotropy;
  // Data texture remains in linear NoColorSpace
  return tex;
}

function createRadialShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 124);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.32)');
    grad.addColorStop(0.38, 'rgba(139, 92, 246, 0.14)');
    grad.addColorStop(0.7, 'rgba(4, 7, 17, 0.42)');
    grad.addColorStop(1, 'rgba(4, 7, 17, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createHexPrismGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const sides = 6;
  const radius = 0.92;
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 1.55,
    bevelEnabled: true,
    bevelThickness: 0.22,
    bevelSize: 0.16,
    bevelSegments: 4,
    steps: 1,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

export function createPrismRig(
  isSoftwareGl: boolean,
  maxAnisotropy: number
): PrismRig {
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];

  const root = new THREE.Group();
  const prismAssembly = new THREE.Group();
  prismAssembly.position.set(0.85, 0.15, 0);
  root.add(prismAssembly);

  const brushedTex = createBrushedMetalRoughnessTexture(maxAnisotropy);
  const shadowTex = createRadialShadowTexture();
  textures.push(brushedTex, shadowTex);

  // 1. Inner glowing faceted crystal core
  const innerGeo = new THREE.OctahedronGeometry(0.56, 0);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x3b82f6,
    emissiveIntensity: 1.15,
    roughness: 0.18,
    metalness: 0.25,
  });
  const innerCore = new THREE.Mesh(innerGeo, innerMat);
  innerCore.scale.set(0.95, 1.35, 0.95);
  prismAssembly.add(innerCore);
  geometries.push(innerGeo);
  materials.push(innerMat);

  // 2. Inner crisp structural wireframe lattice
  const innerEdgesGeo = new THREE.EdgesGeometry(innerGeo, 12);
  const innerEdgesMat = new THREE.LineBasicMaterial({
    color: 0xe0f2fe,
    transparent: true,
    opacity: 0.72,
  });
  const innerWire = new THREE.LineSegments(innerEdgesGeo, innerEdgesMat);
  innerWire.scale.set(1.06, 1.48, 1.06);
  prismAssembly.add(innerWire);
  geometries.push(innerEdgesGeo);
  materials.push(innerEdgesMat);

  // 3. Outer beveled optical glass prism shell
  const prismGeo = createHexPrismGeometry();
  const prismMat = new THREE.MeshPhysicalMaterial({
    color: 0xdbeafe,
    metalness: 0.02,
    roughness: 0.08,
    transmission: isSoftwareGl ? 0 : 0.92,
    transparent: true,
    opacity: isSoftwareGl ? 0.34 : 1.0,
    ior: 1.58,
    thickness: 1.45,
    attenuationColor: new THREE.Color(0x60a5fa),
    attenuationDistance: 2.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.35,
    depthWrite: false,
  });
  const outerGlassPrism = new THREE.Mesh(prismGeo, prismMat);
  outerGlassPrism.rotation.x = Math.PI * 0.5;
  outerGlassPrism.renderOrder = 2;
  outerGlassPrism.castShadow = !isSoftwareGl;
  prismAssembly.add(outerGlassPrism);
  geometries.push(prismGeo);
  materials.push(prismMat);

  // 4. Equatorial brushed titanium collar (LatheGeometry)
  const collarPoints = [
    new THREE.Vector2(1.06, -0.14),
    new THREE.Vector2(1.18, -0.09),
    new THREE.Vector2(1.18, 0.09),
    new THREE.Vector2(1.06, 0.14),
    new THREE.Vector2(1.03, 0.07),
    new THREE.Vector2(1.03, -0.07),
    new THREE.Vector2(1.06, -0.14),
  ];
  const collarGeo = new THREE.LatheGeometry(collarPoints, 48);
  const titaniumMat = new THREE.MeshPhysicalMaterial({
    color: 0x94a3b8,
    metalness: 0.92,
    roughness: 0.22,
    roughnessMap: brushedTex,
    anisotropy: 0.8,
    clearcoat: 0.35,
  });
  const collarMesh = new THREE.Mesh(collarGeo, titaniumMat);
  collarMesh.castShadow = !isSoftwareGl;
  prismAssembly.add(collarMesh);
  geometries.push(collarGeo);
  materials.push(titaniumMat);

  // 5. Polar top & bottom crown finials (LatheGeometry)
  const crownPoints = [
    new THREE.Vector2(0.0, 0.28),
    new THREE.Vector2(0.24, 0.16),
    new THREE.Vector2(0.38, 0.02),
    new THREE.Vector2(0.28, -0.05),
    new THREE.Vector2(0.0, -0.05),
  ];
  const crownGeo = new THREE.LatheGeometry(crownPoints, 6);
  const crownMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.85,
    roughness: 0.38,
  });
  const topCrown = new THREE.Mesh(crownGeo, crownMat);
  topCrown.position.y = 1.05;
  const bottomCrown = new THREE.Mesh(crownGeo, crownMat);
  bottomCrown.position.y = -1.05;
  bottomCrown.rotation.z = Math.PI;
  prismAssembly.add(topCrown, bottomCrown);
  geometries.push(crownGeo);
  materials.push(crownMat);

  // 6. Outer precision gimbal ring
  const outerRingGeo = new THREE.TorusGeometry(2.02, 0.032, 16, 120);
  const outerRingMat = new THREE.MeshStandardMaterial({
    color: 0xcbd5e1,
    metalness: 0.94,
    roughness: 0.18,
  });
  const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
  outerRing.rotation.set(Math.PI * 0.32, Math.PI * 0.12, 0);
  prismAssembly.add(outerRing);
  geometries.push(outerRingGeo);
  materials.push(outerRingMat);

  // 7. Inner counter-tilted gyroscope ring (varied roughness >= 0.25 delta)
  const innerRingGeo = new THREE.TorusGeometry(1.58, 0.024, 14, 96);
  const innerRingMat = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    emissive: 0x4338ca,
    emissiveIntensity: 0.45,
    metalness: 0.65,
    roughness: 0.46,
  });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  innerRing.rotation.set(-Math.PI * 0.28, Math.PI * 0.38, 0);
  prismAssembly.add(innerRing);
  geometries.push(innerRingGeo);
  materials.push(innerRingMat);

  // 8. Faint orbital track guide ring
  const orbitGuideGeo = new THREE.TorusGeometry(2.75, 0.008, 8, 128);
  const orbitGuideMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.22,
  });
  const orbitGuide = new THREE.Mesh(orbitGuideGeo, orbitGuideMat);
  orbitGuide.rotation.x = Math.PI * 0.48;
  orbitGuide.rotation.y = 0.14;
  prismAssembly.add(orbitGuide);
  geometries.push(orbitGuideGeo);
  materials.push(orbitGuideMat);

  // 9. Eight composite Orbital Service Nodes (3 parts each + layer-1 raycast proxy)
  const nodeShapes: THREE.BufferGeometry[] = [
    new THREE.BoxGeometry(0.32, 0.32, 0.32),
    new THREE.OctahedronGeometry(0.24, 0),
    new THREE.IcosahedronGeometry(0.23, 0),
    new THREE.ConeGeometry(0.22, 0.42, 6),
    new THREE.TorusKnotGeometry(0.16, 0.055, 48, 8),
    new THREE.DodecahedronGeometry(0.24, 0),
    new THREE.TorusGeometry(0.2, 0.075, 14, 32),
    new THREE.TetrahedronGeometry(0.28, 0),
  ];
  const sleeveGeo = new THREE.SphereGeometry(0.36, 20, 20);
  const haloGeo = new THREE.TorusGeometry(0.42, 0.016, 10, 40);
  const proxyGeo = new THREE.SphereGeometry(0.58, 12, 12);
  const proxyMat = new THREE.MeshBasicMaterial({ visible: false });

  geometries.push(...nodeShapes, sleeveGeo, haloGeo, proxyGeo);
  materials.push(proxyMat);

  const haloMats: THREE.MeshStandardMaterial[] = [];

  const orbitalNodes: OrbitalNodeHandle[] = STUDIO_SERVICES.map((service, idx) => {
    const nodeGroup = new THREE.Group();
    const baseAngle = (idx / STUDIO_SERVICES.length) * Math.PI * 2;
    const accentColor = new THREE.Color(service.accentHex);

    const coreMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 0.65,
      metalness: 0.45,
      roughness: 0.24,
    });
    const coreMesh = new THREE.Mesh(
      nodeShapes[idx % nodeShapes.length],
      coreMat
    );

    const sleeveMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.05,
      roughness: 0.12,
      transparent: true,
      opacity: 0.28,
      clearcoat: 1.0,
      depthWrite: false,
    });
    const sleeveMesh = new THREE.Mesh(sleeveGeo, sleeveMat);
    sleeveMesh.renderOrder = 3;

    const haloMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      metalness: 0.9,
      roughness: 0.28,
    });
    const ringMesh = new THREE.Mesh(haloGeo, haloMat);
    ringMesh.rotation.x = Math.PI * 0.4;

    const proxyMesh = new THREE.Mesh(proxyGeo, proxyMat);
    proxyMesh.layers.set(1);
    proxyMesh.userData.serviceId = service.id;

    nodeGroup.add(coreMesh, sleeveMesh, ringMesh, proxyMesh);
    prismAssembly.add(nodeGroup);
    materials.push(coreMat, sleeveMat, haloMat);
    haloMats.push(haloMat);

    return {
      serviceId: service.id,
      group: nodeGroup,
      coreMesh,
      ringMesh,
      proxyMesh,
      baseAngle,
      orbitRadius: 2.75,
      orbitTilt: 0.14,
      verticalPhase: (idx / STUDIO_SERVICES.length) * Math.PI * 2,
    };
  });

  // 10. Grounded architectural studio pedestal & radial contact shadow
  const pedestalBaseGeo = new THREE.CylinderGeometry(1.65, 1.92, 0.14, 48);
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.78,
    roughness: 0.35,
  });
  const pedestal = new THREE.Mesh(pedestalBaseGeo, pedestalMat);
  pedestal.position.set(0.85, -2.35, 0);
  pedestal.receiveShadow = !isSoftwareGl;
  root.add(pedestal);
  geometries.push(pedestalBaseGeo);
  materials.push(pedestalMat);

  const pedestalTrimGeo = new THREE.TorusGeometry(1.7, 0.015, 10, 64);
  const pedestalTrimMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.42,
  });
  const pedestalTrim = new THREE.Mesh(pedestalTrimGeo, pedestalTrimMat);
  pedestalTrim.rotation.x = Math.PI * 0.5;
  pedestalTrim.position.set(0.85, -2.27, 0);
  root.add(pedestalTrim);
  geometries.push(pedestalTrimGeo);
  materials.push(pedestalTrimMat);

  const shadowPlaneGeo = new THREE.PlaneGeometry(7.2, 7.2);
  const shadowPlaneMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.85,
  });
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  shadowPlane.rotation.x = -Math.PI * 0.5;
  shadowPlane.position.set(0.85, -2.41, 0);
  root.add(shadowPlane);
  geometries.push(shadowPlaneGeo);
  materials.push(shadowPlaneMat);

  // 11. InstancedMesh ambient crystalline dust field (160 motes)
  const dustCount = 160;
  const dustGeo = new THREE.OctahedronGeometry(0.028, 0);
  const dustMat = new THREE.MeshStandardMaterial({
    color: 0xbae6fd,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.55,
    roughness: 0.25,
    metalness: 0.2,
  });
  const dustInstanced = new THREE.InstancedMesh(dustGeo, dustMat, dustCount);
  dustInstanced.frustumCulled = false;

  const dustBasePositions = new Float32Array(dustCount * 3);
  const dustPhases = new Float32Array(dustCount);
  const dustScales = new Float32Array(dustCount);
  const dummy = new THREE.Object3D();
  const colorTmp = new THREE.Color();

  for (let i = 0; i < dustCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.6 + Math.random() * 5.2;
    const y = (Math.random() - 0.48) * 5.2;
    const x = 0.85 + Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    dustBasePositions[i * 3] = x;
    dustBasePositions[i * 3 + 1] = y;
    dustBasePositions[i * 3 + 2] = z;
    dustPhases[i] = Math.random() * Math.PI * 2;
    dustScales[i] = 0.55 + Math.random() * 1.1;

    dummy.position.set(x, y, z);
    dummy.scale.setScalar(dustScales[i]);
    dummy.updateMatrix();
    dustInstanced.setMatrixAt(i, dummy.matrix);

    colorTmp.setHex(i % 3 === 0 ? 0xa78bfa : 0x7dd3fc);
    dustInstanced.setColorAt(i, colorTmp);
  }
  dustInstanced.instanceMatrix.needsUpdate = true;
  if (dustInstanced.instanceColor) {
    dustInstanced.instanceColor.needsUpdate = true;
  }
  dustInstanced.computeBoundingSphere();
  root.add(dustInstanced);
  geometries.push(dustGeo);
  materials.push(dustMat);

  return {
    root,
    prismAssembly,
    innerCore,
    innerWire,
    outerGlassPrism,
    outerRing,
    innerRing,
    orbitalNodes,
    dustInstanced,
    dustBasePositions,
    dustPhases,
    dustScales,
    themeMaterials: {
      innerEdgesMat,
      prismMat,
      orbitGuideMat,
      pedestalMat,
      pedestalTrimMat,
      dustMat,
      haloMats,
    },
    disposables: {
      geometries,
      materials,
      textures,
    },
  };
}

export function applyPrismRigTheme(
  rig: PrismRig,
  theme: 'obsidian' | 'light'
): void {
  const isLight = theme === 'light';
  const {
    innerEdgesMat,
    prismMat,
    orbitGuideMat,
    pedestalMat,
    pedestalTrimMat,
    dustMat,
    haloMats,
  } = rig.themeMaterials;

  innerEdgesMat.color.setHex(isLight ? 0x0369a1 : 0xe0f2fe);
  innerEdgesMat.opacity = isLight ? 0.85 : 0.72;

  prismMat.color.setHex(isLight ? 0xbae6fd : 0xdbeafe);
  prismMat.attenuationColor.setHex(isLight ? 0x0284c7 : 0x60a5fa);

  orbitGuideMat.color.setHex(isLight ? 0x0369a1 : 0x38bdf8);
  orbitGuideMat.opacity = isLight ? 0.36 : 0.22;

  pedestalMat.color.setHex(isLight ? 0xcbd5e1 : 0x0f172a);
  pedestalTrimMat.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
  pedestalTrimMat.opacity = isLight ? 0.6 : 0.42;

  dustMat.color.setHex(isLight ? 0x0369a1 : 0xbae6fd);
  dustMat.emissive.setHex(isLight ? 0x0284c7 : 0x38bdf8);
  dustMat.emissiveIntensity = isLight ? 0.22 : 0.55;

  for (const hm of haloMats) {
    hm.color.setHex(isLight ? 0x475569 : 0xcbd5e1);
  }
}

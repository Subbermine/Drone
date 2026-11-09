import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Crosshair, Move3d } from 'lucide-react';

interface DroneCanvasProps {
  className?: string;
}

interface MotorAssembly {
  motor: THREE.Object3D;
  direction: number;
}

interface PropellerGeometries {
  hub: THREE.BufferGeometry;
  nut: THREE.BufferGeometry;
  blade: THREE.BufferGeometry;
  tip: THREE.BufferGeometry;
  disc: THREE.BufferGeometry;
  tipRing: THREE.BufferGeometry;
}

interface PropellerMaterials {
  hub: THREE.Material;
  nut: THREE.Material;
  blade: THREE.Material;
  tip: THREE.Material;
  disc: THREE.Material;
  tipRing: THREE.Material;
}

/**
 * Creates soft motion blur texture for high-speed rotor wash effect
 */
function createMotionBlurTexture(): THREE.Texture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const cx = 128;
  const cy = 128;
  for (let i = 0; i < 2; i++) {
    const angle = i * Math.PI;
    const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 120);
    grad.addColorStop(0, 'rgba(0, 194, 255, 0.04)');
    grad.addColorStop(0.65, 'rgba(0, 194, 255, 0.22)');
    grad.addColorStop(0.92, 'rgba(0, 230, 255, 0.42)');
    grad.addColorStop(1, 'rgba(0, 194, 255, 0)');

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, 120, angle, angle + Math.PI * 0.45);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Builds an aerodynamic propeller group with dual carbon blades, cyan tips,
 * central locking hub, and motion blur discs.
 */
function buildPropellerGroup(
  direction: number,
  geo: PropellerGeometries,
  mat: PropellerMaterials
): THREE.Group {
  const group = new THREE.Group();

  // Central Hub Cap
  const hub = new THREE.Mesh(geo.hub, mat.hub);
  hub.position.y = 0.18;
  group.add(hub);

  // Electric Cyan Center Lock Nut
  const nut = new THREE.Mesh(geo.nut, mat.nut);
  nut.position.y = 0.22;
  group.add(nut);

  // Dual Aerodynamic Blades (180° apart)
  for (let b = 0; b < 2; b++) {
    const bladeArm = new THREE.Group();
    bladeArm.rotation.y = b * Math.PI;
    // Mirror airfoil direction based on rotation spin
    bladeArm.scale.z = direction;

    const bladeMesh = new THREE.Mesh(geo.blade, mat.blade);
    bladeMesh.rotation.x = Math.PI / 2;
    bladeMesh.position.y = 0.14;
    bladeArm.add(bladeMesh);

    const tipMesh = new THREE.Mesh(geo.tip, mat.tip);
    tipMesh.rotation.x = Math.PI / 2;
    tipMesh.position.y = 0.14;
    bladeArm.add(tipMesh);

    group.add(bladeArm);
  }

  // Motion Blur Wash Disc
  const disc = new THREE.Mesh(geo.disc, mat.disc);
  disc.rotation.x = Math.PI / 2;
  disc.position.y = 0.13;
  group.add(disc);

  // Rotor Tip Vortex Ring
  const ring = new THREE.Mesh(geo.tipRing, mat.tipRing);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.135;
  group.add(ring);

  return group;
}

export const DroneCanvas: React.FC<DroneCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDisposed = false;
    const motorAssemblies: MotorAssembly[] = [];

    // 1. Determine dimensions (fallback to parent or window if 0)
    const getDims = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width || container.clientWidth || 500;
      const h = rect.height || container.clientHeight || 450;
      return { width: Math.max(w, 280), height: Math.max(h, 280) };
    };

    const { width, height } = getDims();

    // 2. Scene
    const scene = new THREE.Scene();

    // 3. Camera - positioned with generous distance looking right at origin (0, 0, 0)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(3.2, 1.6, 3.8);
    camera.lookAt(0, 0, 0);

    // 4. Renderer with transparent alpha for seamless VANTA overlay
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Prevent page scroll hijack
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.minPolarAngle = Math.PI / 6;

    // 6. Comprehensive High-Tech Aerospace Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00c2ff, 5.0);
    cyanRim.position.set(-8, 3, -6);
    scene.add(cyanRim);

    const cyanFill = new THREE.DirectionalLight(0x00c2ff, 3.5);
    cyanFill.position.set(5, -2, 4);
    scene.add(cyanFill);

    const blueUnderLight = new THREE.DirectionalLight(0x1d4ed8, 3.0);
    blueUnderLight.position.set(0, -8, 2);
    scene.add(blueUnderLight);

    const pointLight = new THREE.PointLight(0x00c2ff, 4.0, 20);
    pointLight.position.set(0, 1.5, 0);
    scene.add(pointLight);

    // 7. Pivot Group for the Drone
    const pivot = new THREE.Group();
    scene.add(pivot);

    // 8. Shared Propeller Geometries & Materials
    const bladeLength = 7.1;

    // Aerodynamic Blade Profile
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0.6, -0.2);
    bladeShape.bezierCurveTo(2.0, -0.65, 4.5, -0.75, bladeLength - 1.2, -0.5);
    bladeShape.bezierCurveTo(bladeLength - 0.2, -0.3, bladeLength, 0.0, bladeLength, 0.2);
    bladeShape.bezierCurveTo(bladeLength, 0.25, bladeLength - 0.3, 0.38, bladeLength - 1.2, 0.4);
    bladeShape.bezierCurveTo(4.0, 0.55, 2.0, 0.4, 0.6, 0.2);
    bladeShape.closePath();

    // High-visibility Safety Tip Accent Profile
    const tipShape = new THREE.Shape();
    tipShape.moveTo(bladeLength - 1.2, -0.5);
    tipShape.bezierCurveTo(bladeLength - 0.2, -0.3, bladeLength, 0.0, bladeLength, 0.2);
    tipShape.bezierCurveTo(bladeLength, 0.25, bladeLength - 0.3, 0.38, bladeLength - 1.2, 0.4);
    tipShape.closePath();

    const blurTexture = createMotionBlurTexture();

    const propGeos: PropellerGeometries = {
      hub: new THREE.CylinderGeometry(0.5, 0.65, 0.35, 24),
      nut: new THREE.CylinderGeometry(0.2, 0.2, 0.45, 16),
      blade: new THREE.ExtrudeGeometry(bladeShape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.02,
      }),
      tip: new THREE.ExtrudeGeometry(tipShape, {
        depth: 0.085,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.02,
        bevelThickness: 0.02,
      }),
      disc: new THREE.RingGeometry(0.8, bladeLength, 48),
      tipRing: new THREE.RingGeometry(bladeLength - 0.25, bladeLength, 48),
    };

    const propMats: PropellerMaterials = {
      hub: new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.85,
        roughness: 0.2,
      }),
      nut: new THREE.MeshStandardMaterial({
        color: 0x00c2ff,
        emissive: 0x00c2ff,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      }),
      blade: new THREE.MeshStandardMaterial({
        color: 0x0b1320,
        metalness: 0.7,
        roughness: 0.35,
        side: THREE.DoubleSide,
      }),
      tip: new THREE.MeshStandardMaterial({
        color: 0x00c2ff,
        emissive: 0x00c2ff,
        emissiveIntensity: 0.6,
        metalness: 0.3,
        roughness: 0.2,
        side: THREE.DoubleSide,
      }),
      disc: blurTexture
        ? new THREE.MeshBasicMaterial({
          map: blurTexture,
          transparent: true,
          opacity: 0.32,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        : new THREE.MeshBasicMaterial({
          color: 0x00c2ff,
          transparent: true,
          opacity: 0.14,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      tipRing: new THREE.MeshBasicMaterial({
        color: 0x00c2ff,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    };

    // 9. Load the Drone GLB with automatic fallback
    const loader = new GLTFLoader();
    const primaryUrl = '/flightlessdrone.glb';
    const fallbackUrl = '/drone.glb';

    const setupModel = (gltf: any) => {
      if (isDisposed) return;
      const model = gltf.scene;

      // Attach rotating propeller assemblies to all 4 motors
      // Authentic quadcopter pairing:
      // Diagonal pair (motor 1 & 2): spin direction = 1 (Clockwise)
      // Diagonal pair (motor 3 & 4): spin direction = -1 (Counter-Clockwise)
      const motorConfigs = [
        { name: 'motor_top1', direction: 1 },
        { name: 'motor_top2', direction: 1 },
        { name: 'motor_top3', direction: -1 },
        { name: 'motor_top4', direction: -1 },
      ];

      motorConfigs.forEach(({ name, direction }) => {
        let motorNode: THREE.Object3D | null = model.getObjectByName(name) || null;
        if (!motorNode) {
          model.traverse((child: any) => {
            if (child.name && child.name.toLowerCase() === name.toLowerCase()) {
              motorNode = child;
            }
          });
        }

        if (motorNode) {
          const prop = buildPropellerGroup(direction, propGeos, propMats);
          // Position propeller flush on top of the motor cap (Y = 1.48)
          prop.position.set(0, 1.48, 0);
          motorNode.add(prop);
          motorAssemblies.push({ motor: motorNode, direction });
        }
      });

      // CRITICAL STEP 1: Calculate raw bounding box
      const rawBox = new THREE.Box3().setFromObject(model);
      const rawSize = rawBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;

      // CRITICAL STEP 2: Scale model to target unit dimension (2.8 units)
      const targetScale = 2.8 / maxDim;
      model.scale.setScalar(targetScale);
      model.updateMatrixWorld(true);

      // CRITICAL STEP 3: Recompute bounding box of SCALED model
      const scaledBox = new THREE.Box3().setFromObject(model);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

      // CRITICAL STEP 4: Translate model so its scaled center is exactly (0, 0, 0)
      model.position.x -= scaledCenter.x;
      model.position.y -= scaledCenter.y;
      model.position.z -= scaledCenter.z;
      model.updateMatrixWorld(true);

      // CRITICAL STEP 5: Enhance all materials for visibility and cyber sheen
      model.traverse((child: any) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.side = THREE.DoubleSide; // Render both sides of every polygon

            // Prevent extreme mirror-black absorption
            if (mat.metalness > 0.8) {
              mat.roughness = Math.max(mat.roughness, 0.28);
            }
            mat.needsUpdate = true;
          }
        }
      });

      pivot.add(model);
      setLoading(false);
    };

    const loadWithFallback = (url: string, isFallback: boolean = false) => {
      loader.load(
        url,
        (gltf) => {
          setupModel(gltf);
        },
        (xhr) => {
          if (xhr.total > 0) {
            const percent = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
            setLoadProgress(percent);
          } else if (xhr.loaded > 0) {
            const approxTotal = isFallback ? 23446248 : 16813184;
            const percent = Math.min(99, Math.round((xhr.loaded / approxTotal) * 100));
            setLoadProgress(percent);
          }
        },
        (err) => {
          if (!isFallback) {
            console.warn(`Could not load model from ${url}, attempting fallback to ${fallbackUrl}...`, err);
            loadWithFallback(fallbackUrl, true);
          } else {
            console.error('All 3D drone models failed to load:', err);
            setError('3D Model failed to initialize');
            setLoading(false);
          }
        }
      );
    };

    loadWithFallback(primaryUrl);

    // 10. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsedTime = clock.getElapsedTime();

      // Atmospheric hovering physics with subtle aerodynamic stabilization
      pivot.position.y = Math.sin(elapsedTime * 1.8) * 0.08;
      pivot.rotation.z = Math.sin(elapsedTime * 1.2) * 0.012;
      pivot.rotation.x = Math.cos(elapsedTime * 1.5) * 0.01;

      // Realistic high-speed quadcopter propeller rotation
      const spinDelta = 24 * delta;
      for (let i = 0; i < motorAssemblies.length; i++) {
        const { motor, direction } = motorAssemblies[i];
        motor.rotateY(direction * spinDelta);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 11. Resize Observer
    const handleResize = () => {
      if (!container || isDisposed) return;
      const { width: newW, height: newH } = getDims();
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // 12. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose shared propeller assets
      Object.values(propGeos).forEach((g) => g.dispose());
      Object.values(propMats).forEach((m) => m.dispose());
      if (blurTexture) blurTexture.dispose();

      scene.clear();
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[340px] sm:min-h-[420px] flex items-center justify-center ${className}`}>
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none space-y-3 bg-[#07111E]/40 backdrop-blur-xs rounded-2xl">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-[#00C2FF]/30 border-t-[#00C2FF] animate-spin" />
            <Crosshair className="absolute w-5 h-5 text-[#00C2FF] animate-pulse" />
          </div>
          <div className="text-center space-y-1">
            <div className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Loading 3D Drone Model
            </div>
            <div className="text-[11px] font-mono text-[#00C2FF] font-semibold">
              {loadProgress > 0 ? `${loadProgress}% COMPLETE` : 'STREAMING ASSET (23 MB)...'}
            </div>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-20 text-red-400 text-xs font-mono">
          {error}
        </div>
      )}

      {/* UI Overlay: 360 Drag Hint (hidden on phone viewports) */}
      {!loading && !error && (
        <div className="hidden sm:flex absolute bottom-3 right-3 z-20 pointer-events-none items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#07111E]/80 backdrop-blur-md border border-[#00C2FF]/30 text-[10px] font-mono text-[#94A3B8]">
          <Move3d className="w-3 h-3 text-[#00C2FF]" />
          <span>DRAG TO ROTATE 360°</span>
        </div>
      )}
    </div>
  );
};

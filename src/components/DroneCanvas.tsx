import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Crosshair, Move3d } from 'lucide-react';

interface DroneCanvasProps {
  className?: string;
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
    controls.autoRotateSpeed = 1.8;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 1.7;
    controls.minPolarAngle = Math.PI / 6;

    // 6. Comprehensive High-Tech Aerospace Lighting
    // Ambient light: ensures all surfaces receive baseline illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    // Main Directional Key Light (Pure White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    // Electric Cyan Rim Light (#00C2FF) from bottom-left
    const cyanRim = new THREE.DirectionalLight(0x00c2ff, 5.0);
    cyanRim.position.set(-8, 3, -6);
    scene.add(cyanRim);

    // Secondary Cyan Fill Light from front-right
    const cyanFill = new THREE.DirectionalLight(0x00c2ff, 3.5);
    cyanFill.position.set(5, -2, 4);
    scene.add(cyanFill);

    // Deep Aerospace Blue (#1D4ED8) from underside
    const blueUnderLight = new THREE.DirectionalLight(0x1d4ed8, 3.0);
    blueUnderLight.position.set(0, -8, 2);
    scene.add(blueUnderLight);

    // Core point light attached to the center
    const pointLight = new THREE.PointLight(0x00c2ff, 4.0, 20);
    pointLight.position.set(0, 1.5, 0);
    scene.add(pointLight);

    // 7. Pivot Group for the Drone
    const pivot = new THREE.Group();
    scene.add(pivot);

    // 8. Load the Drone GLB
    const loader = new GLTFLoader();
    const modelUrl = '/drone.glb';

    loader.load(
      modelUrl,
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;

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
        model.traverse((child) => {
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
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
          setLoadProgress(percent);
        } else if (xhr.loaded > 0) {
          // If total is not provided by server, calculate based on 23.4 MB
          const approxTotal = 23446248;
          const percent = Math.min(99, Math.round((xhr.loaded / approxTotal) * 100));
          setLoadProgress(percent);
        }
      },
      (err) => {
        console.error('Error loading drone.glb:', err);
        setError('3D Model failed to initialize');
        setLoading(false);
      }
    );

    // 9. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Atmospheric hovering physics
      pivot.position.y = Math.sin(elapsedTime * 1.8) * 0.08;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 10. Resize Observer
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

    // 11. Cleanup
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

      {/* UI Overlay: 360 Drag Hint */}
      {!loading && !error && (
        <div className="absolute bottom-3 right-3 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#07111E]/80 backdrop-blur-md border border-[#00C2FF]/30 text-[10px] font-mono text-[#94A3B8]">
          <Move3d className="w-3 h-3 text-[#00C2FF]" />
          <span>DRAG TO ROTATE 360°</span>
        </div>
      )}
    </div>
  );
};

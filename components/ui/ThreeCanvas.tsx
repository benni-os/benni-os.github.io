// components/ui/ThreeCanvas.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000008, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 7);

    /* =========================================================
       BENNI OS ALIVE: 3D CYBER AI LIVING FACE & EYE TRACKING
       ========================================================= */

    const aiFaceGroup = new THREE.Group();
    // Position prominently in upper center for Hero visibility
    aiFaceGroup.position.set(0, 0.6, 0);
    scene.add(aiFaceGroup);

    // Left & Right Eye Assembly
    const leftEye = new THREE.Group();
    leftEye.position.set(-1.6, 0.7, 0.2);
    aiFaceGroup.add(leftEye);

    const rightEye = new THREE.Group();
    rightEye.position.set(1.6, 0.7, 0.2);
    aiFaceGroup.add(rightEye);

    // Eye 1: Outer Neon Ring
    const outerRingGeo = new THREE.TorusGeometry(0.7, 0.05, 16, 80);
    const outerRingMat = new THREE.MeshBasicMaterial({ color: 0x00ffe0, wireframe: true, transparent: true, opacity: 0.95 });

    const leftOuter = new THREE.Mesh(outerRingGeo, outerRingMat);
    leftEye.add(leftOuter);
    const rightOuter = new THREE.Mesh(outerRingGeo, outerRingMat.clone());
    rightEye.add(rightOuter);

    // Eye 2: Inner Holographic Iris Ring
    const irisGeo = new THREE.RingGeometry(0.25, 0.55, 32);
    const irisMat = new THREE.MeshBasicMaterial({ color: 0x7c5cfc, side: THREE.DoubleSide, transparent: true, opacity: 0.85, wireframe: true });
    
    const leftIris = new THREE.Mesh(irisGeo, irisMat);
    leftEye.add(leftIris);
    const rightIris = new THREE.Mesh(irisGeo, irisMat.clone());
    rightEye.add(rightIris);

    // Eye 3: Intense Glowing Pupil Sphere
    const pupilGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x00ffe0 });
    
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.z = 0.12;
    leftEye.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat.clone());
    rightPupil.position.z = 0.12;
    rightEye.add(rightPupil);

    // Face Structure: Cyber Wireframe Face Mask (Cheekbones, Forehead, Nose Bridge)
    const faceContourGeo = new THREE.BufferGeometry();
    const faceVertices = new Float32Array([
      // Forehead bridge
      -1.6, 1.5, 0.2,   0, 1.9, 0.5,
      0, 1.9, 0.5,      1.6, 1.5, 0.2,
      // Nose bridge line
      0, 1.9, 0.5,      0, 0.1, 0.8,
      0, 0.1, 0.8,      0, -1.0, 0.4,
      // Left cheekbone
      -1.6, 0.7, 0.2,   -2.6, 0.0, -0.4,
      -2.6, 0.0, -0.4,  0, -1.0, 0.4,
      // Right cheekbone
      1.6, 0.7, 0.2,    2.6, 0.0, -0.4,
      2.6, 0.0, -0.4,   0, -1.0, 0.4,
      // Jawline
      -2.6, 0.0, -0.4,  0, -2.1, 0.1,
      2.6, 0.0, -0.4,   0, -2.1, 0.1,
      // Brow line
      -1.6, 1.5, 0.2,   -1.6, 0.7, 0.2,
      1.6, 1.5, 0.2,    1.6, 0.7, 0.2
    ]);
    faceContourGeo.setAttribute('position', new THREE.BufferAttribute(faceVertices, 3));
    const faceContourMat = new THREE.LineBasicMaterial({ color: 0x00ffe0, transparent: true, opacity: 0.65 });
    const faceLines = new THREE.LineSegments(faceContourGeo, faceContourMat);
    aiFaceGroup.add(faceLines);

    // Glowing Intersection Nodes
    const nodePositions = new Float32Array([
      -1.6, 1.5, 0.2,  0, 1.9, 0.5,  1.6, 1.5, 0.2,
      0, 0.1, 0.8,  -2.6, 0.0, -0.4,  2.6, 0.0, -0.4,
      0, -1.0, 0.4,  0, -2.1, 0.1
    ]);
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({ color: 0x00ffe0, size: 0.12, transparent: true, opacity: 0.95 });
    const faceNodes = new THREE.Points(nodeGeo, nodeMat);
    aiFaceGroup.add(faceNodes);

    /* =========================================================
       BACKGROUND 3D TORUS KNOT & PARTICLES
       ========================================================= */
    const tkGeo1 = new THREE.TorusKnotGeometry(2.3, 0.4, 180, 24, 2, 3);
    const tkMat1 = new THREE.MeshBasicMaterial({ color: 0x00ffe0, wireframe: true, transparent: true, opacity: 0.25 });
    const tk1 = new THREE.Mesh(tkGeo1, tkMat1);
    tk1.position.set(0, 0, -2);
    scene.add(tk1);

    const tkGeo2 = new THREE.TorusKnotGeometry(1.5, 0.25, 140, 20, 2, 3);
    const tkMat2 = new THREE.MeshBasicMaterial({ color: 0x7c5cfc, wireframe: true, transparent: true, opacity: 0.3 });
    const tk2 = new THREE.Mesh(tkGeo2, tkMat2);
    tk2.position.set(0, 0, -2);
    scene.add(tk2);

    /* BREATHING PARTICLE SPHERE */
    const particleCount = 1000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pOriginals = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.2 + (Math.random() - 0.5) * 0.6;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 2.0;

      pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
      pOriginals[i * 3] = x; pOriginals[i * 3 + 1] = y; pOriginals[i * 3 + 2] = z;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00ffe0, size: 0.06, transparent: true, opacity: 0.6 });
    const sphereParticles = new THREE.Points(pGeo, pMat);
    scene.add(sphereParticles);

    /* MOUSE & SCROLL TRACKING WITH SMOOTH INERTIA */
    let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0, scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let t = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.012;

      // Smooth mouse inertia
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // 1. AI LIVING AGENT EYE TRACKING
      // Calculate 3D vector for eyes to track cursor
      const lookTarget = new THREE.Vector3(mouseX * 5, mouseY * 4, 5);
      leftEye.lookAt(lookTarget);
      rightEye.lookAt(lookTarget);

      // Pupil dilation heartbeat
      const pupilPulse = 1 + Math.sin(t * 3) * 0.15;
      leftPupil.scale.set(pupilPulse, pupilPulse, pupilPulse);
      rightPupil.scale.set(pupilPulse, pupilPulse, pupilPulse);

      // AI Blinking animation
      const blinkCycle = Math.sin(t * 0.6);
      const isBlinking = blinkCycle > 0.96;
      leftOuter.scale.y = isBlinking ? 0.05 : 1;
      rightOuter.scale.y = isBlinking ? 0.05 : 1;

      // AI Head Turn following cursor
      aiFaceGroup.rotation.y = mouseX * 0.35;
      aiFaceGroup.rotation.x = -mouseY * 0.2;

      // 2. BACKGROUND MESH ROTATION
      tk1.rotation.x = t * 0.25;
      tk1.rotation.y = t * 0.35;
      tk2.rotation.x = -t * 0.2;
      tk2.rotation.y = t * 0.3;

      const positions = pGeo.attributes.position.array as Float32Array;
      const pulseFactor = 1 + Math.sin(t * 1.8) * 0.08;
      for (let k = 0; k < particleCount; k++) {
        positions[k * 3] = pOriginals[k * 3] * pulseFactor;
        positions[k * 3 + 1] = pOriginals[k * 3 + 1] * pulseFactor;
        positions[k * 3 + 2] = (pOriginals[k * 3 + 2] + 2.0) * pulseFactor - 2.0;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Camera parallax scroll
      camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      camera.position.z = 7 - Math.min(scrollY / (window.innerHeight * 0.8), 1) * 2.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-90"
    />
  );
}

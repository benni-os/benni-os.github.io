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
       DIGITALIZED AI LIVING AGENT FACE & EYE TRACKING SYSTEM
       ========================================================= */

    const aiAgentGroup = new THREE.Group();
    aiAgentGroup.position.set(0, 0.4, -0.5);
    scene.add(aiAgentGroup);

    // Left & Right Eye Groups
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-1.3, 0.6, 0);
    aiAgentGroup.add(leftEyeGroup);

    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(1.3, 0.6, 0);
    aiAgentGroup.add(rightEyeGroup);

    // Eye Geometry: Outer Holographic Ring
    const eyeRingGeo = new THREE.TorusGeometry(0.55, 0.04, 16, 100);
    const eyeRingMat = new THREE.MeshBasicMaterial({ color: 0x00ffe0, wireframe: true, transparent: true, opacity: 0.8 });

    const leftOuterRing = new THREE.Mesh(eyeRingGeo, eyeRingMat);
    leftEyeGroup.add(leftOuterRing);
    const rightOuterRing = new THREE.Mesh(eyeRingGeo, eyeRingMat.clone());
    rightEyeGroup.add(rightOuterRing);

    // Eye Geometry: Inner Iris Ring
    const irisRingGeo = new THREE.RingGeometry(0.2, 0.42, 32);
    const irisMat = new THREE.MeshBasicMaterial({ color: 0x7c5cfc, side: THREE.DoubleSide, transparent: true, opacity: 0.6, wireframe: true });
    const leftIris = new THREE.Mesh(irisRingGeo, irisMat);
    leftEyeGroup.add(leftIris);
    const rightIris = new THREE.Mesh(irisRingGeo, irisMat.clone());
    rightEyeGroup.add(rightIris);

    // Glowing Pupil Spheres
    const pupilGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x00ffe0 });
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.z = 0.08;
    leftEyeGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat.clone());
    rightPupil.position.z = 0.08;
    rightEyeGroup.add(rightPupil);

    // Cybernetic Face Wireframe Contour (Cheekbones, Forehead, Nose Bridge)
    const faceContourGeo = new THREE.BufferGeometry();
    const faceVertices = new Float32Array([
      // Forehead bridge
      -1.3, 1.3, 0,   0, 1.6, 0.3,
      0, 1.6, 0.3,    1.3, 1.3, 0,
      // Nose bridge
      0, 1.6, 0.3,    0, 0.1, 0.5,
      // Cheekbone left
      -1.3, 0.6, 0,   -2.2, 0.1, -0.3,
      -2.2, 0.1, -0.3, 0, -0.9, 0.2,
      // Cheekbone right
      1.3, 0.6, 0,    2.2, 0.1, -0.3,
      2.2, 0.1, -0.3,  0, -0.9, 0.2,
      // Jawline connections
      -2.2, 0.1, -0.3, 0, -1.8, 0,
      2.2, 0.1, -0.3,  0, -1.8, 0,
    ]);
    faceContourGeo.setAttribute('position', new THREE.BufferAttribute(faceVertices, 3));
    const faceContourMat = new THREE.LineBasicMaterial({ color: 0x00ffe0, transparent: true, opacity: 0.25 });
    const faceContour = new THREE.LineSegments(faceContourGeo, faceContourMat);
    aiAgentGroup.add(faceContour);

    // Nodes at key face intersections
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array([
      -1.3, 1.3, 0,  0, 1.6, 0.3,  1.3, 1.3, 0,  0, 0.1, 0.5,
      -2.2, 0.1, -0.3,  2.2, 0.1, -0.3,  0, -0.9, 0.2,  0, -1.8, 0
    ]);
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({ color: 0x00ffe0, size: 0.08, transparent: true, opacity: 0.7 });
    const faceNodes = new THREE.Points(nodeGeo, nodeMat);
    aiAgentGroup.add(faceNodes);

    /* =========================================================
       DUAL TORUS KNOT MESH & BREATHING PARTICLE SPHERE
       ========================================================= */
    const tkGeo1 = new THREE.TorusKnotGeometry(2.1, 0.45, 180, 24, 2, 3);
    const tkMat1 = new THREE.MeshBasicMaterial({ color: 0x00ffe0, wireframe: true, transparent: true, opacity: 0.2 });
    const tk1 = new THREE.Mesh(tkGeo1, tkMat1);
    tk1.position.set(0, 0, -1.5);
    scene.add(tk1);

    const tkGeo2 = new THREE.TorusKnotGeometry(1.4, 0.25, 140, 20, 2, 3);
    const tkMat2 = new THREE.MeshBasicMaterial({ color: 0x7c5cfc, wireframe: true, transparent: true, opacity: 0.25 });
    const tk2 = new THREE.Mesh(tkGeo2, tkMat2);
    tk2.position.set(0, 0, -1.5);
    scene.add(tk2);

    /* BREATHING PARTICLE SPHERE */
    const particleCount = 900;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pOriginals = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.8 + (Math.random() - 0.5) * 0.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 1.5;

      pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
      pOriginals[i * 3] = x; pOriginals[i * 3 + 1] = y; pOriginals[i * 3 + 2] = z;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00ffe0, size: 0.05, transparent: true, opacity: 0.5 });
    const sphereParticles = new THREE.Points(pGeo, pMat);
    scene.add(sphereParticles);

    /* BACKGROUND STARS */
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
      starPos[s * 3] = (Math.random() - 0.5) * 180;
      starPos[s * 3 + 1] = (Math.random() - 0.5) * 180;
      starPos[s * 3 + 2] = (Math.random() - 0.5) * 180;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0.4 }));
    scene.add(stars);

    /* MOUSE & SCROLL TRACKING */
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
      t += 0.01;

      // Smooth mouse interpolation (inertia)
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // 1. AI LIVING AGENT EYE TRACKING
      const eyeLookTarget = new THREE.Vector3(mouseX * 3.5, mouseY * 2.5, 4);
      leftEyeGroup.lookAt(eyeLookTarget);
      rightEyeGroup.lookAt(eyeLookTarget);

      // Eye breathing & pupil dilation
      const pupilPulse = 0.14 + Math.sin(t * 2.5) * 0.02;
      leftPupil.scale.set(pupilPulse / 0.14, pupilPulse / 0.14, pupilPulse / 0.14);
      rightPupil.scale.set(pupilPulse / 0.14, pupilPulse / 0.14, pupilPulse / 0.14);

      // Soft AI blinking cycle every ~5 seconds
      const blink = Math.sin(t * 0.5);
      const isBlinking = blink > 0.98;
      leftOuterRing.scale.y = isBlinking ? 0.1 : 1;
      rightOuterRing.scale.y = isBlinking ? 0.1 : 1;

      // AI Agent Face Head Movement
      aiAgentGroup.rotation.y = mouseX * 0.25;
      aiAgentGroup.rotation.x = -mouseY * 0.15;

      // 2. BACKGROUND 3D MESHES & PARTICLES
      tk1.rotation.x = t * 0.3 + mouseY * 0.1;
      tk1.rotation.y = t * 0.4 + mouseX * 0.1;
      tk2.rotation.x = -t * 0.25;
      tk2.rotation.y = t * 0.35;

      const positions = pGeo.attributes.position.array as Float32Array;
      const pulseFactor = 1 + Math.sin(t * 1.5) * 0.08;
      for (let k = 0; k < particleCount; k++) {
        positions[k * 3] = pOriginals[k * 3] * pulseFactor;
        positions[k * 3 + 1] = pOriginals[k * 3 + 1] * pulseFactor;
        positions[k * 3 + 2] = (pOriginals[k * 3 + 2] + 1.5) * pulseFactor - 1.5;
      }
      pGeo.attributes.position.needsUpdate = true;
      sphereParticles.rotation.y = t * 0.15;

      stars.rotation.y = t * 0.008;

      // Camera parallax scroll
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      camera.position.z = 7 - Math.min(scrollY / (window.innerHeight * 0.8), 1) * 2;
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
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
    />
  );
}

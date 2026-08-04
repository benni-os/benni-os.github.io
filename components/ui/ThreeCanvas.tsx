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
    camera.position.set(0, 0, 8);

    /* =========================================================
       BENNI OS MARVEL-STYLE HUMANOID AI ENTITY (CENTERED FULL-SCREEN)
       ========================================================= */

    const humanoidEntity = new THREE.Group();
    // Perfectly centered in the viewport
    humanoidEntity.position.set(0, 0.2, 0);
    scene.add(humanoidEntity);

    // 1. FOREHEAD CORE MIND GEM (Marvel-style AI Core - Center Top)
    const coreGemGeo = new THREE.OctahedronGeometry(0.35, 2);
    const coreGemMat = new THREE.MeshBasicMaterial({ color: 0x00ffe0, wireframe: true });
    const coreMindGem = new THREE.Mesh(coreGemGeo, coreGemMat);
    coreMindGem.position.set(0, 2.2, 0.6);
    humanoidEntity.add(coreMindGem);

    // Inner Gem Glow
    const gemInnerGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const gemInnerMat = new THREE.MeshBasicMaterial({ color: 0x00ffe0 });
    const gemInner = new THREE.Mesh(gemInnerGeo, gemInnerMat);
    gemInner.position.set(0, 2.2, 0.6);
    humanoidEntity.add(gemInner);

    // 2. DUAL HUMANOID EYE ASSEMBLIES (Centered & Proportionate to Full Screen)
    const leftEye = new THREE.Group();
    leftEye.position.set(-2.0, 1.0, 0.5);
    humanoidEntity.add(leftEye);

    const rightEye = new THREE.Group();
    rightEye.position.set(2.0, 1.0, 0.5);
    humanoidEntity.add(rightEye);

    // Outer Eye Ring
    const eyeRingGeo = new THREE.TorusGeometry(0.65, 0.04, 16, 80);
    const eyeRingMat = new THREE.MeshBasicMaterial({ color: 0x00ffe0, wireframe: true, transparent: true, opacity: 0.95 });

    const leftOuter = new THREE.Mesh(eyeRingGeo, eyeRingMat);
    leftEye.add(leftOuter);
    const rightOuter = new THREE.Mesh(eyeRingGeo, eyeRingMat.clone());
    rightEye.add(rightOuter);

    // Inner Iris Ring
    const irisGeo = new THREE.RingGeometry(0.22, 0.52, 32);
    const irisMat = new THREE.MeshBasicMaterial({ color: 0x7c5cfc, side: THREE.DoubleSide, transparent: true, opacity: 0.85, wireframe: true });

    const leftIris = new THREE.Mesh(irisGeo, irisMat);
    leftEye.add(leftIris);
    const rightIris = new THREE.Mesh(irisGeo, irisMat.clone());
    rightEye.add(rightIris);

    // Glowing Pupil Spheres
    const pupilGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x00ffe0 });

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.z = 0.12;
    leftEye.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat.clone());
    rightPupil.position.z = 0.12;
    rightEye.add(rightPupil);

    // 3. HUMANOID SKULL & FACE CONTOUR (Grand Full-Screen Symmetry)
    const faceContourGeo = new THREE.BufferGeometry();
    const faceVertices = new Float32Array([
      // Forehead Arc
      -2.0, 2.2, 0.5,     0, 2.8, 0.8,
      0, 2.8, 0.8,        2.0, 2.2, 0.5,
      // Temple Contour Lines
      -2.0, 2.2, 0.5,    -3.2, 1.0, 0.0,
      2.0, 2.2, 0.5,     3.2, 1.0, 0.0,
      // Nose Bridge
      0, 2.2, 0.6,       0, 0.2, 0.9,
      0, 0.2, 0.9,       0, -0.8, 0.6,
      // Cheekbone Structural Vectors
      -2.0, 1.0, 0.5,    -3.4, 0.0, 0.0,
      -3.4, 0.0, 0.0,     0, -0.8, 0.6,
      2.0, 1.0, 0.5,     3.4, 0.0, 0.0,
      3.4, 0.0, 0.0,      0, -0.8, 0.6,
      // Jawline Contour
      -3.4, 0.0, 0.0,     0, -2.5, 0.3,
      3.4, 0.0, 0.0,      0, -2.5, 0.3,
      // Neck & Collar Structure
      -1.2, -2.5, 0.2,   -2.2, -3.8, -0.4,
      1.2, -2.5, 0.2,    2.2, -3.8, -0.4,
      0, -2.5, 0.3,       0, -4.0, -0.3
    ]);
    faceContourGeo.setAttribute('position', new THREE.BufferAttribute(faceVertices, 3));
    const faceContourMat = new THREE.LineBasicMaterial({ color: 0x00ffe0, transparent: true, opacity: 0.55 });
    const faceLines = new THREE.LineSegments(faceContourGeo, faceContourMat);
    humanoidEntity.add(faceLines);

    // Glowing Intersection Nodes on Face
    const nodePositions = new Float32Array([
      -2.0, 2.2, 0.5,  0, 2.8, 0.8,  2.0, 2.2, 0.5,
      0, 0.2, 0.9,  -3.4, 0.0, 0.0,  3.4, 0.0, 0.0,
      0, -0.8, 0.6,  0, -2.5, 0.3,  0, 2.2, 0.6
    ]);
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({ color: 0x00ffe0, size: 0.12, transparent: true, opacity: 0.95 });
    const faceNodes = new THREE.Points(nodeGeo, nodeMat);
    humanoidEntity.add(faceNodes);

    // 4. MARVEL-STYLE FLOATING HUD RINGS (Full Screen Orbit)
    const hudRing1Geo = new THREE.TorusGeometry(4.2, 0.02, 16, 120);
    const hudRing1Mat = new THREE.MeshBasicMaterial({ color: 0x00ffe0, transparent: true, opacity: 0.3, wireframe: true });
    const hudRing1 = new THREE.Mesh(hudRing1Geo, hudRing1Mat);
    hudRing1.rotation.x = Math.PI / 2.2;
    humanoidEntity.add(hudRing1);

    const hudRing2Geo = new THREE.TorusGeometry(3.2, 0.015, 16, 100);
    const hudRing2Mat = new THREE.MeshBasicMaterial({ color: 0x7c5cfc, transparent: true, opacity: 0.35, wireframe: true });
    const hudRing2 = new THREE.Mesh(hudRing2Geo, hudRing2Mat);
    hudRing2.rotation.y = Math.PI / 3;
    humanoidEntity.add(hudRing2);

    /* =========================================================
       BACKGROUND PARTICLE FIELD & STAR MAP
       ========================================================= */
    const particleCount = 900;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pOriginals = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 4.8 + (Math.random() - 0.5) * 0.8;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 1.0;

      pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
      pOriginals[i * 3] = x; pOriginals[i * 3 + 1] = y; pOriginals[i * 3 + 2] = z;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00ffe0, size: 0.05, transparent: true, opacity: 0.45 });
    const haloParticles = new THREE.Points(pGeo, pMat);
    scene.add(haloParticles);

    /* BACKGROUND STARFIELD */
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
      starPos[s * 3] = (Math.random() - 0.5) * 180;
      starPos[s * 3 + 1] = (Math.random() - 0.5) * 180;
      starPos[s * 3 + 2] = (Math.random() - 0.5) * 180;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.35 })));

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
      t += 0.012;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // 1. MARVEL HUMANOID EYE TRACKING (FULL VIEWPORT)
      const eyeLookTarget = new THREE.Vector3(mouseX * 8, mouseY * 6, 6);
      leftEye.lookAt(eyeLookTarget);
      rightEye.lookAt(eyeLookTarget);

      // Mind Gem Pulsing
      const gemPulse = 1 + Math.sin(t * 3.5) * 0.15;
      coreMindGem.scale.set(gemPulse, gemPulse, gemPulse);

      // Pupil Dilation
      const pupilScale = 1 + Math.sin(t * 2) * 0.12;
      leftPupil.scale.set(pupilScale, pupilScale, pupilScale);
      rightPupil.scale.set(pupilScale, pupilScale, pupilScale);

      // Humanoid Head Motion
      humanoidEntity.rotation.y = mouseX * 0.35;
      humanoidEntity.rotation.x = -mouseY * 0.2;

      // HUD Ring Rotations
      hudRing1.rotation.z = t * 0.15;
      hudRing2.rotation.x = -t * 0.2;

      // Particle Halo Breathing
      const positions = pGeo.attributes.position.array as Float32Array;
      const pulseFactor = 1 + Math.sin(t * 1.5) * 0.06;
      for (let k = 0; k < particleCount; k++) {
        positions[k * 3] = pOriginals[k * 3] * pulseFactor;
        positions[k * 3 + 1] = pOriginals[k * 3 + 1] * pulseFactor;
        positions[k * 3 + 2] = (pOriginals[k * 3 + 2] + 1.0) * pulseFactor - 1.0;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Camera Parallax
      camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      camera.position.z = 8 - Math.min(scrollY / (window.innerHeight * 0.8), 1) * 2.5;
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

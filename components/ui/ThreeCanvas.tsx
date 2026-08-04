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

    /* DUAL GLOWING TORUS KNOT MESH */
    const tkGeo1 = new THREE.TorusKnotGeometry(1.9, 0.48, 180, 24, 2, 3);
    const tkMat1 = new THREE.MeshBasicMaterial({ color: 0x00ffe0, wireframe: true, transparent: true, opacity: 0.35 });
    const tk1 = new THREE.Mesh(tkGeo1, tkMat1);
    tk1.position.set(3.2, 0, -1);
    scene.add(tk1);

    const tkGeo2 = new THREE.TorusKnotGeometry(1.3, 0.3, 140, 20, 2, 3);
    const tkMat2 = new THREE.MeshBasicMaterial({ color: 0x7c5cfc, wireframe: true, transparent: true, opacity: 0.45 });
    const tk2 = new THREE.Mesh(tkGeo2, tkMat2);
    tk2.position.set(3.2, 0, -1);
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
      const r = 2.6 + (Math.random() - 0.5) * 0.5;

      const x = r * Math.sin(phi) * Math.cos(theta) + 3.2;
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 1.0;

      pPos[i * 3] = x; pPos[i * 3 + 1] = y; pPos[i * 3 + 2] = z;
      pOriginals[i * 3] = x; pOriginals[i * 3 + 1] = y; pOriginals[i * 3 + 2] = z;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00ffe0, size: 0.06, transparent: true, opacity: 0.7 });
    const sphereParticles = new THREE.Points(pGeo, pMat);
    scene.add(sphereParticles);

    /* FLOATING ICOSAHEDRONS */
    const icoData = [
      { r: 0.4, col: 0x00ffe0, pos: [-3.5, 1.8, -2], speed: 0.01 },
      { r: 0.28, col: 0x7c5cfc, pos: [-2.8, -2.0, -3], speed: 0.014 },
      { r: 0.32, col: 0x00ff88, pos: [5.5, -1.5, -4], speed: 0.008 }
    ];
    const icos = icoData.map((d) => {
      const g = new THREE.IcosahedronGeometry(d.r, 1);
      const m = new THREE.MeshBasicMaterial({ color: d.col, wireframe: true, transparent: true, opacity: 0.65 });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(d.pos[0], d.pos[1], d.pos[2]);
      mesh.userData.speed = d.speed;
      scene.add(mesh);
      return mesh;
    });

    /* DYNAMIC LASER CONNECTIONS */
    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(3 * 2 * 3);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffe0, transparent: true, opacity: 0.4 });
    const connLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(connLines);

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
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, transparent: true, opacity: 0.5 }));
    scene.add(stars);

    /* CYBER GRID */
    const grid = new THREE.GridHelper(60, 40, 0x00ffe0, 0x00ffe0);
    grid.position.y = -4;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.08;
    scene.add(grid);

    let mouseX = 0, mouseY = 0, scrollY = 0, targetCamZ = 7;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      targetCamZ = 7 - Math.min(scrollY / (window.innerHeight * 0.8), 1) * 2.5;
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
      t += 0.008;

      tk1.rotation.x = t * 0.4 + mouseY * 0.15;
      tk1.rotation.y = t * 0.6 + mouseX * 0.15;
      tk2.rotation.x = -t * 0.3 + mouseY * 0.1;
      tk2.rotation.y = t * 0.5 + mouseX * 0.1;

      const positions = pGeo.attributes.position.array as Float32Array;
      const pulseFactor = 1 + Math.sin(t * 1.5) * 0.1;
      for (let k = 0; k < particleCount; k++) {
        positions[k * 3] = (pOriginals[k * 3] - 3.2) * pulseFactor + 3.2;
        positions[k * 3 + 1] = pOriginals[k * 3 + 1] * pulseFactor;
        positions[k * 3 + 2] = (pOriginals[k * 3 + 2] + 1.0) * pulseFactor - 1.0;
      }
      pGeo.attributes.position.needsUpdate = true;
      sphereParticles.rotation.y = t * 0.2;

      icos.forEach((ico, idx) => {
        ico.rotation.x += ico.userData.speed;
        ico.rotation.y += ico.userData.speed * 1.3;
        ico.position.y = icoData[idx].pos[1] + Math.sin(t + idx * 2) * 0.3;
      });

      const lPos = connLines.geometry.attributes.position.array as Float32Array;
      lPos[0] = icos[0].position.x; lPos[1] = icos[0].position.y; lPos[2] = icos[0].position.z;
      lPos[3] = tk1.position.x;     lPos[4] = tk1.position.y;     lPos[5] = tk1.position.z;

      lPos[6] = icos[1].position.x; lPos[7] = icos[1].position.y; lPos[8] = icos[1].position.z;
      lPos[9] = tk1.position.x;     lPos[10] = tk1.position.y;    lPos[11] = tk1.position.z;

      lPos[12] = icos[2].position.x; lPos[13] = icos[2].position.y; lPos[14] = icos[2].position.z;
      lPos[15] = tk1.position.x;     lPos[16] = tk1.position.y;    lPos[17] = tk1.position.z;
      connLines.geometry.attributes.position.needsUpdate = true;
      (connLines.material as THREE.LineBasicMaterial).opacity = (Math.sin(t * 0.8) + 1) * 0.3;

      stars.rotation.y = t * 0.01;
      grid.position.z = scrollY * 0.008;

      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 0.4 - camera.position.y) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
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
      className="fixed inset-0 z-0 pointer-events-none opacity-75"
    />
  );
}

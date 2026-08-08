'use client';

import React, { useEffect, useState, useRef } from 'react';
import Script from 'next/script';

export default function Home() {
  const [threeLoaded, setThreeLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const atlasCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!threeLoaded || !(window as any).THREE) return;
    const THREE = (window as any).THREE;

    // 1. Living 3D Underwater Wave Engine Canvas with GLB Model Loader
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Load 3D GLB Model
      let gltfModel: any = null;
      if (THREE.GLTFLoader) {
        const loader = new THREE.GLTFLoader();
        loader.load('public/models/benni-topology.glb', (gltf: any) => {
          gltfModel = gltf.scene;
          gltfModel.scale.set(3, 3, 3);
          scene.add(gltfModel);
        });
      }

      const count = 350;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const originalY = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 50;
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;
        originalY[i] = y;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

      const mat = new THREE.PointsMaterial({ size: 0.22, color: 0x00ffe0, transparent: true, opacity: 0.7 });
      const particles = new THREE.Points(geo, mat);
      scene.add(particles);

      camera.position.z = 18;

      let mouseX = 0, mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      const clock = new THREE.Clock();
      const animate = () => {
        requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
          positions[i * 3 + 1] = originalY[i] + Math.sin(time * 1.5 + positions[i * 3]) * 0.8;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        if (gltfModel) {
          gltfModel.rotation.y = time * 0.5;
          gltfModel.rotation.x = time * 0.2;
        }

        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
    }

    // 2. Interactive 3D Neural Mesh Canvas
    if (atlasCanvasRef.current) {
      const canvas = atlasCanvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const orbGeo = new THREE.IcosahedronGeometry(2, 2);
      const orbMat = new THREE.MeshBasicMaterial({ color: 0x00ffe0, wireframe: true, transparent: true, opacity: 0.7 });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      scene.add(orb);

      const nodes = [
        { pos: [-5, 2.5, 0], color: 0x7c5cfc },
        { pos: [5, 2.5, 0], color: 0x00ff88 },
        { pos: [-5, -2.5, 0], color: 0xffb703 },
        { pos: [5, -2.5, 0], color: 0x00ffe0 }
      ];

      const grp = new THREE.Group();
      nodes.forEach((nd) => {
        const sGeo = new THREE.SphereGeometry(0.7, 16, 16);
        const sMat = new THREE.MeshBasicMaterial({ color: nd.color });
        const m = new THREE.Mesh(sGeo, sMat);
        m.position.set(...(nd.pos as [number, number, number]));
        grp.add(m);

        const lMat = new THREE.LineBasicMaterial({ color: nd.color, transparent: true, opacity: 0.4 });
        const lGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(...(nd.pos as [number, number, number]))]);
        grp.add(new THREE.Line(lGeo, lMat));
      });

      scene.add(grp);
      camera.position.z = 10;

      let isDrag = false, px = 0, py = 0;
      const onMouseDown = (e: MouseEvent) => { isDrag = true; px = e.clientX; py = e.clientY; };
      const onMouseUp = () => { isDrag = false; };
      const onMouseMove2 = (e: MouseEvent) => {
        if (!isDrag) return;
        grp.rotation.y += (e.clientX - px) * 0.01;
        grp.rotation.x += (e.clientY - py) * 0.01;
        orb.rotation.y += (e.clientX - px) * 0.01;
        px = e.clientX; py = e.clientY;
      };

      canvas.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove2);

      const animate2 = () => {
        requestAnimationFrame(animate2);
        orb.rotation.y += 0.005;
        grp.rotation.y += 0.002;
        renderer.render(scene, camera);
      };
      animate2();
    }
  }, [threeLoaded]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        onLoad={() => setThreeLoaded(true)}
      />
      <Script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js" />

      <main className="bg-[#05070c] text-[#f8fafc] antialiased selection:bg-[#00ffe0]/30 selection:text-white min-h-screen relative overflow-x-hidden font-sans">
        {/* NOISE OVERLAY */}
        <div
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[998] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* THREE.JS LIVING UNDERWATER ENGINE CANVAS */}
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-65" aria-hidden="true" />

        {/* TOP HEADER NAVIGATION */}
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#05070c]/85 backdrop-blur-2xl border-b border-white/10" aria-label="Main Navigation">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#surface" className="flex items-center gap-2 group" aria-label="Benni OS homepage">
              <span className="text-white font-black text-xl tracking-tighter font-mono">BENNI</span>
              <span className="text-[#00ffe0] font-black text-xl tracking-tighter font-mono group-hover:animate-pulse">.OS</span>
              <span className="ml-2 font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/30 font-bold">
                SOVEREIGN ENGINE v2.4
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-[#94a3b8]" aria-label="Page Sections">
              <a href="#surface" className="hover:text-[#00ffe0] transition-colors">/surface</a>
              <a href="#pipeline" className="hover:text-[#00ffe0] transition-colors">/protocol</a>
              <a href="#atlas" className="hover:text-[#00ffe0] transition-colors">/registry</a>
              <a href="#bento" className="hover:text-[#00ffe0] transition-colors">/architecture</a>
              <a href="dashboard.html" className="text-[#00ffe0] font-bold hover:underline">/dashboard</a>
            </nav>

            <div className="flex items-center gap-4">
              <a href="dashboard.html" className="px-4 py-1.5 rounded-lg bg-[#00ffe0] text-black font-bold font-mono text-xs hover:bg-[#00ccb4] transition-all shadow-[0_0_25px_rgba(0,255,224,0.5)]" aria-label="Launch Live Console Dashboard">
                Launch Console →
              </a>
            </div>
          </div>
        </header>

        {/* 1. HERO SECTION */}
        <section id="surface" className="relative w-full min-h-screen pt-28 pb-16 flex flex-col justify-center items-center border-b border-white/10 z-10" aria-label="Product Surface Hero">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <div className="max-w-4xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00ffe0]/40 bg-[#00ffe0]/10 backdrop-blur-xl mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00ffe0] animate-pulse shadow-[0_0_10px_#00ffe0]" aria-hidden="true" />
                <span className="font-mono text-xs text-[#00ffe0] uppercase tracking-widest font-semibold">SOVEREIGN AGENT OPERATING SYSTEM</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                The operating layer for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffe0] via-[#7c5cfc] to-[#00ff88]">autonomous work.</span>
              </h1>
              <p className="mt-6 text-[#94a3b8] font-mono text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Coordinate autonomous agents, persistent memory, tool protocols, and security policy within a unified, observable enterprise system.
              </p>

              <div className="mt-8 flex justify-center items-center gap-4">
                <a href="dashboard.html" className="px-8 py-3.5 rounded-xl bg-[#00ffe0] text-black font-bold text-sm font-mono shadow-[0_0_30px_rgba(0,255,224,0.5)] hover:bg-[#00ccb4] transition-all" aria-label="Launch Live Console Dashboard">
                  Launch Live Console →
                </a>
                <a href="#pipeline" className="px-8 py-3.5 rounded-xl bg-[#0a0e17] text-white font-bold text-sm font-mono border border-white/20 hover:border-[#00ffe0] transition-all" aria-label="Explore Protocol">
                  Explore Protocol ↓
                </a>
              </div>
            </div>

            {/* MAIN CONSOLE VIDEO */}
            <div className="w-full max-w-5xl mx-auto bg-[#111724]/85 border border-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-[0_0_80px_rgba(0,255,224,0.25)] relative overflow-hidden text-left" aria-label="Operational Console">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 font-mono text-xs text-[#94a3b8]">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#00ffe0] animate-pulse" />
                  <span className="font-bold text-white">BENNI OS // OPERATIONAL TOPOLOGY & CONSTELLATION CONSOLE</span>
                </div>
                <div className="text-[11px] text-[#00ffe0] font-mono font-bold">● H.264 / VP9 CANONICAL STREAM</div>
              </div>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 pointer-events-none">
                <video autoPlay muted loop playsInline poster="public/posters/hero-poster.jpg" preload="auto" aria-label="Benni OS Product Film">
                  <source src="public/motion/hero/hero-product-film.mp4" type="video/mp4" />
                  <source src="public/motion/hero/hero-product-film.webm" type="video/webm" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PRODUCT EXECUTION PIPELINE */}
        <section id="pipeline" className="py-24 bg-[#0a0e17] border-b border-white/10 z-10 relative" aria-label="Product Execution Pipeline">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c5cfc]/10 text-[#7c5cfc] border border-[#7c5cfc]/30 font-mono text-xs font-bold mb-4">
                SYSTEM EXECUTION PIPELINE // DETERMINISTIC PROTOCOL
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Intent → Plan → Agents → <span className="text-[#00ffe0]">Execution → Evidence</span>
              </h2>
              <p className="mt-4 text-[#94a3b8] font-mono text-sm max-w-2xl mx-auto">
                Every execution phase is backed by cryptographic verification and deterministic run ledgers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 p-5">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black border border-white/10 pointer-events-none">
                  <video autoPlay muted loop playsInline poster="public/posters/ecosystem-poster.jpg" preload="auto" aria-label="Intent Ingestion Film">
                    <source src="public/motion/sequences/ecosystem-activation.mp4" type="video/mp4" />
                    <source src="public/motion/sequences/ecosystem-activation.webm" type="video/webm" />
                  </video>
                </div>
                <div className="font-mono text-xs text-[#00ffe0] font-bold mb-1">PHASE 01 // INTENT INGESTION</div>
                <h3 className="text-lg font-bold text-white">Goal Payload Normalization</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 leading-relaxed">Operator intent is ingested, sanitized, and bound to SHA-256 cryptographic signatures in <code className="text-[#00ffe0]">benni-control-plane</code>.</p>
              </article>

              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 p-5">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black border border-white/10 pointer-events-none">
                  <video autoPlay muted loop playsInline poster="public/posters/topology-poster.jpg" preload="auto" aria-label="Topology Film">
                    <source src="public/motion/sequences/3d-flythrough-topology.mp4" type="video/mp4" />
                    <source src="public/motion/sequences/3d-flythrough-topology.webm" type="video/webm" />
                  </video>
                </div>
                <div className="font-mono text-xs text-[#7c5cfc] font-bold mb-1">PHASE 02 // DETERMINISTIC TOPOLOGY</div>
                <h3 className="text-lg font-bold text-white">Multi-Step Plan & Checkpoint Lock</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 leading-relaxed">Deterministic multi-step execution plans with atomic checkpoints to prevent scope drift.</p>
              </article>

              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 p-5">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black border border-white/10 pointer-events-none">
                  <video autoPlay muted loop playsInline poster="public/posters/pipeline-poster.jpg" preload="auto" aria-label="Scheduler Film">
                    <source src="public/motion/sequences/operation-pipeline.mp4" type="video/mp4" />
                    <source src="public/motion/sequences/operation-pipeline.webm" type="video/webm" />
                  </video>
                </div>
                <div className="font-mono text-xs text-[#00ff88] font-bold mb-1">PHASE 03 // DISPATCH SCHEDULER</div>
                <h3 className="text-lg font-bold text-white">Task DAG & Run Ledger Lock</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 leading-relaxed">Task DAG dispatching with isolated background execution queues and persistent state tracking.</p>
              </article>

              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 p-5">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black border border-white/10 pointer-events-none">
                  <video autoPlay muted loop playsInline poster="public/posters/agent-mesh-poster.jpg" preload="auto" aria-label="Swarm Mesh Film">
                    <source src="public/motion/sequences/agent-mesh-activation.mp4" type="video/mp4" />
                    <source src="public/motion/sequences/agent-mesh-activation.webm" type="video/webm" />
                  </video>
                </div>
                <div className="font-mono text-xs text-[#ffb703] font-bold mb-1">PHASE 04 // AGENT SWARM MESH</div>
                <h3 className="text-lg font-bold text-white">JARVAS-2 Multi-Agent Tool Dispatch</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 leading-relaxed">Multi-threaded agents invoking native tools over Model Context Protocol with policy control.</p>
              </article>

              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 p-5 md:col-span-2 lg:col-span-2">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black border border-white/10 pointer-events-none">
                  <video autoPlay muted loop playsInline poster="public/posters/evidence-poster.jpg" preload="auto" aria-label="Evidence Settlement Film">
                    <source src="public/motion/sequences/evidence-settlement.mp4" type="video/mp4" />
                    <source src="public/motion/sequences/evidence-settlement.webm" type="video/webm" />
                  </video>
                </div>
                <div className="font-mono text-xs text-[#00ffe0] font-bold mb-1">PHASE 05 // EVIDENCE SETTLEMENT</div>
                <h3 className="text-lg font-bold text-white">NEMESIS Policy Verification & Cryptographic Settlement</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 leading-relaxed">Single-use approval tokens in <code className="text-[#00ffe0]">benni-nemesis</code> returning verified Git commit evidence and MONOMO telemetry records.</p>
              </article>
            </div>
          </div>
        </section>

        {/* 3. ECOSYSTEM ATLAS */}
        <section id="atlas" className="py-24 bg-[#05070c] border-b border-white/10 z-10 relative" aria-label="Ecosystem Atlas">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/30 font-mono text-xs font-bold mb-4">
                ECOSYSTEM CONSTELLATION // MULTI-AGENT MODULE REGISTRY
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Sovereign Architecture <span className="text-[#00ffe0]">Registry</span>
              </h2>
              <p className="mt-4 text-[#94a3b8] font-mono text-sm max-w-2xl mx-auto">
                Audited core modules and open-source infrastructure driving the Benni OS agent network.
              </p>
            </div>

            {/* 3D NEURAL MESH CANVAS */}
            <div className="w-full max-w-4xl mx-auto h-72 rounded-2xl bg-[#111724]/85 border border-[#00ffe0]/30 mb-12 relative overflow-hidden flex items-center justify-center">
              <canvas ref={atlasCanvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#00ffe0] bg-[#0a0e17]/80 px-3 py-1 rounded border border-[#00ffe0]/30">
                INTERACTIVE 3D NEURAL MESH // TOPOLOGY MATRIX
              </div>
            </div>

            {/* REPOSITORIES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* 1. benni-operator-gateway */}
              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-open-source-constellation-review-01.jpeg" alt="benni-operator-gateway preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 font-bold backdrop-blur">● Open Source (MIT)</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">benni-operator-gateway</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Open source MCP operator gateway for autonomous agent communication and tool execution.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">MIT</strong></span>
                  <a href="https://github.com/benni-os/benni-operator-gateway" target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] font-bold hover:underline">GitHub Repository →</a>
                </div>
              </article>

              {/* 2. modo-operador */}
              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-command-plane-review-01.jpeg" alt="modo-operador preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 font-bold backdrop-blur">● Open Source (MIT)</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">modo-operador</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">AI Operator Mode execution framework and command protocol.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">MIT</strong></span>
                  <a href="https://github.com/benni-os/modo-operador" target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] font-bold hover:underline">GitHub Repository →</a>
                </div>
              </article>

              {/* 3. benni-inference-engine */}
              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-ecosystem-technology-review-01.jpeg" alt="benni-inference-engine preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 font-bold backdrop-blur">● Open Source (MIT)</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">benni-inference-engine</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Hybrid GPU/CPU inference engine optimized for zero-cloud local hardware.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">MIT</strong></span>
                  <a href="https://github.com/benni-os/benni-inference-engine" target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] font-bold hover:underline">GitHub Repository →</a>
                </div>
              </article>

              {/* 4. benni-nexus */}
              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-ecosystem-product-review-01.jpeg" alt="benni-nexus preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 font-bold backdrop-blur">● Open Source (MIT)</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">benni-nexus</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Model gateway and intelligent query router across local and remote inference targets.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">MIT</strong></span>
                  <a href="https://github.com/benni-os/benni-nexus" target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] font-bold hover:underline">GitHub Repository →</a>
                </div>
              </article>

              {/* 5. mcp-forge */}
              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-ecosystem-atlas-review-01.jpeg" alt="mcp-forge preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 font-bold backdrop-blur">● Open Source (MIT)</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">mcp-forge</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Developer framework for scaffolding, testing, and deploying Model Context Protocol servers.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">MIT</strong></span>
                  <a href="https://github.com/benni-os/mcp-forge" target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] font-bold hover:underline">GitHub Repository →</a>
                </div>
              </article>

              {/* 6. mcp-forge-playbook-landing-page */}
              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-ecosystem-product-review-02.jpeg" alt="mcp-forge-playbook preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#00ffe0]/20 text-[#00ffe0] border border-[#00ffe0]/40 font-bold backdrop-blur">Public Site</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">mcp-forge-playbook-landing-page</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Landing page for the MCP Forge playbook.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">Public Site</strong></span>
                  <a href="https://github.com/benni-os/mcp-forge-playbook-landing-page" target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] font-bold hover:underline">GitHub Repository →</a>
                </div>
              </article>

              {/* CONFIDENTIAL PRIVATE CORE REPOSITORIES */}
              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-evidence-layer-review-01.jpeg" alt="benni-nemesis preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40 font-bold backdrop-blur">🔒 Sealed Core</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">nsfwbunny</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">benni-nemesis</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">NEMESIS Security Gateway enforcing HMAC payload signatures and approval tokens.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">Proprietary</strong></span>
                  <span className="text-[#64748b] font-mono text-[11px] font-semibold flex items-center gap-1">🔒 Enterprise Core Infrastructure</span>
                </div>
              </article>

              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-sovereign-autonomous-review-01.jpeg" alt="benni-os-genesis preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40 font-bold backdrop-blur">🔒 Sealed Core</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">nsfwbunny</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">benni-os-genesis</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">LLM-native operating environment and agent IDE for sovereign execution.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">Proprietary</strong></span>
                  <span className="text-[#64748b] font-mono text-[11px] font-semibold flex items-center gap-1">🔒 Enterprise Core Infrastructure</span>
                </div>
              </article>

              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-memory-fabric-review-02.jpeg" alt="Benni-Master-OS preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40 font-bold backdrop-blur">🔒 Sealed Core</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Benni-Master-OS</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Central master skills repository, MCP connector mappings, and swarm priority stack.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">Proprietary</strong></span>
                  <span className="text-[#64748b] font-mono text-[11px] font-semibold flex items-center gap-1">🔒 Enterprise Core Infrastructure</span>
                </div>
              </article>

              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-evidence-layer-review-02.jpeg" alt="benni-control-plane preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40 font-bold backdrop-blur">🔒 Sealed Core</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">benni-control-plane</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Immutable decision ledger, state engine, and cross-session memory persistence.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">Proprietary</strong></span>
                  <span className="text-[#64748b] font-mono text-[11px] font-semibold flex items-center gap-1">🔒 Enterprise Core Infrastructure</span>
                </div>
              </article>

              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-agent-mesh-review-01.jpeg" alt="jarvas-2 preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40 font-bold backdrop-blur">🔒 Sealed Core</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">jarvas-2</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Autonomous code execution engine and multi-threaded process dispatcher.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">Proprietary</strong></span>
                  <span className="text-[#64748b] font-mono text-[11px] font-semibold flex items-center gap-1">🔒 Enterprise Core Infrastructure</span>
                </div>
              </article>

              <article className="rounded-2xl bg-[#111724]/85 border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-[#0a0e17]">
                    <img src="material/_review/benni-agent-mesh-review-02.jpeg" alt="Benni-gravity-0 preview" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40 font-bold backdrop-blur">🔒 Sealed Core</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">benni-os</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Benni-gravity-0</h3>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Revenue automation, browser task runner, and autonomous agent swarm engine.</p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">Proprietary</strong></span>
                  <span className="text-[#64748b] font-mono text-[11px] font-semibold flex items-center gap-1">🔒 Enterprise Core Infrastructure</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 bg-[#05070c] border-t border-white/10 font-mono text-xs text-[#64748b] z-10 relative" aria-label="Site Footer">
          <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2026 BENNI OS — Sovereign Autonomous Agent Swarm Infrastructure.</div>
            <div className="flex gap-6">
              <a href="dashboard.html" className="hover:text-[#00ffe0]">Live Dashboard Console</a>
              <a href="https://github.com/benni-os" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffe0]">GitHub Organization</a>
              <a href="https://github.com/benni-os/benni-operator-gateway" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffe0]">Operator Gateway</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

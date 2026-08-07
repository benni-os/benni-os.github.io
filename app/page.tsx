'use client';

import React, { useEffect, useState, useRef } from 'react';
import Script from 'next/script';

interface Project {
  id: string;
  name: string;
  owner: string;
  category: string;
  layer: string;
  status: string;
  visibility: string;
  license: string;
  language: string;
  is_open_source: boolean;
  is_public: boolean;
  repository: string | null;
  description: string;
  relations: string[];
}

export default function Home() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [threeLoaded, setThreeLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    fetch('./data/ecosystem-projects.json')
      .then((res) => res.json())
      .then((data) => {
        const list = data.projects || [];
        setAllProjects(list);
        setFilteredProjects(list);
      })
      .catch(() => {});
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProjects(allProjects);
    } else if (filter === 'opensource') {
      setFilteredProjects(allProjects.filter((p) => p.is_open_source));
    } else if (filter === 'public') {
      setFilteredProjects(allProjects.filter((p) => p.is_public));
    } else if (filter === 'private') {
      setFilteredProjects(allProjects.filter((p) => p.visibility === 'Private'));
    } else {
      setFilteredProjects(
        allProjects.filter(
          (p) =>
            p.category?.toLowerCase() === filter ||
            p.status?.toLowerCase() === filter ||
            p.visibility?.toLowerCase() === filter
        )
      );
    }
  };

  useEffect(() => {
    if (!threeLoaded || !canvasRef.current || !(window as any).THREE) return;

    const THREE = (window as any).THREE;
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const count = 180;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({ size: 0.15, color: 0x00ffe0, transparent: true, opacity: 0.5 });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    camera.position.z = 15;

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      pts.rotation.y += 0.001;
      pts.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
    };
  }, [threeLoaded]);

  return (
    <>
      {/* Load Three.js dynamically for 3D canvas background */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        onLoad={() => setThreeLoaded(true)}
      />

      <main className="bg-[#05070c] text-[#f8fafc] antialiased selection:bg-[#00ffe0]/30 selection:text-white min-h-screen relative overflow-x-hidden font-sans">
        {/* ZAJNO GRAIN NOISE OVERLAY */}
        <div
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999] opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* 3D PARTICLES CANVAS */}
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-45" aria-hidden="true" />

        {/* TOP HEADER NAVIGATION */}
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#05070c]/85 backdrop-blur-2xl border-b border-white/10" aria-label="Main Navigation">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-2 group" aria-label="Benni OS homepage">
              <span className="text-white font-black text-xl tracking-tighter">BENNI</span>
              <span className="text-[#00ffe0] font-black text-xl tracking-tighter group-hover:animate-pulse">.OS</span>
              <span className="ml-2 font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/30 font-bold">
                17 Repositories
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-[#94a3b8]" aria-label="Page Sections">
              <a href="#hero-surface" className="hover:text-[#00ffe0] transition-colors">/surface</a>
              <a href="#ecosystem-atlas" className="hover:text-[#00ffe0] transition-colors">/atlas</a>
              <a href="#operation-protocol" className="hover:text-[#00ffe0] transition-colors">/protocol</a>
              <a href="#open-source" className="hover:text-[#00ffe0] transition-colors">/code</a>
              <a href="#bento-architecture" className="hover:text-[#00ffe0] transition-colors">/bento</a>
              <a href="#governance" className="hover:text-[#00ffe0] transition-colors">/trust</a>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0e17] border border-[#00ff88]/40 backdrop-blur">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_10px_#00ff88]" aria-hidden="true" />
                <span className="text-[11px] font-mono text-white uppercase tracking-wider font-semibold">17 Repos (6 Public / 11 Private)</span>
              </div>
              <a href="https://t.me/bennios" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded-lg bg-[#00ffe0] text-black font-bold font-mono text-xs hover:bg-[#00ccb4] transition-all shadow-[0_0_25px_rgba(0,255,224,0.5)]" aria-label="Join Telegram Swarm Community">
                Join Swarm →
              </a>
            </div>
          </div>
        </header>

        {/* 1. HERO SECTION WITH OPERATIONAL PRODUCT SURFACE DEMONSTRATION */}
        <section id="hero-surface" className="relative w-full min-h-screen pt-28 pb-16 flex flex-col justify-center items-center border-b border-white/10 z-10" aria-label="Product Surface Hero">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <div className="max-w-4xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00ffe0]/40 bg-[#00ffe0]/10 backdrop-blur-xl mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00ffe0] animate-pulse shadow-[0_0_10px_#00ffe0]" aria-hidden="true" />
                <span className="font-mono text-xs text-[#00ffe0] uppercase tracking-widest font-semibold">Autonomous Work Infrastructure</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                The operating system for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffe0] via-[#7c5cfc] to-[#00ff88]">autonomous work.</span>
              </h1>
              <p className="mt-6 text-[#94a3b8] font-mono text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Coordinate agents, memory, tools and policy in one observable operating layer.
              </p>

              <div className="mt-8 flex justify-center items-center gap-4">
                <a href="#ecosystem-atlas" className="px-8 py-3.5 rounded-xl bg-[#00ffe0] text-black font-bold text-sm font-mono shadow-[0_0_30px_rgba(0,255,224,0.5)] hover:bg-[#00ccb4] transition-all" aria-label="Explore the Ecosystem Atlas">
                  Explore the ecosystem →
                </a>
              </div>
            </div>

            {/* OPERATIONAL PRODUCT SURFACE CONSOLE */}
            <div className="w-full max-w-5xl mx-auto bg-[#111724]/85 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_60px_rgba(0,255,224,0.15)] relative overflow-hidden text-left" aria-label="Operational Execution Flow Console">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs text-[#94a3b8]">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#00ffe0] animate-pulse" />
                  <span className="font-bold text-white">OPERATIONAL PRODUCT SURFACE // LIVE SWARM DISPATCH FLOW</span>
                </div>
                <div className="text-[11px] text-[#00ffe0] font-mono">STATUS: OPERATIONAL (HMAC VERIFIED)</div>
              </div>

              {/* Interactive Operational Flow Map */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-mono text-xs mb-6">
                <div className="p-4 rounded-xl bg-[#0a0e17] border border-[#00ffe0]/30 relative">
                  <div className="text-[#00ffe0] font-bold text-[10px] uppercase mb-1">01 // INTENT</div>
                  <div className="font-semibold text-white">Intent Received</div>
                  <div className="text-[#64748b] text-[10px] mt-1">SHA-256 Hash Computed</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0a0e17] border border-[#7c5cfc]/30 relative">
                  <div className="text-[#7c5cfc] font-bold text-[10px] uppercase mb-1">02 // CONTROL</div>
                  <div className="font-semibold text-white">Control Plane</div>
                  <div className="text-[#64748b] text-[10px] mt-1">Run Ledger Locked</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0a0e17] border border-[#00ff88]/30 relative">
                  <div className="text-[#00ff88] font-bold text-[10px] uppercase mb-1">03 // SWARM</div>
                  <div className="font-semibold text-white">Agent Mesh</div>
                  <div className="text-[#64748b] text-[10px] mt-1">JARVAS-2 Dispatch</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0a0e17] border border-[#ffb703]/30 relative">
                  <div className="text-[#ffb703] font-bold text-[10px] uppercase mb-1">04 // SECURITY</div>
                  <div className="font-semibold text-white">Policy Gate</div>
                  <div className="text-[#64748b] text-[10px] mt-1">NEMESIS Signature Check</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0a0e17] border border-[#00ffe0]/30 relative">
                  <div className="text-[#00ffe0] font-bold text-[10px] uppercase mb-1">05 // PROOF</div>
                  <div className="font-semibold text-white">Evidence Returned</div>
                  <div className="text-[#64748b] text-[10px] mt-1">Immutable Git Commit</div>
                </div>
              </div>

              {/* Hero Motion Video Film Embed */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#05070c] border border-white/10">
                <video className="w-full h-full object-cover" autoPlay muted loop playsInline preload="auto" poster="./posters/benni-ecosystem-hero-poster.webp" aria-label="Product Surface Execution Film">
                  <source src="./motion/hero/benni-ecosystem-hero-desktop.webm" type="video/webm" />
                  <source src="./motion/hero/benni-ecosystem-hero-desktop.mp4" type="video/mp4" />
                  <img src="./posters/benni-ecosystem-hero-poster.webp" alt="Poster Fallback" className="w-full h-full object-cover" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ECOSYSTEM ATLAS (17 REPOSITORIES NAVIGABLE MAP) */}
        <section id="ecosystem-atlas" className="py-24 bg-[#0a0e17] border-b border-white/10 z-10 relative" aria-label="Navigable Ecosystem Atlas">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/30 font-mono text-xs font-bold mb-4">
                ECOSYSTEM ATLAS // 17 REPOSITORIES
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Constellation <span className="text-[#00ffe0]">Ecosystem Atlas</span>
              </h2>
              <p className="mt-4 text-[#94a3b8] font-mono text-sm max-w-3xl mx-auto">
                Catalog of <strong>17 repositories</strong> across <code className="text-[#00ffe0]">benni-os</code> and <code className="text-[#7c5cfc]">nsfwbunny</code> (6 Public / 11 Private). Open Source badge is assigned <strong>strictly when MIT license is confirmed</strong>.
              </p>

              {/* Filter Buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-2 font-mono text-xs">
                {[
                  { id: 'all', label: 'All (17)' },
                  { id: 'core', label: 'Core' },
                  { id: 'opensource', label: 'Open Source (5)' },
                  { id: 'public', label: 'Public (6)' },
                  { id: 'private', label: '🔒 Private (11)' },
                  { id: 'infrastructure', label: 'Infrastructure' },
                  { id: 'agents', label: 'Agents' },
                  { id: 'devtools', label: 'Developer Tools' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg border transition-all ${
                      activeFilter === tab.id
                        ? 'bg-[#00ffe0] text-black font-bold border-[#00ffe0]'
                        : 'bg-[#111724] border-white/10 text-[#94a3b8] hover:border-[#00ffe0]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <article key={proj.id} className="rounded-2xl bg-[#111724]/85 border border-white/10 hover:border-[#00ffe0]/40 transition-all p-6 flex flex-col justify-between" aria-label={`${proj.name} Project Card`}>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] uppercase text-[#64748b] bg-[#0a0e17] px-2 py-0.5 rounded border border-white/10">{proj.owner}</span>
                      {proj.visibility === 'Private' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40 font-bold font-mono text-[10px]">🔒 Private</span>
                      ) : proj.is_open_source ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 font-bold font-mono text-[10px]">● Open Source (MIT)</span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00ffe0]/20 text-[#00ffe0] border border-[#00ffe0]/40 font-bold font-mono text-[10px]">Public</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{proj.name}</h3>
                    <div className="flex items-center gap-3 font-mono text-[10px] text-[#64748b] mb-3">
                      <span>Category: <strong className="text-[#94a3b8]">{proj.category}</strong></span>
                      <span>Lang: <strong className="text-[#94a3b8]">{proj.language}</strong></span>
                    </div>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">{proj.description}</p>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                    <span className="text-[#64748b]">License: <strong className="text-[#94a3b8]">{proj.license}</strong></span>
                    {proj.is_public && proj.repository ? (
                      <a href={proj.repository} target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] font-bold hover:underline">
                        GitHub Repository →
                      </a>
                    ) : (
                      <span className="text-[#64748b] font-mono text-[11px] font-semibold flex items-center gap-1">🔒 Private Codebase</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. OPERATION PROTOCOL */}
        <section id="operation-protocol" className="py-24 bg-[#05070c] border-b border-white/10 z-10 relative" aria-label="Operation Protocol">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/30 font-mono text-xs font-bold mb-4">
                EXECUTION PIPELINE
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                How Benni OS <span className="text-[#00ffe0]">Operates</span>
              </h2>
              <p className="mt-4 text-[#94a3b8] font-mono text-sm max-w-xl mx-auto">
                Deterministic 5-phase execution protocol enforcing scope boundaries and byte-integrity auditability.
              </p>
            </div>

            <div className="space-y-16 border-l-2 border-[#00ffe0]/30 pl-8 ml-4 md:ml-12">
              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#00ffe0] border-4 border-[#05070c] shadow-[0_0_15px_#00ffe0]" />
                <div className="font-mono text-xs text-[#00ffe0] font-bold uppercase tracking-widest mb-1">PHASE 01 // INTENT</div>
                <h3 className="text-2xl font-bold text-white">Operator Intent Parsing</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 max-w-2xl leading-relaxed">
                  Goal payload normalization and SHA-256 byte-level hash computation.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#7c5cfc] border-4 border-[#05070c] shadow-[0_0_15px_#7c5cfc]" />
                <div className="font-mono text-xs text-[#7c5cfc] font-bold uppercase tracking-widest mb-1">PHASE 02 // PLAN</div>
                <h3 className="text-2xl font-bold text-white">Run Ledger & Checkpoint Lock</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 max-w-2xl leading-relaxed">
                  Multi-step execution plan locked with atomic checkpoints to prevent scope drift.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#00ff88] border-4 border-[#05070c] shadow-[0_0_15px_#00ff88]" />
                <div className="font-mono text-xs text-[#00ff88] font-bold uppercase tracking-widest mb-1">PHASE 03 // AGENTS</div>
                <h3 className="text-2xl font-bold text-white">JARVAS-2 Swarm Mesh Dispatch</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 max-w-2xl leading-relaxed">
                  Parallel background subagent execution across isolated code threads.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#ffb703] border-4 border-[#05070c] shadow-[0_0_15px_#ffb703]" />
                <div className="font-mono text-xs text-[#ffb703] font-bold uppercase tracking-widest mb-1">PHASE 04 // SECURITY</div>
                <h3 className="text-2xl font-bold text-white">NEMESIS Policy Gate Check</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 max-w-2xl leading-relaxed">
                  HMAC signature verification and single-use approval token consumption.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#00ffe0] border-4 border-[#05070c] shadow-[0_0_15px_#00ffe0]" />
                <div className="font-mono text-xs text-[#00ffe0] font-bold uppercase tracking-widest mb-1">PHASE 05 // EVIDENCE</div>
                <h3 className="text-2xl font-bold text-white">Evidence Return & Settlement</h3>
                <p className="text-[#94a3b8] font-mono text-xs mt-2 max-w-2xl leading-relaxed">
                  Results committed immutably to Git with MONOMO event financial reconciliation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OPEN SOURCE & REPOSITORY PROOF */}
        <section id="open-source" className="py-24 bg-[#0a0e17] border-b border-white/10 z-10 relative" aria-label="Open Source Proof">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-mono text-xs font-bold mb-4">
              CONFIRMED MIT OPEN SOURCE
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Confirmed MIT Open Source Modules
            </h2>
            <p className="text-[#94a3b8] font-mono text-sm max-w-xl mx-auto mb-12">
              Repositories with verified MIT open-source licenses available for inspection.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <a href="https://github.com/benni-os/benni-operator-gateway" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl bg-[#111724]/85 border border-white/10 hover:border-[#00ff88] transition-all">
                <div className="font-mono text-xs text-[#00ff88] font-bold uppercase mb-2">MIT License // Gateway</div>
                <h3 className="text-lg font-bold text-white mb-2">benni-operator-gateway</h3>
                <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Open source MCP operator gateway for autonomous agent communication.</p>
                <span className="text-[#00ff88] font-mono text-xs font-bold">Inspect Source Code →</span>
              </a>

              <a href="https://github.com/benni-os/modo-operador" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl bg-[#111724]/85 border border-white/10 hover:border-[#00ff88] transition-all">
                <div className="font-mono text-xs text-[#00ff88] font-bold uppercase mb-2">MIT License // System</div>
                <h3 className="text-lg font-bold text-white mb-2">modo-operador</h3>
                <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">AI Operator Mode execution framework and command protocol.</p>
                <span className="text-[#00ff88] font-mono text-xs font-bold">Inspect Source Code →</span>
              </a>

              <a href="https://github.com/benni-os/benni-inference-engine" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl bg-[#111724]/85 border border-white/10 hover:border-[#00ff88] transition-all">
                <div className="font-mono text-xs text-[#00ff88] font-bold uppercase mb-2">MIT License // Hardware</div>
                <h3 className="text-lg font-bold text-white mb-2">benni-inference-engine</h3>
                <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">Hybrid GPU/CPU local inference engine for zero-cloud hardware.</p>
                <span className="text-[#00ff88] font-mono text-xs font-bold">Inspect Source Code →</span>
              </a>
            </div>
          </div>
        </section>

        {/* 5. BENTO ARCHITECTURE MODULES */}
        <section id="bento-architecture" className="py-24 bg-[#05070c] border-b border-white/10 z-10 relative" aria-label="Bento Architecture">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-14 text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Core <span className="text-[#7c5cfc]">Architecture Layers</span>
              </h2>
              <p className="mt-4 text-[#94a3b8] font-mono text-sm max-w-xl mx-auto">
                Five core operational layers structuring sovereign intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 p-8 rounded-2xl bg-[#111724]/85 border border-white/10 hover:border-[#00ffe0]/60 transition-all">
                <div className="font-mono text-xs text-[#00ffe0] uppercase tracking-widest font-bold mb-2">Layer 01 // Intelligence</div>
                <h3 className="text-2xl font-bold text-white mb-3">Multi-Model Swarm Intelligence</h3>
                <p className="text-[#94a3b8] font-mono text-xs leading-relaxed">Context compression, persistent vector KV, and cross-environment snapshot restore protocols.</p>
              </div>

              <div className="md:col-span-5 p-8 rounded-2xl bg-[#111724]/85 border border-white/10 hover:border-[#7c5cfc]/60 transition-all">
                <div className="font-mono text-xs text-[#7c5cfc] uppercase tracking-widest font-bold mb-2">Layer 02 // Control</div>
                <h3 className="text-2xl font-bold text-white mb-3">Sovereign Control Plane</h3>
                <p className="text-[#94a3b8] font-mono text-xs leading-relaxed">Immutable decision log, policy gate enforcement, and single-use token verification.</p>
              </div>

              <div className="md:col-span-4 p-8 rounded-2xl bg-[#111724]/85 border border-white/10 hover:border-[#00ff88]/60 transition-all">
                <div className="font-mono text-xs text-[#00ff88] uppercase tracking-widest font-bold mb-2">Layer 03 // Execution</div>
                <h3 className="text-xl font-bold text-white mb-3">JARVAS-2 Dispatch</h3>
                <p className="text-[#94a3b8] font-mono text-xs leading-relaxed">Multi-threaded background processes executing discrete code tasks.</p>
              </div>

              <div className="md:col-span-4 p-8 rounded-2xl bg-[#111724]/85 border border-white/10 hover:border-[#ffb703]/60 transition-all">
                <div className="font-mono text-xs text-[#ffb703] uppercase tracking-widest font-bold mb-2">Layer 04 // Dev Infra</div>
                <h3 className="text-xl font-bold text-white mb-3">MCP Security Gateway</h3>
                <p className="text-[#94a3b8] font-mono text-xs leading-relaxed">Exposes native tools over streamable SSE and HTTPS with zero secret leaks.</p>
              </div>

              <div className="md:col-span-4 p-8 rounded-2xl bg-[#111724]/85 border border-white/10 hover:border-[#00ffe0]/60 transition-all">
                <div className="font-mono text-xs text-[#00ffe0] uppercase tracking-widest font-bold mb-2">Layer 05 // Community</div>
                <h3 className="text-xl font-bold text-white mb-3">Operator Network</h3>
                <p className="text-[#94a3b8] font-mono text-xs leading-relaxed">Sovereign open-source ecosystem built by operators for operators.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. GOVERNANCE & TRUST */}
        <section id="governance" className="py-24 bg-[#0a0e17] border-b border-white/10 z-10 relative" aria-label="Trust and Governance">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
              Built for Full Auditability and Human Control
            </h2>
            <p className="text-[#94a3b8] font-mono text-sm max-w-2xl mx-auto leading-relaxed mb-12">
              Benni OS never executes destructive mutations silently. Every critical action requires explicit, payload-bound approval with HMAC signature verification.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-xl bg-[#111724]/85 border border-white/10">
                <h4 className="font-bold text-white text-base mb-2">Byte-Integrity Hashes</h4>
                <p className="text-[#94a3b8] font-mono text-xs">SHA-256 computed on normalized canonical payloads before human review.</p>
              </div>

              <div className="p-6 rounded-xl bg-[#111724]/85 border border-white/10">
                <h4 className="font-bold text-white text-base mb-2">Single-Use Tokens</h4>
                <p className="text-[#94a3b8] font-mono text-xs">Approval tokens expire in 5 minutes and cannot be reused across calls.</p>
              </div>

              <div className="p-6 rounded-xl bg-[#111724]/85 border border-white/10">
                <h4 className="font-bold text-white text-base mb-2">Immutable Decision Logs</h4>
                <p className="text-[#94a3b8] font-mono text-xs">Every agent action is recorded to git with cryptographic trace IDs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CANONICAL COMMUNITY CTA */}
        <section className="py-28 bg-gradient-to-b from-[#0a0e17] to-[#05070c] text-center z-10 relative" aria-label="Community Call to Action">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
              Ready to Run Sovereign <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffe0] via-[#7c5cfc] to-[#00ff88]">Agent Swarms?</span>
            </h2>
            <p className="text-[#94a3b8] font-mono text-sm max-w-xl mx-auto leading-relaxed mb-10">
              Join the official Benni OS Telegram community to connect with builders, access deployment guides, and inspect swarm ledgers live.
            </p>

            <a href="https://t.me/bennios" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-[#00ffe0] text-black font-bold font-mono text-sm hover:bg-[#00ccb4] transition-all shadow-[0_0_50px_rgba(0,255,224,0.5)]" aria-label="Join Official Benni OS Telegram Swarm Community">
              Join Telegram Community Swarm →
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 bg-[#05070c] border-t border-white/10 font-mono text-xs text-[#64748b] z-10 relative" aria-label="Site Footer">
          <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2026 BENNI OS — Sovereign Autonomous Agent Swarm Infrastructure.</div>
            <div className="flex gap-6">
              <a href="https://github.com/benni-os" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffe0]">GitHub</a>
              <a href="https://t.me/bennios" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffe0]">Telegram</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
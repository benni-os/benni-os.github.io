'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: string;
  name: string;
  category: string;
  layer: string;
  status: string;
  visibility: string;
  repository: string;
  description: string;
  relations: string[];
  image: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('data/ecosystem-projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .catch(() => {
        setProjects([
          {
            id: 'benni-os',
            name: 'Benni OS',
            category: 'core',
            layer: 'Intelligence & Surface',
            status: 'live',
            visibility: 'public',
            repository: 'https://github.com/benni-os/benni-os.github.io',
            description: 'Autonomous operating layer for agents, memory, control and execution',
            relations: ['jarvas-2', 'benni-control-plane', 'nemesis-gateway'],
            image: 'images/ecosystem/benni-ecosystem-atlas.webp'
          },
          {
            id: 'jarvas-2',
            name: 'JARVAS-2',
            category: 'execution',
            layer: 'Execution Engine',
            status: 'live',
            visibility: 'public',
            repository: 'https://github.com/benni-os/jarvas-2',
            description: 'Autonomous code execution engine, local port scanner, and subagent process dispatcher',
            relations: ['benni-os', 'benni-control-plane'],
            image: 'images/projects/benni-agent-mesh.webp'
          },
          {
            id: 'benni-control-plane',
            name: 'Benni Control Plane',
            category: 'control',
            layer: 'Persistence & State',
            status: 'live',
            visibility: 'public',
            repository: 'https://github.com/benni-os/benni-control-plane',
            description: 'State engine, immutable decision ledger, and cross-session memory fabric',
            relations: ['benni-os', 'nemesis-gateway'],
            image: 'images/projects/benni-command-plane.webp'
          }
        ]);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#080a0f] text-[#f1f5f9] font-sans antialiased selection:bg-[#00ffe0]/30">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080a0f]/90 backdrop-blur-md border-b border-white/10" aria-label="Main Navigation">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group" aria-label="Benni OS homepage">
            <span className="text-white font-black text-xl tracking-tighter">BENNI</span>
            <span className="text-[#00ffe0] font-black text-xl tracking-tighter group-hover:animate-pulse">.OS</span>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/30">v2.0 Atlas</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-[#94a3b8]" aria-label="Page Navigation">
            <a href="#hero" className="hover:text-[#00ffe0] transition-colors">/surface</a>
            <a href="#atlas" className="hover:text-[#00ffe0] transition-colors">/atlas</a>
            <a href="#story" className="hover:text-[#00ffe0] transition-colors">/workflow</a>
            <a href="#bento" className="hover:text-[#00ffe0] transition-colors">/bento</a>
          </nav>

          <a href="https://t.me/bennios" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded-lg bg-[#00ffe0] text-black font-bold font-mono text-xs hover:bg-[#00ccb4] transition-all shadow-[0_0_20px_rgba(0,255,224,0.4)]" aria-label="Join Telegram Swarm Community">
            Join Swarm →
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative w-full min-h-screen pt-28 pb-16 flex flex-col justify-center items-center overflow-hidden border-b border-white/10" aria-label="Cinematic Ecosystem Hero">
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline poster="posters/benni-ecosystem-hero-poster.webp" aria-label="Benni OS Hero Motion Video">
            <source src="motion/hero/benni-ecosystem-hero-desktop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#080a0f]/70 via-[#080a0f]/50 to-[#080a0f]/95 z-10" />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-20 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00ffe0]/40 bg-[#00ffe0]/10 backdrop-blur-xl mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00ffe0] animate-pulse shadow-[0_0_10px_#00ffe0]" aria-hidden="true" />
            <span className="font-mono text-xs text-[#00ffe0] uppercase tracking-widest font-semibold">Sovereign Autonomous Agent Swarm OS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            The Operating System for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffe0] via-[#7c5cfc] to-[#00ff88]">Autonomous Work & Swarms</span>
          </h1>
          <p className="mt-6 text-[#94a3b8] font-mono text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Benni OS binds <strong className="text-white">JARVAS-2 code execution</strong>, <strong className="text-[#00ffe0]">NEMESIS policy gates</strong>, <strong className="text-[#7c5cfc]">Control Plane persistence</strong>, and <strong className="text-[#00ff88]">MONOMO event loops</strong> into a single verifiable execution surface.
          </p>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <a href="https://t.me/bennios" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-xl bg-[#00ffe0] text-black font-bold text-sm font-mono shadow-[0_0_30px_rgba(0,255,224,0.5)] hover:bg-[#00ccb4] transition-all" aria-label="Join Official Telegram Swarm">
              Join Telegram Swarm →
            </a>
            <a href="#atlas" className="px-8 py-3.5 rounded-xl border border-white/20 bg-white/5 font-mono text-xs text-white font-bold hover:border-[#00ffe0]/50 hover:bg-white/10 transition-all">
              Explore Ecosystem Atlas
            </a>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM ATLAS */}
      <section id="atlas" className="py-24 bg-[#0d111a] border-b border-white/10" aria-label="Ecosystem Atlas">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Architectural <span className="text-[#00ffe0]">Ecosystem Atlas</span>
            </h2>
            <p className="mt-4 text-[#94a3b8] font-mono text-sm max-w-2xl mx-auto">
              Live topology of verified open source projects powering Benni OS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <article key={proj.id} className="rounded-2xl bg-[#141a26] border border-[#00ffe0]/30 overflow-hidden hover:border-[#00ffe0] transition-all flex flex-col justify-between" aria-label={`${proj.name} project card`}>
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#0d111a]">
                    <img src={proj.image} alt={proj.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                    <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-[#00ffe0]/20 text-[#00ffe0] border border-[#00ffe0]/40 font-bold backdrop-blur">
                      {proj.layer}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{proj.name}</h3>
                    <p className="text-[#64748b] font-mono text-xs uppercase mb-3">{proj.category}</p>
                    <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                      {proj.relations?.map((rel) => (
                        <span key={rel} className="px-2 py-0.5 rounded bg-[#0d111a] border border-white/10 text-[#94a3b8]">
                          Rel: {rel}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#00ff88] font-semibold">● {proj.status.toUpperCase()} / {proj.visibility.toUpperCase()}</span>
                  <a href={proj.repository} target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] font-bold hover:underline">
                    GitHub →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#080a0f] border-t border-white/10 font-mono text-xs text-[#64748b]" aria-label="Footer">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 BENNI OS — Sovereign Autonomous Agent Swarm Infrastructure.</div>
          <div className="flex gap-6">
            <a href="https://github.com/benni-os" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffe0]">GitHub</a>
            <a href="https://t.me/bennios" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffe0]">Telegram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
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
}

export default function Home() {
  const [threeLoaded, setThreeLoaded] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filterMode, setFilterMode] = useState<'all' | 'public' | 'private'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    fetch('public/data/ecosystem-projects.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) {
          setProjects(data.projects);
          setFilteredProjects(data.projects);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let result = projects;
    if (filterMode === 'public') {
      result = result.filter((p) => p.is_public);
    } else if (filterMode === 'private') {
      result = result.filter((p) => !p.is_public);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    setFilteredProjects(result);
  }, [filterMode, searchQuery, projects]);

  // Zero-Lag Cursor Particle Trail System
  useEffect(() => {
    if (!cursorCanvasRef.current) return;
    const canvas = cursorCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; life: number }> = [];
    const maxParticles = 50;

    let mouseX = -100, mouseY = -100;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (particles.length < maxParticles) {
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 3 + 2,
          color: Math.random() > 0.4 ? '#00ffe0' : '#7c5cfc',
          life: 1.0
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const drawCursorTrail = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        p.size *= 0.96;

        if (p.life <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.7;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(drawCursorTrail);
    };
    drawCursorTrail();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    if (!threeLoaded || !(window as any).THREE) return;
    const THREE = (window as any).THREE;

    // Fluid Ink in Water Shader Canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 0.2 + uTime * 1.2) * cos(pos.y * 0.2 + uTime * 0.8) * 1.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `;

      const fragmentShader = `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          vec2 p = vUv - 0.5;
          float len = length(p);
          float ink = sin(p.x * 12.0 + uTime * 0.8) * cos(p.y * 12.0 - uTime * 0.6);
          ink += sin(len * 20.0 - uTime * 1.5) * 0.5;

          vec3 colorCyan = vec3(0.0, 1.0, 0.878);
          vec3 colorPurple = vec3(0.486, 0.36, 0.988);
          vec3 colorDark = vec3(0.01, 0.02, 0.04);

          vec3 finalColor = mix(colorDark, colorCyan, smoothstep(-0.2, 0.8, ink));
          finalColor = mix(finalColor, colorPurple, smoothstep(0.1, 0.9, sin(uTime + len * 8.0)));

          float alpha = smoothstep(0.5, 0.0, len) * 0.45;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `;

      const fluidGeo = new THREE.PlaneGeometry(60, 60, 64, 64);
      const fluidMat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { uTime: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const fluidMesh = new THREE.Mesh(fluidGeo, fluidMat);
      fluidMesh.position.z = -5;
      scene.add(fluidMesh);

      let gltfModel: any = null;
      if (THREE.GLTFLoader) {
        const loader = new THREE.GLTFLoader();
        loader.load('public/models/benni-topology.glb', (gltf: any) => {
          gltfModel = gltf.scene;
          gltfModel.scale.set(3.5, 3.5, 3.5);
          scene.add(gltfModel);
        });
      }

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
        fluidMat.uniforms.uTime.value = time;

        if (gltfModel) {
          gltfModel.rotation.y = time * 0.4;
          gltfModel.rotation.x = time * 0.15;
        }

        camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 2.5 - camera.position.y) * 0.05;
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
  }, [threeLoaded]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        onLoad={() => setThreeLoaded(true)}
      />
      <Script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js" />

      <main className="bg-[#020408] text-[#f8fafc] antialiased selection:bg-[#00ffe0]/30 selection:text-white min-h-screen relative overflow-x-hidden font-sans">
        {/* NOISE OVERLAY */}
        <div
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[998] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* ZERO-LAG CURSOR PARTICLE TRAIL & FLUID CANVAS */}
        <canvas ref={cursorCanvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]" aria-hidden="true" />
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-5 opacity-85 mix-blend-screen" aria-hidden="true" />

        {/* 01. HEADER NAVIGATION */}
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#020408]/85 backdrop-blur-2xl border-b border-white/10" aria-label="Main Navigation">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#surface" className="flex items-center gap-2 group" aria-label="Benni OS homepage">
              <span className="text-white font-black text-xl tracking-tighter font-mono">BENNI</span>
              <span className="text-[#00ffe0] font-black text-xl tracking-tighter font-mono group-hover:animate-pulse">.OS</span>
              <span className="ml-2 font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/40 font-bold shadow-[0_0_15px_rgba(0,255,224,0.2)]">
                SOVEREIGN ENGINE v2.4
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-[#94a3b8]" aria-label="Page Sections">
              <a href="#surface" className="hover:text-[#00ffe0] transition-colors">System</a>
              <a href="#pipeline" className="hover:text-[#00ffe0] transition-colors">Protocol</a>
              <a href="#atlas" className="hover:text-[#00ffe0] transition-colors">Registry</a>
              <a href="#project-directory" className="hover:text-[#00ffe0] transition-colors">Directory</a>
              <a href="dashboard.html" className="text-[#00ffe0] font-bold hover:underline">Docs & Console</a>
            </nav>

            <div className="flex items-center gap-4">
              <a href="dashboard.html" className="px-5 py-2 rounded-xl bg-[#00ffe0] text-black font-bold font-mono text-xs hover:bg-[#00ccb4] transition-all shadow-[0_0_30px_rgba(0,255,224,0.6)] flex items-center gap-2 transform hover:scale-105" aria-label="Launch Live Console Dashboard">
                Launch Console →
              </a>
            </div>
          </div>
        </header>

        {/* 01. HERO SECTION */}
        <section id="surface" className="relative w-full min-h-screen pt-28 pb-16 flex flex-col justify-center items-center border-b border-white/10 z-10" aria-label="Product Surface Hero">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <div className="max-w-4xl mx-auto mb-10">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#00ffe0]/40 bg-[#00ffe0]/10 backdrop-blur-2xl mb-8 shadow-[0_0_30px_rgba(0,255,224,0.2)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ffe0] animate-pulse shadow-[0_0_12px_#00ffe0]" aria-hidden="true" />
                <span className="font-mono text-xs text-[#00ffe0] uppercase tracking-widest font-semibold">SOVEREIGN AGENT OPERATING SYSTEM</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
                The operating layer for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffe0] via-[#7c5cfc] to-[#00ff88] drop-shadow-[0_0_30px_rgba(0,255,224,0.4)]">autonomous work.</span>
              </h1>
              <p className="mt-6 text-[#94a3b8] font-mono text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Coordinate agents, memory, tools and policy in one observable enterprise system.
              </p>

              <div className="mt-8 flex justify-center items-center gap-4">
                <a href="dashboard.html" className="px-8 py-3.5 rounded-xl bg-[#00ffe0] text-black font-bold text-xs font-mono shadow-[0_0_30px_rgba(0,255,224,0.6)] hover:bg-[#00ccb4] transition-all transform hover:scale-105" aria-label="Launch Live Console Dashboard">
                  Launch Live Console →
                </a>
              </div>
            </div>

            {/* FULL-BLEED BACKGROUND CONSOLE VIDEO */}
            <div className="w-full max-w-5xl mx-auto bg-[#0b101c]/85 border border-white/15 backdrop-blur-2xl rounded-3xl p-5 sm:p-8 shadow-[0_0_100px_rgba(0,255,224,0.25)] relative overflow-hidden text-left" aria-label="Operational Console">
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-5 font-mono text-xs text-[#94a3b8]">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#00ffe0] animate-pulse shadow-[0_0_12px_#00ffe0]" />
                  <span className="font-bold text-white">BENNI OS // OPERATIONAL TOPOLOGY & CONSTELLATION CONSOLE</span>
                </div>
                <div className="text-[11px] text-[#00ffe0] font-mono font-bold px-3 py-1 rounded bg-[#00ffe0]/10 border border-[#00ffe0]/30">● H.264 / VP9 CANONICAL STREAM</div>
              </div>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 pointer-events-none shadow-2xl">
                <video autoPlay muted loop playsInline poster="public/posters/hero-poster.jpg" preload="auto" aria-label="Benni OS Product Film">
                  <source src="public/motion/hero/hero-product-film.mp4" type="video/mp4" />
                  <source src="public/motion/hero/hero-product-film.webm" type="video/webm" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* 02. LIVE SYSTEM TELEMETRY STRIP WITH BACKGROUND MOTION VIDEO */}
        <section className="relative py-5 bg-[#0b101c] border-y border-white/10 font-mono text-xs text-[#94a3b8] overflow-hidden z-20" aria-label="Live System Telemetry Strip">
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover">
              <source src="public/videos/particles-loop.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="container mx-auto px-6 flex items-center justify-between gap-6 whitespace-nowrap overflow-x-auto py-1 relative z-10">
            <div className="flex items-center gap-2 text-[#00ff88] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
              <span>CONTROL PLANE: ONLINE</span>
            </div>
            <div className="text-[#64748b]">|</div>
            <div>NEMESIS GATE: <span className="text-[#00ffe0] font-bold">HMAC VERIFIED</span></div>
            <div className="text-[#64748b]">|</div>
            <div>INFERENCE ENGINE: <span className="text-[#00ffe0] font-bold">ZERO-CLOUD HYBRID GPU/CPU</span></div>
            <div className="text-[#64748b]">|</div>
            <div>REPOSITORIES: <span className="text-white font-bold">17 AUDITED (6 OPEN SOURCE / 11 CORE)</span></div>
            <div className="text-[#64748b]">|</div>
            <div className="text-[#ffb703] font-bold">POLICY GATE: 9-TIER STRICT ENFORCEMENT</div>
          </div>
        </section>

        {/* 07 & 08. PROJECT DIRECTORY */}
        <section id="project-directory" className="py-28 bg-[#060911] border-b border-white/10 relative z-10" aria-label="Project Directory">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/30 font-mono text-xs font-bold mb-4 shadow-[0_0_20px_rgba(0,255,224,0.2)]">
                DATA-DRIVEN DIRECTORY // AUDITED REPOSITORIES
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                Ecosystem <span className="text-[#00ffe0] drop-shadow-[0_0_30px_rgba(0,255,224,0.4)]">Directory</span>
              </h2>
              <p className="mt-4 text-[#94a3b8] font-mono text-xs sm:text-sm max-w-xl mx-auto">
                Complete catalog of public, open source, and core proprietary modules sourced directly from verified repository metadata.
              </p>
            </div>

            {/* FILTER CONTROLS */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`px-4 py-2 rounded-xl border font-bold transition-all ${filterMode === 'all' ? 'bg-[#00ffe0] text-black border-[#00ffe0]' : 'bg-[#0b101c] text-[#94a3b8] border-white/10 hover:border-[#00ffe0]'}`}
                >
                  All Projects ({projects.length})
                </button>
                <button
                  onClick={() => setFilterMode('public')}
                  className={`px-4 py-2 rounded-xl border font-bold transition-all ${filterMode === 'public' ? 'bg-[#00ffe0] text-black border-[#00ffe0]' : 'bg-[#0b101c] text-[#94a3b8] border-white/10 hover:border-[#00ffe0]'}`}
                >
                  Open Source / Public ({projects.filter(p => p.is_public).length})
                </button>
                <button
                  onClick={() => setFilterMode('private')}
                  className={`px-4 py-2 rounded-xl border font-bold transition-all ${filterMode === 'private' ? 'bg-[#7c5cfc] text-white border-[#7c5cfc]' : 'bg-[#0b101c] text-[#94a3b8] border-white/10 hover:border-[#7c5cfc]'}`}
                >
                  Proprietary Core ({projects.filter(p => !p.is_public).length})
                </button>
              </div>
              <div className="w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 rounded-xl bg-[#0b101c] text-white border border-white/10 focus:border-[#00ffe0] font-mono text-xs"
                  aria-label="Search directory repositories"
                />
              </div>
            </div>

            {/* DYNAMIC GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((p, idx) => {
                const holoImages = [
                  'material/_review/benni-command-plane-review-01.jpeg',
                  'material/_review/benni-open-source-constellation-review-01.jpeg',
                  'material/_review/benni-ecosystem-technology-review-01.jpeg',
                  'material/_review/benni-agent-mesh-review-01.jpeg',
                  'material/_review/benni-evidence-layer-review-01.jpeg',
                  'material/_review/benni-ecosystem-atlas-review-01.jpeg',
                  'material/_review/benni-ecosystem-product-review-01.jpeg',
                  'material/_review/benni-ecosystem-product-review-02.jpeg',
                  'material/_review/benni-memory-fabric-review-02.jpeg',
                  'material/_review/benni-sovereign-autonomous-review-01.jpeg'
                ];
                const bgImg = holoImages[idx % holoImages.length];
                return (
                  <article key={p.id} className="relative rounded-3xl bg-[#0b101c]/85 border border-white/10 overflow-hidden flex flex-col justify-between glass-card group">
                    {/* Holographic Background Image Layer */}
                    <div className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none -z-10">
                      <img src={bgImg} alt="" className="w-full h-full object-cover filter saturate-150 contrast-125 mix-blend-overlay" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b101c] via-[#0b101c]/80 to-transparent" />
                    </div>

                    <div className="p-7 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] text-[#64748b] uppercase bg-[#060911] px-2.5 py-1 rounded border border-white/10 font-bold">{p.owner}</span>
                        <span className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded-md ${p.is_open_source ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40' : 'bg-[#7c5cfc]/20 text-[#7c5cfc] border border-[#7c5cfc]/40'} font-bold backdrop-blur`}>
                          {p.is_open_source ? '● ' + p.license : '🔒 ' + p.license}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                      <p className="text-[#94a3b8] font-mono text-xs leading-relaxed mb-4">{p.description}</p>
                    </div>
                    <div className="p-7 pt-0 border-t border-white/5 flex items-center justify-between font-mono text-xs relative z-10">
                      <span className="text-[#64748b]">Layer: <strong className="text-[#94a3b8]">{p.layer}</strong></span>
                      {p.repository ? (
                        <a href={p.repository} target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] font-bold hover:underline">GitHub →</a>
                      ) : (
                        <span className="text-[#64748b] font-semibold">Sealed Core</span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-[#020408] border-t border-white/10 font-mono text-xs text-[#64748b] z-10 relative" aria-label="Site Footer">
          <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2026 BENNI OS — Sovereign Autonomous Agent Swarm Infrastructure.</div>
            <div className="flex gap-8">
              <a href="dashboard.html" className="hover:text-[#00ffe0] transition-colors">Live Dashboard Console</a>
              <a href="https://github.com/benni-os" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffe0] transition-colors">GitHub Organization</a>
              <a href="https://github.com/benni-os/benni-operator-gateway" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ffe0] transition-colors">Operator Gateway</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

// components/sections/PlatformBento.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PlatformBento() {
  const [tilt1, setTilt1] = useState({ rx: 0, ry: 0 });
  const [tilt2, setTilt2] = useState({ rx: 0, ry: 0 });

  const handleMouseMove1 = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt1({ rx: -y * 12, ry: x * 12 });
  };

  const handleMouseMove2 = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt2({ rx: -y * 12, ry: x * 12 });
  };

  return (
    <section id="platform" className="relative w-full py-28 bg-bg border-b border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-14">
          <h2 className="text-3xl md:text-5xl font-black text-txt tracking-tight">
            Core <span className="text-c1">Modules</span>
          </h2>
          <p className="mt-4 text-txt2 font-mono text-sm max-w-xl">
            Decentralized architecture powering Benni Master OS, JARVAS-2 execution engines, persistent memory, and real-time enterprise data processing.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[360px]">
          
          {/* Card 1: Benni Master OS (Destaque Principal - 2 Colunas) */}
          <motion.div 
            onMouseMove={handleMouseMove1}
            onMouseLeave={() => setTilt1({ rx: 0, ry: 0 })}
            style={{
              transform: `perspective(1000px) rotateX(${tilt1.rx}deg) rotateY(${tilt1.ry}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="md:col-span-2 relative p-8 rounded-2xl bg-bg1/90 border border-c1/30 overflow-hidden group flex flex-col justify-between shadow-2xl"
          >
            {/* Background Visual Asset */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-25 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <img src="images/jarvas.jpeg" alt="Benni Master OS Brain Visual" className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-bg1/90 to-bg1" />
            </div>

            {/* Holographic Glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-c1/30 via-transparent to-c2/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 bg-c1 rounded-full animate-pulse shadow-[0_0_12px_#00ffe0]" />
                <span className="font-mono text-xs text-c1 uppercase tracking-widest border border-c1/40 px-2.5 py-1 rounded bg-c1/10 font-semibold">Operating System</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-txt mb-2 group-hover:text-c1 transition-colors">Benni Master OS</h3>
              <p className="text-txt2 font-mono text-sm max-w-lg leading-relaxed">
                The central operating layer orchestrating all AI agents, persistent memory, swarm formations and sovereign inference across the entire Benni OS stack.
              </p>
            </div>

            {/* Faux Code Block UI */}
            <div className="relative z-10 w-full h-24 bg-bg/90 backdrop-blur-md border border-white/15 rounded-xl p-4 font-mono text-xs text-txt3 overflow-hidden shadow-inner">
              <p><span className="text-c2">import</span> {'{ BenniMasterOS }'} <span className="text-c2">from</span> <span className="text-gold">'@benni-os/core'</span>;</p>
              <p className="mt-1"><span className="text-c1">const</span> os = <span className="text-c2">new</span> BenniMasterOS({'{'} mode: <span className="text-gold">'army'</span>, swarm: <span className="text-gold">'ALPHA'</span> {'}'});</p>
              <p className="mt-1">os.boot().then(() {'=>'} os.dispatchJarvas());</p>
            </div>
          </motion.div>

          {/* Card 2: Control Plane (Orchestration) */}
          <motion.div 
            onMouseMove={handleMouseMove2}
            onMouseLeave={() => setTilt2({ rx: 0, ry: 0 })}
            style={{
              transform: `perspective(1000px) rotateX(${tilt2.rx}deg) rotateY(${tilt2.ry}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative p-8 rounded-2xl bg-bg1/90 border border-white/10 overflow-hidden group flex flex-col justify-between shadow-2xl"
          >
            {/* Background Visual Asset */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
              <img src="images/control-plane.jpeg" alt="Benni Control Plane Visual" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg1 via-bg1/80 to-transparent" />
            </div>

            <div className="absolute -inset-px bg-gradient-to-b from-c1/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 bg-c1 rounded-full animate-pulse shadow-[0_0_12px_#00ffe0]" />
                <span className="font-mono text-xs text-c1 uppercase tracking-widest border border-c1/40 px-2.5 py-1 rounded bg-c1/10">Orchestration</span>
              </div>
              <h3 className="text-xl font-bold text-txt mb-2 group-hover:text-c1 transition-colors">Control Plane</h3>
              <p className="text-txt2 font-mono text-sm leading-relaxed">
                Centralized dashboard monitoring latency, instance load, and automated deployment orchestration.
              </p>
            </div>
            
            <div className="relative z-10 flex gap-2">
              <div className="h-12 w-full bg-bg/90 backdrop-blur-md border border-white/15 rounded-lg flex items-center px-3 font-mono text-[10px] text-c1">api.benni-os.net</div>
              <div className="h-12 w-1/3 bg-bg/90 backdrop-blur-md border border-white/15 rounded-lg flex items-center justify-center font-mono text-[10px] text-c3 font-bold">99.2%</div>
            </div>
          </motion.div>

          {/* Card 3: JARVAS-2 Execution Engine & Swarm Dispatch (Sub-Sistema Explicito) */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:col-span-3 relative p-8 rounded-2xl bg-bg1/90 border border-white/10 overflow-hidden group flex flex-col md:flex-row items-start md:items-center justify-between shadow-2xl gap-6"
          >
             <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" />
             
             <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 bg-c2 rounded-full animate-pulse shadow-[0_0_12px_#7c5cfc]" />
                <span className="font-mono text-xs text-c2 uppercase tracking-widest border border-c2/40 px-2.5 py-1 rounded bg-c2/10 font-semibold">Execution Engine (SA-93)</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-txt mb-2 group-hover:text-c2 transition-colors">JARVAS-2 &amp; Swarm Dispatch</h3>
              <p className="text-txt2 font-mono text-sm leading-relaxed">
                Autonomous execution motor dispatched by Benni Master OS. Handles field agent execution, multi-agent swarm formations (Alpha, Bravo, Charlie), and task completion pipelines.
              </p>
             </div>

             <div className="relative z-10 flex gap-4">
                <div className="px-4 py-3 rounded-xl bg-bg border border-c2/30 text-c2 font-mono text-xs font-bold shadow-md">JARVAS-2 CORE</div>
                <div className="px-4 py-3 rounded-xl bg-bg border border-c1/30 text-c1 font-mono text-xs font-bold shadow-md">SWARM DISPATCH</div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

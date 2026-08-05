// components/sections/GatewaySection.tsx
'use client';

import { motion } from 'framer-motion';

export default function GatewaySection() {
  return (
    <section id="gateway" className="relative w-full py-28 bg-bg1/90 border-t border-white/10 overflow-hidden">
      {/* Background Holographic Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,224,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-c1/50 bg-c1/10 font-mono text-xs text-c1 uppercase tracking-widest font-semibold mb-4 shadow-[0_0_20px_rgba(0,255,224,0.25)]">
            User Journey &amp; Gateway
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-txt tracking-tight">
            Who Benni OS Is <span className="text-c1">Built For</span>
          </h2>
          <p className="mt-4 text-txt2 font-mono text-sm md:text-base leading-relaxed">
            From solo engineers running local sovereign LLMs to enterprise teams deploying 24/7 autonomous agent swarms.
          </p>
        </div>

        {/* Who It Is For Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Persona 1: Engineers & Developers */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="p-8 rounded-2xl bg-bg/90 border border-c1/30 shadow-[0_0_30px_rgba(0,255,224,0.12)] hover:border-c1/60 hover:shadow-[0_0_45px_rgba(0,255,224,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-c1/15 border border-c1/50 flex items-center justify-center text-c1 mb-6 font-mono text-lg font-bold shadow-[0_0_15px_rgba(0,255,224,0.2)]">
                &lt;/&gt;
              </div>
              <h3 className="text-xl font-bold text-txt mb-3">AI Engineers</h3>
              <p className="text-txt2 font-mono text-xs leading-relaxed">
                Build type-safe MCP tools, connect custom LLM backends via Rust/C++, and orchestrate sub-millisecond local inference pipelines.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-c1 flex items-center justify-between">
              <span>Sovereign Inference</span>
              <span className="font-bold">&rarr;</span>
            </div>
          </motion.div>

          {/* Persona 2: Founders & Solopreneurs */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="p-8 rounded-2xl bg-bg/90 border border-c2/30 shadow-[0_0_30px_rgba(124,92,252,0.12)] hover:border-c2/60 hover:shadow-[0_0_45px_rgba(124,92,252,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-c2/15 border border-c2/50 flex items-center justify-center text-c2 mb-6 font-mono text-lg font-bold shadow-[0_0_15px_rgba(124,92,252,0.2)]">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-txt mb-3">Founders &amp; Solopreneurs</h3>
              <p className="text-txt2 font-mono text-xs leading-relaxed">
                Run 24/7 autonomous sales funnels, social media flywheels, code shipping bots, and member portals with zero monthly cloud overhead.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-c2 flex items-center justify-between">
              <span>Autonomous Army</span>
              <span className="font-bold">&rarr;</span>
            </div>
          </motion.div>

          {/* Persona 3: Enterprise Teams */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="p-8 rounded-2xl bg-bg/90 border border-c3/30 shadow-[0_0_30px_rgba(0,255,136,0.12)] hover:border-c3/60 hover:shadow-[0_0_45px_rgba(0,255,136,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-c3/15 border border-c3/50 flex items-center justify-center text-c3 mb-6 font-mono text-lg font-bold shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-txt mb-3">Enterprise Teams</h3>
              <p className="text-txt2 font-mono text-xs leading-relaxed">
                Absolute data privacy, immutable decision ledgers, zero cloud API leaks, and full control over multi-agent governance protocols.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-c3 flex items-center justify-between">
              <span>On-Prem Privacy</span>
              <span className="font-bold">&rarr;</span>
            </div>
          </motion.div>

        </div>

        {/* Final Conversion Action Container */}
        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-bg2 via-bg1 to-bg2 border border-c1/50 shadow-[0_0_60px_rgba(0,255,224,0.25)] text-center relative overflow-hidden">
          
          <div className="absolute -inset-px bg-gradient-to-r from-c1/20 via-c2/20 to-c3/20 opacity-30 pointer-events-none" />

          <h3 className="text-2xl md:text-4xl font-black text-txt mb-4 tracking-tight drop-shadow-md">
            Ready to Deploy Your <span className="text-c1">Autonomous Node</span>?
          </h3>
          <p className="text-txt2 font-mono text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Get started in under 60 seconds with our open-source CLI, or join our developer discord to access pre-release JARVAS-2 swarm builds.
          </p>

          {/* Code Snippet Box */}
          <div className="max-w-md mx-auto mb-8 p-4 rounded-xl bg-bg/95 border border-c1/40 font-mono text-xs text-c1 flex items-center justify-between shadow-2xl">
            <span>$ git clone https://github.com/benni-os/benni-inference-engine</span>
            <span className="px-2 py-1 bg-c1/20 border border-c1/40 rounded text-[10px] text-txt font-bold">COPY</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/benni-os/benni-inference-engine"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-c1 text-black font-bold text-sm shadow-[0_0_35px_rgba(0,255,224,0.5)] hover:bg-c1d hover:shadow-[0_0_55px_rgba(0,255,224,0.8)] hover:-translate-y-1 transition-all"
            >
              Deploy Sovereign Node &rarr;
            </a>
            <a
              href="https://github.com/benni-os"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl text-txt font-bold text-sm hover:border-c1/60 hover:bg-white/20 hover:-translate-y-1 transition-all"
            >
              Star Ecosystem on GitHub
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

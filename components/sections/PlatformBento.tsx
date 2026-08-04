// components/sections/PlatformBento.tsx
'use client';

import { motion } from 'framer-motion';

export default function PlatformBento() {
  return (
    <section id="platform" className="relative w-full py-24 bg-bg border-b border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-txt tracking-tight">
            Core <span className="text-c1">Modules</span>
          </h2>
          <p className="mt-4 text-txt2 font-mono text-sm max-w-xl">
            A arquitetura descentralizada que sustenta os agentes operacionais e o processamento de dados da Benni OS.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          
          {/* Card 1: JARVAS-2 (Destaque - Ocupa 2 colunas) */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="md:col-span-2 relative p-8 rounded-2xl bg-bg1 border border-white/5 overflow-hidden group flex flex-col justify-between"
          >
            {/* Holographic Glow */}
            <div className="absolute -inset-px bg-gradient-to-br from-c2/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-c2 rounded-full animate-pulse shadow-[0_0_10px_#7c5cfc]" />
                <span className="font-mono text-xs text-c2 uppercase tracking-widest border border-c2/30 px-2 py-1 rounded">Neural Core</span>
              </div>
              <h3 className="text-2xl font-bold text-txt mb-2">JARVAS-2 Engine</h3>
              <p className="text-txt2 font-mono text-sm max-w-md">
                Motor de inteligência autônomo com capacidade de raciocínio lógico e execução de pipelines complexos em tempo real.
              </p>
            </div>

            {/* Faux Code Block UI */}
            <div className="relative z-10 w-full h-24 bg-bg/80 border border-white/10 rounded-lg p-4 font-mono text-xs text-txt3 overflow-hidden">
              <p><span className="text-c2">import</span> {'{ CoreAgent }'} <span className="text-c2">from</span> 'jarvas-2';</p>
              <p className="mt-1"><span className="text-c1">const</span> agent = <span className="text-c2">new</span> CoreAgent({'{'} mode: <span className="text-gold">'autonomous'</span> {'}'});</p>
              <p className="mt-1">agent.initialize().then(start);</p>
            </div>
          </motion.div>

          {/* Card 2: Control Plane */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="relative p-8 rounded-2xl bg-bg1 border border-white/5 overflow-hidden group flex flex-col justify-between"
          >
            <div className="absolute -inset-px bg-gradient-to-b from-c1/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-c1 rounded-full animate-pulse shadow-[0_0_10px_#00ffe0]" />
                <span className="font-mono text-xs text-c1 uppercase tracking-widest border border-c1/30 px-2 py-1 rounded">Orchestration</span>
              </div>
              <h3 className="text-xl font-bold text-txt mb-2">Control Plane</h3>
              <p className="text-txt2 font-mono text-sm">
                Dashboard central para monitoramento de latência, carga de instâncias e orquestração de deploy.
              </p>
            </div>
            
            <div className="relative z-10 flex gap-2">
              <div className="h-12 w-full bg-bg border border-white/5 rounded-md flex items-center px-3 font-mono text-[10px] text-c1">api.benni-os.net</div>
              <div className="h-12 w-1/3 bg-bg border border-white/5 rounded-md flex items-center justify-center font-mono text-[10px] text-c3">99.2%</div>
            </div>
          </motion.div>

          {/* Card 3: Social Hub (Ocupa a largura toda na linha de baixo, ou 3 colunas) */}
          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="md:col-span-3 relative p-8 rounded-2xl bg-bg1 border border-white/5 overflow-hidden group flex items-center justify-between"
          >
             <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" />
             
             <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-c3 rounded-full animate-pulse shadow-[0_0_10px_#00ff88]" />
                <span className="font-mono text-xs text-c3 uppercase tracking-widest border border-c3/30 px-2 py-1 rounded">Automation</span>
              </div>
              <h3 className="text-xl font-bold text-txt mb-2">Social Hub &amp; Integrations</h3>
              <p className="text-txt2 font-mono text-sm">
                Nós de comunicação que conectam a infraestrutura da Benni OS às principais plataformas, APIs externas e interfaces sociais.
              </p>
             </div>

             <div className="relative z-10 hidden md:flex gap-4">
                <div className="w-16 h-16 rounded-full bg-bg border border-white/10 flex items-center justify-center text-txt2 font-mono text-xs hover:text-c1 transition-colors border-dashed">API</div>
                <div className="w-16 h-16 rounded-full bg-bg border border-white/10 flex items-center justify-center text-txt2 font-mono text-xs hover:text-c2 transition-colors border-dashed">WS</div>
                <div className="w-16 h-16 rounded-full bg-bg border border-white/10 flex items-center justify-center text-txt2 font-mono text-xs hover:text-c3 transition-colors border-dashed">MCP</div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

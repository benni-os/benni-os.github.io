// components/sections/CompanySection.tsx
'use client';

import { motion } from 'framer-motion';

export default function CompanySection() {
  return (
    <section id="company" className="relative w-full py-24 bg-bg2 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Radar Ping UI */}
        <div className="relative h-64 md:h-96 w-full flex items-center justify-center border border-white/5 bg-bg rounded-2xl overflow-hidden shadow-2xl">
          {/* Grid de fundo */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="relative flex items-center justify-center">
            {/* Anéis do Radar */}
            <div className="absolute w-[300px] h-[300px] border border-c1/10 rounded-full" />
            <div className="absolute w-[200px] h-[200px] border border-c1/20 rounded-full" />
            <div className="absolute w-[100px] h-[100px] border border-c1/30 rounded-full" />
            
            {/* Ping */}
            <div className="absolute w-4 h-4 bg-c1 rounded-full shadow-[0_0_20px_#00ffe0] z-10" />
            <div className="absolute w-4 h-4 bg-c1 rounded-full animate-ping z-0" style={{ animationDuration: '2s' }} />
            
            {/* Linha de escaneamento */}
            <motion.div 
              className="absolute w-[150px] h-[1px] bg-gradient-to-r from-transparent to-c1/80 origin-left"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
          </div>

          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-c1 tracking-widest uppercase">
            HQ Node: Castanhal, Pará, Brazil (-1.295, -47.925)
          </div>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-txt mb-6 tracking-tight">
            Sovereign Infrastructure
          </h2>
          <ul className="space-y-6 font-mono text-sm text-txt2">
            <li className="flex gap-4">
              <span className="text-c2 font-bold">01</span>
              <div>
                <span className="block text-txt font-bold mb-1 uppercase tracking-widest text-xs">Origin</span>
                Construído em Castanhal, Pará, Brasil. Operando globalmente sem intermediários.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-c2 font-bold">02</span>
              <div>
                <span className="block text-txt font-bold mb-1 uppercase tracking-widest text-xs">Architecture</span>
                Código otimizado para latência ultra-baixa. Nada de abstrações desnecessárias.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-c2 font-bold">03</span>
              <div>
                <span className="block text-txt font-bold mb-1 uppercase tracking-widest text-xs">Mission</span>
                Automação absoluta e implantação de agentes de inteligência de nível enterprise.
              </div>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}

// components/sections/EcosystemTable.tsx
'use client';

import { motion } from 'framer-motion';

const ECOSYSTEM = [
  { name: 'benni-control-plane', type: 'PostgreSQL 15 / Cloudflare', latency: '14ms', status: 'active' },
  { name: 'JARVAS-2 Engine', type: 'SA-93 Agent Runtime', latency: '2ms', status: 'active' },
  { name: 'Benni Social Hub', type: '18 MCP Tools / 11 Platforms', latency: '24ms', status: 'active' },
  { name: 'benni-operator-gateway', type: 'HTTP Gateway / Approval Gate', latency: '8ms', status: 'active' },
  { name: 'Modo Operador 🇧🇷', type: 'BR Product / Playbook', latency: '--', status: 'live' }
];

export default function EcosystemTable() {
  return (
    <section id="ecosystem" className="relative w-full py-24 bg-bg border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-txt tracking-tight">
            Ecosystem <span className="text-c1">Integrations</span>
          </h2>
          <p className="mt-2 text-txt2 font-mono text-sm">
            Live status map of all operational nodes across the Benni OS architecture.
          </p>
        </div>

        <div className="w-full border-t border-white/10">
          {ECOSYSTEM.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/5 hover:border-white/20 transition-colors cursor-crosshair overflow-hidden"
            >
              {/* Highlight Sweep no fundo */}
              <div className="absolute inset-0 bg-gradient-to-r from-c1/0 via-c1/5 to-c1/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 relative z-10">
                <span className="font-bold text-txt text-lg">{item.name}</span>
                <span className="font-mono text-sm text-txt3 uppercase tracking-widest">{item.type}</span>
              </div>

              <div className="flex items-center gap-8 mt-4 md:mt-0 relative z-10 font-mono text-xs">
                <span className="text-txt2">{item.latency}</span>
                <div className="flex items-center gap-2 w-24 justify-end">
                  <span className={item.status === 'active' || item.status === 'live' ? 'text-c1' : 'text-txt3'}>
                    {item.status.toUpperCase()}
                  </span>
                  {item.status === 'active' || item.status === 'live' ? (
                    <span className="w-2 h-2 rounded-full bg-c1 shadow-[0_0_8px_#00ffe0] animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-txt3" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// components/sections/HowItWorks.tsx
'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    id: '01',
    title: 'System Initialization',
    desc: 'Deploy autônomo de instâncias JARVAS-2 em rede distribuída.',
  },
  {
    id: '02',
    title: 'Data Ingestion',
    desc: 'Processamento contínuo de streams de dados com baixa latência.',
  },
  {
    id: '03',
    title: 'Neural Output',
    desc: 'Execução de ações soberanas e escalabilidade dinâmica.',
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative w-full py-24 bg-bg border-b border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-txt tracking-tight">
            Operation <span className="text-c2">Protocol</span>
          </h2>
          <p className="mt-4 text-txt2 font-mono text-sm">
            <span className="text-c1">{'>'}</span> Runtime pipeline status: Nominal
          </p>
        </div>

        <div className="relative">
          {/* Linha vertical (Conduíte de Dados) */}
          <div className="absolute left-6 md:left-[50px] top-0 bottom-0 w-[1px] bg-white/5">
            <motion.div 
              className="w-full bg-gradient-to-b from-c1 to-c2"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {STEPS.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-start gap-8 md:gap-16"
              >
                {/* Orbital Ring / Node */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-[100px] md:h-[100px] bg-bg border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,255,224,0.05)]">
                  <span className="font-mono text-c1 text-xs md:text-sm font-bold tracking-widest">
                    {step.id}
                  </span>
                  {/* Ponto pulsante central */}
                  <div className="absolute w-1 h-1 bg-c1 rounded-full animate-ping opacity-50" />
                </div>

                {/* Conteúdo */}
                <div className="pt-2 md:pt-6">
                  <h3 className="text-xl md:text-2xl font-bold text-txt mb-2">{step.title}</h3>
                  <p className="text-txt2 font-mono text-sm leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

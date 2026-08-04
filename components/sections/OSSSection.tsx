// components/sections/OSSSection.tsx
'use client';

import { motion } from 'framer-motion';

const REPOS = [
  {
    name: "benni-operator-gateway",
    desc: "HTTP MCP gateway com Approval Gate, Decision Ledger e hot-reload nativo em TypeScript.",
    stars: "1.2k",
    forks: "340",
    language: "TypeScript",
    langColor: "bg-blue-400"
  },
  {
    name: "mcp-forge",
    desc: "Framework Python em estilo FastAPI para declarar servidores MCP com validação de tipos.",
    stars: "856",
    forks: "112",
    language: "Python",
    langColor: "bg-yellow-400"
  },
  {
    name: "benni-nexus",
    desc: "Gateway inteligente multi-provedor (Ollama, Groq, OpenAI, Gemini) com roteamento e observabilidade.",
    stars: "642",
    forks: "148",
    language: "TypeScript",
    langColor: "bg-blue-400"
  }
];

export default function OSSSection() {
  return (
    <section id="oss" className="relative w-full py-24 bg-bg border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-txt tracking-tight">
              Open <span className="text-txt2">Source</span>
            </h2>
            <p className="mt-4 text-txt2 font-mono text-sm max-w-lg">
              Transparência por padrão. Fragmentos do core Benni OS mantidos publicamente.
            </p>
          </div>
          <a 
            href="https://github.com/benni-os" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-md bg-txt text-bg font-mono text-sm font-bold hover:bg-c1 transition-colors flex-shrink-0 inline-flex items-center gap-2"
          >
            View GitHub &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REPOS.map((repo, index) => (
            <motion.a 
              key={index}
              href={`https://github.com/benni-os/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="p-6 rounded-lg bg-bg1 border border-white/10 hover:border-c1/50 transition-colors group cursor-pointer flex flex-col justify-between h-[220px]"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-txt2 group-hover:text-c1 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                  </svg>
                  <h3 className="text-lg font-bold text-c1 group-hover:underline">{repo.name}</h3>
                </div>
                <p className="text-txt2 text-sm leading-relaxed">{repo.desc}</p>
              </div>
              
              <div className="flex items-center gap-4 mt-6 text-xs text-txt3 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`}></span>
                  {repo.language}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-txt2">★</span> {repo.stars}
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-txt2" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                  {repo.forks}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

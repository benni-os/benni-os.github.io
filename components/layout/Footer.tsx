// components/layout/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="relative w-full py-12 bg-bg overflow-hidden border-t border-white/5">
      {/* Noise Texture Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center relative z-10 gap-6">
        
        {/* Glitch Logo */}
        <div className="group cursor-pointer">
          <span className="text-txt font-black text-2xl tracking-tighter">BENNI</span>
          <span className="text-c1 font-black text-2xl tracking-tighter relative inline-block group-hover:animate-pulse">
            .OS
            {/* Camadas para efeito visual glitchy no hover */}
            <span className="absolute top-0 left-[2px] -z-10 text-c2 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-screen translate-x-1">.OS</span>
            <span className="absolute top-0 -left-[2px] -z-10 text-c3 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-screen -translate-x-1">.OS</span>
          </span>
        </div>

        {/* Info */}
        <div className="font-mono text-xs text-txt3 text-center md:text-right">
          <p>© {new Date().getFullYear()} Benni OS Infrastructure &middot; benni-os.net</p>
          <p>Castanhal, PA, Brazil &mdash; System Active.</p>
        </div>

      </div>
    </footer>
  );
}

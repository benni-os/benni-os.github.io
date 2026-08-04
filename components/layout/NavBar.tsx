// components/layout/NavBar.tsx
'use client';

import Link from 'next/link';
import ScrollProgress from '../ui/ScrollProgress';

export default function NavBar() {
  return (
    <>
      <ScrollProgress />
      <header className="fixed top-0 left-0 right-0 w-full z-40 bg-bg/75 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-txt font-black text-xl tracking-tighter">BENNI</span>
            <span className="text-c1 font-black text-xl tracking-tighter group-hover:animate-pulse">.OS</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-txt2">
            <Link href="#how" className="hover:text-c1 transition-colors">/how-it-works</Link>
            <Link href="#platform" className="hover:text-c1 transition-colors">/platform</Link>
            <Link href="#infrastructure" className="hover:text-c1 transition-colors">/infrastructure</Link>
            <Link href="#oss" className="hover:text-c1 transition-colors">/oss</Link>
          </nav>

          {/* Live Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg1/80 border border-c3/30 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-c3 animate-pulse shadow-[0_0_8px_#00ff88]" />
              <span className="text-[10px] font-mono text-txt uppercase tracking-widest hidden sm:inline-block">
                All systems live
              </span>
              <span className="text-[10px] font-mono text-txt uppercase tracking-widest sm:hidden">
                Live
              </span>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}

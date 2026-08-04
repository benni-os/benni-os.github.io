// app/page.tsx
import NavBar from '@/components/layout/NavBar';
import HeroSection from '@/components/sections/HeroSection';
import MarqueeStrip from '@/components/sections/MarqueeStrip';
import HowItWorks from '@/components/sections/HowItWorks';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg selection:bg-c1 selection:text-bg">
      <NavBar />
      <HeroSection />
      <MarqueeStrip />
      <HowItWorks />
    </main>
  );
}

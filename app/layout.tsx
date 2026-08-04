// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Benni OS — Autonomous AI Infrastructure',
  description: 'The operating system for autonomous AI agents. Persistent memory, multi-agent coordination, sovereign inference.',
  openGraph: {
    title: 'Benni OS — Autonomous AI Infrastructure',
    description: 'The operating system for autonomous AI agents. Production-grade.',
    images: ['/images/og-image.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-bg text-txt antialiased selection:bg-c1/30 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}

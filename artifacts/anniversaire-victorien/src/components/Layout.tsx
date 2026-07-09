import { Link, useLocation } from 'wouter';
import { ReactNode, useState } from 'react';

const navItems = [
  { path: '/', label: 'Frontispice' },
  { path: '/journal', label: 'Journal Intime' },
  { path: '/galerie', label: 'Galerie' },
  { path: '/anecdotes', label: 'Anecdotes' },
  { path: '/lettre', label: 'La Lettre' },
  { path: '/voeux', label: 'Vœux' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [flowerRevealed, setFlowerRevealed] = useState(false);

  return (
    <div className="min-h-[100dvh] relative overflow-hidden flex flex-col md:flex-row bg-background">
      <div className="texture-overlay"></div>

      {/* Navigation / Bookmark style sidebar */}
      <nav className="md:w-64 border-b md:border-b-0 md:border-r border-gold/40 flex-shrink-0 z-10 relative bg-background/80 backdrop-blur-sm shadow-[4px_0_24px_rgba(0,0,0,0.05)] pt-8 pb-4 md:py-12 flex flex-col justify-between">
        <div className="px-6 flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <div>
            <h1 className="font-title text-2xl md:text-3xl text-burgundy mb-2">
              Carnet Secret
            </h1>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto md:mx-0"></div>
          </div>

          <ul className="flex flex-row md:flex-col gap-4 overflow-x-auto w-full md:w-auto px-4 md:px-0 scrollbar-none snap-x">
            {navItems.map((item) => {
              const active = location === item.path;
              return (
                <li key={item.path} className="snap-start whitespace-nowrap">
                  <Link
                    href={item.path}
                    className={`block px-4 py-2 text-lg italic transition-all duration-300 relative ${
                      active
                        ? 'text-burgundy font-semibold translate-x-0 md:translate-x-2'
                        : 'text-foreground/70 hover:text-burgundy hover:translate-x-0 md:hover:translate-x-1'
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold hidden md:block"></span>
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Decorative corner element */}
        <div className="hidden md:block px-6 text-center opacity-60">
          <svg
            width="80"
            height="40"
            viewBox="0 0 100 50"
            className="mx-auto stroke-gold fill-none stroke-[1]"
          >
            <path d="M10,25 C30,0 70,0 90,25 C70,50 30,50 10,25 Z" />
            <circle cx="50" cy="25" r="5" />
          </svg>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 p-6 md:p-12 lg:p-20 overflow-y-auto w-full h-[calc(100dvh-5rem)] md:h-[100dvh]">
        <div className="max-w-4xl mx-auto dog-ear bg-ivory/40 p-8 md:p-12 shadow-2xl rounded-sm border border-gold/20 min-h-full">
          {children}
        </div>
      </main>

      {/* Global Easter Egg: Dried Flower */}
      <button
        type="button"
        className="fixed bottom-12 right-12 z-50 group cursor-pointer pointer-events-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-sm"
        onClick={() => setFlowerRevealed((revealed) => !revealed)}
        aria-expanded={flowerRevealed}
        aria-controls="flower-note"
        aria-label="Fleur séchée, cliquez pour révéler son secret"
      >
        <img
          src="/flower.png"
          alt="Fleur séchée"
          className={`w-16 h-24 object-contain transition-all duration-700 origin-bottom filter sepia-[0.3] ${flowerRevealed ? 'opacity-100 rotate-6 -translate-y-2' : 'opacity-70 group-hover:opacity-100 group-hover:rotate-6 group-hover:-translate-y-2'}`}
        />
        <div
          id="flower-note"
          role="status"
          className={`absolute bottom-full right-full bg-ivory border border-gold/40 p-3 shadow-lg rounded-sm transition-opacity duration-500 w-48 text-center text-sm font-handwriting text-burgundy transform -translate-x-4 translate-y-4 ${flowerRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 group-hover:opacity-100 pointer-events-none'}`}
        >
          Une rose séchée du jardin d'hiver, gardée précieusement depuis des années.
        </div>
      </button>
    </div>
  );
}

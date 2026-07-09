import { Link, useLocation } from 'wouter';
import { ReactNode, useState } from 'react';

const navItems = [
  { path: '/', label: 'Frontispice' },
  { path: '/journal', label: 'Souvenirs Partagés' },
  { path: '/galerie', label: 'Galerie' },
  { path: '/anecdotes', label: 'Anecdotes' },
  { path: '/lettre', label: 'La Lettre' },
  { path: '/voeux', label: 'L\'Encrier' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [flowerRevealed, setFlowerRevealed] = useState(false);

  return (
    <div className="min-h-[100dvh] relative overflow-hidden flex flex-col md:flex-row bg-background">
      <div className="texture-overlay"></div>

      {/* Navigation / Bookmark style sidebar */}
      <nav className="md:w-72 border-b md:border-b-0 md:border-r border-gold/50 flex-shrink-0 z-10 relative bg-background/90 backdrop-blur-md shadow-[6px_0_30px_rgba(0,0,0,0.08)] pt-8 pb-4 md:py-16 flex flex-col justify-between">
        <div className="px-6 flex flex-col items-center md:items-start text-center md:text-left gap-10">
          <div>
            <h1 className="font-title text-3xl md:text-4xl text-burgundy mb-3 tracking-wide drop-shadow-sm">
              Carnet Secret
            </h1>
            <div className="h-[2px] w-28 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto md:mx-0"></div>
          </div>

          <ul className="flex flex-row md:flex-col gap-6 overflow-x-auto w-full md:w-auto px-4 md:px-0 scrollbar-none snap-x">
            {navItems.map((item) => {
              const active = location === item.path;
              return (
                <li key={item.path} className="snap-start whitespace-nowrap group">
                  <Link
                    href={item.path}
                    className={`block px-4 py-2 text-xl font-serif italic transition-all duration-500 relative ${
                      active
                        ? 'text-burgundy font-semibold translate-x-0 md:translate-x-3 drop-shadow-sm'
                        : 'text-foreground/70 hover:text-burgundy hover:translate-x-0 md:hover:translate-x-2'
                    }`}
                  >
                    {active && (
                      <span className="absolute left-[-10px] top-1/2 -translate-y-1/2 hidden md:flex items-center text-gold">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </span>
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Decorative corner element */}
        <div className="hidden md:block px-6 text-center opacity-70">
          <svg
            width="100"
            height="50"
            viewBox="0 0 100 50"
            className="mx-auto stroke-gold fill-none stroke-[1.5]"
          >
            <path d="M10,25 C30,0 70,0 90,25 C70,50 30,50 10,25 Z" />
            <circle cx="50" cy="25" r="4" fill="currentColor" className="fill-gold/50" />
            <path d="M25,25 Q50,45 75,25" />
          </svg>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 p-6 md:p-12 lg:p-24 overflow-y-auto w-full h-[calc(100dvh-6rem)] md:h-[100dvh]">
        <div className="max-w-5xl mx-auto dog-ear bg-ivory/60 backdrop-blur-sm p-8 md:p-16 shadow-2xl rounded-sm border border-gold/30 min-h-full">
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
          className={`w-20 h-32 object-contain transition-all duration-700 origin-bottom filter drop-shadow-md ${flowerRevealed ? 'opacity-100 rotate-12 -translate-y-4 sepia-0' : 'opacity-80 sepia-[0.3] group-hover:opacity-100 group-hover:rotate-6 group-hover:-translate-y-2'}`}
        />
        <div
          id="flower-note"
          role="status"
          className={`absolute bottom-full right-full bg-ivory border-2 border-gold/40 p-4 shadow-xl rounded-sm transition-all duration-500 w-56 text-center text-lg font-handwriting text-burgundy transform -translate-x-4 translate-y-4 ${flowerRevealed ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          Une rose séchée du jardin d'hiver, gardée précieusement depuis des années.
        </div>
      </button>
    </div>
  );
}

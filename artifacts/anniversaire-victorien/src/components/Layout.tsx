import { Link, useLocation } from 'wouter';
import { ReactNode } from 'react';
import EasterEggs from './EasterEggs';
import BirthdayFlourish from './BirthdayFlourish';
import VintageOverlay from './VintageOverlay';

const navItems = [
  { path: '/', label: 'Le Blason' },
  { path: '/vitraux', label: 'Les Vitraux' },
  { path: '/grimoire', label: 'Le Grimoire' },
  { path: '/lettre', label: 'La Lettre Scellée' },
  { path: '/voeu', label: 'Le Vœu de la Tiare' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] relative overflow-hidden flex flex-col md:flex-row bg-background">
      <div className="particles-overlay"></div>

      <VintageOverlay key={`vintage-${location}`} />
      {location !== '/' && <BirthdayFlourish key={location} />}

      {/* Navigation / Sidebar Couture */}
      <nav className="md:w-80 border-b md:border-b-0 md:border-r border-gold/20 flex-shrink-0 z-20 relative bg-sapphire-dark/80 backdrop-blur-xl shadow-[6px_0_30px_rgba(0,0,0,0.5)] py-3 md:py-16 flex flex-col justify-between">
        
        {/* Subtle glowing orb in background of nav */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-amethyst/30 blur-[60px] rounded-full pointer-events-none"></div>
        
        <div className="px-4 md:px-6 flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-12 relative z-10">
          {/* Title — desktop sidebar only */}
          <div className="hidden md:flex w-full flex-col items-start">
            <h1 className="font-title text-3xl md:text-4xl mb-4 tracking-wider drop-shadow-sm">
              <span className="text-gradient-gold">Conte de Fées<br />Couture</span>
            </h1>
            <div className="h-[1px] w-24 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
          </div>

          <ul className="flex flex-row md:flex-col gap-4 md:gap-6 overflow-x-auto md:overflow-visible w-full px-2 md:px-0 scrollbar-none snap-x">
            {navItems.map((item) => {
              const active = location === item.path;
              return (
                <li key={item.path} className="snap-start shrink-0 md:shrink md:whitespace-normal group">
                  <Link
                    href={item.path}
                    className={`block py-1.5 md:py-2 text-base md:text-xl font-serif transition-all duration-500 relative ${
                      active
                        ? 'text-gold font-semibold md:translate-x-4'
                        : 'text-pearl/60 hover:text-gold-light md:hover:translate-x-2'
                    }`}
                  >
                    {active && (
                      <span className="absolute left-[-20px] top-1/2 -translate-y-1/2 hidden md:flex items-center text-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12,2 15,10 23,12 15,14 12,22 9,14 1,12 9,10" />
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

        {/* Decorative corner element — desktop only */}
        <div className="hidden md:block px-6 text-center opacity-40 mt-12 relative group">
          <div className="absolute inset-0 bg-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="mx-auto stroke-gold fill-none stroke-[1] drop-shadow-lg"
          >
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
            <path d="M50 20 L80 50 L50 80 L20 50 Z" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
          </svg>
        </div>
      </nav>

      {/* Main Content Area — flex-1 so it fills what the nav leaves */}
      <main className="flex-1 relative z-10 overflow-y-auto w-full min-h-0">
        <div className="min-h-full p-5 sm:p-8 md:p-12 lg:p-20 relative">
          {children}
        </div>
      </main>

      <EasterEggs />
    </div>
  );
}

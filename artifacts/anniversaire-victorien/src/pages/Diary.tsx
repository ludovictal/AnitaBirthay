import { useState } from 'react';
import { useMemories } from '../hooks/use-memories';

export default function Diary() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { memories } = useMemories();

  return (
    <div className="space-y-20 py-12 animate-in slide-in-from-bottom-10 fade-in duration-1000">
      
      <header className="text-center mb-16 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <span className="font-title text-9xl">S</span>
        </div>
        <h2 className="font-title text-4xl md:text-5xl text-burgundy mb-6 relative z-10 drop-shadow-sm">Souvenirs Partagés</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-16 bg-gold/50"></div>
          <span className="text-gold">✦</span>
          <div className="h-[1px] w-16 bg-gold/50"></div>
        </div>
        <p className="mt-6 italic text-xl text-foreground/70 max-w-lg mx-auto relative z-10">
          Ce que les mots gravent sur le papier, le temps ne peut l'effacer. Extraits choisis par ceux qui vous chérissent.
        </p>
      </header>

      <div className="space-y-16">
        {memories.map((memory, index) => (
          <article 
            key={memory.id} 
            className="relative max-w-3xl mx-auto torn-paper transition-transform hover:-translate-y-1 duration-500"
            style={{ transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})` }}
          >
            {/* Decorative pin/tape illusion */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 shadow-sm rotate-2"></div>
            
            <div className="p-10 md:p-14">
              <div className="flex justify-between items-end mb-8 border-b border-gold/20 pb-4">
                <span className="text-sm font-semibold tracking-widest text-burgundy uppercase opacity-80">
                  {memory.date}
                </span>
                <span className="text-gold opacity-60 font-serif italic text-sm">
                  Fragment n°{memories.length - index}
                </span>
              </div>
              
              <div className="space-y-6 text-xl leading-loose text-foreground/90 font-serif">
                <p className="first-letter:font-title first-letter:text-6xl first-letter:text-burgundy first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:drop-shadow-sm">
                  {memory.content}
                </p>
              </div>
              
              <div className="mt-12 pt-6 border-t border-gold/10 text-right">
                <span className="text-foreground/50 text-sm mr-4 italic">Bien à vous,</span>
                <span className="font-handwriting text-5xl text-emerald drop-shadow-sm">
                  {memory.author}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Easter Egg: Drawer */}
      <div className="flex justify-center pt-16 pb-8">
        <div className="relative group">
          <button
            type="button"
            className="px-10 py-4 border-2 border-gold/80 text-burgundy font-title uppercase tracking-[0.2em] text-sm cursor-pointer hover:bg-gold/10 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 bg-ivory/60"
            onClick={() => setDrawerOpen((open) => !open)}
            aria-expanded={drawerOpen}
            aria-controls="drawer-content"
          >
            <span>Tiroir Secret</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`opacity-60 transition-transform duration-500 ${drawerOpen ? 'rotate-180' : ''}`}>
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div
            id="drawer-content"
            role="status"
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-6 w-80 p-6 bg-ivory border-2 border-sepia shadow-2xl transition-all duration-700 z-20 before:content-[''] before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:border-[12px] before:border-transparent before:border-b-sepia ${drawerOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-[-20px] pointer-events-none'}`}
          >
            <div className="border border-gold/40 p-6 text-center bg-white/50 relative">
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold"></div>
              
              <p className="font-handwriting text-4xl text-burgundy mb-4 transform -rotate-3">Billet doux</p>
              <p className="text-base italic leading-relaxed text-foreground/80">N'oublie jamais la promesse faite sous le grand chêne, à la tombée de la nuit.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

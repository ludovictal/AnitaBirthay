import { useState } from 'react';

export default function Home() {
  const [crestRevealed, setCrestRevealed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full min-h-[75vh] gap-12 animate-in fade-in duration-1000">
      
      {/* Title & Introduction with Birthday Emphasis */}
      <div className="max-w-3xl space-y-8 relative z-10 mt-8 mb-4">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-gold/20 blur-[60px] rounded-full"></div>
          <h2 className="font-title text-5xl md:text-7xl text-pearl leading-tight drop-shadow-lg uppercase tracking-widest relative z-10">
            <span className="text-gradient-gold block text-3xl md:text-4xl mb-6 tracking-[0.3em]">L'Anniversaire</span>
            <span className="block text-2xl md:text-3xl text-pearl/80 mb-2">de la Princesse</span>
          </h2>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
          </div>
          <div className="inline-block px-12 py-4 bg-sapphire-dark relative z-10 border border-gold/30 rounded-sm shadow-[0_0_30px_rgba(255,215,0,0.15)]">
            <span className="font-title text-6xl md:text-8xl text-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
              20 ANS
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 py-6">
          <div className="h-[1px] w-16 bg-gold/50"></div>
          <span className="text-gold text-xl">✦</span>
          <div className="h-[1px] w-16 bg-gold/50"></div>
        </div>

        <p className="text-2xl leading-relaxed text-pearl/90 font-serif italic max-w-2xl mx-auto drop-shadow-md">
          Les portes du bal s'ouvrent sur une nuit qui t'appartient, parée de soie, de mystère et d'étoiles dorées.
        </p>
      </div>

      {/* Royal Crest / Hero Portrait */}
      <div className="relative group flex justify-center items-center w-full max-w-lg mt-4">
        {/* Background glow */}
        <div className="absolute inset-[-40px] bg-emerald/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10 w-full flex justify-center">
          {/* Faceted Frame */}
          <div className="faceted-frame w-72 md:w-96 aspect-[3/4] p-2 bg-sapphire group-hover:bg-amethyst/20 transition-colors duration-1000 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* The actual photo */}
            <div className="relative w-full h-full overflow-hidden clip-path-faceted">
              <img 
                src="/hero-blason.png" 
                alt="Blason et Portrait" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop';
                  e.currentTarget.className += " grayscale contrast-125";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sapphire-dark/80 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Easter Egg: Crest interaction */}
        <button 
          className="absolute -bottom-8 bg-sapphire border border-gold p-4 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold z-20 hover:scale-110 transition-transform duration-500 group-hover:rotate-180 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] cursor-pointer"
          onClick={() => setCrestRevealed(!crestRevealed)}
          aria-expanded={crestRevealed}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-gold stroke-2">
            <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
          </svg>
        </button>

        {/* Revealed message from crest */}
        <div 
          className={`absolute top-full mt-12 bg-sapphire/95 backdrop-blur-md border border-gold p-6 z-30 transition-all duration-700 w-80 max-w-full shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${
            crestRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <p className="font-serif italic text-pearl text-lg leading-relaxed">
            [Message secret du blason : "Sous le sceau de l'éternité, je t'ai promis cette danse."]
          </p>
        </div>
      </div>

      <style>{`
        .clip-path-faceted {
          clip-path: polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%);
        }
      `}</style>
    </div>
  );
}

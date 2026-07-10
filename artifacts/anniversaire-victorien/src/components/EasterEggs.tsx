import { useState } from 'react';

export default function EasterEggs() {
  const [ribbonRevealed, setRibbonRevealed] = useState(false);

  return (
    <>
      {/* 4th Easter Egg: Embroidered Ribbon */}
      <button
        type="button"
        className="fixed bottom-10 right-10 z-50 group cursor-pointer pointer-events-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-full w-20 h-20 flex items-center justify-center"
        onClick={() => setRibbonRevealed((r) => !r)}
        aria-expanded={ribbonRevealed}
        aria-controls="ribbon-secret"
        aria-label="Ruban brodé, cliquez pour révéler son secret"
      >
        <div className={`absolute inset-0 bg-gold/10 rounded-full blur-xl transition-opacity duration-700 ${ribbonRevealed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
        
        <img
          src="/ruban.png"
          alt="Ruban brodé"
          className={`w-24 h-24 object-contain transition-all duration-1000 origin-center filter drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] z-10 ${
            ribbonRevealed ? 'rotate-[360deg] scale-110 brightness-125' : 'hover:rotate-12 hover:scale-105'
          }`}
          onError={(e) => {
             e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback if image fails */}
        <div className="absolute inset-0 border-2 border-dashed border-gold rounded-full -z-10 animate-[spin_20s_linear_infinite] opacity-50"></div>

        <div
          id="ribbon-secret"
          role="status"
          className={`absolute bottom-full right-[120%] bg-sapphire border border-gold/40 p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-sm transition-all duration-700 w-64 text-center transform ${
            ribbonRevealed 
              ? 'opacity-100 pointer-events-auto translate-x-0 scale-100' 
              : 'opacity-0 scale-95 pointer-events-none translate-x-4'
          }`}
        >
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold"></div>
          
          <p className="font-title text-gold mb-2 text-sm uppercase tracking-widest">Fil d'Or</p>
          <p className="text-base font-serif italic leading-relaxed text-pearl">
            [Message caché du ruban : "La vraie beauté réside dans les détails imperceptibles, comme ce ruban oublié."]
          </p>
        </div>
      </button>
    </>
  );
}

import { useState } from 'react';

export default function Anecdotes() {
  const [activeClue, setActiveClue] = useState(false);

  return (
    <div className="py-12 space-y-16 animate-in fade-in slide-in-from-left-8 duration-700">
      <header className="text-center mb-16">
        <h2 className="font-title text-4xl md:text-5xl text-burgundy mb-6 drop-shadow-sm">Clins d'Œil & Curiosités</h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-16 bg-emerald/40"></div>
          <span className="text-emerald text-2xl font-serif">§</span>
          <div className="h-[1px] w-16 bg-emerald/40"></div>
        </div>
        <p className="italic text-xl text-foreground/70 max-w-lg mx-auto">
          Parce que la véritable élégance n'a jamais exclu l'espièglerie de l'esprit.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Anecdote Card 1 */}
        <div className="bg-ivory/60 p-10 border border-gold/40 shadow-md relative overflow-hidden group hover:bg-white/80 transition-colors duration-500">
          <div className="absolute -right-6 -top-6 text-emerald/5 font-title text-[12rem] leading-none group-hover:text-emerald/15 transition-colors duration-700 pointer-events-none">I</div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          
          <h3 className="font-title text-2xl text-burgundy mb-6 relative z-10">L'Incident du Chapeau</h3>
          <p className="relative z-10 text-foreground/80 leading-loose text-lg font-serif">
            Nul n'a oublié ce jour d'avril où un coup de vent malicieux a emporté ce majestueux couvre-chef à plumes sur la promenade. La dignité souveraine avec laquelle il fut récupéré reste une leçon de maintien pour nous tous.
          </p>
        </div>

        {/* Anecdote Card 2 */}
        <div className="bg-ivory/60 p-10 border border-gold/40 shadow-md relative overflow-hidden group hover:bg-white/80 transition-colors duration-500">
          <div className="absolute -right-6 -top-6 text-emerald/5 font-title text-[12rem] leading-none group-hover:text-emerald/15 transition-colors duration-700 pointer-events-none">II</div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

          <h3 className="font-title text-2xl text-burgundy mb-6 relative z-10">Le Mystère de la Tasse</h3>
          <p className="relative z-10 text-foreground/80 leading-loose text-lg font-serif">
            Pourquoi la tasse en porcelaine de Sèvres du petit salon bleu disparaît-elle systématiquement pour réapparaître dans la grande bibliothèque ? Une énigme délicieuse que même Scotland Yard refuse de traiter.
          </p>
        </div>

        {/* Anecdote Card 3 */}
        <div className="bg-ivory/60 p-10 border border-gold/40 shadow-md relative overflow-hidden group hover:bg-white/80 transition-colors duration-500 md:col-span-2 text-center mt-4">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-emerald/5 font-title text-[15rem] leading-none group-hover:text-emerald/10 transition-colors duration-700 pointer-events-none">III</div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
          
          <h3 className="font-title text-3xl text-burgundy mb-6 relative z-10">La Collection Secrète</h3>
          <p className="relative z-10 text-foreground/80 leading-loose text-lg max-w-2xl mx-auto font-serif">
            Derrière une façade de respectabilité classique se cache une passion inavouable pour les romans-feuilletons à deux sous. Nous avons solennellement promis de ne rien dire, et nous tenons parole. (Le tome 4 est toujours caché sous le coussin vert).
          </p>
        </div>
      </div>

      {/* Easter Egg: Clock */}
      <div className="mt-24 flex flex-col items-center justify-center pb-12">
        <div className="text-lg italic text-foreground/60 mb-8 font-serif">Le temps file, mais les secrets demeurent...</div>
        <button
          type="button"
          className="relative cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-8 rounded-full p-2"
          onClick={() => setActiveClue(!activeClue)}
          aria-expanded={activeClue}
          aria-controls="clock-clue"
          aria-label="Horloge ancienne, cliquez pour révéler un indice"
        >
          <img 
            src="/clock.png" 
            alt="Horloge ancienne" 
            className="w-40 h-40 object-contain filter drop-shadow-xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Fallback clock if image fails */}
          <div className="absolute inset-0 border-[6px] border-double border-gold rounded-full bg-ivory -z-10 shadow-inner flex items-center justify-center text-gold/40 font-title text-sm tracking-widest uppercase">
            Tempus Fugit
          </div>
          
          {/* Revealing Clue */}
          <div
            id="clock-clue"
            role="status"
            className={`absolute top-full mt-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-burgundy text-ivory font-handwriting text-4xl px-8 py-4 rounded-sm shadow-2xl transition-all duration-700 border border-gold/40 ${activeClue ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-90 pointer-events-none'}`}
          >
            Rendez-vous à minuit sonnant.
          </div>
        </button>
      </div>

    </div>
  );
}

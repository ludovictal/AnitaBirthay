import { useState } from 'react';

export default function Anecdotes() {
  const [activeClue, setActiveClue] = useState(false);

  return (
    <div className="py-8 space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
      <header className="text-center mb-12">
        <h2 className="font-title text-3xl md:text-4xl text-burgundy mb-4">Clins d'Œil & Curiosités</h2>
        <div className="h-[1px] w-24 bg-emerald/40 mx-auto"></div>
        <p className="mt-4 italic text-foreground/60">Parce que l'élégance n'exclut pas l'espièglerie.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Anecdote Card 1 */}
        <div className="bg-white/40 p-6 border border-gold/30 shadow-sm relative overflow-hidden group hover:bg-white/60 transition-colors">
          <div className="absolute -right-4 -top-4 text-emerald/10 font-title text-9xl group-hover:text-emerald/20 transition-colors">1</div>
          <h3 className="font-title text-xl text-burgundy mb-3 relative z-10">L'Incident du Chapeau</h3>
          <p className="relative z-10 text-foreground/80 leading-relaxed">
            Nul n'a oublié ce jour où un coup de vent malicieux a emporté ce majestueux couvre-chef à plumes sur la promenade. La dignité avec laquelle il fut récupéré reste une leçon de maintien pour nous tous.
          </p>
        </div>

        {/* Anecdote Card 2 */}
        <div className="bg-white/40 p-6 border border-gold/30 shadow-sm relative overflow-hidden group hover:bg-white/60 transition-colors">
          <div className="absolute -right-4 -top-4 text-emerald/10 font-title text-9xl group-hover:text-emerald/20 transition-colors">2</div>
          <h3 className="font-title text-xl text-burgundy mb-3 relative z-10">Le Mystère de la Tasse</h3>
          <p className="relative z-10 text-foreground/80 leading-relaxed">
            Pourquoi la tasse en porcelaine de Sèvres du salon bleu disparaît-elle systématiquement pour réapparaître dans la bibliothèque ? Une énigme que même Scotland Yard refuse de traiter.
          </p>
        </div>

        {/* Anecdote Card 3 */}
        <div className="bg-white/40 p-6 border border-gold/30 shadow-sm relative overflow-hidden group hover:bg-white/60 transition-colors md:col-span-2 text-center">
          <h3 className="font-title text-xl text-burgundy mb-3 relative z-10">La Collection Secrète</h3>
          <p className="relative z-10 text-foreground/80 leading-relaxed max-w-xl mx-auto">
            Derrière une façade de respectabilité classique se cache une passion inavouable pour les romans-feuilletons à deux sous. Nous avons promis de ne rien dire, et nous tenons parole. (Le tome 4 est caché sous le coussin vert).
          </p>
        </div>
      </div>

      {/* Easter Egg: Clock */}
      <div className="mt-16 flex flex-col items-center justify-center">
        <div className="text-sm italic text-foreground/50 mb-4">Le temps file, mais les secrets demeurent...</div>
        <button
          type="button"
          className="relative cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-full"
          onClick={() => setActiveClue(!activeClue)}
          aria-expanded={activeClue}
          aria-controls="clock-clue"
          aria-label="Horloge ancienne, cliquez pour révéler un indice"
        >
          <img 
            src="/clock.png" 
            alt="Horloge ancienne" 
            className="w-32 h-32 object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Fallback clock if image fails */}
          <div className="absolute inset-0 border-[4px] border-gold rounded-full bg-ivory -z-10 shadow-inner flex items-center justify-center text-gold/30 font-title text-xs">
            Tempus Fugit
          </div>
          
          {/* Revealing Clue */}
          <div
            id="clock-clue"
            role="status"
            className={`absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-burgundy text-ivory font-handwriting text-2xl px-6 py-2 rounded shadow-xl transition-all duration-500 ${activeClue ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          >
            Rendez-vous à minuit.
          </div>
        </button>
      </div>

    </div>
  );
}

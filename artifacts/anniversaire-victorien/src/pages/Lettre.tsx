import { useState } from 'react';

export default function Lettre() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSealing, setIsSealing] = useState(false);

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '01022022') {
      setError('');
      setIsSealing(true);
      setTimeout(() => {
        setIsUnlocked(true);
        setIsSealing(false);
      }, 1500); // Allow magical unlock effect to play
    } else {
      setError("Les astres ne s'alignent pas avec cette date. Cherchez dans vos souvenirs les plus chers...");
      setCode('');
    }
  };

  const handleBreakSeal = () => {
    setIsSealing(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsSealing(false);
    }, 1200);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-16 animate-in fade-in duration-1000 relative">
      
      {!isOpen ? (
        <div className="flex flex-col items-center space-y-12 max-w-lg mx-auto text-center relative">
          
          <div className="font-title text-3xl text-pearl uppercase tracking-widest text-gradient-gold">
            La Lettre Scellée
          </div>
          
          {!isUnlocked ? (
            <div className="bg-sapphire/60 p-10 backdrop-blur-md gem-border w-full max-w-md animate-in slide-in-from-bottom-8 duration-700 relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-sapphire-dark rounded-full border border-gold flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-gold">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>

              <p className="italic text-lg text-pearl/80 font-serif leading-relaxed mb-8 mt-4">
                "Une date gravée dans le marbre de l'éternité protège ce pli royal."
              </p>

              <form onSubmit={handleVerifyCode} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="secretCode" className="sr-only">Code secret</label>
                  <input
                    id="secretCode"
                    type="password"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-sapphire-dark/80 border border-gold/40 text-center text-3xl tracking-[0.5em] font-serif text-gold py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all placeholder:text-gold/20"
                    placeholder="JJMMAAAA"
                    required
                  />
                </div>
                
                <div role="status" aria-live="polite" className="h-10 flex items-center justify-center">
                  {error && (
                    <p className="text-amethyst-light text-sm italic font-serif text-[#d8b4e2] animate-in fade-in">
                      {error}
                    </p>
                  )}
                  {!error && isSealing && (
                    <p className="text-gold text-sm italic font-serif animate-in fade-in">
                      Le code s'aligne avec les astres... le sceau se déverrouille.
                    </p>
                  )}
                </div>

                <button 
                  type="submit"
                  className={`relative overflow-hidden font-title text-sm uppercase tracking-widest bg-gold text-sapphire-dark px-8 py-4 hover:bg-gold-light transition-all duration-500 shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] cursor-pointer ${isSealing ? 'animate-sparkle pointer-events-none' : ''}`}
                >
                  <span className="relative z-10">Déverrouiller le Sceau</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-1000">
              <p className="italic text-xl text-pearl/80 font-serif leading-relaxed mb-8">
                Le sceau vous reconnaît. Brisez l'empreinte pour en connaître la teneur.
              </p>
              
              <button
                type="button"
                className={`relative group p-8 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold rounded-full transition-transform duration-500 ${isSealing ? 'scale-150 opacity-0 pointer-events-none duration-1000' : 'hover:scale-105'}`}
                onClick={handleBreakSeal}
                aria-label="Briser le sceau pour lire la lettre"
              >
                {/* Magical Halo */}
                <div className={`absolute inset-0 rounded-full transition-colors duration-700 ${isSealing ? 'bg-gold blur-3xl scale-150' : 'bg-gold/30 blur-2xl group-hover:bg-gold/50 animate-halo'}`}></div>
                
                {/* Wax Seal Couture */}
                <img 
                  src="/album-sceau-1.jpg" 
                  alt="Sceau Couture" 
                  className={`w-48 h-48 rounded-full object-cover relative z-10 drop-shadow-[0_0_30px_rgba(255,215,0,0.5)] border-4 border-gold transition-all duration-500 ${isSealing ? 'brightness-200' : 'group-hover:brightness-125 group-hover:drop-shadow-[0_0_50px_rgba(255,215,0,0.8)]'}`}
                  onError={(e) => {
                    e.currentTarget.outerHTML = '<div class="w-48 h-48 bg-red-900 rounded-full mx-auto relative z-10 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.5)] border-4 border-gold"><span class="text-gold font-title text-5xl">S</span></div>';
                  }}
                />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto bg-[#fdfbf7] p-10 md:p-20 shadow-[0_0_60px_rgba(255,215,0,0.3)] animate-in zoom-in-95 duration-1000 relative text-[#1a1512] book-page-turn-right origin-left">
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply pointer-events-none"></div>
          
          <div className="absolute inset-4 border border-[#c5b59a] pointer-events-none"></div>
          <div className="absolute inset-6 border border-[#e6dcc6] pointer-events-none"></div>
          
          <div className="text-right font-serif text-lg mb-16 text-[#8b7355] italic relative z-10">
            [Date de la lettre. Ex: La nuit du bal,]<br/>
            [Lieu. Ex: Depuis l'aile Ouest]
          </div>

          <div className="space-y-8 font-serif text-2xl leading-loose relative z-10 text-center">
            <p className="font-title text-4xl text-[#3a2f26] mb-12 uppercase tracking-widest border-b border-[#e6dcc6] pb-6 inline-block">
              À ma Reine,
            </p>
            
            <p>
              L'orchestre joue et les invités dansent, mais au milieu de cette cour fastueuse, je ne vois que toi.
            </p>
            
            <p>
              Chaque détail de ta parure est un éloge à la beauté, mais aucune soie, aucun saphir ne saurait égaler la grâce avec laquelle tu traverses la vie.
            </p>
            
            <p>
              Que cette nuit te célèbre comme tu le mérites. Joyeux anniversaire, mon amour.
            </p>
            
            <div className="mt-20 pt-12 text-center">
              <span className="block text-[#8b7355] text-sm uppercase tracking-widest font-title mb-4">
                Pour l'éternité,
              </span>
              <span className="font-title text-4xl text-[#c49a45] inline-block drop-shadow-sm uppercase tracking-wider">
                Ton Favv
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

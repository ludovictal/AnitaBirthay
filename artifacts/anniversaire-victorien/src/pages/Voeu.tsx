import { useState } from 'react';
import { useMemories } from '../hooks/use-memories';

export default function Voeu() {
  const [submitted, setSubmitted] = useState(false);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [tiaraRevealed, setTiaraRevealed] = useState(false);
  const [isCasting, setIsCasting] = useState(false);
  
  const { addMemory } = useMemories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && content.trim()) {
      setIsCasting(true);
      // Let magical particles play before finalizing submission
      setTimeout(() => {
        addMemory(author, content);
        setSubmitted(true);
        setAuthor('');
        setContent('');
        setIsCasting(false);
      }, 1500);
    }
  };

  return (
    <div className="py-12 space-y-16 max-w-3xl mx-auto animate-in fade-in duration-1000 relative">
      
      {/* Magic particles that show during casting */}
      {isCasting && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
           <div className="w-full h-full bg-gold/5 animate-pulse"></div>
           <div className="absolute w-32 h-32 bg-gold blur-[100px] animate-sparkle"></div>
        </div>
      )}

      <header className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-gold text-lg drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">✦</span>
          <span className="font-title text-gold-light text-xs md:text-sm uppercase tracking-[0.5em] drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
            Titre
          </span>
          <span className="text-gold text-lg drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">✦</span>
        </div>
        <h2 className="font-title text-4xl md:text-5xl mb-6 uppercase tracking-widest">
          <span className="text-gradient-gold [text-shadow:0_2px_24px_rgba(255,215,0,0.25)]">Le Vœu de la Tiare</span>
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-20 bg-gold/50"></div>
          <div className="w-2 h-2 rotate-45 bg-gold shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
          <div className="h-[1px] w-20 bg-gold/50"></div>
        </div>
        <p className="italic text-xl text-pearl/70 leading-relaxed font-serif">
          Approchez de l'écrin et confiez un voeu ou un souvenir précieux à la couronne. Il rejoindra le Grimoire pour l'éternité.
        </p>
      </header>

      {/* Easter Egg: The Tiara */}
      <div className="flex justify-center mb-12">
        <button
          type="button"
          className="relative group focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold rounded-full cursor-pointer"
          onClick={() => setTiaraRevealed(!tiaraRevealed)}
          aria-expanded={tiaraRevealed}
        >
          <div className={`absolute inset-0 bg-gold/20 blur-[40px] rounded-full transition-opacity duration-1000 ${tiaraRevealed ? 'opacity-100 scale-150' : 'opacity-0 group-hover:opacity-100 animate-halo'}`}></div>
          <img 
            src="/album-tiare-1.jpg" 
            alt="Tiare scintillante" 
            className={`w-40 h-40 object-cover rounded-full border-4 border-gold/30 relative z-10 transition-all duration-700 ${tiaraRevealed ? 'brightness-150 scale-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] border-gold' : 'drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] group-hover:scale-105'}`}
            onError={(e) => {
              e.currentTarget.outerHTML = '<div class="w-40 h-40 bg-transparent rounded-full border-2 border-dashed border-gold"></div>';
            }}
          />
          <div className={`absolute top-full mt-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-sapphire text-gold font-serif italic px-6 py-3 border border-gold shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-700 z-20 ${tiaraRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}`}>
            "Seule la reine véritable fait scintiller les diamants par sa simple présence."
          </div>
        </button>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="gem-border p-10 md:p-14 bg-sapphire/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-10 relative z-10 transition-all">
          
          <div>
            <label className="block font-title text-sm text-gold uppercase tracking-widest mb-4" htmlFor="author">
              Votre Titre ou Prénom
            </label>
            <input 
              type="text" 
              id="author" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              disabled={isCasting}
              className="w-full bg-sapphire-dark/50 border border-gold/30 px-4 py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 font-serif text-2xl text-pearl placeholder:text-pearl/20 transition-all disabled:opacity-50"
              placeholder="Ex: Duchesse de..."
            />
          </div>

          <div>
            <label className="block font-title text-sm text-gold uppercase tracking-widest mb-4" htmlFor="content">
              Votre Vœu ou Souvenir
            </label>
            <textarea 
              id="content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={isCasting}
              rows={5}
              className="w-full bg-sapphire-dark/50 border border-gold/30 p-6 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 font-serif italic text-xl leading-loose text-pearl placeholder:text-pearl/20 transition-all resize-y disabled:opacity-50"
              placeholder="Que la magie de cette nuit..."
            ></textarea>
          </div>

          <div className="text-center mt-4">
            <button 
              type="submit"
              disabled={isCasting}
              className={`relative overflow-hidden font-title text-sm uppercase tracking-widest bg-gold text-sapphire-dark px-12 py-5 transition-all duration-500 shadow-[0_0_20px_rgba(255,215,0,0.2)] transform cursor-pointer border border-transparent ${isCasting ? 'scale-105 shadow-[0_0_40px_rgba(255,215,0,0.8)] bg-pearl' : 'hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:bg-gold-light'}`}
            >
              <span className={`relative z-10 ${isCasting ? 'animate-pulse' : ''}`}>
                {isCasting ? 'Magie en cours...' : 'Sceller le Vœu'}
              </span>
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center gem-border bg-sapphire/80 p-8 sm:p-16 shadow-[0_0_50px_rgba(255,215,0,0.2)] relative animate-in zoom-in-95 duration-700 backdrop-blur-xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.3)_0,transparent_50%)]"></div>
          
          <div className="font-title text-3xl sm:text-5xl text-gold mb-6 sm:mb-8 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">Vœu Exaucé.</div>
          <p className="text-lg sm:text-2xl italic text-pearl/90 leading-relaxed font-serif relative z-10 drop-shadow-md">
            Vos mots ont été tissés dans la soie du Grimoire. Ils y brilleront pour toujours.
          </p>
          
          <button 
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-16 text-sm font-title text-pearl/60 hover:text-gold uppercase tracking-[0.2em] transition-colors relative z-10 border-b border-pearl/30 hover:border-gold pb-1 cursor-pointer"
          >
            Déposer une autre offrande
          </button>
        </div>
      )}

    </div>
  );
}

import { useState } from 'react';

export default function Wishes() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 space-y-12 max-w-xl mx-auto animate-in fade-in duration-1000">
      
      <header className="text-center mb-12">
        <h2 className="font-title text-3xl md:text-4xl text-burgundy mb-4">Le Livre d'Or</h2>
        <div className="h-[1px] w-16 bg-gold/50 mx-auto mb-4"></div>
        <p className="italic text-foreground/70">
          Laissez ici une trace de votre passage, un mot doux, un vœu pour la dame du jour.
        </p>
      </header>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-ivory/50 p-8 border border-gold/30 shadow-inner flex flex-col gap-6 relative">
          
          {/* Decorative corner */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold"></div>

          <div>
            <label className="block font-title text-sm text-burgundy uppercase tracking-widest mb-2" htmlFor="name">
              Votre Nom ou Pseudonyme
            </label>
            <input 
              type="text" 
              id="name" 
              required
              className="w-full bg-transparent border-b-2 border-gold/40 px-0 py-2 focus:outline-none focus:border-burgundy font-handwriting text-2xl placeholder:text-foreground/20 placeholder:font-serif placeholder:text-base transition-colors"
              placeholder="Signez ici..."
            />
          </div>

          <div>
            <label className="block font-title text-sm text-burgundy uppercase tracking-widest mb-2" htmlFor="message">
              Vos Vœux
            </label>
            <textarea 
              id="message" 
              required
              rows={4}
              className="w-full bg-transparent border-2 border-gold/40 p-4 focus:outline-none focus:border-burgundy font-serif italic text-lg placeholder:text-foreground/20 transition-colors resize-none"
              placeholder="Rédigez votre missive..."
            ></textarea>
          </div>

          <div className="text-center mt-4">
            <button 
              type="submit"
              className="font-title text-sm uppercase tracking-[0.2em] bg-burgundy text-ivory px-8 py-3 hover:bg-emerald transition-colors duration-500 shadow-md"
            >
              Sceller & Envoyer
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center bg-ivory/50 p-12 border border-gold/30 shadow-inner">
          <div className="font-handwriting text-5xl text-emerald mb-6">Merci</div>
          <p className="text-lg italic text-foreground/80">
            Votre message a été délicatement glissé dans les pages de ce carnet. Il y sera conservé précieusement.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-8 text-sm font-title text-burgundy hover:text-emerald uppercase tracking-widest underline underline-offset-8 transition-colors"
          >
            Écrire un autre mot
          </button>
        </div>
      )}

    </div>
  );
}

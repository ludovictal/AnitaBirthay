import { useState } from 'react';
import { useMemories } from '../hooks/use-memories';

export default function Wishes() {
  const [submitted, setSubmitted] = useState(false);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  
  const { addMemory } = useMemories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && content.trim()) {
      addMemory(author, content);
      setSubmitted(true);
      setAuthor('');
      setContent('');
    }
  };

  return (
    <div className="py-12 space-y-16 max-w-2xl mx-auto animate-in fade-in duration-1000">
      
      <header className="text-center mb-16">
        <h2 className="font-title text-4xl md:text-5xl text-burgundy mb-6 drop-shadow-sm">Plume & Parchemin</h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-20 bg-gold/50"></div>
          <div className="w-2 h-2 rounded-full bg-gold/50"></div>
          <div className="h-[1px] w-20 bg-gold/50"></div>
        </div>
        <p className="italic text-xl text-foreground/70 leading-relaxed">
          Prenez la plume pour y déposer un souvenir vécu avec elle, une anecdote précieuse ou un moment partagé. 
        </p>
      </header>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-ivory/80 p-10 md:p-14 border border-gold/40 shadow-xl flex flex-col gap-10 relative">
          
          {/* Decorative ornate corners */}
          <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-gold/60"></div>
          <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-gold/60"></div>

          <div>
            <label className="block font-title text-sm text-burgundy uppercase tracking-[0.2em] mb-4" htmlFor="author">
              Votre Prénom
            </label>
            <input 
              type="text" 
              id="author" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-gold/30 px-2 py-3 focus:outline-none focus:border-burgundy font-handwriting text-4xl placeholder:text-foreground/20 placeholder:font-serif placeholder:text-xl transition-colors text-emerald"
              placeholder="Signez de votre plus belle écriture..."
            />
          </div>

          <div>
            <label className="block font-title text-sm text-burgundy uppercase tracking-[0.2em] mb-4" htmlFor="content">
              Votre Récit
            </label>
            <textarea 
              id="content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              className="w-full bg-white/40 border border-gold/30 p-6 focus:outline-none focus:border-burgundy focus:bg-white/60 font-serif italic text-xl leading-loose placeholder:text-foreground/30 transition-colors resize-y shadow-inner"
              placeholder="Il était une fois..."
            ></textarea>
          </div>

          <div className="text-center mt-6">
            <button 
              type="submit"
              className="font-title text-sm uppercase tracking-[0.3em] bg-burgundy text-ivory px-12 py-5 hover:bg-emerald transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Déposer le Souvenir
            </button>
            <p className="mt-6 text-sm italic text-foreground/50 font-serif">
              Ce récit sera consigné dans le registre de cet appareil pour l'éternité, et ajouté aux souvenirs partagés.
            </p>
          </div>
        </form>
      ) : (
        <div className="text-center bg-ivory/80 p-16 border border-gold/40 shadow-xl relative animate-in zoom-in-95 duration-700">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <img src="/wax-seal.png" alt="" className="w-64 h-64" />
          </div>
          
          <div className="font-handwriting text-7xl text-emerald mb-8 drop-shadow-sm">L'encre est sèche.</div>
          <p className="text-xl italic text-foreground/80 leading-relaxed font-serif relative z-10">
            Votre souvenir a été délicatement couché sur le papier et glissé dans le carnet collectif. Il y brillera désormais.
          </p>
          
          <button 
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-12 text-sm font-title text-burgundy hover:text-emerald uppercase tracking-[0.2em] underline underline-offset-8 transition-colors relative z-10"
          >
            Tremper à nouveau la plume
          </button>
        </div>
      )}

    </div>
  );
}

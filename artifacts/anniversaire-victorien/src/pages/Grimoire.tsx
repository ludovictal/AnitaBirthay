import { useMemories } from '../hooks/use-memories';

export default function Grimoire() {
  const { memories } = useMemories();

  return (
    <div className="space-y-16 py-8 animate-in slide-in-from-bottom-10 fade-in duration-1000">
      <header className="text-center mb-16 relative">
        <h2 className="font-title text-4xl md:text-5xl mb-6 drop-shadow-sm uppercase tracking-widest">
          <span className="text-gradient-gold">Le Grimoire</span>
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-16 bg-gold/50"></div>
          <span className="text-gold text-xl">✧</span>
          <div className="h-[1px] w-16 bg-gold/50"></div>
        </div>
        <p className="mt-6 italic text-xl text-pearl/70 max-w-lg mx-auto font-serif">
          Les voix de ceux qui vous entourent, tissées de fil d'or sur les pages de l'histoire.
        </p>
      </header>

      <div className="space-y-16 max-w-4xl mx-auto">
        {memories.map((memory, index) => (
          <article 
            key={memory.id} 
            className="gem-border p-10 md:p-14 bg-sapphire/40 relative backdrop-blur-sm"
          >
            {/* Decorative corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-gold/40"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-gold/40"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-gold/40"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-gold/40"></div>

            <div className="flex flex-wrap justify-between items-start gap-2 mb-8 border-b border-gold/20 pb-4">
              <span className="text-xs sm:text-sm font-title tracking-widest text-pearl uppercase opacity-60 leading-snug">
                {memory.date}
              </span>
              <span className="text-gold opacity-80 font-title text-xs tracking-widest uppercase shrink-0">
                Fragment {memories.length - index}
              </span>
            </div>
            
            <div className="text-lg sm:text-xl md:text-2xl leading-relaxed text-pearl/90 font-serif italic text-center md:text-left">
              "{memory.content}"
            </div>
            
            <div className="mt-12 pt-6 border-t border-gold/10 text-right">
              <span className="text-pearl/40 text-sm mr-4 uppercase tracking-widest font-title">Déposé par</span>
              <span className="font-title text-2xl text-gold drop-shadow-md">
                {memory.author}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

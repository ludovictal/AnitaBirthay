export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full min-h-[70vh] gap-12 animate-in fade-in duration-1000">
      
      {/* Date Header */}
      <div className="border-y border-gold/40 py-3 px-12 uppercase tracking-widest text-sm text-burgundy font-semibold">
        Le Vingt-Quatre Octobre
      </div>

      {/* Portrait */}
      <div className="relative">
        <div className="absolute inset-0 border-[3px] border-gold rounded-[50%_50%_50%_50%/60%_60%_40%_40%] scale-105 opacity-50"></div>
        <img 
          src="/portrait.png" 
          alt="Portrait élégant" 
          className="w-64 h-80 object-cover medallion z-10 relative"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=640&auto=format&fit=crop&sepia=1';
          }}
        />
        {/* Decorative corner flourishes */}
        <div className="absolute -top-6 -left-6 text-gold opacity-60">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M0,50 Q50,50 50,0 M50,100 Q50,50 100,50" />
          </svg>
        </div>
        <div className="absolute -bottom-6 -right-6 text-gold opacity-60">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M100,50 Q50,50 50,100 M50,0 Q50,50 0,50" />
          </svg>
        </div>
      </div>

      {/* Title & Introduction */}
      <div className="max-w-xl space-y-6">
        <h2 className="font-title text-4xl md:text-5xl text-burgundy leading-tight">
          À l'Aube de cette<br/>Nouvelle Année
        </h2>
        
        <p className="text-lg leading-relaxed text-foreground/80">
          Il est des jours où le temps suspend son vol, pour nous laisser admirer la beauté d'une âme qui s'épanouit. Ces pages recèlent les fragments d'une vie précieuse, capturés à l'encre sympathique et scellés d'affection.
        </p>

        <p className="font-handwriting text-3xl text-emerald mt-8 italic">
          Pour vous, Éléonore.
        </p>
      </div>

    </div>
  );
}

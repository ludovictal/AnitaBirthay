export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full min-h-[75vh] gap-16 animate-in fade-in duration-1000">
      
      {/* Date Header */}
      <div className="relative border-y-2 border-gold/50 py-4 px-16 uppercase tracking-[0.3em] text-sm text-burgundy font-semibold bg-ivory/40">
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-gold">✦</div>
        Le Vingt-Quatre Octobre
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-gold">✦</div>
      </div>

      {/* Portrait */}
      <div className="relative mt-4">
        {/* Decorative background aura */}
        <div className="absolute inset-[-40px] bg-gradient-radial from-gold/20 to-transparent rounded-full blur-2xl opacity-70"></div>
        
        {/* Frame container */}
        <div className="relative z-10 group">
          <div className="absolute inset-0 border-[4px] border-double border-gold rounded-[50%_50%_50%_50%/60%_60%_40%_40%] scale-105 opacity-60 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100 group-hover:rotate-[2deg]"></div>
          
          <img 
            src="/portrait-hero.png" 
            alt="Portrait élégant" 
            className="w-72 h-96 md:w-80 md:h-[28rem] object-cover medallion z-10 relative transition-transform duration-1000 filter sepia-[0.2] contrast-110"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&sepia=1';
            }}
          />
        </div>

        {/* Decorative corner flourishes */}
        <div className="absolute -top-12 -left-12 text-gold opacity-80 w-24 h-24">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full drop-shadow-sm">
            <path d="M0,50 Q50,50 50,0 M50,100 Q50,50 100,50" />
            <circle cx="50" cy="50" r="4" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute -bottom-12 -right-12 text-gold opacity-80 w-24 h-24 rotate-180">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full drop-shadow-sm">
            <path d="M0,50 Q50,50 50,0 M50,100 Q50,50 100,50" />
            <circle cx="50" cy="50" r="4" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Title & Introduction */}
      <div className="max-w-2xl space-y-8 mt-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 opacity-30">
          <img src="/wax-seal.png" alt="" className="w-16 h-16 blur-[1px]" />
        </div>

        <h2 className="font-title text-5xl md:text-7xl text-burgundy leading-tight drop-shadow-md">
          À l'Aube de cette<br/>
          <span className="text-emerald italic font-serif text-4xl md:text-6xl tracking-wide">Nouvelle Année</span>
        </h2>
        
        <div className="w-24 h-[1px] bg-gold mx-auto"></div>

        <p className="text-xl md:text-2xl leading-relaxed text-foreground/85 font-serif italic">
          Il est des jours où le temps suspend son vol, pour nous laisser admirer la beauté d'une âme qui s'épanouit. Ces pages recèlent les fragments d'une vie précieuse, capturés à l'encre sympathique et scellés d'affection.
        </p>

        <p className="font-handwriting text-5xl text-burgundy mt-12 transform -rotate-2 drop-shadow-sm">
          Pour vous, Éléonore.
        </p>
      </div>

    </div>
  );
}

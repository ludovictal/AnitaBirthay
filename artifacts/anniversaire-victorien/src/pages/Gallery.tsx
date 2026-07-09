export default function Gallery() {
  const images = [
    { src: '/gallery-1.png', caption: 'Le charme discret de l\'après-midi' },
    { src: '/gallery-2.png', caption: 'L\'art de la correspondance amoureuse' },
    { src: '/gallery-3.png', caption: 'Un profil gravé dans l\'éternité' },
    { src: '/gallery-4.png', caption: 'Reflets d\'une beauté intemporelle' },
    { src: '/gallery-5.png', caption: 'Les secrets du boudoir' },
    { src: '/gallery-6.png', caption: 'Dentelle et délicatesse' }
  ];

  return (
    <div className="space-y-20 py-12 animate-in zoom-in-95 duration-1000">
      <header className="text-center mb-20 relative">
        <h2 className="font-title text-4xl md:text-5xl text-burgundy mb-6 drop-shadow-sm">Galerie des Souvenirs</h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-24 bg-gold/50"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-gold">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" strokeWidth="1" strokeLinejoin="round"/>
          </svg>
          <div className="h-[1px] w-24 bg-gold/50"></div>
        </div>
        <p className="italic text-xl text-foreground/70 max-w-xl mx-auto">
          Des instants figés sur le collodion, gardant la mémoire précieuse des jours heureux.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto items-center">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center group"
          >
            <div className="relative vintage-frame transition-transform duration-700 hover:scale-[1.03] hover:-translate-y-2 cursor-pointer">
              {/* Photo holder corners */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-foreground/30"></div>
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-foreground/30"></div>
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-foreground/30"></div>
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-foreground/30"></div>
              
              <img 
                src={img.src} 
                alt={img.caption}
                className="w-64 h-80 object-cover filter sepia-[0.3] contrast-110 brightness-95 transition-all duration-700 group-hover:sepia-0 group-hover:brightness-100"
                onError={(e) => {
                  e.currentTarget.src = `https://images.unsplash.com/photo-${1500000000000 + idx}?q=80&w=400&auto=format&fit=crop&sepia=1`;
                }}
              />
              
              {/* Overlay sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
            
            <div className="mt-8 relative">
              <p className="font-handwriting text-4xl text-burgundy/90 text-center transform -rotate-2 drop-shadow-sm">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

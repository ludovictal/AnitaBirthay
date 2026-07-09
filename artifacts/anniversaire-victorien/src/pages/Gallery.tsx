export default function Gallery() {
  const images = [
    { src: '/gallery-1.png', caption: 'Le grand bal d\'été, 1894' },
    { src: '/gallery-2.png', caption: 'L\'art de la correspondance' },
    { src: '/gallery-3.png', caption: 'Le boudoir aux secrets' }
  ];

  return (
    <div className="space-y-12 py-8 animate-in zoom-in-95 duration-1000">
      <header className="text-center mb-16">
        <h2 className="font-title text-3xl md:text-4xl text-burgundy mb-4">Galerie des Souvenirs</h2>
        <p className="italic text-foreground/60 max-w-md mx-auto">
          Des instants figés sur le collodion, gardant la mémoire des jours heureux.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 max-w-5xl mx-auto items-center">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col items-center ${idx === 2 ? 'md:col-span-2' : ''}`}
          >
            <div className="relative group">
              {/* Ornate Frame */}
              <div className="absolute inset-[-12px] border-4 border-double border-gold/40 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
              
              <img 
                src={img.src} 
                alt={img.caption}
                className="w-56 h-72 object-cover medallion filter sepia-[0.4] contrast-125 brightness-90 transition-all duration-700 group-hover:sepia-0 group-hover:brightness-100"
                onError={(e) => {
                  e.currentTarget.src = `https://images.unsplash.com/photo-${1500000000000 + idx}?q=80&w=400&auto=format&fit=crop&sepia=1`;
                }}
              />
            </div>
            
            <p className="mt-8 font-handwriting text-3xl text-burgundy/90 text-center transform -rotate-2">
              {img.caption}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

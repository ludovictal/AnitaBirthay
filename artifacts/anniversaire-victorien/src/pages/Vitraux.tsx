import { useState } from 'react';
import BookModal from '../components/BookModal';

export default function Vitraux() {
  const [activeTheme, setActiveTheme] = useState<number | null>(null);

  // Generating a list of 12 similar but distinct images for each theme using unique query params for unsplash fallback, 
  // mixed with the custom generated images where applicable.
  const themes = [
    { 
      id: 1, 
      span: 'col-span-12 md:col-span-8 row-span-2', 
      src: '/album-robe-1.jpg', 
      caption: 'La splendeur de la soie',
      title: 'Collection Soie & Velours',
      accent: 'amethyst',
      sparkleClass: 'theme-sparkle-purple',
      images: [
        '/album-robe-1.jpg', '/album-robe-2.jpg', '/album-robe-3.jpg', '/album-robe-4.jpg',
        '/album-robe-5.jpg', '/album-robe-6.jpg', '/album-robe-7.jpg', '/album-robe-8.jpg',
        '/album-robe-9.jpg', '/album-robe-10.jpg', '/album-robe-11.jpg', '/album-robe-12.jpg',
      ]
    },
    { 
      id: 2, 
      span: 'col-span-6 md:col-span-4 row-span-1', 
      src: '/album-vitrail-1.jpg', 
      caption: 'Éclats de lumière',
      title: 'Lumières Célestes',
      accent: 'gold',
      sparkleClass: 'theme-sparkle-gold',
      images: [
        '/album-vitrail-1.jpg', '/album-vitrail-2.jpg', '/album-vitrail-3.jpg', '/album-vitrail-4.jpg',
        '/album-vitrail-5.jpg', '/album-vitrail-6.jpg', '/album-vitrail-7.jpg', '/album-vitrail-8.jpg',
        '/album-vitrail-9.jpg', '/album-vitrail-10.jpg', '/album-vitrail-11.jpg', '/album-vitrail-12.jpg',
      ]
    },
    { 
      id: 3, 
      span: 'col-span-6 md:col-span-4 row-span-1', 
      src: '/album-joyau-1.jpg', 
      caption: 'Précieux joyau',
      title: 'Joyaux de la Couronne',
      accent: 'emerald',
      sparkleClass: 'theme-sparkle-emerald',
      hasEasterEgg: true,
      // ponytail: flat list of WhatsApp photos; no gallery CMS
      images: [
        '/album-joyau-1.jpg', '/album-joyau-2.jpg', '/album-joyau-3.jpg', '/album-joyau-4.jpg',
        '/album-joyau-5.jpg', '/album-joyau-6.jpg', '/album-joyau-7.jpg', '/album-joyau-8.jpg',
        '/album-joyau-9.jpg', '/album-joyau-10.jpg', '/album-joyau-11.jpg', '/album-joyau-12.jpg',
        '/album-joyau-13.jpg', '/album-joyau-14.jpg', '/album-joyau-15.jpg', '/album-joyau-16.jpg',
      ]
    },
    { 
      id: 4, 
      span: 'col-span-12 md:col-span-6 row-span-1', 
      src: '/album-tiare-1.jpg', 
      caption: 'Majesté',
      title: 'Héritage Royal',
      accent: 'gold-light',
      sparkleClass: 'theme-sparkle-diamond',
      images: [
        '/album-tiare-1.jpg', '/album-tiare-2.jpg', '/album-tiare-3.jpg', '/album-tiare-4.jpg',
        '/album-tiare-5.jpg', '/album-tiare-6.jpg', '/album-tiare-7.jpg', '/album-tiare-8.jpg',
        '/album-tiare-9.jpg', '/album-tiare-10.jpg', '/album-tiare-11.jpg', '/album-tiare-12.jpg',
      ]
    },
    { 
      id: 5, 
      span: 'col-span-12 md:col-span-6 row-span-1', 
      src: '/album-sceau-1.jpg', 
      caption: 'Le Sceau du Roi',
      title: 'Sceaux et Serments',
      accent: 'red-900', // mapped to a bordeaux feel via CSS
      sparkleClass: 'theme-sparkle-crimson',
      images: [
        '/album-sceau-1.jpg', '/album-sceau-2.jpg', '/album-sceau-3.jpg', '/album-sceau-4.jpg',
        '/album-sceau-5.jpg', '/album-sceau-6.jpg', '/album-sceau-7.jpg', '/album-sceau-8.jpg',
        '/album-sceau-9.jpg', '/album-sceau-10.jpg', '/album-sceau-11.jpg', '/album-sceau-12.jpg',
      ]
    },
  ];

  return (
    <div className="space-y-16 py-8 animate-in zoom-in-[0.98] duration-1000">
      <header className="text-center mb-16 relative">
        <h2 className="font-title text-4xl md:text-5xl mb-4 drop-shadow-sm uppercase tracking-widest">
          <span className="text-gradient-gold">Les Vitraux</span>
        </h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-16 bg-emerald/50"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-emerald">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" strokeWidth="1" />
          </svg>
          <div className="h-[1px] w-16 bg-emerald/50"></div>
        </div>
        <p className="italic text-xl text-pearl/70 max-w-xl mx-auto font-serif">
          Cliquez sur un vitrail pour ouvrir l'album de ses souvenirs et découvrir les photos qui le composent.
        </p>
      </header>

      <div className="vitrail-grid max-w-5xl mx-auto auto-rows-[250px]">
        {themes.map((item) => (
          <button 
            key={item.id} 
            className={`relative group overflow-hidden faceted-frame cursor-pointer ${item.span} text-left block w-full h-full focus-visible:outline-gold focus-visible:outline-2`}
            onClick={() => setActiveTheme(item.id)}
            aria-label={`Ouvrir l'album : ${item.caption}`}
          >
            <div className="absolute inset-0 bg-sapphire-dark z-0"></div>
            <img 
              src={item.src} 
              alt={item.caption}
              className="w-full h-full object-cover relative z-10 transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100 mix-blend-screen"
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-${1500000000000 + item.id}?q=80&w=800&auto=format&fit=crop`;
              }}
            />
            
            {/* Hover overlay with mystical pulse */}
            <div className="absolute inset-0 bg-sapphire-dark/40 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
            <div className={`absolute inset-0 border-[3px] border-transparent group-hover:border-gold/50 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 scale-95 group-hover:scale-100`}></div>

            {/* Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-sapphire-dark via-sapphire-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 flex flex-col justify-end p-6">
              <span className="font-title text-gold text-xs tracking-[0.2em] uppercase mb-2 block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Ouvrir l'album</span>
              <p className="font-serif italic text-pearl text-xl drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                {item.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {activeTheme !== null && (
        <BookModal 
          isOpen={true} 
          onClose={() => setActiveTheme(null)} 
          theme={themes.find(t => t.id === activeTheme)!} 
        />
      )}
    </div>
  );
}

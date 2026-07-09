import { useState } from 'react';

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-16 animate-in fade-in duration-1000 relative">
      
      {!isOpen ? (
        <div className="flex flex-col items-center space-y-12 max-w-lg mx-auto text-center">
          <div className="font-title text-3xl text-burgundy drop-shadow-sm">Missive Confidentielle</div>
          
          <p className="italic text-xl text-foreground/80 font-serif leading-relaxed">
            Une lettre scellée vous est personnellement adressée. Veuillez briser la cire pour en révéler le contenu.
          </p>
          
          <button
            type="button"
            className="relative group p-16 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-8 rounded-sm mt-8"
            onClick={() => setIsOpen(true)}
            aria-label="Briser le sceau de cire pour lire la lettre"
          >
            {/* Envelope representation */}
            <div className="absolute inset-0 bg-ivory border-[3px] border-gold/30 shadow-2xl rounded-sm transform group-hover:-translate-y-3 transition-transform duration-700">
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 w-full h-[60%] bg-white/70 border-b border-gold/30 shadow-sm" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}></div>
              {/* Envelope folds */}
              <div className="absolute bottom-0 left-0 w-full h-full border-t border-gold/10" style={{ clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)' }}></div>
            </div>
            
            {/* Wax Seal */}
            <img 
              src="/wax-seal.png" 
              alt="Sceau de cire" 
              className="w-32 h-32 object-contain relative z-10 wax-seal mx-auto drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.outerHTML = '<div class="w-24 h-24 bg-burgundy rounded-full mx-auto relative z-10 wax-seal flex items-center justify-center shadow-2xl border-2 border-red-950"><span class="text-white font-title text-4xl">E</span></div>';
              }}
            />
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto bg-ivory/90 lace-border p-10 md:p-20 shadow-2xl animate-in zoom-in-95 duration-1000 relative">
          
          {/* Subtle floral watermark */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/flower.png')] bg-no-repeat bg-center bg-[length:50%]"></div>
          
          <div className="text-right font-serif text-lg mb-16 text-burgundy italic">
            Ce 24 Octobre,<br/>
            Depuis le Petit Salon
          </div>

          <div className="space-y-8 font-handwriting text-4xl leading-relaxed text-foreground md:text-5xl relative z-10">
            <p className="text-5xl md:text-6xl text-burgundy mb-8">Ma très chère,</p>
            
            <p>
              Les mots me manquent souvent pour exprimer la profondeur de l'affection que je vous porte, mais en ce jour singulier, ma plume refuse de se taire. 
            </p>
            
            <p>
              Une année de plus s'ajoute au magnifique roman de votre vie. Que ce nouveau chapitre soit empli de joies inattendues, de thés fumants partagés au crépuscule, et de ces éclats de rire dont vous seule avez le secret.
            </p>
            
            <p>
              Le monde est infiniment plus poétique depuis que vous l'habitez. Joyeux et radieux anniversaire.
            </p>
            
            <p className="text-right mt-16 pt-12 border-t border-gold/20">
              Avec toute mon adoration,<br/>
              <span className="text-emerald text-6xl md:text-7xl inline-block mt-6 transform -rotate-2 drop-shadow-sm">Votre Dévoué.</span>
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

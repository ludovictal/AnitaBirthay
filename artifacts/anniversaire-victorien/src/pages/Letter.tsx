import { useState } from 'react';

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-full flex flex-col items-center justify-center py-12 animate-in fade-in duration-1000">
      
      {!isOpen ? (
        <div className="flex flex-col items-center space-y-8 max-w-md mx-auto text-center">
          <p className="italic text-lg text-foreground/70">
            Une missive vous est adressée. Veuillez briser le sceau pour la révéler.
          </p>
          
          <button
            type="button"
            className="relative group p-12 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-sm"
            onClick={() => setIsOpen(true)}
            aria-label="Briser le sceau de cire pour lire la lettre"
          >
            {/* Envelope representation */}
            <div className="absolute inset-0 bg-ivory border-2 border-gold/40 shadow-xl rounded-sm transform group-hover:-translate-y-2 transition-transform duration-500">
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/50 border-b border-gold/20" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}></div>
            </div>
            
            {/* Wax Seal */}
            <img 
              src="/wax-seal.png" 
              alt="Sceau de cire" 
              className="w-24 h-24 object-contain relative z-10 wax-seal mx-auto"
              onError={(e) => {
                e.currentTarget.outerHTML = '<div class="w-20 h-20 bg-burgundy rounded-full mx-auto relative z-10 wax-seal flex items-center justify-center shadow-lg border border-red-900"><span class="text-white font-title text-2xl">E</span></div>';
              }}
            />
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto bg-ivory/80 lace-border p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-700">
          <div className="text-right font-serif text-sm mb-12 text-burgundy">
            Ce 24 Octobre,<br/>
            Depuis le Petit Salon
          </div>

          <div className="space-y-6 font-handwriting text-3xl leading-relaxed text-foreground md:text-4xl">
            <p>Ma très chère,</p>
            
            <p>
              Les mots me manquent souvent pour exprimer la profondeur de l'affection que je vous porte, mais en ce jour singulier, ma plume refuse de se taire. 
            </p>
            
            <p>
              Une année de plus s'ajoute au magnifique roman de votre vie. Que ce nouveau chapitre soit empli de joies inattendues, de thés fumants partagés au crépuscule, et de ces éclats de rire dont vous seule avez le secret.
            </p>
            
            <p>
              Le monde est infiniment plus poétique depuis que vous l'habitez. Joyeux et radieux anniversaire.
            </p>
            
            <p className="text-right mt-12 pt-8">
              Avec toute mon adoration,<br/>
              <span className="text-emerald text-5xl inline-block mt-4">Votre Dévoué.</span>
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

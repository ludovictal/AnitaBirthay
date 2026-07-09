import { useState } from 'react';

export default function Diary() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-16 py-8 animate-in slide-in-from-bottom-10 fade-in duration-1000">
      
      <header className="text-center mb-12">
        <h2 className="font-title text-3xl md:text-4xl text-burgundy mb-4">Journal & Souvenirs</h2>
        <div className="h-[1px] w-32 bg-gold/50 mx-auto"></div>
        <p className="mt-4 italic text-foreground/60">Extraits choisis des carnets d'autrefois.</p>
      </header>

      {/* Entry 1 */}
      <article className="relative max-w-2xl mx-auto lace-border bg-ivory/60">
        <div className="p-8 md:p-12">
          <div className="text-right mb-6 text-sm font-semibold tracking-widest text-burgundy">
            Mardi, au crépuscule
          </div>
          
          <div className="space-y-4 text-lg leading-loose text-foreground/85">
            <p className="first-letter:font-title first-letter:text-5xl first-letter:text-burgundy first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              Aujourd'hui encore, je repense à ce fameux thé pris sous la véranda. La porcelaine tintait, et malgré la pluie battante qui s'acharnait sur les vitres, un soleil radieux irradiait de son sourire. Elle a cette faculté rare de transformer les après-midis d'automne en printemps éternels.
            </p>
            <p>
              Nous avons parlé des heures, de tout, de rien, de l'avenir surtout. J'ai précieusement consigné ses mots. Ils ont la saveur du miel et la force de l'océan.
            </p>
          </div>
          
          <div className="mt-8 text-right font-handwriting text-3xl text-emerald/80">
            A.
          </div>
        </div>
      </article>

      {/* Entry 2 */}
      <article className="relative max-w-2xl mx-auto lace-border bg-ivory/60">
        <div className="p-8 md:p-12">
          <div className="text-right mb-6 text-sm font-semibold tracking-widest text-burgundy">
            Un matin d'Hiver
          </div>
          
          <div className="space-y-4 text-lg leading-loose text-foreground/85">
            <p>
              Le givre recouvrait les rosiers, mais son éclat de rire a suffi à réchauffer le boudoir. Elle portait cette étole bordeaux qui fait ressortir l'ivoire de son teint. J'ai surpris son regard perdu vers l'horizon, sans doute rêvait-elle déjà de nouvelles aventures, de contrées lointaines ou de vers inachevés.
            </p>
            <p>
              Que cette nouvelle année lui apporte les mystères qu'elle chérit tant.
            </p>
          </div>
          
          <div className="mt-8 text-right font-handwriting text-3xl text-emerald/80">
            C.
          </div>
        </div>
      </article>

      {/* Easter Egg: Drawer */}
      <div className="flex justify-center pt-8">
        <div className="relative">
          <button
            type="button"
            className="px-8 py-3 border-2 border-gold/60 text-burgundy font-title uppercase tracking-widest text-sm cursor-pointer hover:bg-gold/10 transition-colors shadow-inner flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
            onClick={() => setDrawerOpen((open) => !open)}
            aria-expanded={drawerOpen}
            aria-controls="drawer-content"
          >
            <span>Tiroir Secret</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="opacity-50">
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div
            id="drawer-content"
            role="status"
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-4 bg-white border border-sepia shadow-xl transition-all duration-500 z-20 before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white ${drawerOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-[-10px] pointer-events-none'}`}
          >
            <div className="border border-gold/30 p-4 text-center">
              <p className="font-handwriting text-2xl text-burgundy">Billet doux</p>
              <p className="text-sm mt-2">N'oublie jamais la promesse faite sous le grand chêne.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

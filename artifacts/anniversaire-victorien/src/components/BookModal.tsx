import { useState, useEffect, useRef, useCallback } from 'react';

export interface BookTheme {
  id: number;
  title: string;
  caption: string;
  accent: string;
  sparkleClass: string;
  images: string[];
  hasEasterEgg?: boolean;
}

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: BookTheme;
}

const ACCENT_STYLES: Record<string, { border: string; glow: string; text: string }> = {
  amethyst: { border: 'border-amethyst-light/60', glow: 'shadow-[0_0_60px_rgba(155,89,182,0.35)]', text: 'text-amethyst-light' },
  gold: { border: 'border-gold/60', glow: 'shadow-[0_0_60px_rgba(241,196,15,0.35)]', text: 'text-gold' },
  emerald: { border: 'border-emerald/60', glow: 'shadow-[0_0_60px_rgba(46,204,113,0.35)]', text: 'text-emerald' },
  'gold-light': { border: 'border-gold-light/60', glow: 'shadow-[0_0_60px_rgba(236,240,241,0.35)]', text: 'text-gold-light' },
  'red-900': { border: 'border-red-900/60', glow: 'shadow-[0_0_60px_rgba(231,76,60,0.35)]', text: 'text-red-400' },
};

export default function BookModal({ isOpen, onClose, theme }: BookModalProps) {
  const [pairIndex, setPairIndex] = useState(0);
  const [turning, setTurning] = useState<'next' | 'prev' | null>(null);
  const [easterEggRevealed, setEasterEggRevealed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const pageCount = theme.images.length;
  const pairCount = Math.ceil(pageCount / 2);
  const accent = ACCENT_STYLES[theme.accent] ?? ACCENT_STYLES.gold;

  useEffect(() => {
    if (isOpen) {
      setPairIndex(0);
      setEasterEggRevealed(false);
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      // Move focus into the dialog once it has mounted.
      const raf = requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    if (lastFocusedRef.current) {
      lastFocusedRef.current.focus();
      lastFocusedRef.current = null;
    }
    return undefined;
  }, [isOpen, theme.id]);

  const goNext = useCallback(() => {
    if (pairIndex >= pairCount - 1 || turning) return;
    setTurning('next');
    setTimeout(() => {
      setPairIndex((p) => Math.min(p + 1, pairCount - 1));
      setTurning(null);
    }, 600);
  }, [pairIndex, pairCount, turning]);

  const goPrev = useCallback(() => {
    if (pairIndex <= 0 || turning) return;
    setTurning('prev');
    setTimeout(() => {
      setPairIndex((p) => Math.max(p - 1, 0));
      setTurning(null);
    }, 600);
  }, [pairIndex, turning]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();

      if (e.key === 'Tab') {
        const container = dialogRef.current;
        if (!container) return;
        const focusable = container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen) return null;

  const leftSrc = theme.images[pairIndex * 2];
  const rightSrc = theme.images[pairIndex * 2 + 1];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) goNext();
    if (delta > 50) goPrev();
    touchStartX.current = null;
  };

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-sapphire-dark/90 backdrop-blur-md p-4 md:p-10 animate-in fade-in duration-500"
      role="dialog"
      aria-modal="true"
      aria-label={`Album : ${theme.title}`}
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-pearl/70 hover:text-gold font-title text-sm uppercase tracking-widest border border-pearl/30 hover:border-gold px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold transition-colors"
        aria-label="Fermer l'album"
      >
        Fermer ✕
      </button>

      <div
        className={`relative w-full max-w-4xl book-open-anim ${accent.glow}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Theme particle overlay */}
        <div className={`absolute -inset-6 pointer-events-none rounded-2xl ${theme.sparkleClass}`}></div>

        <header className="text-center mb-6 relative z-10">
          <h3 className={`font-title text-2xl md:text-3xl uppercase tracking-widest drop-shadow-md ${accent.text}`}>
            {theme.title}
          </h3>
          <p className="text-pearl/60 font-serif italic text-sm mt-1">
            Page {pairIndex + 1} sur {pairCount}
          </p>
        </header>

        {/* The Book */}
        <div
          className={`relative flex bg-gradient-to-b from-[#3a2a12] to-[#1c1207] border-4 ${accent.border} rounded-md shadow-2xl overflow-hidden`}
          style={{ perspective: '2000px' }}
        >
          {/* Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 bg-black/40 z-20 shadow-[0_0_15px_rgba(0,0,0,0.6)]"></div>

          {[leftSrc, rightSrc].map((src, i) => (
            <div
              key={`${pairIndex}-${i}`}
              className={`w-1/2 aspect-[3/4] relative bg-pearl/5 flex items-center justify-center p-3 md:p-6 ${
                turning === 'next' ? 'animate-page-turn-next' : turning === 'prev' ? 'animate-page-turn-prev' : ''
              }`}
            >
              <div className="relative w-full h-full border border-gold/30 overflow-hidden">
                {src ? (
                  <img
                    src={src}
                    alt={`${theme.caption} — page ${pairIndex * 2 + i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-pearl/30 font-serif italic text-sm">
                    [emplacement photo]
                  </div>
                )}
              </div>

              {/* Easter egg hidden in the 3rd theme's first right page */}
              {theme.hasEasterEgg && i === 1 && pairIndex === 0 && (
                <button
                  type="button"
                  onClick={() => setEasterEggRevealed((r) => !r)}
                  aria-expanded={easterEggRevealed}
                  aria-controls="vitrail-easter-egg"
                  aria-label="Facette scintillante, cliquez pour révéler un indice"
                  className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-emerald/60 border border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold animate-halo"
                />
              )}
            </div>
          ))}
        </div>

        {theme.hasEasterEgg && (
          <div
            id="vitrail-easter-egg"
            role="status"
            className={`mt-4 mx-auto max-w-md text-center border border-gold/40 bg-sapphire/80 p-4 transition-all duration-500 ${
              easterEggRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden'
            }`}
          >
            <p className="font-title text-gold text-xs uppercase tracking-widest mb-1">Éclat Caché</p>
            <p className="font-serif text-pearl italic text-sm">
              [Indice du vitrail : "Dans le reflet de l'émeraude se lit l'avenir de la reine."]
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-6 relative z-10">
          <button
            type="button"
            onClick={goPrev}
            disabled={pairIndex === 0}
            className="font-title text-sm uppercase tracking-widest text-pearl/70 hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed border border-pearl/20 hover:border-gold px-5 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold transition-colors"
            aria-label="Page précédente"
          >
            ← Précédent
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={pairIndex >= pairCount - 1}
            className="font-title text-sm uppercase tracking-widest text-pearl/70 hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed border border-pearl/20 hover:border-gold px-5 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold transition-colors"
            aria-label="Page suivante"
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
}

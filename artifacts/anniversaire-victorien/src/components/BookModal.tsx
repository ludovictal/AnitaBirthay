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

const TURN_MS = 800;

function PageFace({
  src,
  alt,
}: {
  src: string | undefined;
  alt: string;
}) {
  return (
    <div className="relative w-full h-full border border-gold/30 overflow-hidden bg-[#1a1512]">
      {src ? (
        <img
          src={src}
          alt={alt}
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
  );
}

export default function BookModal({ isOpen, onClose, theme }: BookModalProps) {
  const [pairIndex, setPairIndex] = useState(0);
  const [turning, setTurning] = useState<'next' | 'prev' | null>(null);
  const [easterEggRevealed, setEasterEggRevealed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const turnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pageCount = theme.images.length;
  const pairCount = Math.ceil(pageCount / 2);
  const accent = ACCENT_STYLES[theme.accent] ?? ACCENT_STYLES.gold;

  useEffect(() => {
    if (isOpen) {
      setPairIndex(0);
      setTurning(null);
      setEasterEggRevealed(false);
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      const raf = requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    if (turnTimerRef.current) clearTimeout(turnTimerRef.current);
    if (lastFocusedRef.current) {
      lastFocusedRef.current.focus();
      lastFocusedRef.current = null;
    }
    return undefined;
  }, [isOpen, theme.id]);

  const goNext = useCallback(() => {
    if (pairIndex >= pairCount - 1 || turning) return;
    setTurning('next');
    turnTimerRef.current = setTimeout(() => {
      setPairIndex((p) => Math.min(p + 1, pairCount - 1));
      setTurning(null);
    }, TURN_MS);
  }, [pairIndex, pairCount, turning]);

  const goPrev = useCallback(() => {
    if (pairIndex <= 0 || turning) return;
    setTurning('prev');
    turnTimerRef.current = setTimeout(() => {
      setPairIndex((p) => Math.max(p - 1, 0));
      setTurning(null);
    }, TURN_MS);
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

  const curLeft = theme.images[pairIndex * 2];
  const curRight = theme.images[pairIndex * 2 + 1];
  const nextLeft = theme.images[(pairIndex + 1) * 2];
  const nextRight = theme.images[(pairIndex + 1) * 2 + 1];
  const prevLeft = theme.images[(pairIndex - 1) * 2];
  const prevRight = theme.images[(pairIndex - 1) * 2 + 1];

  // During a turn, base spread already shows the destination underneath the flipping leaf.
  const baseLeft = turning === 'next' ? curLeft : turning === 'prev' ? prevLeft : curLeft;
  const baseRight = turning === 'next' ? nextRight : turning === 'prev' ? curRight : curRight;

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
        <div className={`absolute -inset-6 pointer-events-none rounded-2xl ${theme.sparkleClass}`}></div>

        <header className="text-center mb-6 relative z-10">
          <h3 className={`font-title text-2xl md:text-3xl uppercase tracking-widest drop-shadow-md ${accent.text}`}>
            {theme.title}
          </h3>
          <p className="text-pearl/60 font-serif italic text-sm mt-1">
            Page {pairIndex + 1} sur {pairCount}
          </p>
        </header>

        <div
          className={`book-stage relative aspect-[3/2] bg-gradient-to-b from-[#3a2a12] to-[#1c1207] border-4 ${accent.border} rounded-md shadow-2xl`}
        >
          {/* Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-3 -translate-x-1/2 bg-black/40 z-30 shadow-[0_0_15px_rgba(0,0,0,0.6)] pointer-events-none" />

          {/* Base spread (destination peeks under the flipping leaf) */}
          <div className="absolute inset-y-0 left-0 w-1/2 p-3 md:p-6">
            <PageFace
              src={baseLeft}
              alt={`${theme.caption} — page ${
                (turning === 'prev' ? pairIndex - 1 : pairIndex) * 2 + 1
              }`}
            />
          </div>
          <div className="absolute inset-y-0 right-0 w-1/2 p-3 md:p-6">
            <PageFace
              src={baseRight}
              alt={`${theme.caption} — page ${
                (turning === 'next' ? pairIndex + 1 : pairIndex) * 2 + 2
              }`}
            />
            {theme.hasEasterEgg && pairIndex === 0 && !turning && (
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

          {/* Flipping leaf — next: right page turns left over the spine */}
          {turning === 'next' && (
            <div className="book-leaf book-leaf-right book-leaf-flip-next z-20">
              <div className="book-leaf-face book-leaf-front p-3 md:p-6">
                <PageFace src={curRight} alt={`${theme.caption} — page ${pairIndex * 2 + 2}`} />
              </div>
              <div className="book-leaf-face book-leaf-back p-3 md:p-6">
                <PageFace src={nextLeft} alt={`${theme.caption} — page ${(pairIndex + 1) * 2 + 1}`} />
              </div>
            </div>
          )}

          {/* Flipping leaf — prev: left page turns right over the spine */}
          {turning === 'prev' && (
            <div className="book-leaf book-leaf-left book-leaf-flip-prev z-20">
              <div className="book-leaf-face book-leaf-front p-3 md:p-6">
                <PageFace src={curLeft} alt={`${theme.caption} — page ${pairIndex * 2 + 1}`} />
              </div>
              <div className="book-leaf-face book-leaf-back p-3 md:p-6">
                <PageFace src={prevRight} alt={`${theme.caption} — page ${(pairIndex - 1) * 2 + 2}`} />
              </div>
            </div>
          )}
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

        <div className="flex items-center justify-center gap-8 mt-6 relative z-10">
          <button
            type="button"
            onClick={goPrev}
            disabled={pairIndex === 0 || !!turning}
            className="font-title text-sm uppercase tracking-widest text-pearl/70 hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed border border-pearl/20 hover:border-gold px-5 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold transition-colors"
            aria-label="Page précédente"
          >
            ← Précédent
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={pairIndex >= pairCount - 1 || !!turning}
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

/**
 * A brief, decorative celebration that plays once whenever the page mounts
 * (the parent remounts this via `key={location}` on route change).
 * Purely ornamental: aria-hidden and pointer-events-none so it never
 * interferes with keyboard navigation or screen readers.
 */
export default function BirthdayFlourish() {
  const sparkles = Array.from({ length: 10 });

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {/* Banner text sweeping across the top */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flourish-banner">
        <div className="flex items-center gap-3 px-6 py-2 bg-sapphire-dark/70 border border-gold/40 backdrop-blur-sm shadow-[0_0_25px_rgba(255,215,0,0.35)] rounded-full">
          <span className="text-gold text-sm">✦</span>
          <span className="font-title text-gold text-xs md:text-sm uppercase tracking-[0.35em] whitespace-nowrap">
            Joyeux Anniversaire, Princesse
          </span>
          <span className="text-gold text-sm">✦</span>
        </div>
      </div>

      {/* Sparkle burst */}
      {sparkles.map((_, i) => {
        const angle = (360 / sparkles.length) * i;
        const delay = (i % 5) * 0.08;
        const sparkleStyle = {
          '--angle': `${angle}deg`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties;

        return (
          <span key={i} className="flourish-sparkle absolute top-1/2 left-1/2 text-gold" style={sparkleStyle}>
            ✦
          </span>
        );
      })}
    </div>
  );
}

/**
 * Purely decorative "old film reel" arrival treatment: a brief golden
 * light-leak sweep plus a continuous, very subtle film-grain flicker.
 * Remounted via `key={location}` by the parent so the light leak replays
 * on every navigation. aria-hidden + pointer-events-none throughout so it
 * never affects focus order, screen readers, or clicks.
 */
export default function VintageOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {/* Continuous film grain */}
      <div className="grain-layer" />

      {/* One-shot light leak sweep on arrival */}
      <div className="light-leak" />
    </div>
  );
}

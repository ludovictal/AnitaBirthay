import { useMemo } from 'react';

const COLORS = ['hsl(45,85%,60%)', 'hsl(222,65%,45%)', 'hsl(275,55%,65%)', 'hsl(210,20%,96%)'];

/**
 * An elegant, confined confetti burst — not a full-screen storm.
 * Remount with a changing `burstKey` to replay it. Purely decorative.
 */
export default function Confetti({ burstKey }: { burstKey: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 0.5,
        duration: 2.2 + Math.random() * 1.4,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 80,
        size: 6 + Math.random() * 5,
      })),
    [burstKey]
  );

  if (burstKey === 0) return null;

  return (
    <div
      key={burstKey}
      className="pointer-events-none absolute inset-0 overflow-hidden z-20"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute top-0 rounded-[1px]"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.4,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--drift': `${p.drift}px`,
              '--rotate': `${p.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

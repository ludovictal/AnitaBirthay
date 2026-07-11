import { useMemo } from 'react';

// Rich festive palette: gold, sapphire, amethyst, rose, emerald, pearl
const COLORS = [
  'hsl(45,90%,62%)',   // gold
  'hsl(48,100%,75%)',  // gold-light
  'hsl(222,65%,55%)',  // sapphire
  'hsl(275,60%,70%)',  // amethyst
  'hsl(340,75%,65%)',  // rose / festive pink
  'hsl(160,55%,55%)',  // emerald
  'hsl(210,20%,96%)',  // pearl
  'hsl(30,90%,60%)',   // amber
];

// Shape classes: rect, square, circle, long-strip, diamond
type Shape = 'rect' | 'square' | 'circle' | 'strip' | 'diamond';
const SHAPES: Shape[] = ['rect', 'square', 'circle', 'strip', 'diamond'];

interface Piece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
  drift: number;
  size: number;
  shape: Shape;
  sway: number;
  opacity: number;
}

/**
 * Full-page festive confetti — fixed overlay covering the whole viewport.
 * Remount with a changing `burstKey` to replay. Purely decorative.
 */
export default function Confetti({ burstKey }: { burstKey: number }) {
  const pieces: Piece[] = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.8,
        duration: 3.5 + Math.random() * 2.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: Math.random() * 720 - 360,
        drift: (Math.random() - 0.5) * 160,
        size: 7 + Math.random() * 9,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        sway: (Math.random() - 0.5) * 40,
        opacity: 0.75 + Math.random() * 0.25,
      })),
    [burstKey],
  );

  if (burstKey === 0) return null;

  return (
    <div
      key={burstKey}
      className="confetti-fullpage pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => {
        const base: React.CSSProperties = {
          left: `${p.left}%`,
          backgroundColor: p.color,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          '--drift': `${p.drift}px`,
          '--rotate': `${p.rotate}deg`,
          '--sway': `${p.sway}px`,
          opacity: p.opacity,
        } as React.CSSProperties;

        if (p.shape === 'rect') {
          return (
            <span
              key={p.id}
              className="confetti-piece absolute top-0"
              style={{ ...base, width: p.size, height: p.size * 0.45, borderRadius: 2 }}
            />
          );
        }
        if (p.shape === 'square') {
          return (
            <span
              key={p.id}
              className="confetti-piece absolute top-0"
              style={{ ...base, width: p.size, height: p.size, borderRadius: 2 }}
            />
          );
        }
        if (p.shape === 'circle') {
          return (
            <span
              key={p.id}
              className="confetti-piece absolute top-0"
              style={{ ...base, width: p.size, height: p.size, borderRadius: '50%' }}
            />
          );
        }
        if (p.shape === 'strip') {
          return (
            <span
              key={p.id}
              className="confetti-piece absolute top-0"
              style={{ ...base, width: p.size * 0.3, height: p.size * 1.8, borderRadius: 1 }}
            />
          );
        }
        // diamond
        return (
          <span
            key={p.id}
            className="confetti-piece absolute top-0"
            style={{
              ...base,
              width: p.size,
              height: p.size,
              borderRadius: 2,
              transform: 'rotate(45deg)',
            }}
          />
        );
      })}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import Confetti from './Confetti';

// 18th birthday — kept in sync with the "18 ANS" milestone on the home page.
const TARGET_DATE = new Date('2026-07-17T00:00:00');

function getRemaining() {
  const diff = TARGET_DATE.getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);
  return { days, hours, minutes, seconds, arrived: diff <= 0 };
}

function Unit({ value, label, pulseKey }: { value: number; label: string; pulseKey?: number }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[3.5rem]">
      <span
        key={pulseKey}
        className="font-title text-3xl md:text-5xl text-gold drop-shadow-[0_0_12px_rgba(255,215,0,0.5)] countdown-digit"
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-pearl/60">{label}</span>
    </div>
  );
}

/**
 * A live countdown to the birthday. Breathes gently at all times, the "days"
 * digit briefly scintillates whenever it ticks over to a new day, and a
 * confined confetti burst celebrates the moment it reaches zero.
 */
export default function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [burstKey, setBurstKey] = useState(0);
  const hasCelebrated = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (remaining.arrived && !hasCelebrated.current) {
      hasCelebrated.current = true;
      setBurstKey((k) => k + 1);
    }
  }, [remaining.arrived]);

  return (
    <div className="relative flex flex-col items-center gap-6">
      <Confetti burstKey={burstKey} />

      {remaining.arrived ? (
        <p className="font-title text-gold text-xl md:text-2xl tracking-widest countdown-pulse text-center">
          ✦ Le jour est arrivé, Princesse ✦
        </p>
      ) : (
        <div className="flex items-center gap-3 md:gap-6 countdown-pulse">
          <Unit value={remaining.days} label={remaining.days === 1 ? 'jour' : 'jours'} pulseKey={remaining.days} />
          <span className="text-gold/40 text-2xl md:text-4xl -mt-4">:</span>
          <Unit value={remaining.hours} label="heures" />
          <span className="text-gold/40 text-2xl md:text-4xl -mt-4">:</span>
          <Unit value={remaining.minutes} label="min" />
          <span className="text-gold/40 text-2xl md:text-4xl -mt-4">:</span>
          <Unit value={remaining.seconds} label="sec" />
        </div>
      )}

      <button
        type="button"
        onClick={() => setBurstKey((k) => k + 1)}
        className="text-xs uppercase tracking-[0.3em] text-gold-light/70 hover:text-gold border border-gold/30 hover:border-gold/60 rounded-full px-5 py-2 transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        ✦ Faire tomber les confettis ✦
      </button>
    </div>
  );
}

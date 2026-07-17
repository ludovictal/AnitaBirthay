import { useState, useEffect } from 'react';

export interface Memory {
  id: string;
  author: string;
  content: string;
  date: string;
}

const DEFAULT_MEMORIES: Memory[] = [
  {
    id: '1',
    author: 'Ton Favv',
    content:
      "Il y a des jours qui ressemblent à tous les autres — et puis il y a toi. Ce jour-là, le temps a décidé de s'arrêter, juste pour nous. Je l'ai gardé quelque part entre les côtes, là où les souvenirs ne vieillissent pas.",
    date: "Un jour parmi tant d'autres",
  },
];

// Local-only fallback for `vite` without the Vercel /api route.
const STORAGE_KEY = 'carnet_secret_memories';

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/api/memories');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Memory[];
        if (!cancelled) {
          setMemories(Array.isArray(data) ? data : DEFAULT_MEMORIES);
          setError(null);
        }
      } catch {
        // ponytail: keep localStorage when API is unavailable (local vite)
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          const parsed = stored ? (JSON.parse(stored) as Memory[]) : DEFAULT_MEMORIES;
          if (!cancelled) {
            setMemories(parsed.length ? parsed : DEFAULT_MEMORIES);
            setError(
              'Mode local : les vœux ne sont visibles que sur cet appareil. Sur le site en ligne, activez Vercel KV.',
            );
          }
        } catch {
          if (!cancelled) setMemories(DEFAULT_MEMORIES);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const addMemory = async (author: string, content: string) => {
    const optimistic: Memory = {
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      author,
      content,
      date: "Aujourd'hui",
    };

    try {
      const res = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created = (await res.json()) as Memory;
      setMemories((prev) => [created, ...prev.filter((m) => m.id !== created.id)]);
      setError(null);
      return created;
    } catch {
      setMemories((prev) => {
        const updated = [optimistic, ...prev];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
      setError(
        'Vœu enregistré en local uniquement. Pour le partager à tous, activez Vercel KV puis redeployez.',
      );
      return optimistic;
    }
  };

  return { memories, addMemory, loading, error };
}

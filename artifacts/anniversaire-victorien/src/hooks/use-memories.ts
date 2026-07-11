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
    content: 'Il y a des jours qui ressemblent à tous les autres — et puis il y a toi. Ce jour-là, le temps a décidé de s\'arrêter, juste pour nous. Je l\'ai gardé quelque part entre les côtes, là où les souvenirs ne vieillissent pas.',
    date: 'Un jour parmi tant d\'autres'
  }
];

// Bump this whenever DEFAULT_MEMORIES changes shape/content, so browsers
// that already cached an older default set (e.g. before it was reduced to
// a single entry) get migrated instead of showing stale data forever.
const MEMORIES_VERSION = '3';
const VERSION_KEY = 'carnet_secret_memories_version';
const STORAGE_KEY = 'carnet_secret_memories';

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && storedVersion === MEMORIES_VERSION) {
      try {
        setMemories(JSON.parse(stored));
      } catch (e) {
        setMemories(DEFAULT_MEMORIES);
      }
    } else {
      setMemories(DEFAULT_MEMORIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_MEMORIES));
      localStorage.setItem(VERSION_KEY, MEMORIES_VERSION);
    }
  }, []);

  const addMemory = (author: string, content: string) => {
    const newMemory: Memory = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      author,
      content,
      date: 'Aujourd\'hui'
    };
    setMemories((prev) => {
      const updated = [newMemory, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { memories, addMemory };
}

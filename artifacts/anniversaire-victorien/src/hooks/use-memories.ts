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
    content: '[Ecris ici ce jour parmi tant d\'autres qui a compte...]',
    date: 'Un jour parmi tant d\'autres'
  }
];

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('carnet_secret_memories');
    if (stored) {
      try {
        setMemories(JSON.parse(stored));
      } catch (e) {
        setMemories(DEFAULT_MEMORIES);
      }
    } else {
      setMemories(DEFAULT_MEMORIES);
      localStorage.setItem('carnet_secret_memories', JSON.stringify(DEFAULT_MEMORIES));
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
      localStorage.setItem('carnet_secret_memories', JSON.stringify(updated));
      return updated;
    });
  };

  return { memories, addMemory };
}

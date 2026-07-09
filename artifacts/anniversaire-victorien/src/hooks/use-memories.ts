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
    author: 'Juliette',
    content: 'Je me souviens de cette fin d\'après-midi d\'octobre où nous nous sommes perdues dans les allées du jardin botanique. La lumière dorée filtrait à travers les feuilles d\'automne, et tu m\'as fait découvrir cette petite serre abandonnée. Ton émerveillement face à la beauté simple des choses a rendu cet instant inoubliable.',
    date: 'Un jour d\'Automne'
  },
  {
    id: '2',
    author: 'Marguerite',
    content: 'Impossible d\'oublier notre escapade imprévue vers la côte. Le vent salé qui décoiffait nos chignons, tes éclats de rire résonnant plus fort que le fracas des vagues contre les falaises. Tu as ce don si précieux de transformer chaque journée ordinaire en une véritable aventure romanesque.',
    date: 'Au bord de la mer'
  },
  {
    id: '3',
    author: 'Sophie',
    content: 'Ce fameux bal d\'hiver... Tu portais cette robe de velours qui sublimait ton teint de porcelaine. Quand la valse a commencé, tous les regards étaient tournés vers toi, mais tu n\'avais d\'yeux que pour les étoiles à travers la grande verrière. Une grâce naturelle, une élégance de l\'âme qui m\'inspire chaque jour.',
    date: 'Le bal d\'Hiver'
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

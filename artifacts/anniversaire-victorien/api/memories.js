// ponytail: shared wishes via Vercel KV REST; no extra SDK
const KEY = 'carnet_secret_memories';

const DEFAULT_MEMORIES = [
  {
    id: '1',
    author: 'Ton Favv',
    content:
      "Il y a des jours qui ressemblent à tous les autres — et puis il y a toi. Ce jour-là, le temps a décidé de s'arrêter, juste pour nous. Je l'ai gardé quelque part entre les côtes, là où les souvenirs ne vieillissent pas.",
    date: "Un jour parmi tant d'autres",
  },
];

async function kv(command) {
  // Vercel KV (legacy) or Upstash Redis marketplace
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error('KV_NOT_CONFIGURED');
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`KV error ${res.status}: ${text}`);
  }
  return res.json();
}

function parseList(result) {
  const rows = result?.result;
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => {
      try {
        return typeof row === 'string' ? JSON.parse(row) : row;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      const listed = await kv(['LRANGE', KEY, '0', '-1']);
      let memories = parseList(listed);
      if (memories.length === 0) {
        // Seed default once so the Grimoire never looks empty.
        await kv(['RPUSH', KEY, JSON.stringify(DEFAULT_MEMORIES[0])]);
        memories = DEFAULT_MEMORIES;
      }
      return res.status(200).json(memories);
    }

    if (req.method === 'POST') {
      const author = String(req.body?.author ?? '').trim();
      const content = String(req.body?.content ?? '').trim();
      if (!author || !content) {
        return res.status(400).json({ error: 'author and content required' });
      }
      if (author.length > 80 || content.length > 2000) {
        return res.status(400).json({ error: 'too long' });
      }

      const memory = {
        id: crypto.randomUUID(),
        author,
        content,
        date: "Aujourd'hui",
      };
      await kv(['LPUSH', KEY, JSON.stringify(memory)]);
      return res.status(201).json(memory);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown';
    if (message === 'KV_NOT_CONFIGURED') {
      return res.status(503).json({
        error: 'KV_NOT_CONFIGURED',
        hint: 'Installez Upstash Redis via Vercel Marketplace (Storage) et reconnectez le projet.',
      });
    }
    console.error(err);
    return res.status(500).json({ error: message });
  }
}

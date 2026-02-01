import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  const syncKey = req.query.key || req.body?.key;
  if (!syncKey || syncKey.length < 2) {
    return res.status(400).json({ error: 'Invalid sync key' });
  }

  const redisKey = `todos:${syncKey}`;

  try {
    if (req.method === 'GET') {
      let data = await redis.get(redisKey) || { todos: [], lastDate: null };
      const today = getTodayString();
      if (data.lastDate && data.lastDate !== today) {
        data.todos = data.todos.filter(t => !t.completed);
        data.lastDate = today;
        await redis.set(redisKey, data);
      }
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { todos } = req.body;
      await redis.set(redisKey, { todos: todos || [], lastDate: getTodayString() });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Redis error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

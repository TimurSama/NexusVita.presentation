import type { VercelRequest, VercelResponse } from '@vercel/node';
import { healthMetricsDb, initDatabase } from '../../lib/database.js';

let dbInitialized = false;
async function ensureDatabase() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureDatabase();

  const { userId } = req.query;
  const { type, limit } = req.query;

  if (req.method === 'GET') {
    try {
      const userIdNum = parseInt(userId as string);
      const metrics = await healthMetricsDb.findByUserId(
        userIdNum,
        type as string,
        limit ? parseInt(limit as string) : undefined
      );

      res.json({ metrics });
    } catch (error) {
      console.error('Get metrics error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const userIdNum = parseInt(userId as string);
      const { metric_type, value, unit, notes } = req.body;

      const result = await healthMetricsDb.create(userIdNum, {
        metric_type,
        value,
        unit,
        notes,
      });

      res.status(201).json({ success: true, id: Number(result.lastInsertRowid || result.id) });
    } catch (error) {
      console.error('Create metric error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

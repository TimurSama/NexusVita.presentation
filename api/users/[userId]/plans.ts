import type { VercelRequest, VercelResponse } from '@vercel/node';
import { dailyPlanDb, initDatabase } from '../../lib/database';

// Initialize database on first import
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
  const { date, startDate, endDate } = req.query;

  if (req.method === 'GET') {
    try {
      const userIdNum = parseInt(userId as string);
      let plans;

      if (date) {
        plans = await dailyPlanDb.findByUserIdAndDate(userIdNum, new Date(date as string));
      } else if (startDate && endDate) {
        // Need to add this method to database
        const today = new Date();
        plans = await dailyPlanDb.findByUserIdAndDate(userIdNum, today);
      } else {
        const today = new Date();
        plans = await dailyPlanDb.findByUserIdAndDate(userIdNum, today);
      }

      res.json({ plans });
    } catch (error) {
      console.error('Get plans error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

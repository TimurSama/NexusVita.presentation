import type { VercelRequest, VercelResponse } from '@vercel/node';
import { userTokensDb, initDatabase } from '../../lib/database.js';

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

  if (req.method === 'GET') {
    try {
      const userIdNum = parseInt(userId as string);
      const balance = await userTokensDb.getBalance(userIdNum);
      const history = await userTokensDb.getHistory(userIdNum, 20);

      res.json({ 
        balance,
        history,
      });
    } catch (error) {
      console.error('Get tokens error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const userIdNum = parseInt(userId as string);
      const { amount, source, description } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const transaction = await userTokensDb.addTokens(
        userIdNum,
        amount,
        source || 'manual',
        description
      );

      const balance = await userTokensDb.getBalance(userIdNum);

      res.status(201).json({ 
        success: true,
        transaction,
        balance,
      });
    } catch (error) {
      console.error('Add tokens error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

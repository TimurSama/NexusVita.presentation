import type { VercelRequest, VercelResponse } from '@vercel/node';
import { profileDb, userTokensDb, initDatabase } from '../../lib/database.js';

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
      const profile = await profileDb.findByUserId(userIdNum);
      
      res.json({ 
        onboarding_completed: profile?.onboarding_completed || false,
      });
    } catch (error) {
      console.error('Get onboarding status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const userIdNum = parseInt(userId as string);
      const { completed, skip } = req.body;

      // Mark onboarding as completed
      await profileDb.createOrUpdate(userIdNum, {
        onboarding_completed: completed !== false,
      });

      // If completing onboarding (not skipping), give welcome tokens
      if (completed !== false && !skip) {
        await userTokensDb.addTokens(
          userIdNum,
          100, // Welcome bonus: 100 tokens
          'onboarding',
          'Добро пожаловать в EthosLife! Подарочные токены за регистрацию.'
        );
      }

      res.json({ 
        success: true,
        onboarding_completed: completed !== false,
      });
    } catch (error) {
      console.error('Complete onboarding error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

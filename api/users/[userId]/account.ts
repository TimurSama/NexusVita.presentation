import type { VercelRequest, VercelResponse } from '@vercel/node';
import { userTokensDb, profileDb, initDatabase } from '../../lib/database.js';

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
  const { action } = req.query;

  if (req.method === 'GET') {
    try {
      const userIdNum = parseInt(userId as string);
      
      if (action === 'tokens') {
        // Get tokens balance and history
        const balance = await userTokensDb.getBalance(userIdNum);
        const history = await userTokensDb.getHistory(userIdNum, 20);
        return res.json({ balance, history });
      } else if (action === 'onboarding') {
        // Get onboarding status
        const profile = await profileDb.findByUserId(userIdNum);
        return res.json({ 
          onboarding_completed: profile?.onboarding_completed || false,
        });
      } else {
        return res.status(400).json({ error: 'Invalid action. Use ?action=tokens or ?action=onboarding' });
      }
    } catch (error) {
      console.error('Get account data error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const userIdNum = parseInt(userId as string);
      const { action: postAction } = req.body;

      if (postAction === 'tokens') {
        // Add tokens
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
        return res.status(201).json({ success: true, transaction, balance });
      } else if (postAction === 'onboarding') {
        // Complete onboarding
        const { completed, skip } = req.body;
        await profileDb.createOrUpdate(userIdNum, {
          onboarding_completed: completed !== false,
        });
        // Give welcome tokens if completing (not skipping)
        if (completed !== false && !skip) {
          await userTokensDb.addTokens(
            userIdNum,
            100,
            'onboarding',
            'Добро пожаловать в EthosLife! Подарочные токены за регистрацию.'
          );
        }
        return res.json({ success: true, onboarding_completed: completed !== false });
      } else {
        return res.status(400).json({ error: 'Invalid action. Use action=tokens or action=onboarding' });
      }
    } catch (error) {
      console.error('Post account data error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

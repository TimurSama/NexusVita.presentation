import type { VercelRequest, VercelResponse } from '@vercel/node';
import { 
  userDb, 
  profileDb, 
  dailyPlanDb, 
  healthMetricsDb, 
  goalsDb, 
  documentDb, 
  userTokensDb,
  initDatabase 
} from '../../../lib/database.js';

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

  const { userId, path } = req.query;
  const userIdNum = parseInt(userId as string);

  if (!userIdNum || isNaN(userIdNum)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  // Parse the path to determine which endpoint to handle
  const pathArray = Array.isArray(path) ? path : (path ? [path] : []);
  const endpoint = pathArray[0] || '';

  // Route to appropriate handler
  switch (endpoint) {
    case 'profile':
      return handleProfile(req, res, userIdNum);
    case 'plans':
      return handlePlans(req, res, userIdNum);
    case 'metrics':
      return handleMetrics(req, res, userIdNum);
    case 'goals':
      return handleGoals(req, res, userIdNum);
    case 'documents':
      return handleDocuments(req, res, userIdNum);
    case 'account':
      return handleAccount(req, res, userIdNum);
    case '':
      // If no path, default to profile
      return handleProfile(req, res, userIdNum);
    default:
      return res.status(404).json({ error: 'Endpoint not found' });
  }
}

// Profile handler
async function handleProfile(req: VercelRequest, res: VercelResponse, userIdNum: number) {
  if (req.method === 'GET') {
    try {
      const user = await userDb.findById(userIdNum);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const profile = await profileDb.findByUserId(userIdNum);

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          telegram_connected: !!user.telegram_id,
          telegram_username: user.telegram_username,
        },
        profile: profile || null,
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { date_of_birth, height, weight, gender, blood_type } = req.body;

      await profileDb.createOrUpdate(userIdNum, {
        date_of_birth: date_of_birth ? new Date(date_of_birth) : undefined,
        height,
        weight,
        gender,
        blood_type,
      });

      const profile = await profileDb.findByUserId(userIdNum);

      res.json({ success: true, profile });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Plans handler
async function handlePlans(req: VercelRequest, res: VercelResponse, userIdNum: number) {
  if (req.method === 'GET') {
    try {
      const { date, startDate, endDate } = req.query;
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

// Metrics handler
async function handleMetrics(req: VercelRequest, res: VercelResponse, userIdNum: number) {
  if (req.method === 'GET') {
    try {
      const { type, limit } = req.query;
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

// Goals handler
async function handleGoals(req: VercelRequest, res: VercelResponse, userIdNum: number) {
  if (req.method === 'GET') {
    try {
      const goals = await goalsDb.findByUserId(userIdNum);

      res.json({ goals });
    } catch (error) {
      console.error('Get goals error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, category, target_value, unit, deadline } = req.body;

      const result = await goalsDb.create(userIdNum, {
        title,
        description,
        category,
        target_value,
        unit,
        deadline: deadline ? new Date(deadline) : undefined,
      });

      res.status(201).json({ success: true, id: Number(result.lastInsertRowid || result.id) });
    } catch (error) {
      console.error('Create goal error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Documents handler
async function handleDocuments(req: VercelRequest, res: VercelResponse, userIdNum: number) {
  if (req.method === 'GET') {
    try {
      const documents = await documentDb.findByUserId(userIdNum);
      res.json({ documents });
    } catch (error) {
      console.error('Get documents error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Account handler
async function handleAccount(req: VercelRequest, res: VercelResponse, userIdNum: number) {
  const { action } = req.query;

  if (req.method === 'GET') {
    try {
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

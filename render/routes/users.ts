import type { Request, Response } from 'express';
import { userDb, profileDb, dailyPlanDb, documentDb, healthMetricsDb, goalsDb } from '../../api/lib/database.js';

export async function userProfileHandler(req: Request, res: Response, method: 'GET' | 'PUT') {
  const { userId } = req.params;

  if (method === 'GET') {
    try {
      const userIdNum = parseInt(userId);
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
  } else if (method === 'PUT') {
    try {
      const userIdNum = parseInt(userId);
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
  }
}

export async function userPlansHandler(req: Request, res: Response) {
  const { userId } = req.params;
  const { date, startDate, endDate } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userIdNum = parseInt(userId);
    let plans;

    if (date) {
      plans = await dailyPlanDb.findByUserIdAndDate(userIdNum, new Date(date as string));
    } else if (startDate && endDate) {
      // For now, use single date - can add date range method later
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
}

export async function userDocumentsHandler(req: Request, res: Response) {
  const { userId } = req.params;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userIdNum = parseInt(userId);
    const documents = await documentDb.findByUserId(userIdNum);
    res.json({ documents });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function userMetricsHandler(req: Request, res: Response, method: 'GET' | 'POST') {
  const { userId } = req.params;
  const { type, limit } = req.query;

  if (method === 'GET') {
    try {
      const userIdNum = parseInt(userId);
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
  } else if (method === 'POST') {
    try {
      const userIdNum = parseInt(userId);
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
  }
}

export async function userGoalsHandler(req: Request, res: Response, method: 'GET' | 'POST') {
  const { userId } = req.params;

  if (method === 'GET') {
    try {
      const userIdNum = parseInt(userId);
      const goals = await goalsDb.findByUserId(userIdNum);

      res.json({ goals });
    } catch (error) {
      console.error('Get goals error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    try {
      const userIdNum = parseInt(userId);
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
  }
}

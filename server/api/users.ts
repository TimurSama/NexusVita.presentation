import { Router } from 'express';
import { userDb, profileDb, documentDb, dailyPlanDb, healthMetricsDb, goalsDb } from '../database';

const router = Router();

// Get user profile
router.get('/:userId/profile', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = userDb.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = profileDb.findByUserId(userId);

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
});

// Update user profile
router.put('/:userId/profile', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { date_of_birth, height, weight, gender, blood_type } = req.body;

    profileDb.createOrUpdate(userId, {
      date_of_birth: date_of_birth ? new Date(date_of_birth) : undefined,
      height,
      weight,
      gender,
      blood_type,
    });

    const profile = profileDb.findByUserId(userId);

    res.json({ success: true, profile });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user documents
router.get('/:userId/documents', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const documents = documentDb.findByUserId(userId);

    res.json({ documents });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get document by ID
router.get('/:userId/documents/:documentId', (req, res) => {
  try {
    const documentId = parseInt(req.params.documentId);
    const document = documentDb.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ document });
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get daily plans
router.get('/:userId/plans', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { date, startDate, endDate } = req.query;

    let plans;
    if (date) {
      plans = dailyPlanDb.findByUserIdAndDate(userId, new Date(date as string));
    } else if (startDate && endDate) {
      plans = dailyPlanDb.findByUserIdAndDateRange(
        userId,
        new Date(startDate as string),
        new Date(endDate as string)
      );
    } else {
      const today = new Date();
      plans = dailyPlanDb.findByUserIdAndDate(userId, today);
    }

    res.json({ plans });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create daily plan
router.post('/:userId/plans', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { date, title, description, category, time } = req.body;

    const result = dailyPlanDb.create(userId, {
      date: new Date(date),
      title,
      description,
      category,
      time,
    });

    res.status(201).json({ success: true, id: Number(result.lastInsertRowid) });
  } catch (error) {
    console.error('Create plan error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update plan completion
router.patch('/:userId/plans/:planId', (req, res) => {
  try {
    const planId = parseInt(req.params.planId);
    const { completed } = req.body;

    dailyPlanDb.updateCompleted(planId, completed);

    res.json({ success: true });
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get health metrics
router.get('/:userId/metrics', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { type, limit } = req.query;

    const metrics = healthMetricsDb.findByUserId(
      userId,
      type as string,
      limit ? parseInt(limit as string) : undefined
    );

    res.json({ metrics });
  } catch (error) {
    console.error('Get metrics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create health metric
router.post('/:userId/metrics', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { metric_type, value, unit, notes } = req.body;

    const result = healthMetricsDb.create(userId, {
      metric_type,
      value,
      unit,
      notes,
    });

    res.status(201).json({ success: true, id: Number(result.lastInsertRowid) });
  } catch (error) {
    console.error('Create metric error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get goals
router.get('/:userId/goals', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const goals = goalsDb.findByUserId(userId);

    res.json({ goals });
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create goal
router.post('/:userId/goals', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { title, description, category, target_value, unit, deadline } = req.body;

    const result = goalsDb.create(userId, {
      title,
      description,
      category,
      target_value,
      unit,
      deadline: deadline ? new Date(deadline) : undefined,
    });

    res.status(201).json({ success: true, id: Number(result.lastInsertRowid) });
  } catch (error) {
    console.error('Create goal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

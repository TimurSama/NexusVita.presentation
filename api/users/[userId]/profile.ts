import type { VercelRequest, VercelResponse } from '@vercel/node';
import { userDb, profileDb, initDatabase } from '../../../server/database-adapter';

// Initialize database on first import
let dbInitialized = false;
async function ensureDatabase() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize database
  await ensureDatabase();

  const { userId } = req.query;

  if (req.method === 'GET') {
    try {
      const userIdNum = parseInt(userId as string);
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
      const userIdNum = parseInt(userId as string);
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

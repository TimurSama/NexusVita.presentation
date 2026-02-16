// Database adapter for Vercel serverless functions
// Uses Postgres on Vercel (always, since we're on Vercel)

import { Pool } from 'pg';

// Initialize connection pool
let pool: Pool | null = null;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    
    if (!connectionString) {
      throw new Error('DATABASE_URL or POSTGRES_URL environment variable is required');
    }

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }
  
  return pool;
}

// Initialize database schema
export async function initDatabase() {
  const client = await getPool().connect();
  
  try {
    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE,
        password_hash TEXT,
        name TEXT NOT NULL,
        telegram_id TEXT UNIQUE,
        telegram_username TEXT,
        telegram_connected_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // User profiles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        date_of_birth DATE,
        height INTEGER,
        weight REAL,
        gender TEXT,
        blood_type TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Documents table
    await client.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        file_path TEXT,
        document_type TEXT DEFAULT 'medical',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Daily plans table
    await client.query(`
      CREATE TABLE IF NOT EXISTS daily_plans (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        time TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, date, time, title)
      )
    `);

    // Health metrics table
    await client.query(`
      CREATE TABLE IF NOT EXISTS health_metrics (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        metric_type TEXT NOT NULL,
        value REAL NOT NULL,
        unit TEXT,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT
      )
    `);

    // Goals table
    await client.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        target_value REAL,
        current_value REAL DEFAULT 0,
        unit TEXT,
        deadline DATE,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Telegram bot settings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS telegram_bot_settings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
        notifications_enabled BOOLEAN DEFAULT TRUE,
        reminders_enabled BOOLEAN DEFAULT TRUE,
        metric_tracking_enabled BOOLEAN DEFAULT TRUE,
        reminder_times TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Telegram bot logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS telegram_bot_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        action_type TEXT NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // User tokens table (off-chain tokens)
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        amount DECIMAL(18, 8) NOT NULL DEFAULT 0,
        source TEXT,
        description TEXT,
        transaction_type TEXT DEFAULT 'credit',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add onboarding_completed to user_profiles if not exists
    await client.query(`
      ALTER TABLE user_profiles 
      ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE
    `);

    // Health directions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS health_directions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        display_name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        color TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default health directions
    await client.query(`
      INSERT INTO health_directions (name, display_name, description, icon, color)
      VALUES 
        ('movement', 'Движение', 'Физическая активность, тренировки, спорт', '🏃', '#3B82F6'),
        ('nutrition', 'Питание', 'Рацион, калории, макронутриенты', '🍎', '#10B981'),
        ('sleep', 'Сон', 'Качество и продолжительность сна', '😴', '#8B5CF6'),
        ('psychology', 'Психология', 'Ментальное здоровье, настроение, стресс', '🧠', '#F59E0B'),
        ('medicine', 'Медицина', 'Медицинские показатели, анализы, лечение', '💊', '#EF4444')
      ON CONFLICT (name) DO NOTHING
    `);

    // Health direction plans table
    await client.query(`
      CREATE TABLE IF NOT EXISTS health_direction_plans (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        direction_id INTEGER NOT NULL REFERENCES health_directions(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        start_date DATE NOT NULL,
        end_date DATE,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Health direction tasks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS health_direction_tasks (
        id SERIAL PRIMARY KEY,
        plan_id INTEGER NOT NULL REFERENCES health_direction_plans(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        task_type TEXT,
        frequency TEXT,
        scheduled_time TEXT,
        completed BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Health direction metrics table
    await client.query(`
      CREATE TABLE IF NOT EXISTS health_direction_metrics (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        direction_id INTEGER NOT NULL REFERENCES health_directions(id) ON DELETE CASCADE,
        metric_name TEXT NOT NULL,
        value REAL NOT NULL,
        unit TEXT,
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        notes TEXT,
        metadata JSONB
      )
    `);

    // Health direction reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS health_direction_reports (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        direction_id INTEGER NOT NULL REFERENCES health_directions(id) ON DELETE CASCADE,
        report_type TEXT NOT NULL,
        period_start DATE NOT NULL,
        period_end DATE NOT NULL,
        summary JSONB,
        insights TEXT,
        recommendations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Dashboard settings table (for customizable dashboard)
    await client.query(`
      CREATE TABLE IF NOT EXISTS dashboard_settings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
        layout JSONB DEFAULT '{}',
        widgets JSONB DEFAULT '[]',
        theme TEXT DEFAULT 'default',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Postgres database initialized successfully');
  } finally {
    client.release();
  }
}

// User operations
export const userDb = {
  create: async (data: { email?: string; password_hash?: string; name: string; telegram_id?: string; telegram_username?: string }) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `INSERT INTO users (email, password_hash, name, telegram_id, telegram_username, telegram_connected_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          data.email || null,
          data.password_hash || null,
          data.name,
          data.telegram_id || null,
          data.telegram_username || null,
          data.telegram_id ? new Date().toISOString() : null,
        ]
      );
      return { lastInsertRowid: result.rows[0].id, id: result.rows[0].id, ...result.rows[0] };
    } finally {
      client.release();
    }
  },

  findByEmail: async (email: string) => {
    const client = await getPool().connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  },

  findByTelegramId: async (telegramId: string) => {
    const client = await getPool().connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE telegram_id = $1', [telegramId]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  },

  findById: async (id: number) => {
    const client = await getPool().connect();
    try {
      const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  },

  connectTelegram: async (userId: number, telegramId: string, telegramUsername?: string) => {
    const client = await getPool().connect();
    try {
      await client.query(
        `UPDATE users 
         SET telegram_id = $1, telegram_username = $2, telegram_connected_at = $3, updated_at = CURRENT_TIMESTAMP
         WHERE id = $4`,
        [telegramId, telegramUsername || null, new Date().toISOString(), userId]
      );
    } finally {
      client.release();
    }
  },

  // Get all users with Telegram connected
  findAllWithTelegram: async () => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE telegram_id IS NOT NULL AND telegram_id != \'\''
      );
      return result.rows;
    } finally {
      client.release();
    }
  },
};

// Profile operations
export const profileDb = {
  createOrUpdate: async (userId: number, data: { date_of_birth?: Date; height?: number; weight?: number; gender?: string; blood_type?: string; onboarding_completed?: boolean }) => {
    const client = await getPool().connect();
    try {
      const existing = await client.query('SELECT id FROM user_profiles WHERE user_id = $1', [userId]);
      
      if (existing.rows.length > 0) {
        await client.query(
          `UPDATE user_profiles 
           SET date_of_birth = $1, height = $2, weight = $3, gender = $4, blood_type = $5, onboarding_completed = COALESCE($6, onboarding_completed), updated_at = CURRENT_TIMESTAMP
           WHERE user_id = $7`,
          [
            data.date_of_birth?.toISOString().split('T')[0] || null,
            data.height || null,
            data.weight || null,
            data.gender || null,
            data.blood_type || null,
            data.onboarding_completed !== undefined ? data.onboarding_completed : null,
            userId,
          ]
        );
      } else {
        await client.query(
          `INSERT INTO user_profiles (user_id, date_of_birth, height, weight, gender, blood_type, onboarding_completed)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            userId,
            data.date_of_birth?.toISOString().split('T')[0] || null,
            data.height || null,
            data.weight || null,
            data.gender || null,
            data.blood_type || null,
            data.onboarding_completed || false,
          ]
        );
      }
    } finally {
      client.release();
    }
  },

  findByUserId: async (userId: number) => {
    const client = await getPool().connect();
    try {
      const result = await client.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  },
};

// Daily plan operations
export const dailyPlanDb = {
  create: async (userId: number, data: { date: Date; title: string; description?: string; category?: string; time?: string }) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `INSERT INTO daily_plans (user_id, date, title, description, category, time)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          userId,
          data.date.toISOString().split('T')[0],
          data.title,
          data.description || null,
          data.category || null,
          data.time || null,
        ]
      );
      return { lastInsertRowid: result.rows[0].id, id: result.rows[0].id, ...result.rows[0] };
    } finally {
      client.release();
    }
  },

  findByUserIdAndDate: async (userId: number, date: Date) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        'SELECT * FROM daily_plans WHERE user_id = $1 AND date = $2 ORDER BY time ASC',
        [userId, date.toISOString().split('T')[0]]
      );
      return result.rows;
    } finally {
      client.release();
    }
  },

  findByUserIdAndDateRange: async (userId: number, startDate: Date, endDate: Date) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        'SELECT * FROM daily_plans WHERE user_id = $1 AND date >= $2 AND date <= $3 ORDER BY date ASC, time ASC',
        [
          userId,
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
        ]
      );
      return result.rows;
    } finally {
      client.release();
    }
  },

  updateCompleted: async (id: number, completed: boolean) => {
    const client = await getPool().connect();
    try {
      await client.query(
        'UPDATE daily_plans SET completed = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [completed, id]
      );
    } finally {
      client.release();
    }
  },
};

// Health metrics operations
export const healthMetricsDb = {
  create: async (userId: number, data: { metric_type: string; value: number; unit?: string; notes?: string }) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `INSERT INTO health_metrics (user_id, metric_type, value, unit, notes)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [userId, data.metric_type, data.value, data.unit || null, data.notes || null]
      );
      return { lastInsertRowid: result.rows[0].id, id: result.rows[0].id, ...result.rows[0] };
    } finally {
      client.release();
    }
  },

  findByUserId: async (userId: number, type?: string, limit?: number) => {
    const client = await getPool().connect();
    try {
      let query = 'SELECT * FROM health_metrics WHERE user_id = $1';
      const params: any[] = [userId];
      
      if (type) {
        query += ' AND metric_type = $2';
        params.push(type);
      }
      
      query += ' ORDER BY recorded_at DESC';
      
      if (limit) {
        query += ` LIMIT $${params.length + 1}`;
        params.push(limit);
      }
      
      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  },
};

// Goals operations
export const goalsDb = {
  findByUserId: async (userId: number) => {
    const client = await getPool().connect();
    try {
      const result = await client.query('SELECT * FROM goals WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      return result.rows;
    } finally {
      client.release();
    }
  },

  create: async (userId: number, data: { title: string; description?: string; category?: string; target_value?: number; unit?: string; deadline?: Date }) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `INSERT INTO goals (user_id, title, description, category, target_value, unit, deadline)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          userId,
          data.title,
          data.description || null,
          data.category || null,
          data.target_value || null,
          data.unit || null,
          data.deadline ? data.deadline.toISOString().split('T')[0] : null,
        ]
      );
      return { lastInsertRowid: result.rows[0].id, id: result.rows[0].id, ...result.rows[0] };
    } finally {
      client.release();
    }
  },
};

// Telegram bot settings operations
export const telegramBotSettingsDb = {
  createOrUpdate: async (userId: number, data: { notifications_enabled?: boolean; reminders_enabled?: boolean; metric_tracking_enabled?: boolean; reminder_times?: string[] }) => {
    const client = await getPool().connect();
    try {
      const existing = await client.query('SELECT id FROM telegram_bot_settings WHERE user_id = $1', [userId]);
      
      if (existing.rows.length > 0) {
        await client.query(
          `UPDATE telegram_bot_settings 
           SET notifications_enabled = $1, reminders_enabled = $2, metric_tracking_enabled = $3, 
               reminder_times = $4, updated_at = CURRENT_TIMESTAMP
           WHERE user_id = $5`,
          [
            data.notifications_enabled !== undefined ? data.notifications_enabled : null,
            data.reminders_enabled !== undefined ? data.reminders_enabled : null,
            data.metric_tracking_enabled !== undefined ? data.metric_tracking_enabled : null,
            data.reminder_times ? JSON.stringify(data.reminder_times) : null,
            userId,
          ]
        );
      } else {
        await client.query(
          `INSERT INTO telegram_bot_settings (user_id, notifications_enabled, reminders_enabled, metric_tracking_enabled, reminder_times)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            userId,
            data.notifications_enabled !== undefined ? data.notifications_enabled : true,
            data.reminders_enabled !== undefined ? data.reminders_enabled : true,
            data.metric_tracking_enabled !== undefined ? data.metric_tracking_enabled : true,
            data.reminder_times ? JSON.stringify(data.reminder_times) : JSON.stringify(['08:00', '12:00', '18:00']),
          ]
        );
      }
    } finally {
      client.release();
    }
  },
};

// Telegram bot logs operations
export const telegramBotLogsDb = {
  create: async (userId: number, data: { action_type: string; message?: string }) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `INSERT INTO telegram_bot_logs (user_id, action_type, message)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [userId, data.action_type, data.message || null]
      );
      return { lastInsertRowid: result.rows[0].id, id: result.rows[0].id, ...result.rows[0] };
    } finally {
      client.release();
    }
  },
};

// Document operations
export const documentDb = {
  create: async (userId: number, data: { title: string; content: string; file_path?: string; document_type?: string }) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `INSERT INTO documents (user_id, title, content, file_path, document_type)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [userId, data.title, data.content, data.file_path || null, data.document_type || 'medical']
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  findByUserId: async (userId: number) => {
    const client = await getPool().connect();
    try {
      const result = await client.query('SELECT * FROM documents WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      return result.rows;
    } finally {
      client.release();
    }
  },

  findById: async (id: number) => {
    const client = await getPool().connect();
    try {
      const result = await client.query('SELECT * FROM documents WHERE id = $1', [id]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  },
};

// User tokens operations (off-chain tokens)
export const userTokensDb = {
  // Get user's total token balance
  getBalance: async (userId: number) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `SELECT COALESCE(SUM(
          CASE 
            WHEN transaction_type = 'credit' THEN amount
            WHEN transaction_type = 'debit' THEN -amount
            ELSE 0
          END
        ), 0) as balance
        FROM user_tokens WHERE user_id = $1`,
        [userId]
      );
      return parseFloat(result.rows[0]?.balance || '0');
    } finally {
      client.release();
    }
  },

  // Add tokens to user
  addTokens: async (userId: number, amount: number, source: string, description?: string) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `INSERT INTO user_tokens (user_id, amount, source, description, transaction_type)
         VALUES ($1, $2, $3, $4, 'credit')
         RETURNING *`,
        [userId, amount, source, description || null]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  // Get transaction history
  getHistory: async (userId: number, limit: number = 50) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `SELECT * FROM user_tokens 
         WHERE user_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [userId, limit]
      );
      return result.rows;
    } finally {
      client.release();
    }
  },
};

// Health directions operations
export const healthDirectionsDb = {
  findAll: async () => {
    const client = await getPool().connect();
    try {
      const result = await client.query('SELECT * FROM health_directions ORDER BY id');
      return result.rows;
    } finally {
      client.release();
    }
  },

  findByName: async (name: string) => {
    const client = await getPool().connect();
    try {
      const result = await client.query('SELECT * FROM health_directions WHERE name = $1', [name]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  },
};

// Health direction plans operations
export const healthDirectionPlansDb = {
  create: async (userId: number, directionId: number, data: {
    title: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
  }) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `INSERT INTO health_direction_plans (user_id, direction_id, title, description, start_date, end_date)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          userId,
          directionId,
          data.title,
          data.description || null,
          data.startDate.toISOString().split('T')[0],
          data.endDate ? data.endDate.toISOString().split('T')[0] : null,
        ]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  findByUserIdAndDirection: async (userId: number, directionId: number) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        'SELECT * FROM health_direction_plans WHERE user_id = $1 AND direction_id = $2 AND status = $3 ORDER BY created_at DESC',
        [userId, directionId, 'active']
      );
      return result.rows;
    } finally {
      client.release();
    }
  },

  findByUserId: async (userId: number) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        'SELECT hdp.*, hd.name as direction_name, hd.display_name, hd.icon, hd.color FROM health_direction_plans hdp JOIN health_directions hd ON hdp.direction_id = hd.id WHERE hdp.user_id = $1 ORDER BY hdp.created_at DESC',
        [userId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  },
};

// Health direction metrics operations
export const healthDirectionMetricsDb = {
  create: async (userId: number, directionId: number, data: {
    metricName: string;
    value: number;
    unit?: string;
    notes?: string;
    metadata?: object;
  }) => {
    const client = await getPool().connect();
    try {
      const result = await client.query(
        `INSERT INTO health_direction_metrics (user_id, direction_id, metric_name, value, unit, notes, metadata)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          userId,
          directionId,
          data.metricName,
          data.value,
          data.unit || null,
          data.notes || null,
          data.metadata ? JSON.stringify(data.metadata) : null,
        ]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  findByUserAndDirectionAndPeriod: async (
    userId: number,
    directionId: number,
    startDate: Date,
    endDate: Date,
    metricName?: string
  ) => {
    const client = await getPool().connect();
    try {
      let query = `
        SELECT * FROM health_direction_metrics 
        WHERE user_id = $1 AND direction_id = $2 
        AND recorded_at >= $3 AND recorded_at <= $4
      `;
      const params: any[] = [
        userId,
        directionId,
        startDate.toISOString(),
        endDate.toISOString(),
      ];

      if (metricName) {
        query += ' AND metric_name = $5';
        params.push(metricName);
      }

      query += ' ORDER BY recorded_at DESC';

      const result = await client.query(query, params);
      return result.rows;
    } finally {
      client.release();
    }
  },
};

// Dashboard settings operations
export const dashboardSettingsDb = {
  getOrCreate: async (userId: number) => {
    const client = await getPool().connect();
    try {
      const existing = await client.query('SELECT * FROM dashboard_settings WHERE user_id = $1', [userId]);
      
      if (existing.rows.length > 0) {
        const row = existing.rows[0];
        return {
          ...row,
          layout: typeof row.layout === 'string' ? JSON.parse(row.layout) : row.layout,
          widgets: typeof row.widgets === 'string' ? JSON.parse(row.widgets) : row.widgets,
        };
      }

      // Create default settings
      const defaultSettings = {
        layout: { columns: 2 },
        widgets: [
          { id: 'overview', type: 'overview', position: { x: 0, y: 0 } },
          { id: 'plans', type: 'plans', position: { x: 1, y: 0 } },
          { id: 'metrics', type: 'metrics', position: { x: 0, y: 1 } },
          { id: 'goals', type: 'goals', position: { x: 1, y: 1 } },
        ],
        theme: 'default',
      };

      const result = await client.query(
        `INSERT INTO dashboard_settings (user_id, layout, widgets, theme)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [userId, JSON.stringify(defaultSettings.layout), JSON.stringify(defaultSettings.widgets), defaultSettings.theme]
      );
      const row = result.rows[0];
      return {
        ...row,
        layout: typeof row.layout === 'string' ? JSON.parse(row.layout) : row.layout,
        widgets: typeof row.widgets === 'string' ? JSON.parse(row.widgets) : row.widgets,
      };
    } finally {
      client.release();
    }
  },

  update: async (userId: number, data: {
    layout?: object;
    widgets?: any[];
    theme?: string;
  }) => {
    const client = await getPool().connect();
    try {
      const existing = await client.query('SELECT * FROM dashboard_settings WHERE user_id = $1', [userId]);
      
      if (existing.rows.length > 0) {
        const current = existing.rows[0];
        const currentLayout = typeof current.layout === 'string' ? JSON.parse(current.layout) : current.layout;
        const currentWidgets = typeof current.widgets === 'string' ? JSON.parse(current.widgets) : current.widgets;
        
        const updatedLayout = data.layout ? JSON.stringify(data.layout) : JSON.stringify(currentLayout);
        const updatedWidgets = data.widgets ? JSON.stringify(data.widgets) : JSON.stringify(currentWidgets);
        const updatedTheme = data.theme || current.theme;

        await client.query(
          `UPDATE dashboard_settings 
           SET layout = $1, widgets = $2, theme = $3, updated_at = CURRENT_TIMESTAMP
           WHERE user_id = $4`,
          [updatedLayout, updatedWidgets, updatedTheme, userId]
        );
      } else {
        await dashboardSettingsDb.getOrCreate(userId);
        await dashboardSettingsDb.update(userId, data);
      }
    } finally {
      client.release();
    }
  },
};

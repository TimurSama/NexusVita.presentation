import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure database directory exists
const dbDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'ethoslife.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT,
      name TEXT NOT NULL,
      telegram_id TEXT UNIQUE,
      telegram_username TEXT,
      telegram_connected_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // User profiles table
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date_of_birth DATE,
      height INTEGER, -- in cm
      weight REAL, -- in kg
      gender TEXT,
      blood_type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Documents table
  db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      file_path TEXT,
      document_type TEXT DEFAULT 'medical',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Daily plans table
  db.exec(`
    CREATE TABLE IF NOT EXISTS daily_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date DATE NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT, -- exercise, nutrition, sleep, psychology, etc.
      time TEXT, -- HH:MM format
      completed BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, date, time, title)
    )
  `);

  // Health metrics table
  db.exec(`
    CREATE TABLE IF NOT EXISTS health_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      metric_type TEXT NOT NULL, -- steps, calories, sleep, mood, weight, etc.
      value REAL NOT NULL,
      unit TEXT,
      recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Goals table
  db.exec(`
    CREATE TABLE IF NOT EXISTS goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      target_value REAL,
      current_value REAL DEFAULT 0,
      unit TEXT,
      deadline DATE,
      completed BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Telegram bot settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS telegram_bot_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      notifications_enabled BOOLEAN DEFAULT 1,
      reminders_enabled BOOLEAN DEFAULT 1,
      metric_tracking_enabled BOOLEAN DEFAULT 1,
      reminder_times TEXT, -- JSON array of times like ["08:00", "12:00", "18:00"]
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id)
    )
  `);

  // Telegram bot logs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS telegram_bot_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      action_type TEXT NOT NULL, -- reminder, metric_entry, goal_completed, etc.
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log('Database initialized successfully');
}

// User operations
export const userDb = {
  create: (data: { email?: string; password_hash?: string; name: string; telegram_id?: string; telegram_username?: string }) => {
    const stmt = db.prepare(`
      INSERT INTO users (email, password_hash, name, telegram_id, telegram_username, telegram_connected_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.email || null,
      data.password_hash || null,
      data.name,
      data.telegram_id || null,
      data.telegram_username || null,
      data.telegram_id ? new Date().toISOString() : null
    );
  },

  findByEmail: (email: string) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as any;
  },

  findByTelegramId: (telegramId: string) => {
    const stmt = db.prepare('SELECT * FROM users WHERE telegram_id = ?');
    return stmt.get(telegramId) as any;
  },

  findById: (id: number) => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as any;
  },

  connectTelegram: (userId: number, telegramId: string, telegramUsername?: string) => {
    const stmt = db.prepare(`
      UPDATE users 
      SET telegram_id = ?, telegram_username = ?, telegram_connected_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    return stmt.run(telegramId, telegramUsername || null, new Date().toISOString(), userId);
  },
};

// Profile operations
export const profileDb = {
  createOrUpdate: (userId: number, data: { date_of_birth?: Date; height?: number; weight?: number; gender?: string; blood_type?: string }) => {
    const existing = db.prepare('SELECT id FROM user_profiles WHERE user_id = ?').get(userId) as any;
    
    if (existing) {
      const stmt = db.prepare(`
        UPDATE user_profiles 
        SET date_of_birth = ?, height = ?, weight = ?, gender = ?, blood_type = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `);
      return stmt.run(
        data.date_of_birth?.toISOString().split('T')[0] || null,
        data.height || null,
        data.weight || null,
        data.gender || null,
        data.blood_type || null,
        userId
      );
    } else {
      const stmt = db.prepare(`
        INSERT INTO user_profiles (user_id, date_of_birth, height, weight, gender, blood_type)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      return stmt.run(
        userId,
        data.date_of_birth?.toISOString().split('T')[0] || null,
        data.height || null,
        data.weight || null,
        data.gender || null,
        data.blood_type || null
      );
    }
  },

  findByUserId: (userId: number) => {
    const stmt = db.prepare('SELECT * FROM user_profiles WHERE user_id = ?');
    return stmt.get(userId) as any;
  },
};

// Document operations
export const documentDb = {
  create: (userId: number, data: { title: string; content: string; file_path?: string; document_type?: string }) => {
    const stmt = db.prepare(`
      INSERT INTO documents (user_id, title, content, file_path, document_type)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(userId, data.title, data.content, data.file_path || null, data.document_type || 'medical');
  },

  findByUserId: (userId: number) => {
    const stmt = db.prepare('SELECT * FROM documents WHERE user_id = ? ORDER BY created_at DESC');
    return stmt.all(userId) as any[];
  },

  findById: (id: number) => {
    const stmt = db.prepare('SELECT * FROM documents WHERE id = ?');
    return stmt.get(id) as any;
  },
};

// Daily plan operations
export const dailyPlanDb = {
  create: (userId: number, data: { date: Date; title: string; description?: string; category?: string; time?: string }) => {
    const stmt = db.prepare(`
      INSERT INTO daily_plans (user_id, date, title, description, category, time)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      userId,
      data.date.toISOString().split('T')[0],
      data.title,
      data.description || null,
      data.category || null,
      data.time || null
    );
  },

  findByUserIdAndDate: (userId: number, date: Date) => {
    const stmt = db.prepare('SELECT * FROM daily_plans WHERE user_id = ? AND date = ? ORDER BY time ASC');
    return stmt.all(userId, date.toISOString().split('T')[0]) as any[];
  },

  findByUserIdAndDateRange: (userId: number, startDate: Date, endDate: Date) => {
    const stmt = db.prepare('SELECT * FROM daily_plans WHERE user_id = ? AND date >= ? AND date <= ? ORDER BY date ASC, time ASC');
    return stmt.all(
      userId,
      startDate.toISOString().split('T')[0],
      endDate.toISOString().split('T')[0]
    ) as any[];
  },

  updateCompleted: (id: number, completed: boolean) => {
    const stmt = db.prepare('UPDATE daily_plans SET completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    return stmt.run(completed ? 1 : 0, id);
  },
};

// Health metrics operations
export const healthMetricsDb = {
  create: (userId: number, data: { metric_type: string; value: number; unit?: string; notes?: string }) => {
    const stmt = db.prepare(`
      INSERT INTO health_metrics (user_id, metric_type, value, unit, notes)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(userId, data.metric_type, data.value, data.unit || null, data.notes || null);
  },

  findByUserId: (userId: number, metricType?: string, limit?: number) => {
    if (metricType) {
      const stmt = db.prepare('SELECT * FROM health_metrics WHERE user_id = ? AND metric_type = ? ORDER BY recorded_at DESC LIMIT ?');
      return stmt.all(userId, metricType, limit || 100) as any[];
    } else {
      const stmt = db.prepare('SELECT * FROM health_metrics WHERE user_id = ? ORDER BY recorded_at DESC LIMIT ?');
      return stmt.all(userId, limit || 100) as any[];
    }
  },
};

// Goals operations
export const goalsDb = {
  create: (userId: number, data: { title: string; description?: string; category?: string; target_value?: number; unit?: string; deadline?: Date }) => {
    const stmt = db.prepare(`
      INSERT INTO goals (user_id, title, description, category, target_value, unit, deadline)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      userId,
      data.title,
      data.description || null,
      data.category || null,
      data.target_value || null,
      data.unit || null,
      data.deadline?.toISOString().split('T')[0] || null
    );
  },

  findByUserId: (userId: number) => {
    const stmt = db.prepare('SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC');
    return stmt.all(userId) as any[];
  },
};

// Telegram bot settings operations
export const telegramBotSettingsDb = {
  createOrUpdate: (userId: number, data: { notifications_enabled?: boolean; reminders_enabled?: boolean; metric_tracking_enabled?: boolean; reminder_times?: string[] }) => {
    const existing = db.prepare('SELECT id FROM telegram_bot_settings WHERE user_id = ?').get(userId) as any;
    
    if (existing) {
      const stmt = db.prepare(`
        UPDATE telegram_bot_settings 
        SET notifications_enabled = ?, reminders_enabled = ?, metric_tracking_enabled = ?, 
            reminder_times = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `);
      return stmt.run(
        data.notifications_enabled !== undefined ? (data.notifications_enabled ? 1 : 0) : null,
        data.reminders_enabled !== undefined ? (data.reminders_enabled ? 1 : 0) : null,
        data.metric_tracking_enabled !== undefined ? (data.metric_tracking_enabled ? 1 : 0) : null,
        data.reminder_times ? JSON.stringify(data.reminder_times) : null,
        userId
      );
    } else {
      const stmt = db.prepare(`
        INSERT INTO telegram_bot_settings (user_id, notifications_enabled, reminders_enabled, metric_tracking_enabled, reminder_times)
        VALUES (?, ?, ?, ?, ?)
      `);
      return stmt.run(
        userId,
        data.notifications_enabled !== undefined ? (data.notifications_enabled ? 1 : 0) : 1,
        data.reminders_enabled !== undefined ? (data.reminders_enabled ? 1 : 0) : 1,
        data.metric_tracking_enabled !== undefined ? (data.metric_tracking_enabled ? 1 : 0) : 1,
        data.reminder_times ? JSON.stringify(data.reminder_times) : JSON.stringify(['08:00', '12:00', '18:00'])
      );
    }
  },

  findByUserId: (userId: number) => {
    const stmt = db.prepare('SELECT * FROM telegram_bot_settings WHERE user_id = ?');
    const result = stmt.get(userId) as any;
    if (result && result.reminder_times) {
      result.reminder_times = JSON.parse(result.reminder_times);
    }
    return result;
  },
};

// Telegram bot logs operations
export const telegramBotLogsDb = {
  create: (userId: number, data: { action_type: string; message?: string }) => {
    const stmt = db.prepare(`
      INSERT INTO telegram_bot_logs (user_id, action_type, message)
      VALUES (?, ?, ?)
    `);
    return stmt.run(userId, data.action_type, data.message || null);
  },

  findByUserId: (userId: number, limit: number = 50) => {
    const stmt = db.prepare('SELECT * FROM telegram_bot_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT ?');
    return stmt.all(userId, limit) as any[];
  },
};

export { db };
export default db;

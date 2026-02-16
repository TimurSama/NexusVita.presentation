import express from 'express';
import cors from 'cors';
import { initDatabase } from '../api/lib/database.js';
import { startTelegramBot } from '../server/telegram-bot.js';

// Import API routes
import { telegramAuthHandler } from './routes/auth.js';
import { userProfileHandler, userPlansHandler, userDocumentsHandler, userMetricsHandler, userGoalsHandler } from './routes/users.js';
import { telegramWebhookHandler, telegramWebhookInfoHandler, telegramDebugHandler } from './routes/telegram.js';
import { adminSetupWebhookHandler } from './routes/admin.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database once
let dbInitialized = false;
async function ensureDatabase() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

// Health check
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'unified-server', 
    timestamp: new Date().toISOString(),
    services: {
      api: 'running',
      bot: 'running',
    }
  });
});

// Auth routes
app.post('/api/auth/telegram-auth', async (req, res) => {
  await ensureDatabase();
  return telegramAuthHandler(req, res);
});

// User routes
app.get('/api/users/:userId/profile', async (req, res) => {
  await ensureDatabase();
  return userProfileHandler(req, res, 'GET');
});

app.put('/api/users/:userId/profile', async (req, res) => {
  await ensureDatabase();
  return userProfileHandler(req, res, 'PUT');
});

app.get('/api/users/:userId/plans', async (req, res) => {
  await ensureDatabase();
  return userPlansHandler(req, res);
});

app.get('/api/users/:userId/documents', async (req, res) => {
  await ensureDatabase();
  return userDocumentsHandler(req, res);
});

app.get('/api/users/:userId/metrics', async (req, res) => {
  await ensureDatabase();
  return userMetricsHandler(req, res, 'GET');
});

app.post('/api/users/:userId/metrics', async (req, res) => {
  await ensureDatabase();
  return userMetricsHandler(req, res, 'POST');
});

app.get('/api/users/:userId/goals', async (req, res) => {
  await ensureDatabase();
  return userGoalsHandler(req, res, 'GET');
});

app.post('/api/users/:userId/goals', async (req, res) => {
  await ensureDatabase();
  return userGoalsHandler(req, res, 'POST');
});

// Account routes (tokens + onboarding combined)
app.get('/api/users/:userId/account', async (req, res) => {
  await ensureDatabase();
  const handler = (await import('../api/users/[userId]/account.js')).default;
  return handler(req as any, res);
});

app.post('/api/users/:userId/account', async (req, res) => {
  await ensureDatabase();
  const handler = (await import('../api/users/[userId]/account.js')).default;
  return handler(req as any, res);
});

// Telegram routes
app.post('/api/telegram/webhook', async (req, res) => {
  await ensureDatabase();
  return telegramWebhookHandler(req, res);
});

app.get('/api/telegram/webhook-info', telegramWebhookInfoHandler);
app.get('/api/telegram/debug', telegramDebugHandler);

// Admin routes
app.all('/api/admin/setup-webhook', adminSetupWebhookHandler);

// Error handling
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: String(err) });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
async function startServer() {
  console.log('🚀 Starting Unified Server (API + Bot)...');
  const startTime = Date.now();
  
  // Initialize database
  try {
    console.log('📦 Initializing database...');
    await initDatabase();
    console.log(`✅ Database initialized (${Date.now() - startTime}ms)`);
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  }

  // Start Telegram bot (using polling on Render)
  try {
    console.log('🤖 Starting Telegram bot...');
    startTelegramBot();
    console.log(`✅ Telegram bot started (${Date.now() - startTime}ms)`);
  } catch (error) {
    console.error('❌ Failed to start Telegram bot:', error);
    // Don't exit - API can still work without bot
  }

  // Start Express server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Unified server running on port ${port}`);
    console.log(`📡 Health check: http://localhost:${port}/health`);
    console.log(`📡 API base: http://localhost:${port}/api`);
    console.log(`📡 Webhook: http://localhost:${port}/api/telegram/webhook`);
  });

  // Keep-alive ping every 5 minutes to prevent Render from sleeping
  if (process.env.RENDER) {
    setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:${port}/health`);
        console.log('💓 Keep-alive ping:', response.status);
      } catch (error) {
        console.error('Keep-alive ping failed:', error);
      }
    }, 5 * 60 * 1000); // Every 5 minutes
  }
}

startServer().catch((error) => {
  console.error('Fatal error starting server:', error);
  process.exit(1);
});

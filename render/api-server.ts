import express from 'express';
import cors from 'cors';
import { initDatabase } from '../api/lib/database.js';

// Import route handlers
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
  res.json({ status: 'ok', service: 'api-server', timestamp: new Date().toISOString() });
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 API server running on port ${port}`);
  console.log(`📡 Health check: http://localhost:${port}/health`);
});

import { initDatabase } from "./database-adapter";
import { startTelegramBot } from "./telegram-bot";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startBotServer() {
  console.log('🤖 Starting Telegram Bot Server...');
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

  // Start Telegram bot
  // Bot will create user profiles automatically when users send /start
  try {
    console.log('🚀 Starting Telegram bot...');
    startTelegramBot();
    console.log(`✅ Telegram bot started (${Date.now() - startTime}ms)`);
    console.log('📝 Bot will create user profiles automatically via /start command');
  } catch (error) {
    console.error('❌ Failed to start Telegram bot:', error);
    process.exit(1);
  }

  // Create simple Express server for health checks and webhook
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'telegram-bot', timestamp: new Date().toISOString() });
  });

  // Webhook endpoint (optional - if you want to use webhook instead of polling)
  app.post('/webhook', async (req, res) => {
    // This is handled by the bot's webhook if configured
    res.json({ ok: true });
  });

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`🚀 Bot server running on port ${port}`);
    console.log(`📡 Health check: http://localhost:${port}/health`);
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

startBotServer().catch((error) => {
  console.error('Fatal error starting bot server:', error);
  process.exit(1);
});

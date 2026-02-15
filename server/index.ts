import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { initDatabase } from "./database";
import { startTelegramBot } from "./telegram-bot";
import { createMariaProfile } from "./maria-plan-generator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Initialize database
  initDatabase();
  
  // Create Maria's profile and plan
  try {
    createMariaProfile();
  } catch (error) {
    console.error('Error creating Maria profile:', error);
  }

  // Start Telegram bot
  startTelegramBot();

  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.use('/api/auth', (await import('./api/auth')).default);
  app.use('/api/users', (await import('./api/users')).default);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

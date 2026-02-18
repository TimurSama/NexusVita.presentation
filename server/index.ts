import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.use('/api/auth', (await import('./api/auth')).default);
  app.use('/api/users', (await import('./api/users')).default);
  app.use('/api/social', (await import('./api/social')).default);
  app.use('/api/payments', (await import('./api/payments')).default);
  app.use('/api/ai', (await import('./api/ai')).default);
  app.use('/api/upload', (await import('./api/upload')).default);
  app.use('/api/dashboard', (await import('./api/dashboard')).default);
  app.use('/api/specialists', (await import('./api/specialists')).default);
  app.use('/api/bookings', (await import('./api/bookings')).default);
  app.use('/api/center', (await import('./api/center')).default);

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
    console.log('API routes:');
    console.log('  - /api/auth');
    console.log('  - /api/users');
    console.log('  - /api/social');
    console.log('  - /api/payments');
    console.log('  - /api/ai');
  });
}

startServer().catch(console.error);

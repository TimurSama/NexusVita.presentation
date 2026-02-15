// Database adapter that switches between SQLite (local) and Postgres (Vercel/Render)
// For esbuild compatibility, we always export from postgres
// On Render/Vercel, DATABASE_URL will be set, so postgres will be used
// For local development with SQLite, use database.ts directly

// Always export from postgres for production builds (Render/Vercel)
// Local development can import from database.ts directly if needed
export {
  initDatabase,
  userDb,
  profileDb,
  documentDb,
  dailyPlanDb,
  healthMetricsDb,
  goalsDb,
  telegramBotSettingsDb,
  telegramBotLogsDb,
} from './database-postgres';

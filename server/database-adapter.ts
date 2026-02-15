// Database adapter that switches between SQLite (local) and Postgres (Vercel/Render)
// Automatically detects environment and uses appropriate database

const isPostgres = process.env.VERCEL === '1' || !!process.env.DATABASE_URL || !!process.env.POSTGRES_URL || process.env.RENDER === '1';

if (isPostgres) {
  // Use Postgres on Vercel/Render
  console.log('Using Postgres database (production environment)');
  // Re-export all from database-postgres
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
} else {
  // Use SQLite locally
  console.log('Using SQLite database (local environment)');
  // Re-export all from database
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
  } from './database';
}

// Database adapter that switches between SQLite (local) and Postgres (Vercel)
// Automatically detects environment and uses appropriate database

const isVercel = process.env.VERCEL === '1' || !!process.env.DATABASE_URL || !!process.env.POSTGRES_URL;

if (isVercel) {
  // Use Postgres on Vercel
  console.log('Using Postgres database (Vercel environment)');
  export * from './database-postgres';
} else {
  // Use SQLite locally
  console.log('Using SQLite database (local environment)');
  export * from './database';
}

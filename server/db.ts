// Universal database adapter - automatically switches between SQLite (local) and Postgres (Vercel)
// This is the main entry point - all other files should import from here

const isVercel = process.env.VERCEL === '1' || !!process.env.DATABASE_URL || !!process.env.POSTGRES_URL;

if (isVercel) {
  // Use Postgres on Vercel
  console.log('🔵 Using Postgres database (Vercel environment)');
  module.exports = require('./database-postgres');
} else {
  // Use SQLite locally
  console.log('🟢 Using SQLite database (local environment)');
  module.exports = require('./database');
}

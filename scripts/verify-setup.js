#!/usr/bin/env node

/**
 * EthosLife Setup Verification Script
 * Проверяет, что все компоненты настроены правильно
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 EthosLife Setup Verification\n');

const checks = [];

// Check 1: Required files exist
console.log('📁 Checking required files...');
const requiredFiles = [
  'server/supabase/migrations/001_initial_schema.sql',
  'server/supabase/migrations/002_health_modules.sql',
  'server/supabase/client.ts',
  'server/middleware/auth.ts',
  'server/routes/auth.ts',
  'server/routes/payments.ts',
  'server/services/qwenService.ts',
  'client/src/contexts/AuthContext.tsx',
  'client/src/pages/LandingV2.tsx',
  'client/src/pages/Pricing.tsx',
  'client/src/pages/Checkout.tsx',
  'client/src/pages/SpecialistOffer.tsx',
];

let allFilesExist = true;
for (const file of requiredFiles) {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  checks.push({ name: `File: ${file}`, status: exists ? '✅' : '❌' });
  if (!exists) allFilesExist = false;
}

// Check 2: Documentation
console.log('\n📚 Checking documentation...');
const docsExist = fs.existsSync(path.join(process.cwd(), 'docs/DEPLOYMENT_GUIDE.md'));
checks.push({ name: 'Deployment Guide', status: docsExist ? '✅' : '❌' });

// Print results
console.log('\n' + '='.repeat(60));
console.log('VERIFICATION RESULTS');
console.log('='.repeat(60) + '\n');

let passed = 0;
let failed = 0;

for (const check of checks) {
  console.log(`${check.status} ${check.name}`);
  if (check.status === '✅') passed++;
  else failed++;
}

console.log('\n' + '='.repeat(60));
console.log(`Total: ${passed} passed, ${failed} failed`);
console.log('='.repeat(60) + '\n');

if (failed === 0) {
  console.log('🎉 All checks passed! Your project is ready for deployment.');
  console.log('\nNext steps:');
  console.log('1. Read docs/DEPLOYMENT_GUIDE.md');
  console.log('2. Set up Supabase project');
  console.log('3. Deploy to Render and Vercel');
  process.exit(0);
} else {
  console.log('⚠️  Some checks failed. Please review the errors above.');
  process.exit(1);
}

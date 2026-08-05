import { execSync } from 'child_process';

// Bridge script: workflow calls `node scripts/build.mjs`, we forward to Astro
console.log('Building Astro site...');
execSync('npx astro build', { stdio: 'inherit', cwd: process.cwd() });
console.log('Build complete.');

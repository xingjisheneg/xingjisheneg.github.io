import { execSync } from 'child_process';
execSync('npx astro build', { stdio: 'inherit' });

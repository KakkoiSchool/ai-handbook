import { openContext } from './_profile.mjs';

const owner = process.argv[2];
const context = await openContext();
const page = context.pages()[0] || await context.newPage();
const url = owner
  ? `https://github.com/organizations/${encodeURIComponent(owner)}/repositories/new`
  : 'https://github.com/new';
await page.goto(url);
console.log(`Opened: ${url}`);
console.log('The student should review owner, name, visibility, and initialization choices before creating the repository.');

import { openContext, requireRepo } from './_profile.mjs';

const repo = requireRepo(process.argv[2]);
const section = (process.argv[3] || 'general').toLowerCase();
const paths = {
  general: 'settings',
  pages: 'settings/pages',
  access: 'settings/access',
  actions: 'settings/actions',
};
if (!paths[section]) throw new Error(`Unknown section: ${section}. Use general, pages, access, or actions.`);

const context = await openContext();
const page = context.pages()[0] || await context.newPage();
const url = `https://github.com/${repo}/${paths[section]}`;
await page.goto(url);
console.log(`Opened: ${url}`);

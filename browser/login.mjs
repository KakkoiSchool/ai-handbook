import { openContext } from './_profile.mjs';

const context = await openContext();
const page = context.pages()[0] || await context.newPage();
await page.goto('https://github.com/login');
console.log('Log into GitHub manually in the browser. Do not paste credentials into an AI chat.');
console.log('When GitHub is fully logged in, close the browser window.');
await new Promise(resolve => context.on('close', resolve));

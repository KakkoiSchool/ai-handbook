import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const profileDir = path.join(here, '..', '.playwright-profile');

export async function openContext(options = {}) {
  return chromium.launchPersistentContext(profileDir, {
    headless: false,
    viewport: { width: 1280, height: 900 },
    ...options,
  });
}

export function requireRepo(value) {
  if (!value || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value)) {
    throw new Error('Expected repository as OWNER/REPO');
  }
  return value;
}

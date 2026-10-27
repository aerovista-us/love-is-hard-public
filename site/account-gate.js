import { downloadBackup } from './notes-transfer.js';

// These URLs carry only the requested route, query and anchor, never notes or tokens.
const path = document.body.dataset.protectedPath;
if (/^\/content\/AV-APP-LOVE-IS-HARD\/[a-z0-9-]+\.html$/.test(path || '')) {
  const target = new URL(path, 'https://mag-auth.aerovista.us');
  target.search = location.search;
  target.searchParams.delete('auth');
  target.hash = location.hash;
  for (const [id, route] of [['sign-in', '/login'], ['create-account', '/register']]) {
    const url = new URL(route, target.origin);
    url.searchParams.set('return_to', target.href);
    document.getElementById(id).href = url.href;
  }
}

document.getElementById('export-notes').addEventListener('click', () => {
  const status = document.getElementById('transfer-status');
  try {
    const count = downloadBackup(localStorage);
    status.textContent = count ? `Exported ${count} note groups. Import this file after signing in.` : 'There are no earlier notes in this browser.';
  } catch {
    status.textContent = 'Notes could not be exported from this browser. Your existing notes have not been changed.';
  }
});

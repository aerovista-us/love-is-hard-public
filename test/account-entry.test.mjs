import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createBackup, restoreBackup, validateBackup } from '../site/notes-transfer.js';

const routes = JSON.parse(readFileSync('routes.json', 'utf8'));
test('every former HTML route is an account gate without learning payload', () => {
  assert.equal(routes.length, 22);
  for (const { file } of routes) {
    const html = readFileSync('site/' + file, 'utf8');
    assert.match(html, /Sign in with AeroVista/);
    assert.ok(html.includes('/content/AV-APP-LOVE-IS-HARD/' + file));
    assert.doesNotMatch(html, /<audio|<iframe|data-session-card|id="guided-deep-dive"|<textarea|learning-labs\.js|player\.js/);
    const href = html.match(/id="sign-in" href="([^"]+)"/)[1].replaceAll('&amp;', '&');
    const target = new URL(new URL(href).searchParams.get('return_to'));
    assert.equal(target.origin, 'https://mag-auth.aerovista.us');
    assert.equal(target.pathname, '/content/AV-APP-LOVE-IS-HARD/' + file);
  }
});

test('public deployment inventory contains entry assets only', () => {
  const expected = [...routes.map((r) => r.file), '.nojekyll', 'account.css', 'account-gate.js', 'notes-transfer.js', 'assets', 'assets/favicon.svg'].sort();
  assert.deepEqual(readdirSync('site', { recursive: true }).sort(), expected);
});

function memoryStorage(entries = []) {
  const map = new Map(entries);
  return { get length(){return map.size;}, key:i=>[...map.keys()][i], getItem:k=>map.get(k)??null, setItem:(k,v)=>map.set(k,v), removeItem:k=>map.delete(k) };
}
test('note migration copies only Love Is Hard keys and never removes originals', () => {
  const original = memoryStorage([['love_is_hard_public_workbook_v1', '{"note":"keep me"}'], ['lih-lab-v1-3','{"x":1}'], ['unrelated-secret','do not export']]);
  const backup = createBackup(original);
  assert.equal(Object.keys(backup.entries).length, 2);
  const destination = memoryStorage();
  assert.equal(restoreBackup(destination, backup), 2);
  assert.equal(destination.getItem('unrelated-secret'), null);
  assert.equal(original.getItem('love_is_hard_public_workbook_v1'), destination.getItem('love_is_hard_public_workbook_v1'));
});
test('invalid backup data is rejected before changing notes', () => {
  for (const entries of [{ '__proto__': 'x', 'unrelated-secret':'{}' }, { 'lih-lab-v1-1':'invalid JSON' }, { 'lih-lab-v1-1':5 }]) {
    assert.throws(() => validateBackup({format:'love-is-hard-local-notes',version:1,entries}));
  }
});

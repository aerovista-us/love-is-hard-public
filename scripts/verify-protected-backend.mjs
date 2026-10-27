import assert from 'node:assert/strict';

const origin = 'https://mag-auth.aerovista.us';
for (const file of ['index.html','player.js','audio/head-vs-heart.mp3']) {
  const response = await fetch(`${origin}/content/AV-APP-LOVE-IS-HARD/${file}`, {redirect:'manual',signal:AbortSignal.timeout(15000)});
  assert.equal(response.status,401,`${file}: backend must exist and deny anonymous reads before publishing`);
  const body = await response.json();
  assert.equal(body.code,'not_authenticated');
}
const target = `${origin}/content/AV-APP-LOVE-IS-HARD/lesson-05.html#practice`;
const login = await fetch(`${origin}/login?return_to=${encodeURIComponent(target)}`, {redirect:'manual',signal:AbortSignal.timeout(15000)});
assert.equal(login.status,302);
const account = new URL(login.headers.get('location'));
assert.equal(account.origin,'https://account.aerocoreos.com');
const callback = new URL(account.searchParams.get('return_to'));
assert.equal(callback.searchParams.get('return_to'),target,'Account must return to the requested app page');
console.log('Protected backend exists, anonymous access denied, and Account return routing ready.');

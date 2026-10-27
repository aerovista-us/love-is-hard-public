# Account-only migration

Replace the complete public hosted application with account entry pages. Preserve
all learning content and audio in the private master application's `site/` folder.
Reusing `aerovista_publications` avoids duplicating Account, AVCC Identity,
credentials, user roles or Identity Gateway broker registration.

The server resolves and describes the session for every payload request. Anonymous,
expired, revoked, suspended and unavailable-authority cases deny delivery.

## Required acceptance

- Complete private source snapshot and audio hashes preserved in Git.
- Authenticated ordinary member receives the original app and assets.
- Direct HTML, JS, MP3, HEAD and byte-range requests require a live session.
- Suspended/expired/revoked sessions and Identity outages fail closed.
- Login and registration preserve requested route, query and anchor.
- Protected navigation stays within the package; audio supports seeking.
- Protected logout requires exact-origin and CSRF proof and revokes the session.
- Local notes export/import without silent overwrite or original deletion.
- Public inventory contains only 22 account entry pages and their assets.
- Former public MP3 and application JS URLs return 404 after public deployment.

## Deployment and rollback

Keep the private app in the existing read-only protected package store. The ACOS
descriptor uses `/var/lib/mag-auth/packages/AV-APP-LOVE-IS-HARD`. Keep hashes,
source revisions and acceptance evidence outside the serving root.

Deploy the backend before the public entry pages. `verify-protected-backend.mjs`
blocks a Pages deployment if the package is missing or anonymously readable.
Authenticated Account/browser acceptance must be recorded separately before promotion.

Keep the account boundary in place on rollback: retain entry pages and temporarily
close the protected app if its backend is unavailable. Do not republish the old
public payload as routine rollback. Retain the previous private package and image.

## Limits

Notes remain browser-local and are not synchronized or isolated by Account. Export
notes before using a shared device. This migration does not rewrite public Git
history or withdraw previously downloaded copies.

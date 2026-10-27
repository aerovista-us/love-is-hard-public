# Love Is Hard Discovery — AeroVista account entry

This repository hosts public account entry pages for Summit Learning's Love Is
Hard Discovery app. The complete teaching app is served after a live AeroVista
Account session check by the existing shared App Adapter boundary.

## Access policy

Any active canonical AeroVista account with a valid session can enter. No paid
plan, staff role or premium publication grant is required. Login and registration
go through the central Account flow; there is no separate user database.

Account → mag-auth → App Adapter → Identity Gateway → AVCC Identity.

The package is `AV-APP-LOVE-IS-HARD` with access mode `member`. Pages, scripts,
styles, images and audio are protected at request time. Public HTML contains only
sign-in/registration links and a local notes export helper.

## Build and check

```sh
npm run build
npm test
node scripts/verify-protected-backend.mjs
```

`routes.json` preserves all 22 existing HTML URLs as account entry pages. The
generator contains no curriculum or activity payload. GitHub Pages deploys only
`site/` after checking that the protected backend exists and denies anonymous
requests.

## Complete application source

The complete application and build generator are preserved in the private
`aerovista-us/Summit_Love_Is_Hard_Master_Package` repository at
`apps/love-is-hard/`. That package contains only the formerly public learning app;
private evidence and Safety Lane archives are excluded from its serving root.

## Existing notes

The former public origin keeps its browser-local notes. Entry pages can download
those notes as a local JSON backup. After signing in, use **Import earlier notes**.
Export leaves originals in place; import validates permitted keys and asks before
overwriting matching note groups. Signing in does not create cloud note storage.

## Release order

Preserve and verify the private app first, stage its complete package, deploy and
accept the ACOS account boundary, then publish these entry pages. See
`docs/ACCOUNT_ACCESS.md` for acceptance and rollback details.

The old public Git history is unchanged. Previously published or downloaded copies
cannot be withdrawn by protecting the current hosted app.

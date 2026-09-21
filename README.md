# Stalker Fan Club — v1

Private backup of the Stalker Fan Club project, saved on 2026-09-21.

## Files

- `stalker-site-v1.zip` — complete tracked project source, including artwork, fonts, frontend, server, database migrations, package lockfile and hosting configuration.
- `stalker-site-v1.bundle` — full local Git history through commit `d4e50ad6813a4dd60d1ef3aeecef54bec2f18280`.

This repository stores the project as recovery archives. The source files are inside the ZIP; they are not unpacked in the GitHub file tree.

## Restore with history

Download the bundle and run:

```sh
git clone stalker-site-v1.bundle stalker-site
cd stalker-site
npm ci
npm run build
```

Alternatively, unpack the ZIP, run `npm ci`, then `npm run build`.

## Architecture

- `public/`: Ukrainian/English frontend and visual assets.
- `server/index.mjs`: Cloudflare Worker API for accounts, news, forum, chat, avatars and inventory.
- `db/` and `drizzle/`: database schema and migrations.
- `build.mjs`: generates `dist/client`, `dist/server` and deployment metadata.
- `.openai/hosting.json`: existing Sites project configuration, with D1 binding `DB` and R2 binding `BUCKET`.

The deployed application needs its D1 database and R2 object storage. This backup contains code and migrations, not live accounts, passwords, messages, uploaded user images, database records or production storage contents. Environment secrets and `node_modules` are not included.

Live site: https://stalker-fan-club.yanickson69.chatgpt.site/

S.T.A.L.K.E.R. belongs to GSC Game World. Third-party assets retain their respective rights; this backup does not grant a new license to them.

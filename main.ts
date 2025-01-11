/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import '$std/dotenv/load.ts';

import { start } from '$fresh/server.ts';
import manifest from './fresh.gen.ts';
import config from './fresh.config.ts';
import { updateDojos } from './utils/update-dojos.ts';

Deno.cron('Run once an hour on the hour', '30 0-14 * * *', updateDojos);

await start(manifest, config);

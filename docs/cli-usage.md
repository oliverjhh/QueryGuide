# CLI Usage

TrailQuery Compass exposes several lightweight helpers so each evening feels like a tiny sprint.

## Generate a guide

- `npm run guide -- --topic "<topic>"` — compile the default template, journal the result, and print the prompts.
- `--variant` accepts `quick`, `deep`, or `reflect` to shift the tone of the prompts.
- `--note` attaches a personal reminder to the journal entry for context later.

## Explore templates and journals

- `npm run template` shows the prompt layout and section names for the current template.
- `npm run logs` lists every stored journal entry with its variant, timestamp, and optional note.
- `npm run stats` totals how many entries exist per variant and calls out the latest entry.

## Share or reuse content

- `npm run export` prints the most recent journal entry as a markdown outline you can paste into docs or Notion.

These commands keep your reference guide practice grounded, even when time is tight.

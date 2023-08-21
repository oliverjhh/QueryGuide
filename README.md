# TrailQuery Compass

TrailQuery Compass is a solo reference-guide builder for topic explorers. It stitches together curated research prompts, checkpoints, and resource reminders so that practitioners can quickly capture what questions to ask, which sources to consult, and when to reflect.

## Highlights

- CLI and lightweight API surface to compose new guides on any subject.
- Modular prompt templates that adapt to web2 and web3 workflows.
- Guidance for documenting findings, blockers, and next actions.

## Getting Started

1. Install dependencies (Node.js 18+ assumed):
   ```sh
   npm install
   ```
2. Generate a quick reference guide for a topic:
   ```sh
   npm run guide -- --topic "Data Privacy"
   ```
3. Preview existing templates with:
   ```sh
   npm run template
   ```

## Journaling

Every guide you generate is persisted under `journals/` with a timestamped filename. The CLI writes the section data, variant info, and creation timestamp so you can keep a lightweight log of every mini-burst of work before diving into the next evening's session.

Use `npm run logs` to list the most recent entries with their variant and creation timestamp; it helps you quickly re-open or reference anything you sketched previously.

Append `--note "mindset" ` to `npm run guide` to embed a quick session note, and it will show up in both the saved JSON and the log viewer output.

Run `npm run export` to turn the most recent journal entry into a markdown outline you can paste into docs or a Notion page.

If your evening is mostly about taking stock, pass `--variant reflect` so the Reflection section surfaces a recap of learnings alongside your next moves.

The `npm run stats` command gives you a quick count of how many journals exist per variant and points to the most recent entry so you can track momentum at a glance.

## Philosophy

Personal projects happen in spare moments. TrailQuery Compass follows a slow-burn cadence: draft a guide, ship a quick commit, iterate later. Every artifact should feel like it was drafted in an evening with limitations on time but ambition high.

For additional command details, see `docs/cli-usage.md`.

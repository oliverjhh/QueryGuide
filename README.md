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

## Philosophy

Personal projects happen in spare moments. TrailQuery Compass follows a slow-burn cadence: draft a guide, ship a quick commit, iterate later. Every artifact should feel like it was drafted in an evening with limitations on time but ambition high.

#!/usr/bin/env node
import { buildGuide } from "./generator.js";
import { persistGuide } from "./journal.js";

const args = process.argv.slice(2);

const options = args.reduce((acc, token, index) => {
  if (token === "--topic" && args[index + 1]) {
    acc.topic = args[index + 1];
  }
  if (token === "--variant" && args[index + 1]) {
    acc.variant = args[index + 1];
  }
  if (token === "--note" && args[index + 1]) {
    acc.note = args[index + 1];
  }
  if (token === "--template" && args[index + 1]) {
    acc.template = args[index + 1];
  }
  return acc;
}, { topic: null, variant: null });

const guide = buildGuide(options.topic, options.variant, options.template);
guide.note = options.note ? options.note.trim() : null;
const journalPath = await persistGuide(guide);

console.log(`TrailQuery Compass · ${guide.topic}`);
console.log(`Template: ${guide.template}`);
console.log(`Variant: ${guide.variant} · Focus: ${guide.focus}`);
console.log(`Timestamp: ${guide.generatedAt}`);
if (guide.note) {
  console.log(`Note: ${guide.note}`);
}
console.log("Journaled at:", journalPath);
console.log("----");

guide.sections.forEach((section) => {
  console.log(`> ${section.label}`);
  section.prompts.forEach((prompt, index) => {
    console.log(`  ${index + 1}. ${prompt}`);
  });
  console.log("");
});

console.log("Tip: use `npm run template` to list available templates.");

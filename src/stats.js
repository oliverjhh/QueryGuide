#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const journalsDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../journals"
);

async function readJournal(name) {
  const file = path.join(journalsDir, name);
  const contents = await fs.readFile(file, "utf8");
  return JSON.parse(contents);
}

async function main() {
  try {
    const entries = await fs.readdir(journalsDir);

    if (entries.length === 0) {
      console.log("No journal entries yet — your stats will populate once you log a guide.");
      return;
    }

    const records = await Promise.all(
      entries.map(async (name) => {
        const data = await readJournal(name);
        return {
          name,
          variant: data.variant,
          template: data.template || "default",
          createdAt: data.createdAt
        };
      })
    );

    const total = records.length;
    const variantCounts = new Map();
    records.forEach((record) => {
      variantCounts.set(record.variant, (variantCounts.get(record.variant) || 0) + 1);
    });
    const templateCounts = new Map();
    records.forEach((record) => {
      templateCounts.set(
        record.template,
        (templateCounts.get(record.template) || 0) + 1
      );
    });

    const latest = records.reduce((current, candidate) =>
      new Date(candidate.createdAt) > new Date(current.createdAt) ? candidate : current
    );

    console.log(`Total journal entries: ${total}`);
    console.log("Entries by variant:");
    variantCounts.forEach((count, variant) => {
      console.log(`  ${variant}: ${count}`);
    });
    console.log("Entries by template:");
    templateCounts.forEach((count, templateName) => {
      console.log(`  ${templateName}: ${count}`);
    });
    console.log(`Most recent entry: ${latest.name} (${latest.variant}) at ${latest.createdAt}`);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No journal folder found yet. Generate a guide session first.");
      return;
    }
    throw err;
  }
}

await main();

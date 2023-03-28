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
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw);
}

async function main() {
  let entries;

  try {
    entries = await fs.readdir(journalsDir);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No journal entries yet. Run `npm run guide` to create one.");
      return;
    }
    throw err;
  }

  if (entries.length === 0) {
    console.log("Journal folder is empty — start by generating your first guide.");
    return;
  }

  const items = await Promise.all(
    entries.map(async (name) => {
      const journal = await readJournal(name);
      return {
        name,
        topic: journal.topic,
        variant: journal.variant,
        createdAt: journal.createdAt,
        note: journal.note
      };
    })
  );

  items
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .forEach((entry) => {
      const summaryNote =
        entry.note && entry.note.length > 60
          ? `${entry.note.slice(0, 57)}...`
          : entry.note;
      console.log(
        `${entry.name} · ${entry.topic} · ${entry.variant} · ${entry.createdAt}${
          summaryNote ? ` · Note: ${summaryNote}` : ""
        }`
      );
    });
}

await main();

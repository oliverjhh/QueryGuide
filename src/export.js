#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const journalsDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../journals"
);

async function getLatestJournal() {
  const files = await fs.readdir(journalsDir);
  if (files.length === 0) {
    throw new Error("No journal entries found.");
  }

  const journals = await Promise.all(
    files.map(async (name) => {
      const file = path.join(journalsDir, name);
      const contents = await fs.readFile(file, "utf8");
      return { name, data: JSON.parse(contents) };
    })
  );

  journals.sort(
    (a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt)
  );

  return journals[0];
}

function toMarkdown(journal) {
  const lines = [];

  lines.push(`# ${journal.topic} · ${journal.variant}`);
  lines.push("");
  lines.push(`Generated: ${journal.createdAt}`);
  lines.push(`Template: ${journal.template || "default"}`);
  if (journal.note) {
    lines.push(`Note: ${journal.note}`);
  }
  lines.push("");
  lines.push("## Sections");
  lines.push("");

  journal.sections.forEach((section) => {
    lines.push(`### ${section.label}`);
    section.prompts.forEach((prompt, index) => {
      lines.push(`${index + 1}. ${prompt}`);
    });
    lines.push("");
  });

  return lines.join("\n");
}

async function main() {
  try {
    const latest = await getLatestJournal();
    const markdown = toMarkdown(latest.data);
    console.log(markdown);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("No journal folder found yet. Generate a guide first.");
    } else {
      console.log("Unable to export:", err.message);
    }
  }
}

await main();

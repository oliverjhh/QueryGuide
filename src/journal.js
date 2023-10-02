import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export async function persistGuide(guide) {
  const journalsDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../journals"
  );
  await fs.mkdir(journalsDir, { recursive: true });

  const safeTopic = guide.topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 32);

  const timestamp = guide.generatedAt.replace(/:/g, "-");
  const filename = `${safeTopic || "guide"}-${timestamp}.json`;
  const filePath = path.join(journalsDir, filename);

  const payload = {
    topic: guide.topic,
    variant: guide.variant,
    focus: guide.focus,
    note: guide.note || null,
    template: guide.template,
    sections: guide.sections,
    createdAt: guide.generatedAt
  };

  await fs.writeFile(filePath, JSON.stringify(payload, null, 2) + "\n");

  return filePath;
}

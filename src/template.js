#!/usr/bin/env node
import template from "../templates/default.json" assert { type: "json" };

console.log("Available Guide Templates:");
console.log(`- ${template.name}: ${template.description}`);
Object.entries(template.variants).forEach(([key, value]) => {
  console.log(`  • ${key} → ${value.focus} (${value.sections.length} sections)`);
});

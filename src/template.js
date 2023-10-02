#!/usr/bin/env node
import { TEMPLATE_NAMES, getTemplate } from "./templates.js";

console.log("Available Guide Templates:");
TEMPLATE_NAMES.forEach((templateName) => {
  const template = getTemplate(templateName);
  console.log(`- ${templateName}: ${template.description}`);
  Object.entries(template.variants).forEach(([key, value]) => {
    console.log(`  • ${key} → ${value.focus} (${value.sections.length} sections)`);
  });
});

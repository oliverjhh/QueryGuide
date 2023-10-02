import { getTemplate, DEFAULT_TEMPLATE } from "./templates.js";

const DEFAULT_VARIANT = "deep";

function normalizeVariant(key, variants) {
  return key && variants[key] ? key : DEFAULT_VARIANT;
}

export function buildGuide(topic, requestedVariant, templateName = DEFAULT_TEMPLATE) {
  const template = getTemplate(templateName);
  const variantKey = normalizeVariant(requestedVariant, template.variants);
  const variant = template.variants[variantKey];

  const sections = template.sections
    .filter((section) => variant.sections.includes(section.label))
    .map((section) => ({
      label: section.label,
      prompts: section.prompts.map((prompt) => prompt.trim())
    }));

  return {
    topic: topic || "Untitled Trail",
    variant: variantKey,
    focus: variant.focus,
    template: templateName,
    sections,
    generatedAt: new Date().toISOString()
  };
}

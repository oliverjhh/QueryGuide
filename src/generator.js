import template from "../templates/default.json" assert { type: "json" };

const DEFAULT_VARIANT = "deep";

function normalizeVariant(key) {
  return key && template.variants[key] ? key : DEFAULT_VARIANT;
}

export function buildGuide(topic, requestedVariant) {
  const variantKey = normalizeVariant(requestedVariant);
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
    sections,
    generatedAt: new Date().toISOString()
  };
}

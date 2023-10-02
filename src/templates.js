import defaultTemplate from "../templates/default.json" assert { type: "json" };
import botTemplate from "../templates/bot.json" assert { type: "json" };

const templates = {
  default: defaultTemplate,
  bot: botTemplate
};

export const TEMPLATE_NAMES = Object.keys(templates);
export const DEFAULT_TEMPLATE = "default";

export function getTemplate(name) {
  return templates[name] || templates.default;
}

export function listTemplates() {
  return TEMPLATE_NAMES.map((name) => ({
    name,
    description: templates[name].description
  }));
}

# Templates

TrailQuery Compass loads every JSON file inside `templates/`. Each template defines:

- `name` and `description` for humans and the `npm run template` helper.
- `sections`: an array of labeled prompt clusters that the generator can reuse across variants.
- `variants`: keyed by variant name and listing the sections to include plus a short focus descriptor.

When you add a new template file, keep the JSON shape consistent and include at least one `variants` entry named `deep` so the generator knows what to display by default. Every template is selected via `npm run guide -- --template <name>`, and the CLI will fall back to `default` if an unknown name is provided.

To add a new variant inside a template, add a `variants` member where the key is the new hook name, then reference the section labels you want to include. The generator takes care of trimming prompts and journaling the same structure you define.

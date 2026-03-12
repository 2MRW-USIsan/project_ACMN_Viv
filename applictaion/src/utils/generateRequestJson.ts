import type {
  YamlBloc,
  YamlData,
  YamlOrdersComplexOption,
  YamlOrdersField,
} from "@/types/yamlData";

/**
 * Picks a random item from options weighted by the `weight` field.
 * Falls back to weight=1 if `weight` is missing or not a valid number.
 * Items with weight=0 are never selected unless all weights are zero.
 */
function weightedRandom<T extends { weight: string }>(items: T[]): T | null {
  if (items.length === 0) return null;
  const weights = items.map((o) => {
    const w = parseFloat(o.weight);
    return Number.isNaN(w) ? 1 : Math.max(w, 0);
  });
  const total = weights.reduce((sum, w) => sum + w, 0);
  if (total <= 0) return items[0];
  let rand = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return items[i];
  }
  return items[items.length - 1];
}

/** Generates a single field value based on its type. */
function generateFieldValue(field: YamlOrdersField): string {
  const typeHandlers: Record<string, () => string> = {
    Random: () => {
      const picked = weightedRandom(field.options ?? []);
      return picked?.value ?? "";
    },
    Complex: () => {
      const outerPicked = weightedRandom(field.options ?? []);
      if (!outerPicked) return "";
      const innerOptions: YamlOrdersComplexOption[] =
        outerPicked.complexOptions ?? [];
      const innerPicked = weightedRandom(innerOptions);
      return innerPicked?.value ?? outerPicked.value;
    },
    Scripts: () => field.label,
    Color: () => field.label,
  };

  return (typeHandlers[field.type] ?? (() => field.label))();
}

/** Generates a JSON object (keyed by field.key) for one orders item. */
function generateOrdersItemJson(
  fields: YamlOrdersField[],
): Record<string, string> {
  return Object.fromEntries(fields.map((f) => [f.key, generateFieldValue(f)]));
}

/** Builds the header comment lines for a section. */
function buildSectionHeader(bloc: YamlBloc, ordersLabel: string): string {
  return `// ${bloc.label} / ${ordersLabel}`;
}

/**
 * Generates the [リクエスト用JSON情報] text from a parsed YAML structure.
 *
 * For each bloc that contains orders, each orders item produces a labeled
 * JSON block.  All blocks are joined with blank lines.
 *
 * @param yamlData  The parsed YAML data object.
 * @returns         The formatted request JSON text ready for display.
 */
export function generateRequestJson(yamlData: YamlData): string {
  const sections: string[] = [];

  for (const bloc of yamlData.blocs) {
    if (!bloc.orders || bloc.orders.length === 0) continue;
    for (const ordersItem of bloc.orders) {
      const json = generateOrdersItemJson(ordersItem.fields ?? []);
      const header = buildSectionHeader(bloc, ordersItem.label);
      sections.push(`${header}\n${JSON.stringify(json, null, 2)}`);
    }
  }

  return sections.join("\n\n");
}

/**
 * Shuffles (re-generates) the request JSON for a given YAML data object.
 * Uses the same algorithm as `generateRequestJson` so values are newly
 * random on each call.
 */
export function shuffleRequestJson(yamlData: YamlData): string {
  return generateRequestJson(yamlData);
}

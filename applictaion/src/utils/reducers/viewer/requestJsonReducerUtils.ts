import { load as loadYaml } from "js-yaml";
import { generateRequestJson, shuffleRequestJson } from "@/utils/generateRequestJson";
import type { YamlData } from "@/types/viewer/yamlData";

type RequestInternalState = {
  text: string;
  yamlError: string;
  yamlData: YamlData | null;
};

export const parseYaml = (
  yamlContent: string,
): { data: YamlData | null; error: string } => {
  if (!yamlContent.trim()) return { data: null, error: "" };
  try {
    const parsed = loadYaml(yamlContent) as YamlData | null;
    if (!parsed?.blocs) {
      return { data: null, error: "YAMLにblocsフィールドがありません" };
    }
    return { data: parsed, error: "" };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { data: null, error: `YAMLの解析に失敗しました: ${detail}` };
  }
};

export const loadYamlContent = (
  yamlContent: string,
): RequestInternalState => {
  const { data, error } = parseYaml(yamlContent);
  const text = data ? generateRequestJson(data) : "";
  return { text, yamlError: error, yamlData: data };
};

export const shuffleRequestState = (
  state: RequestInternalState,
): RequestInternalState => {
  if (!state.yamlData) return state;
  return { ...state, text: shuffleRequestJson(state.yamlData) };
};

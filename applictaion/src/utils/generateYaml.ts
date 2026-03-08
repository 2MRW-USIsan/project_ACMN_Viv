import { stringify } from "yaml";
import type {
  OrdersComplexItemData,
  OrdersDataItem,
  OrdersItemData,
  OrdersPanelItem,
  PanelDataStateType,
  SelectDataItem,
  SelectListDataItem,
  SelectPanelItem,
  SwitchDataItem,
  SwitchPanelItem,
} from "@/types/panel";

// Serializable YAML data types (no IDs, state flags, or callbacks)

type YamlOrdersComplexOption = {
  value: string;
  prompt: string;
  weight: string;
};

type YamlOrdersOption = {
  value: string;
  prompt: string;
  weight: string;
  complexOptions?: YamlOrdersComplexOption[];
};

type YamlOrdersField = {
  key: string;
  label: string;
  type: string;
  param: string;
  options?: YamlOrdersOption[];
};

type YamlOrdersItem = {
  key: string;
  label: string;
  fields: YamlOrdersField[];
};

type YamlSelectOption = {
  prompt: string;
  value: string;
};

type YamlSelectField = {
  key: string;
  label: string;
  options: YamlSelectOption[];
};

type YamlSelectItem = {
  key: string;
  label: string;
  fields: YamlSelectField[];
};

type YamlSwitchField = {
  key: string;
  label: string;
  value: string;
  altValue: string;
};

type YamlSwitchItem = {
  key: string;
  label: string;
  fields: YamlSwitchField[];
};

type YamlPanel = {
  key: string;
  label: string;
  orders?: YamlOrdersItem[];
  select?: YamlSelectItem[];
  switch?: YamlSwitchItem[];
};

type YamlOutput = {
  blocs: YamlPanel[];
};

function serializeOrdersComplexItemData(
  item: OrdersComplexItemData,
): YamlOrdersComplexOption {
  return {
    value: item.values.value,
    prompt: item.values.prompt,
    weight: item.values.weight,
  };
}

function serializeOrdersItemData(item: OrdersItemData): YamlOrdersOption {
  const option: YamlOrdersOption = {
    value: item.values.value,
    prompt: item.values.prompt,
    weight: item.values.weight,
  };
  if (item.complexData && item.complexData.length > 0) {
    option.complexOptions = item.complexData.map(
      serializeOrdersComplexItemData,
    );
  }
  return option;
}

function serializeOrdersDataItem(item: OrdersDataItem): YamlOrdersField {
  const field: YamlOrdersField = {
    key: item.values.key,
    label: item.values.label,
    type: item.values.type,
    param: item.values.param,
  };
  if (item.data && item.data.length > 0) {
    field.options = item.data.map(serializeOrdersItemData);
  }
  return field;
}

function serializeOrdersPanelItem(item: OrdersPanelItem): YamlOrdersItem {
  return {
    key: item.values.key,
    label: item.values.label,
    fields: item.data.map(serializeOrdersDataItem),
  };
}

function serializeSelectListDataItem(
  item: SelectListDataItem,
): YamlSelectOption {
  return {
    prompt: item.values.prompt,
    value: item.values.value,
  };
}

function serializeSelectDataItem(item: SelectDataItem): YamlSelectField {
  return {
    key: item.values.key,
    label: item.values.label,
    options: item.data.map(serializeSelectListDataItem),
  };
}

function serializeSelectPanelItem(item: SelectPanelItem): YamlSelectItem {
  return {
    key: item.values.key,
    label: item.values.label,
    fields: item.data.map(serializeSelectDataItem),
  };
}

function serializeSwitchDataItem(item: SwitchDataItem): YamlSwitchField {
  return {
    key: item.key,
    label: item.label,
    value: item.value,
    altValue: item.altValue,
  };
}

function serializeSwitchPanelItem(item: SwitchPanelItem): YamlSwitchItem {
  return {
    key: item.values.key,
    label: item.values.label,
    fields: item.data.map(serializeSwitchDataItem),
  };
}

/**
 * Converts the panel state (structured input field data) into a YAML string.
 * Only selected chip types are included in the output.
 */
export function generateYaml(state: PanelDataStateType): string {
  const output: YamlOutput = {
    blocs: state.panels.map((panel) => {
      const yamlPanel: YamlPanel = {
        key: panel.values.key,
        label: panel.label,
      };

      if (panel.orders.selected && panel.orders.data.length > 0) {
        yamlPanel.orders = panel.orders.data.map(serializeOrdersPanelItem);
      }

      if (panel.select.selected && panel.select.data.length > 0) {
        yamlPanel.select = panel.select.data.map(serializeSelectPanelItem);
      }

      if (panel.switch.selected && panel.switch.data.length > 0) {
        yamlPanel.switch = panel.switch.data.map(serializeSwitchPanelItem);
      }

      return yamlPanel;
    }),
  };

  return stringify(output);
}

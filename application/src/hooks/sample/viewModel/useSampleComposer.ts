"use client";

import { SampleItem } from "@/types/sampleItem";
import { SampleContexts } from "@/hooks/sample/state/useSampleContext";
import { useSampleProperties } from "@/hooks/sample/viewModel/useSampleProperties";
import { useSampleHandlers } from "@/hooks/sample/viewModel/useSampleHandlers";
import { LabelAtomProps } from "@/components/atoms/LabelAtom";
import { TextFieldAtomProps } from "@/components/atoms/TextFieldAtom";
import { ButtonAtomProps } from "@/components/atoms/ButtonAtom";
import { SampleListItemMoleculeProps } from "@/components/molecules/SampleListItemMolecule";

export interface SampleViewModel {
  itemList: {
    titleLabel: LabelAtomProps["props"];
    emptyLabel: LabelAtomProps["props"];
    items: Array<SampleListItemMoleculeProps["props"] & { key: string }>;
    isLoading: boolean;
  };
  editor: {
    titleLabel: LabelAtomProps["props"];
    titleField: TextFieldAtomProps["props"];
    descriptionField: TextFieldAtomProps["props"];
    saveButton: ButtonAtomProps["props"];
    cancelButton?: ButtonAtomProps["props"];
  };
}

export function useSampleComposer(contexts: SampleContexts) {
  const { properties } = useSampleProperties(contexts);
  const { handlers } = useSampleHandlers(contexts);

  return {
    viewModel: {
      itemList: {
        titleLabel: {
          text: "データリスト",
          variant: "h6",
          fontWeight: "bold",
        },
        emptyLabel: {
          text: "データがありません。",
          variant: "body2",
          color: "text.secondary",
        },
        items: properties.itemList.map((item: SampleItem) => ({
          key: item.id,
          titleLabel: {
            text: item.title,
            fontWeight: "bold",
          },
          descriptionLabel: {
            text: item.description,
            variant: "body2",
            color: "text.secondary",
          },
          deleteButton: {
            label: "削除",
            variant: "outlined",
            color: "error",
            isLoading: properties.isLoading,
            onClick: () => handlers.onDeleteItem(item.id),
          },
          isSelected: properties.selectedItem?.id === item.id,
          isLoading: properties.isLoading,
          onSelect: () => handlers.onSelectItem(item),
        })),
        isLoading: properties.isLoading,
      },
      editor: {
        titleLabel: {
          text: properties.isEditing ? "データ編集" : "新規データ作成",
          variant: "h6",
          fontWeight: "bold",
        },
        titleField: {
          label: "タイトル",
          defaultValue: properties.editorTitle,
          onBlur: handlers.onEditorTitleChange,
          fullWidth: true,
        },
        descriptionField: {
          label: "説明",
          defaultValue: properties.editorDescription,
          onBlur: handlers.onEditorDescriptionChange,
          multiline: true,
          rows: 3,
          fullWidth: true,
        },
        saveButton: {
          label: properties.isEditing ? "更新" : "作成",
          isLoading: properties.isLoading,
          onClick: handlers.onSave,
          fullWidth: true,
        },
        cancelButton: properties.isEditing
          ? {
              label: "キャンセル",
              variant: "outlined",
              onClick: handlers.onClearSelection,
              fullWidth: true,
            }
          : undefined,
      },
    } satisfies SampleViewModel,
  };
}

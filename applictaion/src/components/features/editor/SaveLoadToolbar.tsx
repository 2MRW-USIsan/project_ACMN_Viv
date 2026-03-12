"use client";

import type { PanelSaveItem } from "@/types/editor/panelSave";
import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { ButtonPanel } from "@/components/atoms/ButtonPanel";
import { TypographyText } from "@/components/atoms/TypographyText";

interface SaveLoadToolbarProps {
  props: {
    saveList: PanelSaveItem[];
    selectedSaveId: string;
    isLoading: boolean;
    isLoaded: boolean;
    loadedSaveName: string;
    onSelect: (id: string) => void;
    onLoad: () => void;
    onReselect: () => void;
  };
}

export function SaveLoadToolbar({ props }: SaveLoadToolbarProps) {
  const {
    saveList,
    selectedSaveId,
    isLoading,
    isLoaded,
    loadedSaveName,
    onSelect,
    onLoad,
    onReselect,
  } = props;
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {isLoaded ? (
        <TypographyText props={{ variant: "body2" }}>{loadedSaveName}</TypographyText>
      ) : (
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>保存済みデータ</InputLabel>
          <Select
            value={selectedSaveId}
            label="保存済みデータ"
            onChange={(e) => onSelect(e.target.value)}
          >
            {saveList.map((save) => (
              <MenuItem key={save.id} value={save.id}>
                {save.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {isLoaded ? (
        <ButtonPanel props={{ variant: "outlined", onClick: onReselect }}>再選択</ButtonPanel>
      ) : (
        <ButtonPanel
          props={{
            variant: "outlined",
            onClick: onLoad,
            disabled: !selectedSaveId || isLoading,
          }}
        >
          ロード
        </ButtonPanel>
      )}
    </Stack>
  );
}

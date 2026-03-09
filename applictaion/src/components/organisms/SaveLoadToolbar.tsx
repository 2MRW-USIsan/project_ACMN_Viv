"use client";

import type { PanelSaveItem } from "@/types/panelSave";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface SaveLoadToolbarProps {
  saveList: PanelSaveItem[];
  selectedSaveId: string;
  isLoading: boolean;
  onSelect: (id: string) => void;
  onLoad: () => void;
}

export function SaveLoadToolbar({
  saveList,
  selectedSaveId,
  isLoading,
  onSelect,
  onLoad,
}: SaveLoadToolbarProps) {
  return (
    <>
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
      <Button
        variant="outlined"
        onClick={onLoad}
        disabled={!selectedSaveId || isLoading}
        sx={{ ml: 1 }}
      >
        ロード
      </Button>
    </>
  );
}

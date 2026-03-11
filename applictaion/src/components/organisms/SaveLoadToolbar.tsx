"use client";

import type { PanelSaveItem } from "@/types/panelSave";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

interface SaveLoadToolbarProps {
  saveList: PanelSaveItem[];
  selectedSaveId: string;
  isLoading: boolean;
  isLoaded: boolean;
  loadedSaveName: string;
  onSelect: (id: string) => void;
  onLoad: () => void;
  onReselect: () => void;
}

export function SaveLoadToolbar({
  saveList,
  selectedSaveId,
  isLoading,
  isLoaded,
  loadedSaveName,
  onSelect,
  onLoad,
  onReselect,
}: SaveLoadToolbarProps) {
  return (
    <>
      {isLoaded ? (
        <Typography
          variant="body2"
          sx={{ minWidth: 200, alignSelf: "center" }}
        >
          {loadedSaveName}
        </Typography>
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
        <Button variant="outlined" onClick={onReselect} sx={{ ml: 1 }}>
          再選択
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={onLoad}
          disabled={!selectedSaveId || isLoading}
          sx={{ ml: 1 }}
        >
          ロード
        </Button>
      )}
    </>
  );
}

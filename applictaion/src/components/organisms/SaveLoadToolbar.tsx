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
  isLoaded: boolean;
  loadedSaveName: string;
  isLoading: boolean;
  onSelect: (id: string) => void;
  onLoad: () => void;
  onResetLoad: () => void;
}

export function SaveLoadToolbar({
  saveList,
  selectedSaveId,
  isLoaded,
  loadedSaveName,
  isLoading,
  onSelect,
  onLoad,
  onResetLoad,
}: SaveLoadToolbarProps) {
  return (
    <>
      {isLoaded ? (
        <Typography
          variant="body2"
          sx={{
            minWidth: 200,
            px: 1.5,
            py: 1,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            color: "text.secondary",
          }}
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
        <Button variant="outlined" onClick={onResetLoad} sx={{ ml: 1 }}>
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

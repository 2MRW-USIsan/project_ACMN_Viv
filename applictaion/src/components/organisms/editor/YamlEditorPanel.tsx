"use client";

import { Box, Stack } from "@mui/material";
import { AlertPanel } from "@/components/atoms/AlertPanel";
import { ButtonPanel } from "@/components/atoms/ButtonPanel";
import { InputPanel } from "@/components/atoms/InputPanel";
import { TypographyText } from "@/components/atoms/TypographyText";
import { useYamlEditor } from "@/hooks/useYamlEditor";

export function YamlEditorPanel() {
  const { content, savedMessage, setContent, save, createNew, download } = useYamlEditor();

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <TypographyText props={{ variant: "h5", component: "h1" }}>YAMLエディタ</TypographyText>

      <Stack direction="row" spacing={1}>
        <ButtonPanel props={{ variant: "contained", onClick: save }}>保存</ButtonPanel>
        <ButtonPanel props={{ variant: "outlined", onClick: createNew }}>新規</ButtonPanel>
        <ButtonPanel props={{ variant: "outlined", onClick: download }}>ダウンロード</ButtonPanel>
        {/* TODO: Add file load (upload) button when requirements are clarified */}
      </Stack>

      {savedMessage && (
        <Box sx={{ width: "fit-content" }}>
          <AlertPanel props={{ severity: "success" }}>{savedMessage}</AlertPanel>
        </Box>
      )}

      <InputPanel
        props={{
          label: "YAMLコンテンツ",
          value: content,
          onChange: setContent,
          multiline: true,
          rows: 24,
          fontFamily: "monospace",
          fullWidth: true,
        }}
      />
    </Box>
  );
}

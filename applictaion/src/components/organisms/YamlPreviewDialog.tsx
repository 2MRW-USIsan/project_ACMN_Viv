"use client";

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";

interface YamlPreviewDialogProps {
  props: {
    open: boolean;
    yaml: string;
    hasDiff: boolean;
    onClose: () => void;
    onRegister: () => Promise<void>;
  };
}

export function YamlPreviewDialog({ props }: YamlPreviewDialogProps) {
  const { open, yaml, hasDiff, onClose, onRegister } = props;
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [registering, setRegistering] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yaml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blocs.yaml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleConfirmRegister = async () => {
    setRegistering(true);
    try {
      await onRegister();
    } finally {
      setRegistering(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          YAML Preview
          <Tooltip
            title={
              copied ? "Copied!" : copyError ? "Copy failed" : "Copy to clipboard"
            }
          >
            <IconButton onClick={handleCopy} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download blocs.yaml">
            <IconButton onClick={handleDownload} size="small">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent dividers>
          {hasDiff && (
            <Alert severity="warning" sx={{ mb: 1 }}>
              ロードしたデータと現在の入力内容に差分があります。
            </Alert>
          )}
          <pre
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: "0.875rem",
              whiteSpace: "pre",
              overflowX: "auto",
            }}
          >
            {yaml}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setConfirmOpen(true)}
          >
            DBに登録
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>DBへの登録確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            現在のパネル設定をDBに登録します。よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={registering}>
            キャンセル
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmRegister}
            disabled={registering}
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


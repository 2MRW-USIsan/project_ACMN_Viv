"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useViewerViewModel } from "@/hooks/useViewerViewModel";

export function OrdersViewerPanel() {
  const vm = useViewerViewModel();

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" component="h1">
        オーダー
      </Typography>

      {vm.yamlError && (
        <Alert severity="error" sx={{ width: "fit-content" }}>
          {vm.yamlError}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* ===== Left: [リクエスト用JSON情報] ===== */}
        <Grid size={6}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Tooltip title="再抽選してJSON情報を更新します">
              <span>
                <Button
                  variant="contained"
                  onClick={vm.onShuffle}
                  disabled={!vm.hasYamlData}
                >
                  シャッフル
                </Button>
              </span>
            </Tooltip>
            <Tooltip title="テキストエリアの内容をクリップボードにコピーします">
              <Button
                variant="outlined"
                onClick={() => void vm.onCopyRequest()}
                disabled={!vm.requestJsonText}
              >
                コピー
              </Button>
            </Tooltip>
          </Stack>

          <Typography variant="subtitle1" gutterBottom>
            リクエスト用JSON情報
          </Typography>
          <TextField
            label="リクエスト用JSON"
            multiline
            rows={22}
            value={vm.requestJsonText}
            slotProps={{ htmlInput: { readOnly: true, style: { fontFamily: "monospace", fontSize: "0.8rem" } } }}
            fullWidth
          />
        </Grid>

        {/* ===== Right: [オーダー用JSON情報] ===== */}
        <Grid size={6}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Tooltip title="クリップボードの文字列を貼り付けます">
              <Button
                variant="contained"
                onClick={() => void vm.onPaste()}
              >
                ペースト
              </Button>
            </Tooltip>
            <Tooltip title="テキストエリアを空文字列にします">
              <Button variant="outlined" onClick={vm.onClear}>
                クリア
              </Button>
            </Tooltip>
            <Tooltip title="DBから取得した情報にリセットします">
              <Button variant="outlined" onClick={vm.onReset}>
                リセット
              </Button>
            </Tooltip>
            <Tooltip
              title={
                !vm.isRegisterEnabled
                  ? "JSONの構造が不正なため登録できません"
                  : "DBに登録/更新します"
              }
            >
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={vm.onRegisterClick}
                  disabled={!vm.isRegisterEnabled}
                >
                  登録
                </Button>
              </span>
            </Tooltip>
            {vm.isDeleteEnabled && (
              <Tooltip title="DBのレコードを削除します">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => void vm.onDelete()}
                >
                  削除
                </Button>
              </Tooltip>
            )}
          </Stack>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1">
              オーダー用JSON情報
            </Typography>
            {/* TBD: 次へボタン — 遷移先画面未実装 */}
            <Box sx={{ ml: "auto" }}>
              <Tooltip
                title={
                  !vm.isNextEnabled
                    ? "差分がある、またはJSONが不正なため次へ進めません"
                    : "次の画面へ進みます（TBD）"
                }
              >
                <span>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={!vm.isNextEnabled}
                    // TBD: onClick navigation to prompt editing screen
                  >
                    次へ
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Box>

          <TextField
            label="オーダー用JSON"
            multiline
            rows={22}
            value={vm.orderJsonText}
            slotProps={{ htmlInput: { readOnly: true, style: { fontFamily: "monospace", fontSize: "0.8rem" } } }}
            fullWidth
          />

          {/* Diff & validation status */}
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
            {vm.hasDiff && (
              <Alert severity="warning" sx={{ py: 0 }}>
                DBの保存データと差分があります
              </Alert>
            )}
            {vm.validationStatus === "valid" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "success.main" }}>
                <CheckCircleOutlineIcon fontSize="small" />
                <Typography variant="caption">JSON構造: OK</Typography>
              </Box>
            )}
            {vm.validationStatus === "invalid" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "error.main" }}>
                <ErrorOutlineIcon fontSize="small" />
                <Typography variant="caption">
                  JSON構造: NG — {vm.validationError}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Confirmation dialog for overwrite */}
      <Dialog
        open={vm.isConfirmDialogOpen}
        onClose={vm.onCancelConfirm}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>登録確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            DBに保存済みのオーダー用JSON情報と差分があります。上書き登録してよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={vm.onCancelConfirm}>キャンセル</Button>
          <Button
            variant="contained"
            onClick={() => void vm.onConfirmRegister()}
            color="primary"
          >
            登録
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

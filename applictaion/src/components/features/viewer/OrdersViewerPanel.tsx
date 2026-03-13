"use client";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { AlertPanel } from "@/components/atoms/AlertPanel";
import { ButtonPanel } from "@/components/atoms/ButtonPanel";
import { InputPanel } from "@/components/atoms/InputPanel";
import { TypographyText } from "@/components/atoms/TypographyText";
import type { ViewerViewModel } from "@/hooks/viewer/viewModel/useViewerViewModel";

interface OrdersViewerPanelProps {
  props: ViewerViewModel;
}

export function OrdersViewerPanel({ props: vm }: OrdersViewerPanelProps) {

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
      <TypographyText props={{ variant: "h5", component: "h1" }}>オーダー</TypographyText>

      {vm.yamlError && (
        <Box sx={{ width: "fit-content" }}>
          <AlertPanel props={{ severity: "error" }}>{vm.yamlError}</AlertPanel>
        </Box>
      )}

      <Grid container spacing={3}>
        {/* ===== Left: [リクエスト用JSON情報] ===== */}
        <Grid size={6}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Tooltip title="再抽選してJSON情報を更新します">
              <span>
                <ButtonPanel
                  props={{ variant: "contained", onClick: vm.onShuffle, disabled: !vm.hasYamlData }}
                >
                  シャッフル
                </ButtonPanel>
              </span>
            </Tooltip>
            <Tooltip title="テキストエリアの内容をクリップボードにコピーします">
              <ButtonPanel
                props={{ variant: "outlined", onClick: () => void vm.onCopyRequest(), disabled: !vm.requestJsonText }}
              >
                コピー
              </ButtonPanel>
            </Tooltip>
          </Stack>

          <TypographyText props={{ variant: "subtitle1", gutterBottom: true }}>
            リクエスト用JSON情報
          </TypographyText>
          <InputPanel
            props={{
              label: "リクエスト用JSON",
              value: vm.requestJsonText,
              multiline: true,
              rows: 22,
              readOnly: true,
              fontFamily: "monospace",
              fontSize: "0.8rem",
              fullWidth: true,
            }}
          />
        </Grid>

        {/* ===== Right: [オーダー用JSON情報] ===== */}
        <Grid size={6}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Tooltip title="クリップボードの文字列を貼り付けます">
              <ButtonPanel props={{ variant: "contained", onClick: () => void vm.onPaste() }}>ペースト</ButtonPanel>
            </Tooltip>
            <Tooltip title="テキストエリアを空文字列にします">
              <ButtonPanel props={{ variant: "outlined", onClick: vm.onClear }}>クリア</ButtonPanel>
            </Tooltip>
            <Tooltip title="DBから取得した情報にリセットします">
              <ButtonPanel props={{ variant: "outlined", onClick: vm.onReset }}>リセット</ButtonPanel>
            </Tooltip>
            <Tooltip
              title={
                !vm.isRegisterEnabled
                  ? "JSONの構造が不正なため登録できません"
                  : "DBに登録/更新します"
              }
            >
              <span>
                <ButtonPanel
                  props={{ variant: "contained", color: "primary", onClick: vm.onRegisterClick, disabled: !vm.isRegisterEnabled }}
                >
                  登録
                </ButtonPanel>
              </span>
            </Tooltip>
            {vm.isDeleteEnabled && (
              <Tooltip title="DBのレコードを削除します">
                <ButtonPanel props={{ variant: "outlined", color: "error", onClick: () => void vm.onDelete() }}>削除</ButtonPanel>
              </Tooltip>
            )}
          </Stack>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <TypographyText props={{ variant: "subtitle1" }}>オーダー用JSON情報</TypographyText>
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
                  <ButtonPanel
                    props={{ variant: "contained", size: "small", disabled: !vm.isNextEnabled }}
                  >
                    次へ
                  </ButtonPanel>
                </span>
              </Tooltip>
            </Box>
          </Box>

          <InputPanel
            props={{
              label: "オーダー用JSON",
              value: vm.orderJsonText,
              multiline: true,
              rows: 22,
              readOnly: true,
              fontFamily: "monospace",
              fontSize: "0.8rem",
              fullWidth: true,
            }}
          />

          {/* Diff & validation status */}
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
            {vm.hasDiff && (
              <AlertPanel props={{ severity: "warning", compact: true }}>
                DBの保存データと差分があります
              </AlertPanel>
            )}
            {vm.validationStatus === "valid" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "success.main" }}>
                <CheckCircleOutlineIcon fontSize="small" />
                <TypographyText props={{ variant: "caption" }}>JSON構造: OK</TypographyText>
              </Box>
            )}
            {vm.validationStatus === "invalid" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "error.main" }}>
                <ErrorOutlineIcon fontSize="small" />
                <TypographyText props={{ variant: "caption" }}>
                  JSON構造: NG — {vm.validationError}
                </TypographyText>
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
          <ButtonPanel props={{ onClick: vm.onCancelConfirm }}>キャンセル</ButtonPanel>
          <ButtonPanel props={{ variant: "contained", color: "primary", onClick: () => void vm.onConfirmRegister() }}>登録</ButtonPanel>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

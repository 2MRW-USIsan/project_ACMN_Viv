"use client";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import ArrowForwardOutlined from '@mui/icons-material/ArrowForwardOutlined';
import { useViewerViewModel } from '@/hooks/useViewerViewModel';
import { RequestJsonPanel } from '@/components/organisms/RequestJsonPanel';
import { OrderJsonPanel } from '@/components/organisms/OrderJsonPanel';

export default function ViewerPage() {
  const vm = useViewerViewModel();

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, height: '100vh' }}>
      <Stack direction="row" spacing={2} sx={{ flex: 1, overflow: 'auto' }}>
        <RequestJsonPanel
          title={vm.yamlTitle}
          json={vm.requestJson}
          onShuffle={vm.onShuffle}
          onCopy={vm.onCopyRequest}
        />
        <OrderJsonPanel
          json={vm.orderJson}
          isJsonValid={vm.isJsonValid}
          hasDiff={vm.hasDiff}
          isSaving={vm.isSaving}
          isDeleting={vm.isDeleting}
          canRegister={vm.canRegister}
          onPaste={vm.onPasteOrder}
          onClear={vm.onClearOrder}
          onReset={vm.onResetOrder}
          onRegister={vm.onRegisterOrder}
          onDelete={vm.onDeleteOrder}
        />
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Tooltip title={vm.canNext ? 'Go to next step' : 'Save valid JSON first'}>
          <span>
            <Button
              variant="contained"
              endIcon={<ArrowForwardOutlined />}
              disabled={!vm.canNext}
            >
              Next
            </Button>
          </span>
        </Tooltip>
      </Stack>

      <Dialog open={vm.showConfirmDialog} onClose={vm.onConfirmDialogCancel}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>{vm.confirmDialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={vm.onConfirmDialogCancel}>Cancel</Button>
          <Button onClick={vm.onConfirmDialogOk} variant="contained" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

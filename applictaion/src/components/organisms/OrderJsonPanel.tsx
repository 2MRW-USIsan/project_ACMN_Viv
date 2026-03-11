import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ContentPasteOutlined from '@mui/icons-material/ContentPasteOutlined';
import ClearOutlined from '@mui/icons-material/ClearOutlined';
import RestoreOutlined from '@mui/icons-material/RestoreOutlined';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlined from '@mui/icons-material/ErrorOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';

type Props = {
  readonly json: string;
  readonly isJsonValid: boolean;
  readonly hasDiff: boolean;
  readonly isSaving: boolean;
  readonly isDeleting: boolean;
  readonly canRegister: boolean;
  readonly onPaste: () => Promise<void>;
  readonly onClear: () => void;
  readonly onReset: () => void;
  readonly onRegister: () => Promise<void>;
  readonly onDelete: () => Promise<void>;
};

export const OrderJsonPanel = ({
  json,
  isJsonValid,
  hasDiff,
  isSaving,
  isDeleting,
  canRegister,
  onPaste,
  onClear,
  onReset,
  onRegister,
  onDelete,
}: Props) => (
  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Typography variant="h6">Order JSON</Typography>
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Tooltip title="Paste from clipboard">
        <Button
          variant="outlined"
          startIcon={<ContentPasteOutlined />}
          onClick={() => { onPaste().catch(console.error); }}
        >
          Paste
        </Button>
      </Tooltip>
      <Tooltip title="Clear">
        <Button
          variant="outlined"
          startIcon={<ClearOutlined />}
          onClick={onClear}
        >
          Clear
        </Button>
      </Tooltip>
      <Tooltip title="Reset to saved">
        <Button
          variant="outlined"
          startIcon={<RestoreOutlined />}
          onClick={onReset}
        >
          Reset
        </Button>
      </Tooltip>
      <Tooltip title="Register">
        <span>
          <Button
            variant="contained"
            startIcon={<SaveOutlined />}
            onClick={() => { onRegister().catch(console.error); }}
            disabled={!canRegister || isSaving}
          >
            Register
          </Button>
        </span>
      </Tooltip>
      <Tooltip title="Delete">
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlined />}
          onClick={() => { onDelete().catch(console.error); }}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </Tooltip>
    </Stack>
    <TextField
      multiline
      fullWidth
      value={json}
      slotProps={{ input: { readOnly: true } }}
      minRows={20}
      variant="outlined"
    />
    <Stack spacing={0.5}>
      {hasDiff && (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <WarningAmberOutlined color="warning" fontSize="small" />
          <Typography variant="body2" color="warning.main">
            Unsaved changes detected.
          </Typography>
        </Stack>
      )}
      <Stack direction="row" alignItems="center" spacing={0.5}>
        {isJsonValid ? (
          <CheckCircleOutlined color="success" fontSize="small" />
        ) : (
          <ErrorOutlined color="error" fontSize="small" />
        )}
        <Typography
          variant="body2"
          color={isJsonValid ? 'success.main' : 'error.main'}
        >
          {isJsonValid ? 'Valid JSON' : 'Invalid JSON'}
        </Typography>
      </Stack>
    </Stack>
  </Box>
);

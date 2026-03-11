import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ShuffleOutlined from '@mui/icons-material/ShuffleOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';

type Props = {
  readonly title: string;
  readonly json: string;
  readonly onShuffle: () => void;
  readonly onCopy: () => Promise<void>;
};

export const RequestJsonPanel = ({ title, json, onShuffle, onCopy }: Props) => (
  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Typography variant="h6">{title}</Typography>
    <Stack direction="row" spacing={1}>
      <Tooltip title="Shuffle">
        <Button
          variant="outlined"
          startIcon={<ShuffleOutlined />}
          onClick={onShuffle}
        >
          Shuffle
        </Button>
      </Tooltip>
      <Tooltip title="Copy to clipboard">
        <Button
          variant="outlined"
          startIcon={<ContentCopyOutlined />}
          onClick={() => { onCopy().catch(console.error); }}
        >
          Copy
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
  </Box>
);

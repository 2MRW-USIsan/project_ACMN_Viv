import CheckIcon from '@mui/icons-material/Check';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Chip } from '@mui/material';
interface CheckChipProps {
    label: string
    onClick: () => void
    selected: boolean
}
export function CheckChip({ label, selected, onClick }: CheckChipProps) {
    return (
        <Chip label={label} onClick={onClick}
            size="small"
            variant={selected ? "filled" : "outlined"}
            icon={
                selected ? <CheckIcon color="success" /> : <CircleOutlinedIcon color="disabled" />
            } />
    )

}


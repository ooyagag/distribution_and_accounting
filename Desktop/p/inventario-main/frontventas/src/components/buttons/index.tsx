import Button from '@mui/material/Button';
import { buttonProps } from "../../types/typeControls";

export default function Btn({ className, variant ,disabled=false, onClick, text, type } : buttonProps) {

    
    return (
        <Button
        variant ={variant}
            onClick={onClick}
            disabled={disabled}
            fullWidth
            type={type}
            >
                {text}
        </Button>
    )
}
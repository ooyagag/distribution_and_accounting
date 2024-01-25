import React from 'react'
import TextField from '@mui/material/TextField';
import { inputProps } from "../../types/typeControls";

export default function Input({ name, label, value, error=null, onChange, autofocus = true, type, className, onBlur } : inputProps) {

    return (
        <TextField
            variant="outlined"
            fullWidth
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            autoFocus = {autofocus}
            type={type}
            {...(error && {error:true,helperText:error})}
        />
    )
}
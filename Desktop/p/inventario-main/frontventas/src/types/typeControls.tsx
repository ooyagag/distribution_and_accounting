export interface inputProps{
    className: string,
    name: string,
    label: string,
    value: string,
    error: any,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    autofocus: boolean,
    type: string
    onBlur? : any
}

export interface buttonProps{
    className: string,
    text: string,
    onClick?: () => void,
    disabled: boolean,
    variant : any,
    type : 'submit' | 'reset' | 'button';
}

export interface snackbar{
    msg : string,
    severity? : any,
    open : boolean,
    handleClose : () => void
}
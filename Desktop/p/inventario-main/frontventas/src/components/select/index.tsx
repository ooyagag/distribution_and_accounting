
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectWrapper({ name, value, error, options,onChange }:any) {
    
  const handleChange = (event: SelectChangeEvent) => {
     onChange(event);
  };
    return (
        <FormControl fullWidth {...(error && {error:true})}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          name={name}
          onChange={handleChange}
        >
            {
                options.map((data : any, i : any) =>
                <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>
                )
            }
          {/*<MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>*/}
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    );
}
//{...(error && {error:true,helperText:error})}
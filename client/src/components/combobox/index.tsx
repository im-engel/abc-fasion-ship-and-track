import { Autocomplete, SxProps, TextField, Theme } from "@mui/material";
import { FC, useState } from "react";

export interface OptionProps {
    id: string,
    label: string
}

interface ComboboxProps {
    sx?: SxProps<Theme>
    options: OptionProps[];
    label: string;
    onOptionChange: (value: OptionProps) => void
}

export const Combobox:FC<ComboboxProps> = ({options, label,  sx, onOptionChange}) => {
    const [value, setValue] = useState(options[0])
    const [inputValue, setInputValue] = useState(options[0].label)

    return (
        <Autocomplete 
                options={options}
                disableClearable
                sx={{ width: 300, ...sx }}
                renderInput={(params) => <TextField {...params} label={label} />}
                value={value}
                onChange={(event: any, newValue: OptionProps | null) => {
                    if (newValue) {
                        setValue(newValue);
                        onOptionChange(newValue)
                    }                  
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
            />
    )

}
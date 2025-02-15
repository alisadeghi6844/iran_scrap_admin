import Select, { Props as SelectProps } from "react-select";


export interface Option {
    value: string;
    label: string;
  }
  


export interface SingleSelectTypes extends SelectProps<Option> {
    defaultValue?: Option | null;
    errorMessage?: string;
    label: string;
    helperText?: string;
    isClearable?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    isMulti?: boolean;
    required?: boolean;
    isSearchable?: boolean;
    color?:any,
    options: Option[];
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    darkMode?: "dark" | "light";
    placeholder?: string;
    noBorder?: boolean;
  }
export interface TextAreaTypes extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    errorMessage?: string;
    helperText?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    className?: string;
    disabled?: boolean;
    [key: string]: any; // برای props اضافی
  }
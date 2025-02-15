export interface InputFieldsTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // اختیاری
  required?: boolean; // اختیاری
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // تایپ مشخص برای onInputChange
  [key: string]: any; // برای props اضافی
}

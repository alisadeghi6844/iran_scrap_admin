export interface SelectOptionTypes {
    value: string;
    label: string;
  }
  
  export interface CategorySelectTypes {
    mode: any;
    name: string;
    required?: boolean;
    date?:string;
    [key: string]: any; // برای سایر ویژگی‌ها
  }
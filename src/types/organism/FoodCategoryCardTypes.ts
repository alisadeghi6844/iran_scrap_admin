export interface FoodCategoryCardTypes {
    title?: string;       // عنوان
    image?: string;   
    base64?:boolean;
    active?:boolean;
    [key: string]: any;   // برای سایر props غیر مشخص
  }
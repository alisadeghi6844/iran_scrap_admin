export interface DayCardTypes {
    title?: string;       // عنوان
    subTitle?: string;    // زیرعنوان
    variant?: string;        // نوع
    badgeText?:string,
    [key: string]: any;   // برای سایر props غیر مشخص
  }
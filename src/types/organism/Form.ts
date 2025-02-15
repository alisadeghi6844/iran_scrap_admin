export interface FormProps {
    mode?: 'create' | 'update'; // حالت می‌تواند 'create' یا 'edit' باشد
    onSubmitForm?: (values: any) => void; // تابع برای ارسال فرم
    id?: any; // مقادیر فرم به صورت شیء
    createDate?:any,
    [key: string]: any; // سایر ویژگی‌ها
}

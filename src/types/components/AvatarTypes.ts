export interface AvatarTypes {
  image?: string; // URL تصویر
  isTyping?: any;
  title?: string; // عنوان
  isOnline?: boolean;
  variant?: any;
  description?: string; // توضیحات
  size?: "sm" | "md" | "lg"; // اندازه (اختیاری)
  [key: string]: any; // برای سایر props
}

import React from "react";

export interface ButtonTypes
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string; // می‌توانید این را اختیاری کنید
  children?: React.ReactNode; // برای محتوای فرزند
  endIcon?: React.ReactNode; // به صورت اختیاری
  link?: string | any; // اگر لینک باشد
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto"; // اندازه‌های مشخص
  onClick?: any; // نوع مناسب
  circle?: boolean; // به صورت اختیاری
  startIcon?: React.ReactNode; // به صورت اختیاری
  loading?: boolean;
  variant?:
    | "primary"
    | "outline-primary"
    | "light"
    | "outline-light"
    | "success"
    | "outline-success"
    | "error"
    | "outline-error"
    | "warning"
    | "outline-warning"
    | "gray"
    | "outline-gray"
    | "secondary"
    | "outline-secondary"
    | null; // انواع مختلف دکمه
  disable?: boolean; // می‌توانید این را اختیاری کنید
}

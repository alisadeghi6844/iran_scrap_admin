import React from "react";

export interface InputTypes
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: any; // پیام خطا
  helperText?: string; // متن راهنما
  noCol?: boolean; // برای تعیین عدم استفاده از ستون
  size?: string; // اندازه ورودی
  label?: string; // برچسب ورودی
  leftAdornment?: React.ReactNode; // آیکون یا محتوای چپ
  required?: boolean; // آیا ورودی الزامی است؟
  startAdornment?: React.ReactNode; // آیکون یا محتوای شروع
  className?: string; // کلاس CSS
  position?: string; // موقعیت (مثلاً "absolute" یا "relative")
  onChange?: any;
}

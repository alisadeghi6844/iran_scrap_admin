import React, { useMemo } from "react";
import { useField } from "formik";
import Select from "react-select";

interface MenuOption {
  value: string;
  label: string;
}

interface MenuSelectProps {
  name: string;
  label?: string;
  required?: boolean;
  isMulti?: boolean;
}

const MenuSelect: React.FC<MenuSelectProps> = ({
  name,
  label = "منوها",
  required = false,
  isMulti = true,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  // Define available menus based on the sidebar structure
  const menuOptions: MenuOption[] = useMemo(() => [
    // مدیریت درخواست ها
    { value: "/", label: "همه درخواست ها" },
    { value: "/product-request-status", label: "مدیریت وضعیت درخواست ها" },
    { value: "/pending-orders-financial", label: "سفارشات در انتظار تایید مالی" },
    { value: "/product-requests", label: "مدیریت درخواست‌های محصول" },
    
    // فرم های پایه - مدیریت کاربران
    { value: "/role-management", label: "مدیریت نقش" },
    { value: "/users-management", label: "مدیریت کاربران" },
    { value: "/buyer-management", label: "مدیریت خریداران" },
    
    // فرم های پایه - مدیریت صفحات
    { value: "/pages-management", label: "مدیریت متن صفحات" },
    { value: "/faq-management", label: "مدیریت سوالات متداول" },
    { value: "/blog-management", label: "مدیریت مقالات" },
    { value: "/blog-category-management", label: "مدیریت دسته بندی مقالات" },
    
    // سایر فرم های پایه
    { value: "/category-management", label: "مدیریت دسته بندی" },
    { value: "/ticket-management", label: "مدیریت تیکت ها" },
    { value: "/survey-management", label: "مدیریت نظرسنجی ها" },
    
    // مدیریت محصولات
    { value: "/product-management", label: "مدیریت محصولات" },
    { value: "/product-price-management", label: "مدیریت قیمت گذاری محصولات" },
    { value: "/purchase-price-management", label: "مدیریت قیمت خرید" },
    { value: "/view-pricing-management", label: "مشاهده قیمت گذاری" },
    { value: "/shipment-management", label: "محاسبه کرایه ناوگان" },
    
    // اطلاعات پایه قیمت گذاری
    { value: "/pb-product-admin-management", label: "تعریف کالا" },
    { value: "/pb-brand-admin-management", label: "مدیریت برند" },
    { value: "/pb-provider-admin-management", label: "تعریف تامین کنندگان" },
    { value: "/pb-port-admin-management", label: "تعریف محل بارگیری" },
  ], []);

  const handleChange = (selectedOptions: any) => {
    helpers.setValue(selectedOptions || []);
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: "45px",
      borderColor: meta.touched && meta.error ? "#ef4444" : "#d1d5db",
      borderRadius: "8px",
      fontSize: "14px",
      fontFamily: "inherit",
      "&:hover": {
        borderColor: meta.touched && meta.error ? "#ef4444" : "#9ca3af",
      },
      boxShadow: state.isFocused
        ? meta.touched && meta.error
          ? "0 0 0 1px #ef4444"
          : "0 0 0 1px #3b82f6"
        : "none",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9ca3af",
      fontSize: "14px",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#e0e7ff",
      borderRadius: "4px",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#3730a3",
      fontSize: "12px",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#6366f1",
      "&:hover": {
        backgroundColor: "#c7d2fe",
        color: "#4338ca",
      },
    }),
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <Select
        {...rest}
        isMulti={isMulti}
        options={menuOptions}
        value={field.value}
        onChange={handleChange}
        placeholder="انتخاب منوها..."
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
        noOptionsMessage={() => "گزینه‌ای یافت نشد"}
        loadingMessage={() => "در حال بارگذاری..."}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default MenuSelect;
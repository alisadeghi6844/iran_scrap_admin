import React from "react";
import Input from "../../../components/input";
import Button from "../../../components/button";
import { FaPlus, FaTrash } from "react-icons/fa";
import Typography from "../../../components/typography/Typography";

interface InstallmentPrice {
  months: number;
  price: number;
}

interface InstallmentPriceManagerProps {
  installmentPrices: InstallmentPrice[];
  onChange: (prices: InstallmentPrice[]) => void;
  error?: string;
}

const InstallmentPriceManager: React.FC<InstallmentPriceManagerProps> = ({
  installmentPrices,
  onChange,
  error,
}) => {
  // اگر آرایه خالی باشد، یک آیتم پیش‌فرض اضافه کن
  const currentPrices = installmentPrices.length > 0 ? installmentPrices : [{ months: 1, price: 0 }];
  // اضافه کردن یک سطر جدید
  const addNewRow = () => {
    if (currentPrices.length < 3) {
      const newRow = { months: currentPrices.length + 1, price: 0 };
      onChange([...currentPrices, newRow]);
    }
  };

  // حذف یک سطر
  const removeRow = (index: number) => {
    if (currentPrices.length > 1) {
      const newPrices = currentPrices.filter((_, i) => i !== index);
      // بروزرسانی months ها بر اساس index جدید
      const updatedPrices = newPrices.map((item, i) => ({
        ...item,
        months: i + 1,
      }));
      onChange(updatedPrices);
    }
  };

  // تغییر قیمت
  const updatePrice = (index: number, value: string) => {
    // حذف کاما و تبدیل به عدد
    const numericValue = value.replace(/,/g, "");
    const parsedValue = parseInt(numericValue);
    const newPrices = [...currentPrices];
    newPrices[index] = {
      ...newPrices[index],
      price: isNaN(parsedValue) ? 0 : Math.max(0, parsedValue),
    };
    onChange(newPrices);
  };

  // فرمت کردن عدد با کاما
  const formatNumber = (num: number) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-full">
      <Typography className="text-[14px] text-[#272B30] pb-4">
        قیمت‌گذاری اقساطی
      </Typography>
      {error && (
        <div className="text-red-500 text-sm mb-2">
          {typeof error === "string"
            ? error
            : "حداقل یک دوره قیمت‌گذاری الزامی است"}
        </div>
      )}
      <div className="space-y-4">
        {currentPrices.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex-1">
                <Typography className="text-sm font-medium text-gray-700 mb-2">
                  {`فروش ${index + 1} ماهه`}
                </Typography>
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  value={formatNumber(item.price)}
                  onChange={(e) => updatePrice(index, e.target.value)}
                  label="قیمت به ازای هر کیلوگرم"
                  placeholder="قیمت"
                />
              </div>
              {currentPrices.length > 1 && (
                <Button
                  type="button"
                  variant="error"
                  size="sm"
                  onClick={() => removeRow(index)}
                  className="mt-6"
                >
                  <FaTrash />
                </Button>
              )}
            </div>
          );
        })}
      </div>
      {currentPrices.length < 3 && (
        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addNewRow}
            startIcon={<FaPlus />}
          >
            افزودن گزینه جدید
          </Button>
        </div>
      )}
    </div>
  );
};

export default InstallmentPriceManager;
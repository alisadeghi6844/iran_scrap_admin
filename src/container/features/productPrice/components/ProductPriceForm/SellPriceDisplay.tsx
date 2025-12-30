import React, { useEffect } from "react";
import Typography from "../../../../../components/typography/Typography";
import { useFormikContext } from "formik";

// Enhanced Sell Price Display Component (extracted from ProductPriceForm without logic/UI changes)
const SellPriceDisplay = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    const buyPrice = Number(values.BuyPrice) || 0;
    const constant = Number(values.Constant) || 0;

    // فرمول: قیمت خرید + قیمت ثابت = قیمت فروش
    if (buyPrice > 0 || constant > 0) {
      const calculatedSellPrice = buyPrice + constant;
      setFieldValue("SellPrice", calculatedSellPrice.toString());
    }
  }, [values.BuyPrice, values.Constant, setFieldValue]);

  const buyPrice = Number(values.BuyPrice) || 0;
  const constant = Number(values.Constant) || 0;
  const sellPrice = buyPrice + constant;

  return (
    <div className="p-4 rounded-xl border-2 border-secondary-300 bg-secondary-50 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <Typography className="text-sm font-medium text-gray-700">
          قیمت فروش محاسبه شده
        </Typography>
        <span className="text-2xl">💰</span>
      </div>

      <div className="space-y-2">
        <Typography className="text-2xl font-bold text-secondary-600">
          {sellPrice > 0 ? sellPrice.toLocaleString("fa-IR") : "0"} تومان
        </Typography>

        {!buyPrice && !constant && (
          <Typography className="text-sm text-gray-500 italic">
            برای محاسبه قیمت فروش، قیمت خرید و ثابت را وارد کنید
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SellPriceDisplay;



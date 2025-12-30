import moment from "jalali-moment";
import { SelectOptionTypes } from "../../../../types/features/FeatureSelectTypes";

export function getLast10DaysRange() {
  const today = moment();
  const tenDaysAgo = moment().subtract(10, "days");

  return {
    datef: tenDaysAgo.valueOf().toString(), // 10 روز قبل
    datet: today.valueOf().toString(), // امروز
  };
}

export function buildProductPriceFilterQuery(data: unknown) {
  const { Product, Brand, Provider, Port, PaymentType } = data as {
    Product?: SelectOptionTypes;
    Brand?: SelectOptionTypes;
    Provider?: SelectOptionTypes;
    Port?: SelectOptionTypes;
    PaymentType?: SelectOptionTypes;
  };

  let queryParam = "";
  if (Product?.value) queryParam += "productId=" + Product.value + ",";
  if (Brand?.value) queryParam += "brandId=" + Brand.value + ",";
  if (Provider?.value) queryParam += "providerId=" + Provider.value + ",";
  if (Port?.value) queryParam += "portId=" + Port.value + ",";
  if (PaymentType?.value) queryParam += "paymentType=" + PaymentType.value + ",";

  return queryParam.substring(0, queryParam.length - 1);
}

export function getPaymentTypeLabel(type: string) {
  const types: { [key: string]: string } = {
    CASH: "نقدی",
    INSTALLMENT1: "1 ماهه",
    INSTALLMENT2: "2 ماهه",
    INSTALLMENT3: "3 ماهه",
    INSTALLMENT4: "4 ماهه",
    INSTALLMENT5: "5 ماهه",
    INSTALLMENT6: "6 ماهه",
  };
  return types[type] || type;
}

export function calculateStatus(sellPrice: number, constant: number) {
  // فرمول: S = (قیمت ثابت) / (قیمت فروش)
  const S = sellPrice > 0 ? constant / sellPrice : 0;

  if (S >= 0.12)
    return {
      label: "سوپر الماسی",
      color: "text-purple-600 bg-purple-100",
      textColor: "text-purple-600",
      value: "SUPER_DIAMOND",
    };
  if (S >= 0.08)
    return {
      label: "الماسی",
      color: "text-blue-600 bg-blue-100",
      textColor: "text-blue-600",
      value: "DIAMOND",
    };
  if (S >= 0.05)
    return {
      label: "طلایی",
      color: "text-yellow-600 bg-yellow-100",
      textColor: "text-yellow-600",
      value: "GOLD",
    };
  if (S >= 0.03)
    return {
      label: "نقره‌ای",
      color: "text-gray-600 bg-gray-100",
      textColor: "text-gray-600",
      value: "SILVER",
    };
  return {
    label: "برنزی",
    color: "text-orange-600 bg-orange-100",
    textColor: "text-orange-600",
    value: "BRONZE",
  };
}



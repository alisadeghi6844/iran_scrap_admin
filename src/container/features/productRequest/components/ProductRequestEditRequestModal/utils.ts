import { province } from "../../../provinceSelect/Province";
import { city } from "../../../provinceSelect/city";

export type SelectOption = { label: string; value: string } | null;

export interface ProductRequestEditInitialValues {
  description: string;
  amount: string;
  categoryId: string;
  province: SelectOption;
  city: SelectOption;
  address: string;
  postalCode: string;
}

export function buildInitialValues(requestData: any): ProductRequestEditInitialValues {
  if (!requestData) {
    return {
      description: "",
      amount: "",
      categoryId: "",
      province: null,
      city: null,
      address: "",
      postalCode: "",
    };
  }

  let provinceOption: SelectOption = null;
  let cityOption: SelectOption = null;

  if (requestData.province) {
    const foundProvince = province.find((p) => p.name === requestData.province);
    if (foundProvince) {
      provinceOption = {
        label: foundProvince.name,
        value: foundProvince.id.toString(),
      };

      if (requestData.city) {
        const foundCity = city.find(
          (c) => c.name === requestData.city && c.province_id === foundProvince.id
        );
        if (foundCity) {
          cityOption = { label: foundCity.name, value: foundCity.id.toString() };
        }
      }
    }
  }

  return {
    description: requestData.description || "",
    amount: requestData.amount?.toString() || "",
    categoryId:
      requestData.category?._id ||
      requestData.categoryId?._id ||
      requestData.categoryId?.id ||
      "",
    province: provinceOption,
    city: cityOption,
    address: requestData.address || "",
    postalCode: requestData.postalCode || "",
  };
}

export function hasAnyOffers(checkOfferData: any): boolean {
  return !!(
    checkOfferData &&
    ((checkOfferData.countAll && checkOfferData.countAll > 0) ||
      (checkOfferData.data &&
        Array.isArray(checkOfferData.data) &&
        checkOfferData.data.length > 0))
  );
}

export function findProvinceIdByName(provinceName?: string): number | null {
  if (!provinceName) return null;
  const foundProvince = province.find((p) => p.name === provinceName);
  return foundProvince ? foundProvince.id : null;
}

export function buildUpdatePayload(values: any) {
  const selectedProvince = province.find(
    (p) => p.id.toString() === values.province?.value
  );
  const selectedCity = city.find((c) => c.id.toString() === values.city?.value);

  return {
    description: values.description,
    amount: parseInt(values.amount) || 0,
    categoryId: values.categoryId,
    city: selectedCity?.name || "",
    province: selectedProvince?.name || "",
    address: values.address,
    postalCode: values.postalCode,
  };
}



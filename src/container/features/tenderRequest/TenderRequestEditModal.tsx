import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import Button from "../../../components/button";
import Input from "../../../components/input";
import ProductCategorySelect from "../product/ProductCategorySelect";
import ProvinceSelect from "../provinceSelect/ProvinceSelect";
import CitySelect from "../provinceSelect/CitySelect";
import { Formik, Form } from "formik";
import { province } from "../provinceSelect/Province";
import { city } from "../provinceSelect/city";
import {
  GetRequestProductAdminAction,
  UpdateRequestProductAdminAction,
} from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  selectGetProductRequestAdminByIdData,
  selectGetProductRequestAdminByIdLoading,
  selectUpdateProductRequestAdminLoading,
  selectUpdateProductRequestAdminData,
  clearAllProductRequestAdminData,
  clearUpdateProductRequestAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";

interface TenderRequestItem {
  id: string;
  description: string;
  category: {
    _id?: string;
    id?: string;
    name: string;
  };
  amount: number;
  createdAt: number;
  expectedDate: number;
  province: string;
  city: string;
  address?: string;
  postalCode?: string;
  statusTitle: string;
  status: string;
  [key: string]: any;
}

interface TenderRequestEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: TenderRequestItem | null;
  onSuccess?: () => void;
}

const TenderRequestEditModal: React.FC<TenderRequestEditModalProps> = ({
  isOpen,
  onClose,
  request,
  onSuccess,
}) => {
  const dispatch: any = useDispatch();
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );

  const loading = useSelector(selectGetProductRequestAdminByIdLoading);
  const requestData = useSelector(selectGetProductRequestAdminByIdData);
  const updateLoading = useSelector(selectUpdateProductRequestAdminLoading);
  const updateData = useSelector(selectUpdateProductRequestAdminData);

  // Handle modal state changes
  useEffect(() => {
    if (isOpen && request?.id) {
      // Clear previous states first
      dispatch(clearAllProductRequestAdminData());
      setSelectedProvinceId(null);

      dispatch(
        GetRequestProductAdminAction({
          id: request.id,
        })
      );
    } else if (!isOpen) {
      // Clear states when modal closes
      dispatch(clearAllProductRequestAdminData());
      setSelectedProvinceId(null);
    }
  }, [isOpen, request?.id, dispatch]);

  // Handle successful update
  useEffect(() => {
    if (updateData?.status === 200 || updateData?.status === 201) {
      // Clear states before closing
      dispatch(clearAllProductRequestAdminData());
      onClose();
      onSuccess && onSuccess();
    }
  }, [updateData, onClose, onSuccess, dispatch]);

  if (!request) {
    return null;
  }

  // Helper function to get initial values
  const getInitialValues = () => {
    if (!requestData) {
      return {
        description: request.description || "",
        amount: request.amount?.toString() || "",
        categoryId: request.category?._id || request.category?.id || "",
        province: null as any,
        city: null as any,
        address: request.address || "",
        postalCode: request.postalCode || "",
      };
    }

    // Convert province name to select option
    let provinceOption = null;
    let cityOption = null;

    if (requestData.province || request.province) {
      const provinceName = requestData.province || request.province;
      const foundProvince = province.find((p) => p.name === provinceName);
      if (foundProvince) {
        provinceOption = {
          label: foundProvince.name,
          value: foundProvince.id.toString(),
        };

        // Convert city name to select option
        const cityName = requestData.city || request.city;
        if (cityName) {
          const foundCity = city.find(
            (c) => c.name === cityName && c.province_id === foundProvince.id
          );
          if (foundCity) {
            cityOption = {
              label: foundCity.name,
              value: foundCity.id.toString(),
            };
          }
        }
      }
    }

    return {
      description: requestData.description || request.description || "",
      amount: (requestData.amount || request.amount)?.toString() || "",
      categoryId:
        requestData.category?._id ||
        requestData.categoryId?._id ||
        requestData.categoryId?.id ||
        request.category?._id ||
        request.category?.id ||
        "",
      province: provinceOption,
      city: cityOption,
      address: requestData.address || request.address || "",
      postalCode: requestData.postalCode || request.postalCode || "",
    };
  };

  // Set initial province ID when data loads
  useEffect(() => {
    if ((requestData || request) && isOpen) {
      const provinceName = requestData?.province || request.province;
      if (provinceName) {
        const foundProvince = province.find((p) => p.name === provinceName);
        if (foundProvince) {
          setSelectedProvinceId(foundProvince.id);
        }
      }
    }
  }, [requestData, request, isOpen]);

  const handleSubmit = (values: unknown) => {
    if (!request?.id) return;

    // Convert select values back to names for API
    const selectedProvince = province.find(
      (p) => p.id.toString() === values.province?.value
    );
    const selectedCity = city.find(
      (c) => c.id.toString() === values.city?.value
    );

    const updatePayload = {
      description: values.description,
      amount: parseInt(values.amount) || 0,
      categoryId: values.categoryId,
      city: selectedCity?.name || "",
      province: selectedProvince?.name || "",
      address: values.address,
      postalCode: values.postalCode,
    };

    dispatch(
      UpdateRequestProductAdminAction({
        credentials: request.id,
        item: updatePayload,
        onSuccess: () => {
          // Clear states before closing
          dispatch(clearAllProductRequestAdminData());
          onClose();
          onSuccess && onSuccess();
        },
        thunkAPI: null,
      })
    );
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">در حال بارگذاری...</div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <Typography className="text-blue-600 font-bold">
              ویرایش درخواست مناقصه
            </Typography>
            <Typography className="text-blue-500 text-sm">
              اطلاعات درخواست مناقصه را ویرایش کنید.
            </Typography>
          </div>

          {/* Request Information - Editable Form */}
          <div>
            <Typography className="text-lg font-bold mb-3">
              ویرایش اطلاعات درخواست
            </Typography>

            <Formik
              initialValues={getInitialValues()}
              enableReinitialize={true}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, setValues }) => {
                // Set initial values when data loads
                useEffect(() => {
                  if ((requestData || request) && isOpen) {
                    const initialVals = getInitialValues();
                    setValues(initialVals);
                  }
                }, [requestData, request, isOpen, setValues]);

                return (
                  <Form>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* توضیحات درخواست - یک سطر کامل */}
                        <div className="md:col-span-2">
                          <Typography className="text-sm text-gray-600 mb-2">
                            توضیحات درخواست
                          </Typography>
                          <Input
                            value={values.description}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setFieldValue("description", e.target.value)}
                          />
                        </div>

                        {/* دسته‌بندی - یک سطر کامل */}
                        <div className="md:col-span-2 mt-2">
                          <ProductCategorySelect
                            label="دسته‌بندی"
                            value={values.categoryId}
                            onChange={(value) =>
                              setFieldValue("categoryId", value)
                            }
                            required
                          />
                        </div>

                        {/* مقدار */}
                        <div>
                          <Typography className="text-sm text-gray-600 mb-2">
                            مقدار (کیلوگرم)
                          </Typography>
                          <Input
                            type="number"
                            value={values.amount}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setFieldValue("amount", e.target.value)}
                          />
                        </div>

                        {/* فضای خالی برای تراز */}
                        <div></div>

                        {/* استان */}
                        <div>
                          <ProvinceSelect
                            name="province"
                            label="استان"
                            mode="formik"
                            required
                            onProvinceChange={(provinceId) => {
                              setSelectedProvinceId(provinceId);
                              // Clear city when province changes
                              setFieldValue("city", null);
                            }}
                          />
                        </div>

                        {/* شهر */}
                        <div>
                          <CitySelect
                            name="city"
                            label="شهر"
                            mode="formik"
                            provinceId={selectedProvinceId}
                            required
                          />
                        </div>

                        {/* آدرس - یک سطر کامل */}
                        <div className="md:col-span-2">
                          <Typography className="text-sm text-gray-600 mb-2">
                            آدرس
                          </Typography>
                          <Input
                            value={values.address}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setFieldValue("address", e.target.value)}
                          />
                        </div>

                        {/* کد پستی */}
                        <div>
                          <Typography className="text-sm text-gray-600 mb-2">
                            کد پستی
                          </Typography>
                          <Input
                            value={values.postalCode}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setFieldValue("postalCode", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                      >
                        انصراف
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        loading={updateLoading}
                        disabled={updateLoading}
                      >
                        ذخیره تغییرات
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderRequestEditModal;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
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
  GetProductRequestAdminByIdAction,
  CheckProductRequestOfferAdminAction,
} from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import { UpdateRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  selectGetProductRequestAdminByIdLoading,
  selectGetProductRequestAdminByIdData,
  selectCheckProductRequestOfferAdminLoading,
  selectCheckProductRequestOfferAdminData,
  clearAllProductRequestEditData,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";
import {
  selectUpdateProductRequestAdminLoading,
  selectUpdateProductRequestAdminData,
  clearUpdateProductRequestAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";

interface ProductRequestItem {
  _id: string;
  id?: string;
  providerIds: Array<{
    id: string;
    mobile: string;
    phone?: string;
    companyName?: string;
    agentName?: string;
    agentPhone?: string;
    firstName?: string;
    lastName?: string;
  }>;
  [key: string]: any;
}

interface ProductRequestEditRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
  onSuccess?: () => void;
}

const ProductRequestEditRequestModal: React.FC<
  ProductRequestEditRequestModalProps
> = ({ isOpen, onClose, request, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );

  const loading = useSelector(selectGetProductRequestAdminByIdLoading);
  const requestData = useSelector(selectGetProductRequestAdminByIdData);
  const checkOfferLoading = useSelector(
    selectCheckProductRequestOfferAdminLoading
  );
  const checkOfferData = useSelector(selectCheckProductRequestOfferAdminData);
  const updateLoading = useSelector(selectUpdateProductRequestAdminLoading);
  const updateData = useSelector(selectUpdateProductRequestAdminData);

  // Handle modal state changes
  useEffect(() => {
    if (isOpen && (request?._id || request?.id)) {
      // Clear previous states and load new data
      dispatch(clearAllProductRequestEditData());
      dispatch(clearUpdateProductRequestAdminData());
      setSelectedProvinceId(null);
      
      dispatch(
        GetProductRequestAdminByIdAction({
          requestId: request._id || request.id || "",
        })
      );
      dispatch(
        CheckProductRequestOfferAdminAction({
          requestId: request._id || request.id || "",
        })
      );
    } else if (!isOpen) {
      // Clear states when modal closes
      dispatch(clearAllProductRequestEditData());
      dispatch(clearUpdateProductRequestAdminData());
      setSelectedProvinceId(null);
    }
  }, [isOpen, request?._id, request?.id, dispatch]);



  if (!request) {
    return null;
  }

  // Check if there are any offers for this request
  // API returns {countAll: 0, data: [], page: 1, size: 10} when no offers exist
  // If countAll > 0 or data has items, it means there are offers and editing should be disabled
  const hasOffers =
    checkOfferData &&
    ((checkOfferData.countAll && checkOfferData.countAll > 0) ||
      (checkOfferData.data &&
        Array.isArray(checkOfferData.data) &&
        checkOfferData.data.length > 0));

  // Helper function to get initial values
  const getInitialValues = () => {
    if (!requestData) {
      return {
        description: "",
        amount: "",
        categoryId: "",
        province: null as any,
        city: null as any,
        address: "",
        postalCode: "",
      };
    }

    // Convert province name to select option
    let provinceOption = null;
    let cityOption = null;

    if (requestData.province) {
      const foundProvince = province.find(
        (p) => p.name === requestData.province
      );
      if (foundProvince) {
        provinceOption = {
          label: foundProvince.name,
          value: foundProvince.id.toString(),
        };

        // Convert city name to select option
        if (requestData.city) {
          const foundCity = city.find(
            (c) =>
              c.name === requestData.city && c.province_id === foundProvince.id
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
  };

  // Set initial province ID when data loads
  useEffect(() => {
    if (requestData && isOpen) {
      // Set selected province ID for city filtering
      if (requestData.province) {
        const foundProvince = province.find(
          (p) => p.name === requestData.province
        );
        if (foundProvince) {
          setSelectedProvinceId(foundProvince.id);
        }
      }
    }
  }, [requestData, isOpen]);

  const handleSubmit = (values: any) => {
    if (!request?._id && !request?.id) return;

    const requestId = request._id || request.id || "";

    // Convert select values back to names for API
    const selectedProvince = province.find(
      (p) => p.id.toString() === values.province?.value
    );
    const selectedCity = city.find(
      (c) => c.id.toString() === values.city?.value
    );

    const updateData = {
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
        credentials: requestId,
        item: updateData,
        onSuccess: () => {
          // Clear states before closing
          dispatch(clearAllProductRequestEditData());
          dispatch(clearUpdateProductRequestAdminData());
          setSelectedProvinceId(null);
          
          onClose();
          onSuccess && onSuccess();
        },
        thunkAPI: null,
      })
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="xl"
      headerTitle="ویرایش درخواست محصول"
    >
      {loading || checkOfferLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">در حال بارگذاری...</div>
        </div>
      ) : (
        <div className="space-y-8">
          {hasOffers ? (
            // Show message when there are offers for this request
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <Typography className="text-red-600 text-lg font-bold mb-2">
                  امکان ویرایش وجود ندارد
                </Typography>
                <Typography className="text-red-500">
                  برای این درخواست پیشنهادی ثبت شده است و امکان ویرایش آن وجود
                  ندارد.
                </Typography>
              </div>
              <div className="mt-6">
                <Button type="button" variant="primary" onClick={onClose}>
                  بستن
                </Button>
              </div>
            </div>
          ) : (
            // Show edit form when there are no offers
            <div className="space-y-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <Typography className="text-green-600 font-bold">
                  امکان ویرایش درخواست
                </Typography>
                <Typography className="text-green-500 text-sm">
                  برای این درخواست هنوز پیشنهادی ثبت نشده است و قابل ویرایش است.
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
                      if (requestData && isOpen) {
                        const initialVals = getInitialValues();
                        setValues(initialVals);
                      }
                    }, [requestData, isOpen, setValues]);

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
                                ) =>
                                  setFieldValue("description", e.target.value)
                                }
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
                                مقدار
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
                                ) =>
                                  setFieldValue("postalCode", e.target.value)
                                }
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
      )}
    </Modal>
  );
};

export default ProductRequestEditRequestModal;

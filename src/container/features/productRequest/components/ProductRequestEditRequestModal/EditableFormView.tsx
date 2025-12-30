import React from "react";
import { Formik, Form } from "formik";
import Typography from "../../../../../components/typography/Typography";
import Button from "../../../../../components/button";
import Input from "../../../../../components/input";
import ProductCategorySelect from "../../../product/ProductCategorySelect";
import ProvinceSelect from "../../../provinceSelect/ProvinceSelect";
import CitySelect from "../../../provinceSelect/CitySelect";
import FormikValuesSync from "./FormikValuesSync";

type Props = {
  requestData: any;
  isOpen: boolean;
  selectedProvinceId: number | null;
  setSelectedProvinceId: (id: number | null) => void;
  updateLoading: boolean;
  onClose: () => void;
  getInitialValues: () => any;
  onSubmit: (values: any) => void;
};

const EditableFormView: React.FC<Props> = ({
  requestData,
  isOpen,
  selectedProvinceId,
  setSelectedProvinceId,
  updateLoading,
  onClose,
  getInitialValues,
  onSubmit,
}) => {
  return (
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
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <FormikValuesSync
                  enabled={!!(requestData && isOpen)}
                  valuesFactory={getInitialValues}
                  deps={[requestData, isOpen]}
                />

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* توضیحات درخواست - یک سطر کامل */}
                    <div className="md:col-span-2">
                      <Typography className="text-sm text-gray-600 mb-2">
                        توضیحات درخواست
                      </Typography>
                      <Input
                        value={values.description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("description", e.target.value)
                        }
                      />
                    </div>

                    {/* دسته‌بندی - یک سطر کامل */}
                    <div className="md:col-span-2 mt-2">
                      <ProductCategorySelect
                        label="دسته‌بندی"
                        value={values.categoryId}
                        onChange={(value) => setFieldValue("categoryId", value)}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("amount", e.target.value)
                        }
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("address", e.target.value)
                        }
                      />
                    </div>

                    {/* کد پستی */}
                    <div>
                      <Typography className="text-sm text-gray-600 mb-2">
                        کد پستی
                      </Typography>
                      <Input
                        value={values.postalCode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("postalCode", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <Button type="button" variant="secondary" onClick={onClose}>
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
  );
};

export default EditableFormView;



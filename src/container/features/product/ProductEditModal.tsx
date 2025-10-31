import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { FormProps } from "../../../types/organism/Form";
import {
  selectEditProductAdminLoading,
  selectGetProductByIdData,
  selectGetProductByIdLoading,
} from "../../../redux/slice/product/ProductSlice";
import { EditProductAdminAction } from "../../../redux/actions/product/ProductActions";
import FormSkeleton from "../../organism/skeleton/FormSkeleton";
import Input from "../../../components/input";
import Button from "../../../components/button";
import TextArea from "../../../components/textArea";
import DatePickerField from "../../../components/molcols/formik-fields/DatePickerField";
import ProductCategorySelectField from "./ProductCategorySelectField";
import Typography from "../../../components/typography/Typography";
import InstallmentPriceManager from "./InstallmentPriceManager";

interface ProductEditFormProps extends FormProps {
  product?: {
    _id: string;
    name: string;
    description: string;
    price: number;
    inventory: number;
    minimumOrderQuantity: number;
    deliveryTime: number;
    priceExpire: string;
    category: { _id: string };
    paymentType?: string;
    installmentPrices?: Array<{ duration: number; price: number }>;
  };
}

const ProductEditModal: React.FC<ProductEditFormProps> = (props) => {
  const { mode = "update", onSubmitForm, id, product } = props;

  const dispatch = useDispatch<any>();

  const getValue = useSelector(selectGetProductByIdData);
  const getLoading = useSelector(selectGetProductByIdLoading);
  const editLoading = useSelector(selectEditProductAdminLoading);

  const initialData = React.useMemo(
    () => ({
      productName: "",
      description: "",
      Price: "",
      minOrder: "",
      minimumOrderQuantity: "",
      Time: "",
      priceExpire: "",
      categoryId: "",
      paymentType: "cash",
      installmentPrices: [] as Array<{ months: number; price: number }>,
    }),
    []
  );

  const [initialValues, setInitialValues] = useState(initialData);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      const productData = getValue.data;
      // Convert duration to months for installment prices
      const convertedInstallmentPrices =
        productData?.installmentPrices?.map((item: any) => ({
          months: item.duration || item.months,
          price: item.price,
        })) || [];

      setInitialValues({
        productName: productData?.name || "",
        description: productData?.description || "",
        Price: productData?.price?.toString() || "",
        minOrder: productData?.inventory?.toString() || "",
        minimumOrderQuantity:
          productData?.minimumOrderQuantity?.toString() || "",
        Time: productData?.deliveryTime?.toString() || "",
        priceExpire: productData?.priceExpire || "",
        categoryId: productData?.category?._id || "",
        paymentType: productData?.paymentType || "cash",
        installmentPrices: convertedInstallmentPrices,
      });
    } else if (product && mode === "update") {
      // Convert duration to months for installment prices
      const convertedInstallmentPrices =
        product?.installmentPrices?.map((item: unknown) => ({
          months: item.duration || item.months,
          price: item.price,
        })) || [];

      setInitialValues({
        productName: product?.name || "",
        description: product?.description || "",
        Price: product?.price?.toString() || "",
        minOrder: product?.inventory?.toString() || "",
        minimumOrderQuantity: product?.minimumOrderQuantity?.toString() || "",
        Time: product?.deliveryTime?.toString() || "",
        priceExpire: product?.priceExpire || "",
        categoryId: product?.category?._id || "",
        paymentType: product?.paymentType || "cash",
        installmentPrices: convertedInstallmentPrices,
      });
    } else {
      setInitialValues(initialData);
    }
  }, [getValue, product, mode, initialData]);

  const validationSchema = Yup.object({
    productName: Yup.string().required("نام محصول الزامی است"),
    description: Yup.string().required("توضیحات محصول الزامی است"),
    Price: Yup.number()
      .required("قیمت محصول الزامی است")
      .min(0, "قیمت نمی‌تواند منفی باشد"),
    minOrder: Yup.number()
      .required("موجودی الزامی است")
      .min(0, "موجودی نمی‌تواند منفی باشد"),
    minimumOrderQuantity: Yup.number()
      .required("حداقل سفارش الزامی است")
      .min(0, "حداقل سفارش نمی‌تواند منفی باشد"),
    Time: Yup.number()
      .required("زمان تحویل الزامی است")
      .min(0, "زمان تحویل نمی‌تواند منفی باشد"),
    priceExpire: Yup.string().required("تاریخ انقضای قیمت الزامی است"),
    categoryId: Yup.string().required("دسته بندی الزامی است"),
    paymentType: Yup.string().required("نوع پرداخت الزامی است"),
    installmentPrices: Yup.array().when("paymentType", {
      is: (val: string) => val === "installments" || val === "both",
      then: (schema) =>
        schema.min(1, "حداقل یک قسط باید تعریف شود").of(
          Yup.object({
            months: Yup.number().required().min(1),
            price: Yup.number().required().min(0),
          })
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleSubmit = (values: typeof initialData) => {
    const requestBody = {
      name: values.productName,
      description: values.description,
      price: Number(values.Price),
      inventory: Number(values.minOrder),
      minimumOrderQuantity: Number(values.minimumOrderQuantity),
      deliveryTime: Number(values.Time),
      priceExpire: values.priceExpire,
      categoryId: values.categoryId,
      paymentType: values.paymentType,
      ...(values.paymentType !== "cash" && {
        installmentPrices: values.installmentPrices,
      }),
    };

    const productId = id || product?._id;

    dispatch(
      EditProductAdminAction({
        productId,
        credentials: requestBody,
        onSubmitForm,
        resetForm: () => {},
      })
    );
  };

  return (
    <>
      {getLoading ? (
        <FormSkeleton />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-end gap-x-3 pb-6 px-4 border-b">
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={onSubmitForm}
                  className="!text-[#4F575E]"
                >
                  انصراف
                </Button>
                <Button loading={editLoading} type="submit" variant="primary">
                  ثبت تغییرات
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-12 gap-6 w-full">
                <div className="lg:col-span-6 col-span-12">
                  <Input
                    onChange={handleChange}
                    errorMessage={errors.productName as string}
                    type="text"
                    name="productName"
                    value={values.productName}
                    label="نام محصول"
                  />
                </div>

                <div className="lg:col-span-6 col-span-12">
                  <Input
                    onChange={handleChange}
                    errorMessage={errors.Price as string}
                    type="number"
                    name="Price"
                    value={values.Price}
                    label="قیمت (تومان)"
                  />
                </div>

                <div className="lg:col-span-6 col-span-12">
                  <Input
                    onChange={handleChange}
                    errorMessage={errors.minOrder as string}
                    type="number"
                    name="minOrder"
                    value={values.minOrder}
                    label="موجودی (کیلوگرم)"
                  />
                </div>

                <div className="lg:col-span-6 col-span-12">
                  <Input
                    onChange={handleChange}
                    errorMessage={errors.minimumOrderQuantity as string}
                    type="number"
                    name="minimumOrderQuantity"
                    value={values.minimumOrderQuantity}
                    label="حداقل سفارش (کیلوگرم)"
                  />
                </div>

                <div className="lg:col-span-6 col-span-12">
                  <Input
                    onChange={handleChange}
                    errorMessage={errors.Time as string}
                    type="number"
                    name="Time"
                    value={values.Time}
                    label="مدت ارسال (روز کاری)"
                  />
                </div>

                <div className="lg:col-span-6 col-span-12">
                  <DatePickerField
                    name="priceExpire"
                    label="تاریخ پایان اعتبار قیمت"
                    errorMessage={errors.priceExpire as string}
                  />
                </div>

                <div className="lg:col-span-6 col-span-12">
                  <ProductCategorySelectField
                    name="categoryId"
                    label="دسته بندی"
                    required
                  />
                </div>

                <div className="col-span-12">
                  <Typography className="text-[14px] text-[#272B30] pb-4">
                    نوع پرداخت
                  </Typography>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="cash"
                        checked={values.paymentType === "cash"}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">نقدی</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="installments"
                        checked={values.paymentType === "installments"}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">اقساطی</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="both"
                        checked={values.paymentType === "both"}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">هر دو</span>
                    </label>
                  </div>
                  {errors.paymentType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.paymentType}
                    </p>
                  )}
                </div>

                {(values.paymentType === "installments" ||
                  values.paymentType === "both") && (
                  <div className="col-span-12">
                    <InstallmentPriceManager
                      installmentPrices={values.installmentPrices}
                      onChange={(prices) =>
                        setFieldValue("installmentPrices", prices)
                      }
                      error={errors.installmentPrices as string}
                    />
                  </div>
                )}
              </div>

              <div className="w-full py-6 border-t">
                <Typography className="text-[14px] text-[#272B30] pb-4">
                  توضیحات محصول
                </Typography>
                <div className="md:w-[75%] w-full">
                  <TextArea
                    onChange={handleChange}
                    value={values.description || ""}
                    name="description"
                    label="لطفا توضیحات مربوط به محصول خود را وارد کنید"
                    error={errors.description as string}
                    rows={4}
                  />
                </div>
              </div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ProductEditModal;

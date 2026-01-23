import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { FormProps } from "../../../types/organism/Form";
import {
  selectEditProductAdminLoading,
  selectGetProductByIdData,
  selectGetProductByIdLoading,
  selectUploadProductImageLoading,
  selectDeleteProductImageLoading,
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
import ImageGallery from "./ImageGallery";
import { useProductImages } from "./hooks/useProductImages";
import {
  createProductEditInitialData,
  productEditValidationSchema,
} from "./ProductEditModal.utils";

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
    installmentPrice?: Array<{ duration: number; price: number }>;
    images?: Array<{ url: string; path: string }>;
    tags?: string[];
  };
}

const ProductEditModal: React.FC<ProductEditFormProps> = (props) => {
  const { mode = "update", onSubmitForm, id, product } = props;

  const dispatch = useDispatch<unknown>();

  const getValue = useSelector(selectGetProductByIdData);
  const getLoading = useSelector(selectGetProductByIdLoading);
  const editLoading = useSelector(selectEditProductAdminLoading);
  const uploadImageLoading = useSelector(selectUploadProductImageLoading);
  const deleteImageLoading = useSelector(selectDeleteProductImageLoading);

  const initialData = React.useMemo(
    () => createProductEditInitialData(),
    []
  );

  const [initialValues, setInitialValues] = useState(initialData);

  const { imageURLs, uploadingImages, uploadNewImage, removeImage } =
    useProductImages({
      dispatch,
      id,
      product,
      getValue,
    });

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      const productData = getValue.data;

      const convertedinstallmentPrice =
        productData?.installmentPrice?.map((item: any) => ({
          duration: item.duration,
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
        paymentType: productData?.paymentType || "CASH",
        installmentPrice: convertedinstallmentPrice,
        images:
          productData?.images?.map((img: any) => img.url || img.path) || [],
        isSpecialOffer: productData?.tags?.includes("special") || false,
      });
    } else if (product && mode === "update") {
      const convertedinstallmentPrice =
        product?.installmentPrice?.map((item: any) => ({
          duration: item.duration,
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
        paymentType: product?.paymentType || "CASH",
        installmentPrice: convertedinstallmentPrice,
        images: product?.images?.map((img: any) => img.url || img.path) || [],
        isSpecialOffer: product?.tags?.includes("special") || false,
      });
    } else {
      setInitialValues(initialData);
    }
  }, [getValue, product, mode, initialData]);

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
      images: imageURLs,
      tags: values.isSpecialOffer ? ["special"] : [],
      ...(values.paymentType !== "CASH" && {
        installmentPrice: values.installmentPrice,
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
          validationSchema={productEditValidationSchema}
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

                <div className="col-span-12 mb-4">
                  <Typography className="text-[14px] text-[#272B30] pb-4">
                    نوع پرداخت
                  </Typography>
                  <div className="flex flex-wrap gap-6">
                    {/* رادیوها بدون تغییر */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="CASH"
                        checked={values.paymentType === "CASH"}
                        onChange={handleChange}
                      />
                      نقدی
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="INSTALLMENTS"
                        checked={values.paymentType === "INSTALLMENTS"}
                        onChange={handleChange}
                      />
                      اقساطی
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="CASH_AND_INSTALLMENTS"
                        checked={
                          values.paymentType === "CASH_AND_INSTALLMENTS"
                        }
                        onChange={handleChange}
                      />
                      نقدی و اقساطی
                    </label>
                  </div>
                </div>

                {(values.paymentType === "INSTALLMENTS" ||
                  values.paymentType === "CASH_AND_INSTALLMENTS") && (
                  <div className="col-span-12">
                    <InstallmentPriceManager
                      installmentPrices={values.installmentPrice}
                      onChange={(prices) =>
                        setFieldValue("installmentPrice", prices)
                      }
                      error={errors.installmentPrice as string}
                    />
                  </div>
                )}
              </div>

              <div className="w-full py-6 border-t">
                <Typography className="text-[14px] text-[#272B30] pb-4">
                  توضیحات محصول
                </Typography>
                <TextArea
                  onChange={handleChange}
                  value={values.description || ""}
                  name="description"
                  error={errors.description as string}
                  rows={4}
                />
              </div>

              <ImageGallery
                imageURLs={imageURLs}
                removeImage={removeImage}
                uploadNewImage={uploadNewImage}
                imageActionLoading={
                  uploadImageLoading || deleteImageLoading
                }
                maxImages={5}
                uploadingImages={uploadingImages}
              />
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ProductEditModal;

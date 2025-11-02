import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { FormProps } from "../../../types/organism/Form";
import {
  selectEditProductAdminLoading,
  selectGetProductByIdData,
  selectGetProductByIdLoading,
  selectUploadProductImageLoading,
  selectDeleteProductImageLoading,
} from "../../../redux/slice/product/ProductSlice";
import { EditProductAdminAction } from "../../../redux/actions/product/ProductActions";
import {
  UploadProductImageAction,
  DeleteProductImageAction,
} from "../../../redux/actions/product/ProductImageActions";
import FormSkeleton from "../../organism/skeleton/FormSkeleton";
import Input from "../../../components/input";
import Button from "../../../components/button";
import TextArea from "../../../components/textArea";
import DatePickerField from "../../../components/molcols/formik-fields/DatePickerField";
import ProductCategorySelectField from "./ProductCategorySelectField";
import Typography from "../../../components/typography/Typography";
import InstallmentPriceManager from "./InstallmentPriceManager";
import ImageGallery from "./ImageGallery";

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
    () => ({
      productName: "",
      description: "",
      Price: "",
      minOrder: "",
      minimumOrderQuantity: "",
      Time: "",
      priceExpire: "",
      categoryId: "",
      paymentType: "CASH",
      installmentPrice: [] as Array<{ duration: number; price: number }>,
      images: [] as string[],
    }),
    []
  );

  const [initialValues, setInitialValues] = useState(initialData);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageIds, setImageIds] = useState<string[]>([]);

  const [uploadingImages, setUploadingImages] = useState<Set<string>>(
    new Set()
  );

  // Debug log for imageURLs changes
  React.useEffect(() => {
    console.log('imageURLs changed:', imageURLs);
  }, [imageURLs]);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      const productData = getValue.data;
      // Use installmentPrice as is with duration field
      const convertedinstallmentPrice =
        productData?.installmentPrice?.map((item: unknown) => ({
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
      });
    } else if (product && mode === "update") {
      // Use installmentPrice as is with duration field
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
      });
    } else {
      setInitialValues(initialData);
    }
  }, [getValue, product, mode, initialData]);

  // Update imageURLs when initialValues change
  useEffect(() => {
    if (getValue?.data?.images) {
      const urls = getValue.data.images.map((img: any) => img.url || img.path);
      const ids = getValue.data.images.map((img: unknown) => img._id || img.id);
      setImageURLs(urls);
      setImageIds(ids);
    } else if (product?.images) {
      const urls = product.images.map((img: unknown) => img.url || img.path);
      const ids = product.images.map((img: unknown) => img._id || img.id);
      setImageURLs(urls);
      setImageIds(ids);
    }
  }, [getValue?.data?.images, product?.images]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      // Clean up any remaining uploading URLs
      uploadingImages.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [uploadingImages]);

  // Image management functions
  const uploadNewImage = async (file: File) => {
    console.log("uploadNewImage called with file:", file.name); // Debug log
    const productId = id || product?._id;
    console.log("Product ID:", productId); // Debug log

    if (!productId) {
      toast.error("شناسه محصول یافت نشد. لطفا صفحه را رفرش کنید.");
      return;
    }

    // Create preview URL for the file
    const previewUrl = URL.createObjectURL(file);
    console.log("Created preview URL:", previewUrl); // Debug log

    // Store the index where we're adding this image
    const newImageIndex = imageURLs.length;
    console.log("New image will be at index:", newImageIndex);

    // Add to image URLs immediately (hard-coded display)
    setImageURLs((prev) => {
      const updated = [...prev, previewUrl];
      console.log("Added preview to imageURLs:", updated);
      return updated;
    });
    setImageIds((prev) => [...prev, ""]); // Empty ID for uploading image
    setUploadingImages((prev) => new Set([...prev, previewUrl]));

    dispatch(
      UploadProductImageAction({
        productId,
        imageFile: file,
        onSuccess: (response) => {
          console.log("Upload response full:", response); // Debug log
          console.log("Response data:", response?.data); // Debug log

          // Try multiple possible response structures
          let newImageUrl: string | null = null;
          let newImageId: string | null = null;

          if (response?.data?.image) {
            // Structure: { data: { image: { url, _id } } }
            newImageUrl = response.data.image.url || response.data.image.path;
            newImageId = response.data.image._id || response.data.image.id;
          } else if (response?.data?.url || response?.data?.path) {
            // Structure: { data: { url, _id } }
            newImageUrl = response.data.url || response.data.path;
            newImageId = response.data._id || response.data.id;
          } else if (response?.image) {
            // Structure: { image: { url, _id } }
            newImageUrl = response.image.url || response.image.path;
            newImageId = response.image._id || response.image.id;
          } else if (response?.url || response?.path) {
            // Structure: { url, _id }
            newImageUrl = response.url || response.path;
            newImageId = response._id || response.id;
          }

          console.log("Extracted image URL:", newImageUrl);
          console.log("Extracted image ID:", newImageId);

          if (newImageUrl) {
            // Replace preview URL with actual URL at the specific index
            setImageURLs((prevUrls) => {
              const previewIndex = prevUrls.findIndex(url => url === previewUrl);
              if (previewIndex !== -1) {
                const updated = [...prevUrls];
                updated[previewIndex] = newImageUrl;
                console.log("Updated image URLs:", updated);
                return updated;
              }
              return prevUrls;
            });
            
            // Update the corresponding ID at the same index
            setImageIds((prevIds) => {
              const updated = [...prevIds];
              updated[newImageIndex] = newImageId || "";
              console.log("Updated image IDs:", updated);
              return updated;
            });

            // Remove from uploading set
            setUploadingImages((prev) => {
              const updated = new Set(prev);
              updated.delete(previewUrl);
              return updated;
            });

            // Clean up the preview URL
            URL.revokeObjectURL(previewUrl);

            toast.success("تصویر با موفقیت آپلود شد");
          } else {
            console.error("Could not extract image URL from response");
            toast.error(
              "تصویر آپلود شد اما نمایش داده نشد. لطفا صفحه را رفرش کنید."
            );
          }
        },
        onError: (error) => {
          console.error("Error uploading image:", error);
          console.log("Removing failed upload:", previewUrl);

          // Remove failed upload from all states
          setImageURLs((prev) => {
            const updated = prev.filter((url) => url !== previewUrl);
            console.log("Removed from imageURLs:", updated);
            return updated;
          });
          setImageIds((prev) => {
            const updated = [...prev];
            updated.splice(newImageIndex, 1); // Remove at the specific index
            return updated;
          });
          setUploadingImages((prev) => {
            const updated = new Set(prev);
            updated.delete(previewUrl);
            return updated;
          });

          // Clean up the preview URL
          URL.revokeObjectURL(previewUrl);

          toast.error("خطا در آپلود تصویر. لطفا دوباره تلاش کنید.");
        },
      })
    );
  };

  const removeImage = (index: number) => {
    const productId = id || product?._id;
    const imageId = imageIds[index];

    if (!productId) {
      toast.error("شناسه محصول یافت نشد. لطفا صفحه را رفرش کنید.");
      return;
    }

    if (!imageId) {
      // If no imageId, just remove from local state (for newly uploaded images)
      setImageURLs((prev) => prev.filter((_, i) => i !== index));
      setImageIds((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    dispatch(
      DeleteProductImageAction({
        productId,
        imageId,
        onSuccess: () => {
          // Remove image from local state
          setImageURLs((prev) => prev.filter((_, i) => i !== index));
          setImageIds((prev) => prev.filter((_, i) => i !== index));
        },
        onError: (error) => {
          console.error("Error deleting image:", error);
        },
      })
    );
  };

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
    installmentPrice: Yup.array().when("paymentType", {
      is: (val: string) =>
        val === "INSTALLMENTS" || val === "CASH_AND_INSTALLMENTS",
      then: (schema) =>
        schema.min(1, "حداقل یک قسط باید تعریف شود").of(
          Yup.object({
            duration: Yup.number().required().min(1),
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
      images: imageURLs,
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
                        value="CASH"
                        checked={values.paymentType === "CASH"}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">نقدی</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="INSTALLMENTS"
                        checked={values.paymentType === "INSTALLMENTS"}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">اقساطی</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="CASH_AND_INSTALLMENTS"
                        checked={values.paymentType === "CASH_AND_INSTALLMENTS"}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">
                        نقدی و اقساطی
                      </span>
                    </label>
                  </div>
                  {errors.paymentType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.paymentType}
                    </p>
                  )}
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

              {/* Image Gallery */}
              <ImageGallery
                imageURLs={imageURLs}
                removeImage={removeImage}
                uploadNewImage={uploadNewImage}
                imageActionLoading={uploadImageLoading || deleteImageLoading}
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

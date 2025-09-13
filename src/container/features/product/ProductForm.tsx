import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../components/input";
import Button from "../../../components/button";
import TextArea from "../../../components/textArea";
import SingleSelect from "../../../components/select/SingleSelect";
import ProductFileUploader from "./ProductFileUploader";
import {
  CreateProductAction,
  GetProductByIdAction,
  UpdateProductAction,
} from "../../../redux/actions/product/ProductActions";
import {
  selectCreateProductLoading,
  selectGetProductByIdData,
  selectGetProductByIdLoading,
  selectUpdateProductLoading,
} from "../../../redux/slice/product/ProductSlice";
import ProductCategorySelect from "./ProductCategorySelect";

interface ProductFormProps {
  id?: string | null;
  mode: string;
  onSubmitForm?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ id, mode, onSubmitForm }) => {
  const dispatch: any = useDispatch();

  const createLoading = useSelector(selectCreateProductLoading);
  const updateLoading = useSelector(selectUpdateProductLoading);
  const getByIdLoading = useSelector(selectGetProductByIdLoading);
  const getByIdData = useSelector(selectGetProductByIdData);

  const statusOptions = [
    { label: "فعال", value: "active" },
    { label: "غیرفعال", value: "inactive" },
    { label: "در انتظار", value: "pending" },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("نام محصول الزامی است"),
    description: Yup.string().required("توضیحات محصول الزامی است"),
    price: Yup.number()
      .required("قیمت محصول الزامی است")
      .min(0, "قیمت نمی‌تواند منفی باشد"),
    categoryId: Yup.string().required("دسته بندی الزامی است"),
    status: Yup.string().required("وضعیت الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      categoryId: "",
      status: "active",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("categoryId", values.categoryId);
      formData.append("status", values.status);
      if (values.image) {
        formData.append("image", values.image);
      }

      if (mode === "create") {
        dispatch(
          CreateProductAction({
            credentials: formData,
            onSubmitForm,
            resetForm: formik.resetForm,
          })
        );
      } else if (mode === "update" && id) {
        dispatch(
          UpdateProductAction({
            id,
            credentials: formData,
            onSubmitForm,
            resetForm: formik.resetForm,
          })
        );
      }
    },
  });

  useEffect(() => {
    if (mode === "update" && id) {
      dispatch(GetProductByIdAction({ credentials: id }));
    }
  }, [mode, id, dispatch]);

  useEffect(() => {
    if (mode === "update" && getByIdData?.data) {
      const product = getByIdData.data;
      formik.setValues({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        categoryId: product.categoryId || "",
        status: product.status || "active",
        image: null,
      });
    }
  }, [getByIdData, mode]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">
        {mode === "create" ? "ساخت محصول جدید" : "ویرایش محصول"}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="نام محصول"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            placeholder="نام محصول را وارد کنید"
          />

          <Input
            label="قیمت (تومان)"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && formik.errors.price}
            placeholder="قیمت محصول را وارد کنید"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProductCategorySelect
            label="دسته بندی"
            value={formik.values.categoryId}
            onChange={(value: string) => formik.setFieldValue("categoryId", value)}
            errorMessage={formik.touched.categoryId && formik.errors.categoryId}
            placeholder="دسته بندی را انتخاب کنید"
            required
          />

          <SingleSelect
            label="وضعیت"
            value={statusOptions.find(option => option.value === formik.values.status)}
            onChange={(selectedOption: any) =>
              formik.setFieldValue("status", selectedOption?.value)
            }
            options={statusOptions}
            errorMessage={formik.touched.status && formik.errors.status}
            placeholder="وضعیت را انتخاب کنید"
          />
        </div>

        <TextArea
          label="توضیحات محصول"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && formik.errors.description}
          placeholder="توضیحات محصول را وارد کنید"
          rows={4}
        />

        <ProductFileUploader
          label="تصویر محصول"
          accept="image/*"
          onChange={(file: File | null) => formik.setFieldValue("image", file)}
          error={formik.touched.image && formik.errors.image}
          value={formik.values.image}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline-secondary"
            onClick={onSubmitForm}
          >
            انصراف
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={createLoading || updateLoading || getByIdLoading}
          >
            {mode === "create" ? "ساخت محصول" : "ویرایش محصول"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateBlogLoading,
  selectUpdateBlogLoading,
} from "../../../redux/slice/blog/BlogSlice";
import {
  CreateBlogAction,
  UpdateBlogAction,
} from "../../../redux/actions/blog/BlogActions";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import FileFieldUploader from "../../../components/molcols/formik-fields/FIleFieldUploader";
import TiptapField from "../../../components/molcols/formik-fields/TiptapField";
import BlogCategorySelect from "../category/BlogCategorySelect";
import IsActiveSelect from "../isActive/IsActiveSelect";
import { SelectValidation } from "../../../utils/SelectValidation";

const BlogForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch: any = useDispatch();
  const createLoading: any = useSelector(selectCreateBlogLoading);
  const updateLoading: any = useSelector(selectUpdateBlogLoading);

  const initialData = {
    Name: "",
    Summery: "",
    Description: "",
    Category: null,
    IsActive: null,
    Image: [],
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);
  const [editImageFile, setEditImageFile] = useState([]);
  const hasLoadedImage = useRef(false); // استفاده از useRef برای جلوگیری از بارگذاری مکرر

  const fetchImageAsBlob = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileType = blob.type || "image/png";
    return new File([blob], "thumbnail.png", { type: fileType });
  };

  useEffect(() => {
    if (value?._id && mode === "update") {
      setInitialValues({
        Name: value?.title || "",
        Summery: value?.summery || "",
        Description: value?.description || "",
        Category: {
          label: value?.category?.title || "",
          value: value?.categoryId || "",
        },
        IsActive: {
          label: value?.isActive ? "فعال" : "غیرفعال",
          value: value?.isActive ? true : false,
        },
        //Image: value?.thumbnail || [],
      });

      if (value?.thumbnail) {
        fetchImageAsBlob(NormalizeBaseUrl + value.thumbnail).then((file) => {
          setEditImageFile([
            {
              file: file,
              contentType: "image/png",
              fileName: "thumbnail.png",
            },
          ]);
          hasLoadedImage.current = true; // علامت‌گذاری بارگذاری تصویر
        });
      } else {
        setEditImageFile([]);
      }
    } else {
      setInitialValues(initialData);
      setEditImageFile([]);
      hasLoadedImage.current = false; // بازنشانی برای حالت جدید
    }
  }, [value, mode]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام مقاله الزامی است"),
      Summery: Yup.string().required("پر کردن توضیح مختصر مقاله الزامی است"),
      Category: SelectValidation(Yup),
      Description: Yup.string().required("پر کردن متن مقاله الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const formData = new FormData();
      formData.append("title", data?.Name);
      formData.append("summery", data?.Summery);
      formData.append("description", data?.Description);
      formData.append("categoryId", data?.Category?.value);
      formData.append("isActive", data?.IsActive?.value ? 1 : 0);

      if (data?.Image && data.Image.length > 0) {
        data.Image.forEach((file: any) => {
          formData.append("thumbnail", file);
        });
      }

      if (mode === "create") {
        dispatch(
          CreateBlogAction({
            credentials: formData,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          UpdateBlogAction({
            id:value?._id,
            credentials: formData,
            onSubmitForm,
            resetForm,
          })
        );
      }
    }
  };

  return (
    <>
   
        <FORM
          mode={mode}
          loading={[createLoading, updateLoading]}
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
          resetForm
          items={[
            {
              component: (
                <div className="col-span-6">
                  <InputField name="Name" label={`عنوان مقاله`} required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <InputField name="Summery" label={`توضیح کوتاه`} required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <BlogCategorySelect
                    name="Category"
                    label={`دسته بندی مقاله`}
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <IsActiveSelect name="IsActive" label={`وضعیت`} required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-12">
                  <TiptapField
                    name="Description"
                    label={`متن مقاله`}
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-12">
                  <FileFieldUploader
                    editImageFile={editImageFile}
                    id={mode}
                    errorLabel="فرمت فایل وارد شده صحیح نمیباشد ."
                    errorLabelSize="اندازه فایل بیش از حد مجاز است ."
                    mode={mode ?? null}
                    label={`تصویر مقاله`}
                    name="Image"
                    acceptedFileTypes={[
                      "image/png",
                      "image/jpg",
                      "image/jpeg",
                      "image/gif",
                    ]}
                  />
                </div>
              ),
            },
          ]}
          {...rest}
        />
    </>
  );
};

export default BlogForm;

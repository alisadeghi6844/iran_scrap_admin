import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateBlogLoading,
  selectGetBlogByIdData,
  selectGetBlogByIdLoading,
  selectUpdateBlogLoading,
} from "../../../redux/slice/blog/BlogSlice";
import {
  CreateBlogAction,
  GetBlogByIdAction,
  UpdateBlogAction,
} from "../../../redux/actions/blog/BlogActions";
import FormSkeleton from "../../organism/skeleton/FormSkeleton";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import FileFieldUploader from "../../../components/molcols/formik-fields/FIleFieldUploader";
import TextAreaField from "../../../components/molcols/formik-fields/TextAreaField";
import CategorySelect from "../category/CategorySelect";
import { SelectValidation } from "../../../utils/SelectValidation";
import IsActiveSelect from "../isActive/IsActiveSelect";
import BlogCategorySelect from "../category/BlogCategorySelect";

const BlogForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetBlogByIdData);
  const getLoading = useSelector(selectGetBlogByIdLoading);

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

  const loadData = useCallback(() => {
    if (id && mode === "update") {
      dispatch(GetBlogByIdAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (getValue?.id && mode === "update") {
      setInitialValues({
        Name: getValue?.title || "",
        Summery: getValue?.summery || "",
        Description: getValue?.description || "",
        Category: getValue?.category || "",
        IsActive: getValue?.isActive || "",
        Image: getValue?.image || [],
      });
      setEditImageFile(
        getValue?.image
          ? getValue?.image.map((item: any) => ({
              file: item.file,
              contentType: item.contentType,
              fileName: item.fileName,
            }))
          : []
      );
    } else {
      setInitialValues(initialData);
      setEditImageFile([]);
    }
  }, [getValue, mode]);

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
      formData.append("isActive", data?.IsActive?.value);

      // اضافه کردن فایل‌ها به FormData
      if (data?.Image && data.Image.length > 0) {
        data.Image.forEach((file: any) => {
          formData.append("image", file); // فرض بر این است که data.Image شامل فایل‌ها است
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
            id,
            credentials: formData,
            onSubmitForm,
            resetForm,
          })
        );
      } else {
        return null;
      }
    }
  };

  return (
    <>
      {getLoading ? (
        <>
          <FormSkeleton />
        </>
      ) : (
        <FORM
          mode={mode}
          loading={[
            createLoading && createLoading,
            updateLoading && updateLoading,
          ]}
          initialValues={initialValues && initialValues}
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
                  <TextAreaField
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
      )}
    </>
  );
};

export default BlogForm;

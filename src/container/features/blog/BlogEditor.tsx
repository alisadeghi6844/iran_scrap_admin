import React, { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import {
  selectCreateBlogLoading,
  selectUpdateBlogLoading,
} from "../../../redux/slice/blog/BlogSlice";
import {
  CreateBlogAction,
  UpdateBlogAction,
} from "../../../redux/actions/blog/BlogActions";
import InputField from "../../../components/molcols/formik-fields/InputField";
import TagsInput from "../../../components/input/TagsInput";
import FileFieldUploader from "../../../components/molcols/formik-fields/FIleFieldUploader";
import TiptapField from "../../../components/molcols/formik-fields/TiptapField";
import BlogCategorySelect from "../category/BlogCategorySelect";
import IsActiveSelect from "../isActive/IsActiveSelect";
import { SelectValidation } from "../../../utils/SelectValidation";
import Button from "../../../components/button";
import { NormalizeBaseUrl } from "../../../utils/NormalizeBaseUrl";

interface BlogEditorProps {
  mode: "create" | "update";
  onSubmitForm?: () => void;
  onCancel?: () => void;
  value?: any;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  mode,
  onSubmitForm,
  onCancel,
  value,
}) => {
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
    Tags: [],
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);
  const [editImageFile, setEditImageFile] = useState<any[]>([]);
  const hasLoadedImage = useRef(false);
  // Store the URL of the current thumbnail to display if no new file is selected
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string | null>(null);

  const fetchImageAsBlob = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileType = blob.type || "image/png";
      return new File([blob], "thumbnail.png", { type: fileType });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  useEffect(() => {
    if (value?._id && mode === "update") {
      const desc = value?.description || "";
      
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
        Tags: value?.tags || [],
      });

      if (value?.thumbnail) {
        setCurrentThumbnailUrl(NormalizeBaseUrl + value.thumbnail);
        // We don't automatically convert to file object anymore to avoid issues.
        // The user sees the current image. If they upload a new one, it overrides.
      }
    } else if (mode === "create") {
      setInitialValues(initialData);
      setEditImageFile([]);
      setCurrentThumbnailUrl(null);
      hasLoadedImage.current = false;
    }
  }, [value, mode]);

  const validationSchema = Yup.object({
    Name: Yup.string().required("پر کردن نام مقاله الزامی است"),
    Summery: Yup.string().required("پر کردن توضیح مختصر مقاله الزامی است"),
    Category: SelectValidation(Yup),
    Description: Yup.string().required("پر کردن متن مقاله الزامی است"),
  });

  const handleSubmit = (data: any, { resetForm }: any) => {
    const formData = new FormData();
    formData.append("title", data?.Name);
    formData.append("summery", data?.Summery);
    formData.append("description", data?.Description);
    if (data?.Category?.value) {
      formData.append("categoryId", String(data?.Category?.value));
    }
    formData.append("isActive", String(!!data?.IsActive?.value));

    if (data?.Image && data.Image.length > 0) {
      data.Image.forEach((file: any) => {
        formData.append("thumbnail", file);
      });
    }

    if (data?.Tags && data.Tags.length > 0) {
      data.Tags.forEach((tag: string) => {
        formData.append("tags", tag);
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
          id: value?._id,
          credentials: formData,
          onSubmitForm,
          resetForm,
        })
      );
    }
  };

  const isLoading = mode === "create" ? createLoading : updateLoading;

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-10">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ submitForm, values, setFieldValue }) => (
          <Form className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm sticky top-[80px] z-10 border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800">
                {mode === "create" ? "ایجاد مقاله جدید" : "ویرایش مقاله"}
              </h1>
              <div className="flex gap-3">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    انصراف
                  </Button>
                )}
                <Button
                  type="button"
                  variant="primary"
                  onClick={submitForm}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {mode === "create" ? "انتشار مقاله" : "بروزرسانی مقاله"}
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Content (Left Column in RTL) */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="mb-6">
                    <InputField
                      name="Name"
                      label="عنوان مقاله"
                      placeholder="عنوان جذاب مقاله را وارد کنید..."
                      required
                      className="text-lg font-medium"
                    />
                  </div>
                  
                  {/* Summary moved here */}
                  <div className="mb-6">
                    <InputField
                      name="Summery"
                      label="چکیده مقاله (برای سئو و نمایش در لیست)"
                      required
                      multiline
                      rows={3}
                      placeholder="خلاصه‌ای از مقاله بنویسید..."
                    />
                  </div>

                  <div>
                    <TiptapField
                      name="Description"
                      label="متن کامل مقاله"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar (Right Column in RTL) */}
              <div className="w-full lg:w-[350px] flex flex-col gap-6">
                {/* Status & Category */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-700 mb-4 border-b pb-2">
                    تنظیمات انتشار
                  </h3>
                  <div className="flex flex-col gap-4">
                    <IsActiveSelect name="IsActive" label="وضعیت انتشار" required />
                    <BlogCategorySelect
                      name="Category"
                      label="دسته‌بندی"
                      required
                    />
                  </div>
                </div>
                
                {/* Tags */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-700 mb-4 border-b pb-2">
                    برچسب‌ها
                  </h3>
                  <TagsInput 
                    value={values.Tags} 
                    onChange={(tags) => setFieldValue("Tags", tags)}
                    label="کلمات کلیدی"
                    placeholder="تایپ کنید و Enter بزنید..."
                  />
                </div>

                {/* Featured Image */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-700 mb-4 border-b pb-2">
                    تصویر شاخص
                  </h3>
                  
                  {/* Display Current Image if available and no new image selected */}
                  {currentThumbnailUrl && (!values.Image || values.Image.length === 0) && (
                    <div className="mb-4 relative group">
                       <img src={currentThumbnailUrl} className="w-full h-auto rounded-lg border border-gray-200" alt="Current Thumbnail" />
                       <div className="text-xs text-gray-500 mt-1 text-center">تصویر فعلی</div>
                    </div>
                  )}

                  <FileFieldUploader
                    editImageFile={editImageFile}
                    id={mode}
                    errorLabel="فرمت فایل صحیح نیست"
                    errorLabelSize="حجم فایل بیش از حد مجاز است"
                    mode={mode}
                    label="تصویر را اینجا رها کنید"
                    name="Image"
                    acceptedFileTypes={[
                      "image/png",
                      "image/jpg",
                      "image/jpeg",
                      "image/gif",
                      "image/webp",
                    ]}
                    maxFileSize="5MB"
                    allowMultiple={false}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogEditor;

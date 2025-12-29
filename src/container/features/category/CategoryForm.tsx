import React, { useCallback, useEffect, useRef, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateCategoryLoading,
  selectGetCategoryByIdData,
  selectGetCategoryByIdLoading,
  selectUpdateCategoryLoading,
} from "../../../redux/slice/category/CategorySlice";
import {
  CreateCategoryAction,
  GetCategoryByIdAction,
  UpdateCategoryAction,
} from "../../../redux/actions/category/CategoryActions";
import FormSkeleton from "../../organism/skeleton/FormSkeleton";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import FileFieldUploader from "../../../components/molcols/formik-fields/FIleFieldUploader";
import CategorySelect from "./CategorySelect";

const CategoryForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, selectedRow, ...rest } = props;

  const dispatch: any = useDispatch();
  const hasLoadedImage = useRef(false); 
  const currentImageId = useRef<string | null>(null); 
  const getValue = useSelector(selectGetCategoryByIdData);
  const getLoading = useSelector(selectGetCategoryByIdLoading);

  const createLoading: any = useSelector(selectCreateCategoryLoading);
  const updateLoading: any = useSelector(selectUpdateCategoryLoading);

  const initialData = {
    Name: "",
    Code: "",
    Category: null,
    Image: [],
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);
  const [editImageFile, setEditImageFile] = useState([]);

  const loadData = useCallback(() => {
    if (id && mode === "update") {
      dispatch(GetCategoryByIdAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
    // وقتی id تغییر کنه، state ها رو reset کن
    hasLoadedImage.current = false;
    currentImageId.current = null;
    setEditImageFile([]);
  }, [loadData]);
  const fetchImageAsBlob = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileType = blob.type || "image/png";
    return new File([blob], "thumbnail.png", { type: fileType });
  };
  useEffect(() => {
    console.log("getValue", getValue);
    console.log("selectedRow", selectedRow);
    
    // اگر selectedRow وجود داره و mode برابر update هست، از selectedRow استفاده کن
    if (selectedRow && mode === "update") {
      setInitialValues({
        Name: selectedRow?.name || "",
        Code: selectedRow?.code || "",
        ParentId: selectedRow?.parentId,
        Image: selectedRow?.image || [],
      });
      
      // فقط اگر تصویر وجود داشته باشه و این id متفاوت از قبلی باشه
      if (selectedRow?.image && currentImageId.current !== selectedRow._id) {
        fetchImageAsBlob(selectedRow?.image)
          .then((file) => {
            setEditImageFile([
              {
                file: file,
                contentType: "image/png",
                fileName: "thumbnail.png",
              },
            ]);
            hasLoadedImage.current = true;
            currentImageId.current = selectedRow._id;
          });
      } else if (!selectedRow?.image) {
        setEditImageFile([]);
        hasLoadedImage.current = false;
        currentImageId.current = null;
      }
    }
    // اگر selectedRow نداریم ولی getValue داریم (fallback)
    else if (getValue?.id && mode === "update") {
      setInitialValues({
        Name: getValue?.name || "",
        Code: getValue?.code || "",
        ParentId: getValue?.parentId,
        Image: getValue?.image || [],
      });
      
      // فقط اگر تصویر وجود داشته باشه و این id متفاوت از قبلی باشه
      if (getValue?.image && currentImageId.current !== getValue.id) {
        fetchImageAsBlob(getValue?.image)
          .then((file) => {
            setEditImageFile([
              {
                file: file,
                contentType: "image/png",
                fileName: "thumbnail.png",
              },
            ]);
            hasLoadedImage.current = true;
            currentImageId.current = getValue.id;
          });
      } else if (!getValue?.image) {
        setEditImageFile([]);
        hasLoadedImage.current = false;
        currentImageId.current = null;
      }
    } else {
      setInitialValues(initialData);
      setEditImageFile([]);
      hasLoadedImage.current = false;
      currentImageId.current = null;
    }
  }, [getValue, selectedRow, mode]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام دسته بندی الزامی است"),
      Code: Yup.string().required("پر کردن کد دسته بندی الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const formData = new FormData();
      formData.append("name", data?.Name);
      formData.append("code", data?.Code);
      formData.append("parentId", data?.Category?.value??null);

      // اضافه کردن فایل‌ها به FormData
      if (data?.Image && data.Image.length > 0) {
        data.Image.forEach((file: unknown) => {
          console.log("File type being sent:", file.type, file.name);
          formData.append("image", file); // فرض بر این است که data.Image شامل فایل‌ها است
        });
      }

      if (mode === "create") {
        dispatch(
          CreateCategoryAction({
            credentials: formData,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          UpdateCategoryAction({
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
                  <InputField name="Name" label={`نام دسته بندی`} required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <InputField name="Code" label={`کد دسته بندی`} required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <CategorySelect name="Category" />
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
                    label={`تصویر دسته بندی`}
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

export default CategoryForm;

import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../../../types/organism/Form";
import FORM from "../../../../organism/FORM";
import { PublicDictionary } from "../../../../../utils/dictionary";
import InputField from "../../../../../components/molcols/formik-fields/InputField";
import FileFieldUploader from "../../../../../components/molcols/formik-fields/FIleFieldUploader";
import {
  createFoodCategoryAction,
  getByIdFoodCategoryAction,
  updateFoodCategoryAction,
} from "../../../../../redux/actions/foodReservation/management/category/CategoriesAction";
import {
  selectCreateFoodCategoryLoading,
  selectGetByIdFoodCategoryData,
  selectGetByIdFoodCategoryLoading,
  selectUpdateFoodCategoryLoading,
} from "../../../../../redux/slice/foodReservation/management/category/CategoriesSlice";
import FormSkeleton from "../../../../organism/skeleton/FormSkeleton";

const CategoryManagementForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetByIdFoodCategoryData);
  const getLoading = useSelector(selectGetByIdFoodCategoryLoading);

  const createLoading: any = useSelector(selectCreateFoodCategoryLoading);
  const updateLoading: any = useSelector(selectUpdateFoodCategoryLoading);

  const initialData = {
    Name: "",
    Image: [],
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);
  const [editImageFile, setEditImageFile] = useState([]);

  const loadData = useCallback(() => {
    if (id && mode === "update") {
      dispatch(getByIdFoodCategoryAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      setInitialValues({
        Name: getValue.data.name || "",
        Image: getValue.data.image || [],
      });
      setEditImageFile(
        getValue.data.image
          ? getValue.data.image.map((item: any) => ({
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
      Name: Yup.string().required("پر کردن نام دسته بندی الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const items: any = {
        id: mode === "update" ? getValue?.data?._id : null,
        name: data?.Name,
        image: data?.Image,
      };

      if (mode === "create") {
        dispatch(
          createFoodCategoryAction({
            credentials: items,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          updateFoodCategoryAction({
            credentials: items,
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
                <div className="col-span-12">
                  <InputField
                    name="Name"
                    label={` ${PublicDictionary.food_category_name}`}
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
                    label={PublicDictionary.uploadaImage}
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

export default CategoryManagementForm;

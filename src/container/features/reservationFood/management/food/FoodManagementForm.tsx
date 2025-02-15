import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../../../types/organism/Form";
import FORM from "../../../../organism/FORM";
import { PublicDictionary } from "../../../../../utils/dictionary";
import InputField from "../../../../../components/molcols/formik-fields/InputField";
import FileFieldUploader from "../../../../../components/molcols/formik-fields/FIleFieldUploader";
import {
  createFoodAction,
  getByIdFoodAction,
  updateFoodAction,
} from "../../../../../redux/actions/foodReservation/management/food/FoodAction";
import {
  selectCreateFoodLoading,
  selectGetByIdFoodData,
  selectGetByIdFoodLoading,
  selectUpdateFoodLoading,
} from "../../../../../redux/slice/foodReservation/management/food/FoodSlice";
import FormSkeleton from "../../../../organism/skeleton/FormSkeleton";
import CategorySelect from "../category/CategorySelect";
import RestaurantSelect from "../restaurant/RestaurantSelect";
import TextAreaField from "../../../../../components/molcols/formik-fields/TextAreaField";
import { SelectValidation } from "../../../../../utils/SelectValidation";

const FoodManagementForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetByIdFoodData);
  const getLoading = useSelector(selectGetByIdFoodLoading);

  const createLoading: any = useSelector(selectCreateFoodLoading);
  const updateLoading: any = useSelector(selectUpdateFoodLoading);

  const initialData = {
    Name: "",
    Image: [],
    RestaurantSelect: null,
    CategorySelect: null,
    Description: "",
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);
  const [editImageFile, setEditImageFile] = useState([]);

  const loadData = useCallback(() => {
    if (id && mode === "update") {
      dispatch(getByIdFoodAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      setInitialValues({
        Name: getValue.data.title || "",
        Image: getValue.data.image || [],
        RestaurantSelect: {
          label: getValue?.data?.restaurantId?.name,
          value: getValue?.data?.restaurantId?._id,
        },
        CategorySelect: getValue?.data?.categoriesId?.map((item: any) => ({
          value: item?._id,
          label: item?.name,
        })),
        Description: getValue?.data?.description,
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
      Name: Yup.string().required("پر کردن نام غذا الزامی است"),
      Description: Yup.string().required("پر کردن توضیحات غذا الزامی است"),
      RestaurantSelect: SelectValidation(Yup),
      CategorySelect: Yup.array()
        .of(Yup.object().shape({ value: Yup.string(), label: Yup.string() }))
        .min(1, "حداقل یک دسته بندی انتخاب کنید")
        .required("پر کردن دسته بندی الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
  
    if (data) {
      const items: any = {
        id: mode === "update" ? getValue?.data?._id : null,
        title: data?.Name,
        image: data?.Image,
        description: data?.Description,
        restaurantId: data?.RestaurantSelect?.value,
        categoriesId: data?.CategorySelect?.map((item: any) => item?.value),
      };

      if (mode === "create") {
        dispatch(
          createFoodAction({
            credentials: items,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          updateFoodAction({
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
                <div className="col-span-6">
                  <InputField
                    name="Name"
                    label={` ${PublicDictionary.food_name}`}
                    required
                  />
                </div>
              ),
            },

            {
              component: (
                <div className="col-span-6">
                  <RestaurantSelect
                    mode={mode}
                    name="RestaurantSelect"
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-12">
                  <CategorySelect
                    isMulti
                    mode={mode}
                    name="CategorySelect"
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-12">
                  <TextAreaField
                    mode={mode}
                    label={PublicDictionary.food_description}
                    name="Description"
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

export default FoodManagementForm;

import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../../../types/organism/Form";
import FORM from "../../../../organism/FORM";
import { PublicDictionary } from "../../../../../utils/dictionary";
import InputField from "../../../../../components/molcols/formik-fields/InputField";

import {
  createRestaurantAction,
  getByIdRestaurantAction,
  updateRestaurantAction,
} from "../../../../../redux/actions/foodReservation/management/restaurant/RestaurantAction";
import {
  selectCreateRestaurantLoading,
  selectGetByIdRestaurantData,
  selectGetByIdRestaurantLoading,
  selectUpdateRestaurantLoading,
} from "../../../../../redux/slice/foodReservation/management/restaurant/RestaurantSlice";
import FormSkeleton from "../../../../organism/skeleton/FormSkeleton";

const CategoryManagementForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetByIdRestaurantData);
  const getLoading = useSelector(selectGetByIdRestaurantLoading);

  const createLoading: any = useSelector(selectCreateRestaurantLoading);
  const updateLoading: any = useSelector(selectUpdateRestaurantLoading);

  const initialData = {
    Name: "",
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);

  const loadData = useCallback(() => {
    if (id && mode === "update") {
      dispatch(getByIdRestaurantAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      setInitialValues({
        Name: getValue.data.name || "",
      });
    } else {
      setInitialValues(initialData);
    }
  }, [getValue, mode]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام رستوران الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const items: any = {
        id: mode === "update" ? getValue?.data?._id : null,
        name: data?.Name,
      };

      if (mode === "create") {
        dispatch(
          createRestaurantAction({
            credentials: items,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          updateRestaurantAction({
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
                    label={` ${PublicDictionary.food_restaurant_name}`}
                    required
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

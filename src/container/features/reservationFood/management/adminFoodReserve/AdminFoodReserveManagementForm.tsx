import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../../../types/organism/Form";
import FORM from "../../../../organism/FORM";
import { PublicDictionary } from "../../../../../utils/dictionary";
import FormSkeleton from "../../../../organism/skeleton/FormSkeleton";
import {
  createAdminFoodReserveAction,
  getByIdAdminFoodReserveAction,
  updateAdminFoodReserveAction,
} from "../../../../../redux/actions/foodReservation/management/foodReserve/AdminFoodReserveAction";
import DatePickerField from "../../../../../components/molcols/formik-fields/DatePickerField";
import FoodShowSelect from "../foodShow/FoodShowSelect";
import AppetizerSelect from "../appetizer/AppetizerSelect";
import UsersSelect from "../../../account/UsersSelect";
import { SelectValidation } from "../../../../../utils/SelectValidation";
import {
  convertGregorianToPersian,
  convertPersianToGregorian,
  p2e,
} from "../../../../../utils/MomentConvertor";
import {
  selectCreateAdminFoodReserveLoading,
  selectGetByIdAdminFoodReserveData,
  selectGetByIdAdminFoodReserveLoading,
  selectUpdateeAdminFoodReserveLoading,
} from "../../../../../redux/slice/foodReservation/management/foodReserve/AdminReserveSlice";

const CategoryManagementForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetByIdAdminFoodReserveData);
  const getLoading = useSelector(selectGetByIdAdminFoodReserveLoading);

  const createLoading: any = useSelector(selectCreateAdminFoodReserveLoading);
  const updateLoading: any = useSelector(selectUpdateeAdminFoodReserveLoading);

  const initialData = {
    FoodId: "",
    AppetizerId: "",
    UserId: "",
    Date: "",
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);
  const [date, setDate] = useState("");

  const loadData = useCallback(() => {
    if (id && mode === "update") {
      dispatch(getByIdAdminFoodReserveAction({ id: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      setDate(convertGregorianToPersian(getValue?.data?.date));
      setInitialValues({
        FoodId: {
          label: getValue?.data?.foodId?.title,
          value: getValue?.data?.foodId?._id,
        },
        AppetizerId: {
          label: getValue?.data?.appetizerId?.title,
          value: getValue?.data?.appetizerId?._id,
        },
        UserId: {
          label: `${getValue?.data?.userId?.firstName} ${getValue?.data?.userId?.lastName} (${getValue?.data?.userId?.personnelCode})`,
          value: getValue?.data?.userId?._id,
        },
        Date: convertGregorianToPersian(getValue?.data?.date),
      });
    } else {
      setInitialValues(initialData);
      setDate("");
    }
  }, [getValue, mode]);

  const validationSchema = () =>
    Yup.object({
      Date: Yup.string().required("پر کردن تاریخ رزرو غذا الزامی است"),
      // AppetizerId: SelectValidation(Yup),
      // UserId: SelectValidation(Yup),
      // FoodId: SelectValidation(Yup),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const items: any = {
        id: mode === "update" ? getValue?.data?._id : null,
        date: convertPersianToGregorian(p2e(data?.Date)),
        foodId: data?.FoodId?.value,
        appetizerId: data?.AppetizerId?.value,
        userId: data?.UserId?.value,
      };

      if (mode === "create") {
        dispatch(
          createAdminFoodReserveAction({
            credentials: items,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          updateAdminFoodReserveAction({
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
    <div className="mt-2">
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
                  <UsersSelect
                    name="UserId"
                    label={` ${PublicDictionary.user}`}
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <DatePickerField
                    name="Date"
                    label={` ${PublicDictionary.reserve_date}`}
                    required
                    isTime={false}
                    onChange={(e) => {
                      setDate(e);
                    }}
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <FoodShowSelect
                    name="FoodId"
                    label={` ${PublicDictionary.food}`}
                    required
                    disabled={!date}
                    date={date}
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <AppetizerSelect
                    name="AppetizerId"
                    label={` ${PublicDictionary.appetizer}`}
                    required
                    disabled={!date}
                  />
                </div>
              ),
            },
          ]}
          {...rest}
        />
      )}
    </div>
  );
};

export default CategoryManagementForm;

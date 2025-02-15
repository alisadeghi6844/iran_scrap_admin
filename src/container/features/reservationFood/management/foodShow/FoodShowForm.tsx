import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../../../types/organism/Form";
import FORM from "../../../../organism/FORM";

import {
  createFoodShowAction,
  getByIdFoodShowAction,
  updateFoodShowAction,
} from "../../../../../redux/actions/foodReservation/management/foodShow/FoodShowAction";
import {
  selectCreateFoodShowLoading,
  selectGetByIdFoodShowData,
  selectGetByIdFoodShowLoading,
  selectUpdateFoodShowLoading,
} from "../../../../../redux/slice/foodReservation/management/foodShow/FoodShowSlice";
import FormSkeleton from "../../../../organism/skeleton/FormSkeleton";
import DatePickerField from "../../../../../components/molcols/formik-fields/DatePickerField";
import { PublicDictionary } from "../../../../../utils/dictionary";
import StatusSelect from "../../../statusSelect/StatusSelect";
import FoodSelect from "../food/FoodSelect";
import { SelectValidation } from "../../../../../utils/SelectValidation";
import { convertGregorianToPersian } from "../../../../../utils/MomentConvertor";
import {
  convertPersianToGregorian,
  p2e,
} from "../../../../../utils/MomentConvertor";
import { selectGetTimeData } from "../../../../../redux/slice/time/TimeSlice";

const CategoryManagementForm: React.FC<FormProps> = (props) => {
  const { mode = "create", createDate, onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetByIdFoodShowData);
  const getLoading = useSelector(selectGetByIdFoodShowLoading);
  const getDate: any = useSelector(selectGetTimeData);

  const createLoading: any = useSelector(selectCreateFoodShowLoading);
  const updateLoading: any = useSelector(selectUpdateFoodShowLoading);

  const initialData = {
    Date: "",
    Status: null,
    Food: null,
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);

  const loadData = useCallback(() => {
    if (id && mode === "update") {
      dispatch(getByIdFoodShowAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      setInitialValues({
        Date: convertGregorianToPersian(getValue?.data?.date) || "",
        Status: {
          value: getValue.data?.isActive,
          label: getValue.data?.isActive
            ? PublicDictionary.active
            : PublicDictionary.inActive,
        },
        Food: getValue.data?.foodId?.map((item: any) => ({
          value: item._id,
          label: item.title,
        })),
      });
    } else {
      setInitialValues({
        Date: createDate,
        Status: null,
        Food: null,
      });
    }
  }, [getValue, mode]);

  const validationSchema = () =>
    Yup.object({
      Date: Yup.string().required("پر کردن تاریخ نمایش الزامی است"),
      Food: Yup.array()
        .of(Yup.object().shape({ value: Yup.string(), label: Yup.string() }))
        .min(1, "حداقل یک غذا انتخاب کنید")
        .required("پر کردن غذا الزامی است"),
      Status: SelectValidation(Yup),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const items: any = {
        id: mode === "update" ? getValue?.data?._id : null,
        date: convertPersianToGregorian(p2e(data?.Date)),
        isActive: data?.Status?.value,
        foodId: data?.Food?.map((item: any) => item?.value),
      };

      if (mode === "create") {
        dispatch(
          createFoodShowAction({
            credentials: items,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          updateFoodShowAction({
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
                  <DatePickerField
                    disabled
                    minDate={new Date(getDate?.data)?.setHours(0, 0, 0, 0)}
                    isTime={false}
                    name="Date"
                    label={`${PublicDictionary.date} ${PublicDictionary.food_show}`}
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <StatusSelect
                    required
                    name="Status"
                    label={PublicDictionary.status}
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-12">
                  <FoodSelect isMulti required name="Food" />
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

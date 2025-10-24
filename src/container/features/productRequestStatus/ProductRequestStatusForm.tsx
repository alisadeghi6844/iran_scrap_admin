import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  selectGetProductRequestStatusByIdData,
  selectGetProductRequestStatusByIdLoading,
  selectGetProductRequestStatusData,
  selectGetProductRequestStatusLoading,
  selectUpdateProductRequestStatusLoading,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import {
  GetRequestProductStatusAction,
  GetRequestProductStatusByIdAction,
  UpdateRequestProductStatusAction,
} from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import FormSkeleton from "../../organism/skeleton/FormSkeleton";
import FORM from "../../organism/FORM";
import Checkbox from "../../../components/checkbox";
import { FormProps } from "../../../types/organism/Form";

const ProductRequestStatusForm: React.FC<FormProps> = (props) => {
  const { mode = "create", id,handleSubmit, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetProductRequestStatusByIdData);
  const getLoading = useSelector(selectGetProductRequestStatusByIdLoading);
  const productStatusData = useSelector(selectGetProductRequestStatusData);
  const updateLoading: any = useSelector(selectUpdateProductRequestStatusLoading);

  const initialData = {
    items: [],
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);
  const [allow, setAllow] = useState<string[]>([]);

  const loadData = useCallback(() => {
    if (id) {
      dispatch(GetRequestProductStatusByIdAction({ credentials: id }));
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    dispatch(GetRequestProductStatusAction({ page: 0, size: 20 }));
  }, []);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      setInitialValues({
        items: getValue.data.items || [],
      });
    } else {
      setInitialValues(initialData);
    }
  }, [getValue, mode]);

  const validationSchema = Yup.object({
  });

  const formik = useFormik({
    initialValues: { items: [] },
    validationSchema,
    onSubmit: (values) => {
      const selectedCodes = values.items;
      dispatch(UpdateRequestProductStatusAction({
        credentials: { allowedChangeCodes: selectedCodes },
        id: id,
        handleSubmit
      }));
    },
  });

  useEffect(() => {
    if (getValue?.data?.data?.length && id) {
      const findItem = getValue.data.data.find((item: any) => item?.id === id);
      if (findItem) {
        setAllow(findItem.allowedChangeCodes || []);
      }
    }
  }, [getValue, id]);

  useEffect(() => {
      formik.setFieldValue("items", allow);
  }, [allow]);

  return (
    <>
      {getLoading ? (
        <FormSkeleton />
      ) : (
        <FORM
          mode={mode}
          loading={[updateLoading, updateLoading]}
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleSubmit={formik.handleSubmit}
          items={[
            {
              component: (
                <>
                  {productStatusData?.data?.map((item: any) => (
                    <div className="col-span-12" key={item?.code}>
                      <Checkbox
                        id={item?.code}
                        label={item.title}
                        value={item?.code} // اتصال به formik
                        checked={formik.values.items.includes(item?.code)} // بررسی وضعیت چک باکس
                        onChange={() => {
                          const newValues = formik.values.items.includes(item?.code)
                            ? formik.values.items.filter((code: string) => code !== item?.code)
                            : [...formik.values.items, item?.code];
                          formik.setFieldValue("items", newValues); // به‌روزرسانی مقادیر
                        }}
                      />
                    </div>
                  ))}

                </>
              ),
            },
          ]}
          {...rest}
        />
      )}
    </>
  );
};

export default ProductRequestStatusForm;

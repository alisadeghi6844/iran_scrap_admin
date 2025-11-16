import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { FormProps } from "../../../types/organism/Form";
import { EditRequestProductAdminAction, GetRequestProductAdminByIdAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  selectGetProductRequestAdminByIdData,
  selectGetProductRequestAdminByIdLoading,
  selectEditProductRequestAdminLoading,
  selectEditProductRequestAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { REQUEST_STATUS } from "../../../utils/constants";
import Button from "../../../components/button";
import InputField from "../../../components/molcols/formik-fields/InputField";
import SelectField from "../../../components/molcols/formik-fields/SelectField";
import TextAreaField from "../../../components/molcols/formik-fields/TextAreaField";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("توضیحات الزامی است"),
  amount: Yup.number().positive("مقدار باید مثبت باشد").required("مقدار الزامی است"),
  expectedDate: Yup.number().required("تاریخ تحویل الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
  province: Yup.string().required("استان الزامی است"),
  city: Yup.string().required("شهر الزامی است"),
  postalCode: Yup.string(),
  lat: Yup.string(),
  lng: Yup.string(),
  requestType: Yup.string().required("نوع درخواست الزامی است"),
  amountType: Yup.string().required("نوع مقدار الزامی است"),
  paymentType: Yup.string().required("نوع پرداخت الزامی است"),
});

const ProductRequestEditForm: React.FC<FormProps> = (props) => {
  const { mode = "create", id, handleSubmit, onSubmitForm, ...rest } = props;

  const dispatch: any = useDispatch();

  const reqData = useSelector(selectGetProductRequestAdminByIdData);
  const reqLoading = useSelector(selectGetProductRequestAdminByIdLoading);
  const editLoading = useSelector(selectEditProductRequestAdminLoading);
  const editData = useSelector(selectEditProductRequestAdminData);

  useEffect(() => {
    if (id) {
      dispatch(GetRequestProductAdminByIdAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (editData?.status === 200) {
      onSubmitForm && onSubmitForm();
    }
  }, [editData, onSubmitForm]);

  const initialValues = {
    description: reqData?.description || "",
    amount: reqData?.amount || 0,
    expectedDate: reqData?.expectedDate || 0,
    address: reqData?.address || "",
    province: reqData?.province || "",
    city: reqData?.city || "",
    postalCode: reqData?.postalCode || "",
    lat: reqData?.lat || "",
    lng: reqData?.lng || "",
    requestType: reqData?.requestType || "NORMAL",
    amountType: reqData?.amountType || "KILOGRAM",
    paymentType: reqData?.paymentType || "CASH",
  };

  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      status: REQUEST_STATUS.REGISTERED,
    };

    dispatch(
      EditRequestProductAdminAction({
        id,
        credentials: payload,
        onSuccess: () => {
          onSubmitForm && onSubmitForm();
        },
      })
    );
  };

  const requestTypeOptions = [
    { value: "NORMAL", label: "نرمال" },
    { value: "URGENT", label: "فوری" },
  ];

  const amountTypeOptions = [
    { value: "KILOGRAM", label: "کیلوگرم" },
    { value: "TON", label: "تن" },
  ];

  const paymentTypeOptions = [
    { value: "CASH", label: "نقد" },
    { value: "INSTALLMENTS", label: "مدت دار" },
    { value: "CASH_AND_INSTALLMENTS", label: "نقد و مدت دار" },
  ];

  if (reqLoading) {
    return <div className="flex justify-center p-4">در حال بارگذاری...</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <TextAreaField
                name="description"
                label="توضیحات"
                required
                rows={3}
              />
            </div>
            
            <div>
              <InputField
                name="amount"
                label="مقدار"
                type="number"
                required
              />
            </div>

            <div>
              <SelectField
                name="amountType"
                label="نوع مقدار"
                options={amountTypeOptions}
                required
              />
            </div>

            <div>
              <InputField
                name="expectedDate"
                label="تاریخ تحویل (timestamp)"
                type="number"
                required
              />
            </div>

            <div>
              <InputField
                name="province"
                label="استان"
                required
              />
            </div>

            <div>
              <InputField
                name="city"
                label="شهر"
                required
              />
            </div>

            <div className="md:col-span-2">
              <TextAreaField
                name="address"
                label="آدرس"
                required
                rows={2}
              />
            </div>

            <div>
              <InputField
                name="postalCode"
                label="کد پستی"
              />
            </div>

            <div>
              <InputField
                name="lat"
                label="عرض جغرافیایی"
              />
            </div>

            <div>
              <InputField
                name="lng"
                label="طول جغرافیایی"
              />
            </div>

            <div>
              <SelectField
                name="requestType"
                label="نوع درخواست"
                options={requestTypeOptions}
                required
              />
            </div>

            <div>
              <SelectField
                name="paymentType"
                label="نوع پرداخت"
                options={paymentTypeOptions}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSubmit && handleSubmit()}
            >
              انصراف
            </Button>
            <Button
              type="submit"
              loading={editLoading || isSubmitting}
            >
              ذخیره تغییرات
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductRequestEditForm;
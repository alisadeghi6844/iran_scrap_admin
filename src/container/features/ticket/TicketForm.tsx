import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../../components/button";
import InputField from "../../../components/molcols/formik-fields/InputField";
import SelectField from "../../../components/molcols/formik-fields/SelectField";
import TextAreaField from "../../../components/molcols/formik-fields/TextAreaField";
import { CreateTicketAction, UpdateTicketAction, GetTicketByIdAction } from "../../../redux/actions/ticket/TicketActions";
import { 
  selectCreateTicketLoading, 
  selectUpdateTicketLoading,
  selectGetTicketByIdData,
  selectGetTicketByIdLoading
} from "../../../redux/slice/ticket/TicketSlice";

interface TicketFormProps {
  id?: string | null;
  mode: string;
  ticket?: any;
  onSubmitForm: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("عنوان الزامی است"),
  subject: Yup.string().required("موضوع الزامی است"),
  priority: Yup.string().required("اولویت الزامی است"),
  description: Yup.string().required("توضیحات الزامی است"),
});

const TicketForm: React.FC<TicketFormProps> = ({
  id,
  mode,
  ticket,
  onSubmitForm,
}) => {
  const dispatch: any = useDispatch();
  const createLoading = useSelector(selectCreateTicketLoading);
  const updateLoading = useSelector(selectUpdateTicketLoading);
  const ticketDetail = useSelector(selectGetTicketByIdData);
  const detailLoading = useSelector(selectGetTicketByIdLoading);
  
  const isEdit = mode === "update";
  const loading = isEdit ? updateLoading : createLoading;

  useEffect(() => {
    if (isEdit && id) {
      dispatch(GetTicketByIdAction({ credentials: id }));
    }
  }, [dispatch, isEdit, id]);

  const getInitialValues = () => {
    if (isEdit && (ticketDetail?.data || ticket)) {
      const data = ticketDetail?.data || ticket;
      return {
        title: data.title || "",
        subject: data.subject || "",
        priority: data.priority || "",
        description: data.description || "",
      };
    }
    return {
      title: "",
      subject: "",
      priority: "",
      description: "",
    };
  };

  const subjectOptions = [
    { value: "PRODUCT", label: "محصول" },
    { value: "ORDER", label: "سفارش" },
    { value: "SUPPORT", label: "پشتیبانی" },
  ];

  const priorityOptions = [
    { value: "LOW", label: "پایین" },
    { value: "MEDIUM", label: "متوسط" },
    { value: "HIGH", label: "بالا" },
  ];

  const handleSubmit = (values: any) => {
    const action = isEdit ? UpdateTicketAction : CreateTicketAction;
    const payload = isEdit 
      ? { id, credentials: values, onSubmitForm }
      : { credentials: values, onSubmitForm };

    dispatch(action(payload));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {isEdit ? "ویرایش تیکت" : "ایجاد تیکت جدید"}
        </h2>
      </div>

      {isEdit && detailLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputField
                  name="title"
                  label="عنوان تیکت"
                  placeholder="عنوان تیکت را وارد کنید"
                  required
                />
              </div>

              <div>
                <SelectField
                  name="subject"
                  label="موضوع"
                  placeholder="موضوع را انتخاب کنید"
                  options={subjectOptions}
                  required
                />
              </div>

              <div>
                <SelectField
                  name="priority"
                  label="اولویت"
                  placeholder="اولویت را انتخاب کنید"
                  options={priorityOptions}
                  required
                />
              </div>
            </div>

            <div>
              <TextAreaField
                name="description"
                label="توضیحات"
                placeholder="توضیحات تیکت را وارد کنید"
                rows={6}
                required
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button
                type="button"
                variant="error"
                onClick={onSubmitForm}
                disabled={loading}
              >
                انصراف
              </Button>
              <Button
                type="submit"
                variant="success"
                disabled={isSubmitting || loading}
              >
                {loading 
                  ? (isEdit ? "در حال ویرایش..." : "در حال ایجاد...") 
                  : (isEdit ? "ویرایش تیکت" : "ایجاد تیکت")
                }
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      )}
    </div>
  );
};

export default TicketForm;
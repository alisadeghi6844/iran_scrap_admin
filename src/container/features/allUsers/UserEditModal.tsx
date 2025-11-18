import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import InputField from "../../../components/molcols/formik-fields/InputField";
import SingleSelect from "../../../components/select/SingleSelect";
import {
  GetUserByIdAction,
  UpdateUserProfileAction,
} from "../../../redux/actions/users/UsersActions";
import {
  selectGetUserByIdData,
  selectGetUserByIdLoading,
  selectUpdateUserProfileLoading,
} from "../../../redux/slice/users/UsersSlice";
import Loading from "../../../components/loading";

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess?: () => void;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("نام الزامی است"),
  lastName: Yup.string().required("نام خانوادگی الزامی است"),
  username: Yup.string().required("نام کاربری الزامی است"),
  phone: Yup.string().required("شماره تلفن الزامی است"),
  nationalCode: Yup.string().required("کد ملی الزامی است"),
  usertype: Yup.string().required("نوع کاربر الزامی است"),
  userSort: Yup.string().required("نوع شخص الزامی است"),
  status: Yup.string().required("وضعیت کاربر الزامی است"),
});

const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  userId,
  onSuccess,
}) => {
  const dispatch: any = useDispatch();
  const userData = useSelector(selectGetUserByIdData);
  const userLoading = useSelector(selectGetUserByIdLoading);
  const updateLoading = useSelector(selectUpdateUserProfileLoading);

  useEffect(() => {
    if (isOpen && userId) {
      dispatch(GetUserByIdAction({ userId }));
    }
  }, [isOpen, userId, dispatch]);

  // Helper function to handle null/undefined strings
  const getValidValue = (value: any) => {
    if (!value || value === "null" || value === "undefined") {
      return "";
    }
    return value;
  };

  const initialValues = {
    firstName: getValidValue(userData?.data?.firstName),
    lastName: getValidValue(userData?.data?.lastName),
    username: getValidValue(userData?.data?.username),
    phone: getValidValue(userData?.data?.phone || userData?.data?.mobile),
    nationalCode: getValidValue(userData?.data?.nationalCode),
    usertype: userData?.data?.usertype || "Buyer",
    userSort: userData?.data?.userSort || "Hagh",
    status: userData?.data?.status || "CONFIRM",
    companyName: getValidValue(userData?.data?.companyName),
    companyNationalCode: getValidValue(userData?.data?.companyNationalCode),
    agentName: getValidValue(userData?.data?.agentName),
    agentPhone: getValidValue(userData?.data?.agentPhone),
  };

  const handleSubmit = async (values: unknown) => {
    const formData = new FormData();

    // Add all form fields to FormData
    Object.keys(values).forEach((key) => {
      const value = values[key];
      // Handle select field values that might be objects
      const finalValue =
        value && typeof value === "object" && value.value ? value.value : value;

      if (
        finalValue !== null &&
        finalValue !== undefined &&
        finalValue !== "" &&
        finalValue !== "null" &&
        finalValue !== "undefined"
      ) {
        formData.append(key, finalValue);
      }
    });

    try {
      await dispatch(UpdateUserProfileAction({ userId, formData }));
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const userTypeOptions = [
    { value: "Buyer", label: "خریدار" },
    { value: "Provider", label: "تامین کننده" },
    { value: "Both", label: "هردو" },
  ];

  const userSortOptions = [
    { value: "Hagh", label: "حقیقی" },
    { value: "Hogh", label: "حقوقی" },
  ];

  const statusOptions = [
    { value: "CONFIRM", label: "فعال" },
    { value: "REJECT", label: "غیر فعال" },
  ];

  return (
    <Modal open={isOpen} onClose={onClose} headerTitle="ویرایش کاربر" size="xl">
      {userLoading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-8 mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField name="firstName" label="نام" />
                <InputField name="lastName" label="نام خانوادگی" />
                <InputField name="username" label="نام کاربری" />
                <InputField name="phone" label="شماره تلفن" />
                <InputField name="nationalCode" label="کد ملی" />

                <div>
                  <SingleSelect
                    label="نوع کاربر"
                    value={userTypeOptions.find(
                      (option) => option.value === values.usertype
                    )}
                    onChange={(selectedOption: any) => {
                      setFieldValue("usertype", selectedOption?.value || "");
                    }}
                    options={userTypeOptions}
                    required
                  />
                </div>

                <div>
                  <SingleSelect
                    label="نوع شخص"
                    value={userSortOptions.find(
                      (option) => option.value === values.userSort
                    )}
                    onChange={(selectedOption: any) => {
                      setFieldValue("userSort", selectedOption?.value || "");
                    }}
                    options={userSortOptions}
                    required
                  />
                </div>

                <div>
                  <SingleSelect
                    label="وضعیت کاربر"
                    value={statusOptions.find(
                      (option) => option.value === values.status
                    )}
                    onChange={(selectedOption: any) => {
                      setFieldValue("status", selectedOption?.value || "");
                    }}
                    options={statusOptions}
                    required
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">اطلاعات شرکت</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField name="companyName" label="نام شرکت" />
                  <InputField name="companyNationalCode" label="کد ملی شرکت" />
                </div>
              </div>

              {/* Agent Information */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">اطلاعات نماینده</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField name="agentName" label="نام نماینده" />
                  <InputField name="agentPhone" label="تلفن نماینده" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline-gray"
                  onClick={onClose}
                  disabled={updateLoading}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || updateLoading}
                  loading={updateLoading}
                >
                  ذخیره تغییرات
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default UserEditModal;

import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "react-router-dom";
import {
  selectCreateCreateUserLoading,
  selectGetByIdCreateUserData,
  selectGetByIdCreateUserLoading,
  selectUpdateCreateUserLoading,
} from "../../../../redux/slice/account/CreateUserSlice";
import {
  createCreateUserAction,
  getByIdCreateUserAction,
  updateCreateUserAction,
} from "../../../../redux/actions/account/CreateUser";
import FormSkeleton from "../../../organism/skeleton/FormSkeleton";
import FORM from "../../../organism/FORM";
import InputField from "../../../../components/molcols/formik-fields/InputField";
import { PublicDictionary } from "../../../../utils/dictionary";
import FileFieldUploader from "../../../../components/molcols/formik-fields/FIleFieldUploader";
import GenderSelect from "../../GenderSelect";
import StatusSelect from "../../StatusSelect";
import { SelectValidation } from "../../../../utils/SelectValidation";

const CreateUserForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetByIdCreateUserData);
  const getLoading = useSelector(selectGetByIdCreateUserLoading);

  const createLoading: any = useSelector(selectCreateCreateUserLoading);
  const updateLoading: any = useSelector(selectUpdateCreateUserLoading);

  const initialData = {
    FirstName: "",
    LastName: "",
    PersonnelCode: "",
    NationalCode: "",
    Gender: null,
    Status: null,
    Password: "",
    RePassword: "",
    PhoneNumber: "",
    Image: [],
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);
  const [editImageFile, setEditImageFile] = useState([]);

  const loadData = useCallback(() => {
    if (id && mode === "update") {
      dispatch(getByIdCreateUserAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (getValue?.data && mode === "update") {
      setInitialValues({
        FirstName: getValue.data.firstName || "",
        LastName: getValue.data.lastName || "",
        PersonnelCode: getValue.data.personnelCode || "",
        PhoneNumber: getValue.data.phoneNumber || "",
        NationalCode: getValue.data.nationalCode || "",
        Gender: {
          value: getValue.data.gender,
          label: getValue.data.gender === 0 ? "مرد" : "زن",
        },
        Status: {
          value: getValue.data.isActive,
          label: getValue.data.isActive === true ? "فعال" : "غیر فعال",
        },
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
      FirstName: Yup.string().required("پر کردن نام الزامی است"),
      LastName: Yup.string().required("پر کردن نام خانوادگی است"),
      PersonnelCode: Yup.string().required("پر کردن کد پرسنلی است"),
      NationalCode: Yup.string().required("پر کردن کد ملی است"),
      Gender: SelectValidation(Yup),
      Status: SelectValidation(Yup),
      PhoneNumber: Yup.string()
      .test(
        "no-leading-zero",
        "شماره تلفن نباید با صفر شروع شود.",
        (value) => {
          // بررسی اینکه آیا شماره تلفن با صفر شروع می‌شود
          if (!value) return true; // اگر مقدار خالی است، اعتبارسنجی را عبور بده
          return !/^0/.test(value); // اگر با صفر شروع شده باشد، اعتبارسنجی شکست می‌خورد
        }
      )
      .matches(
        /^(?:\+98|0098)?9\d{9}$/,
        "شماره تلفن باید با +98 یا 9 شروع شود و معتبر باشد."
      )
      .required("وارد کردن شماره تلفن الزامی می‌باشد."),
      Password:
        mode === "create" &&
        Yup.string()
          .required("رمز عبور الزامی است")
          .min(6, "رمز عبور باید بیشتر از 5 کاراکتر باشد")
          .matches(/[a-z]/, "رمز عبور باید شامل حداقل یک حرف کوچک باشد")
          .matches(/[A-Z]/, "رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
          .matches(/[0-9]/, "رمز عبور باید شامل حداقل یک عدد باشد")
          .matches(
            /[^a-zA-Z0-9]/,
            "رمز عبور باید شامل حداقل یک علامت خاص باشد"
          ),
      RePassword:
        mode === "create" &&
        Yup.string()
          .required("تکرار رمز عبور الزامی است")
          .oneOf(
            [Yup.ref("Password"), null],
            "رمز عبور و تکرار رمز عبور باید یکسان باشند"
          ),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const items: any = {
        id: mode === "update" ? getValue?.data?._id : null,
        firstName: data?.FirstName,
        lastName: data?.LastName,
        nationalCode: data?.NationalCode,
        phoneNumber: data?.PhoneNumber,
        personnelCode: data?.PersonnelCode,
        gender: data?.Gender?.value,
        isActive: data?.Status?.value,
        password: data?.Password,
        image: data?.Image,
      };

      if (mode === "create") {
        dispatch(
          createCreateUserAction({
            credentials: items,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          updateCreateUserAction({
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
                    name="FirstName"
                    label={` ${PublicDictionary.first_name}`}
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <InputField
                    name="LastName"
                    label={` ${PublicDictionary.last_name}`}
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <InputField
                    name="PersonnelCode"
                    label={` ${PublicDictionary.personnelCode}`}
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <InputField
                    label={` ${PublicDictionary.phoneNumber}`}
                    name="PhoneNumber"
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <InputField
                    name="NationalCode"
                    label={` ${PublicDictionary.nationalCode}`}
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <GenderSelect name="Gender" required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <StatusSelect name="Status" required />
                </div>
              ),
            },
            {
              component: mode === "create" && (
                <div className="col-span-6">
                  <InputField
                    name="Password"
                    label={` ${PublicDictionary.password}`}
                    required
                  />
                </div>
              ),
            },
            {
              component: mode === "create" && (
                <div className="col-span-6">
                  <InputField
                    name="RePassword"
                    label={` ${PublicDictionary.re_password}`}
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

export default CreateUserForm;

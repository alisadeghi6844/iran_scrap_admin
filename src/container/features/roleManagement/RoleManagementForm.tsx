import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateRoleManagementLoading,
  selectGetRoleManagementByIdData,
  selectGetRoleManagementByIdLoading,
  selectUpdateRoleManagementLoading,
} from "../../../redux/slice/roleManagement/RolemanagementSlice";
import {
  CreateRoleManagementAction,
  GetRoleManagementByIdAction,
  UpdateRoleManagementAction,
} from "../../../redux/actions/roleManagement/RoleManagementActions";
import FormSkeleton from "../../organism/skeleton/FormSkeleton";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import { SelectValidation } from "../../../utils/SelectValidation";
import IsActiveSelect from "../isActive/IsActiveSelect";
import PermissionSelect from "./PermissionSelect";
const RoleManagementForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetRoleManagementByIdData);
  const getLoading = useSelector(selectGetRoleManagementByIdLoading);

  const createLoading: any = useSelector(selectCreateRoleManagementLoading);
  const updateLoading: any = useSelector(selectUpdateRoleManagementLoading);

  const initialData = {
    Title: "",
    Name: "",
    Permissions: [],
    IsActive: null,
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);

  const loadData = useCallback(() => {
    console.log("id",id,mode);
    if (id && mode === "update") {
      dispatch(GetRoleManagementByIdAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    console.log("getValue",getValue);
    if (getValue?.id && mode === "update") {
      setInitialValues({
        Title: getValue?.title || "",
        Name: getValue?.name || "",
        Permissions: getValue?.permissions || [],
        IsActive: getValue?.isActive || "",
      });
    } else {
      setInitialValues(initialData);
    }
  }, [getValue, mode]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام دسترسی الزامی است"),
      Title: Yup.string().required("پر کردن عنوان فارسی دسترسی الزامی است"), 
       Permissions: Yup.array().min(1, "انتخاب حداقل یک مجوز الزامی است").required("انتخاب مجوز الزامی است"),
      IsActive: SelectValidation(Yup),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const requestBody = {
        title: data?.Name,
        name: data?.Title,
        permissions: data?.Permissions?.map((item: any) => item.value),
        isAdmin: data?.IsActive?.value
      };

      if (mode === "create") {
        dispatch(
          CreateRoleManagementAction({
            credentials: requestBody,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          UpdateRoleManagementAction({
            id,
            credentials: requestBody,
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
                  <InputField name="Title" label={`عنوان فارسی دسترسی`} required />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <InputField name="Name" label={`نام دسترسی`} required />
                </div>
              ),
            },

            {
              component: (
                <div className="col-span-6">
                  <PermissionSelect
                    name="Permissions"
                    isMulti
                    required
                  />
                </div>
              ),
            },
            {
              component: (
                <div className="col-span-6">
                  <IsActiveSelect name="IsActive" label={`ادمین؟`} required/>
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

export default RoleManagementForm;

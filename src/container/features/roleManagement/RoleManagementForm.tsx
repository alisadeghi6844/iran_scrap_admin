import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateRoleManagementLoading,
  selectGetPermissionsData,
  selectGetRoleManagementByIdData,
  selectGetRoleManagementByIdLoading,
  selectUpdateRoleManagementLoading,
} from "../../../redux/slice/roleManagement/RoleManagementSlice";
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
import MenuSelect from "./MenuSelect";

// Helper function to get menu label by value
const getMenuLabel = (value: string): string => {
  const menuMap: { [key: string]: string } = {
    "/": "همه درخواست ها",
    "/product-request-status": "مدیریت وضعیت درخواست ها",
    "/pending-orders-financial": "سفارشات در انتظار تایید مالی",
    "/product-requests": "مدیریت درخواست‌های محصول",
    "/role-management": "مدیریت نقش",
    "/users-management": "مدیریت کاربران",
    "/buyer-management": "مدیریت خریداران",
    "/pages-management": "مدیریت متن صفحات",
    "/faq-management": "مدیریت سوالات متداول",
    "/blog-management": "مدیریت مقالات",
    "/blog-category-management": "مدیریت دسته بندی مقالات",
    "/category-management": "مدیریت دسته بندی",
    "/ticket-management": "مدیریت تیکت ها",
    "/survey-management": "مدیریت نظرسنجی ها",
    "/product-management": "مدیریت محصولات",
    "/product-price-management": "مدیریت قیمت گذاری محصولات",
    "/purchase-price-management": "مدیریت قیمت خرید",
    "/view-pricing-management": "مشاهده قیمت گذاری",
    "/shipment-management": "محاسبه کرایه ناوگان",
    "/pb-product-admin-management": "تعریف کالا",
    "/pb-brand-admin-management": "مدیریت برند",
    "/pb-provider-admin-management": "تعریف تامین کنندگان",
    "/pb-port-admin-management": "تعریف محل بارگیری",
  };
  return menuMap[value] || value;
};

const RoleManagementForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetRoleManagementByIdData);
  const getLoading = useSelector(selectGetRoleManagementByIdLoading);

  const createLoading: any = useSelector(selectCreateRoleManagementLoading);
  const updateLoading: any = useSelector(selectUpdateRoleManagementLoading);
  const persissionsData = useSelector(selectGetPermissionsData);
  const initialData = {
    Title: "",
    Name: "",
    Permissions: [],
    AccessMenus: [],
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
        Permissions: getValue?.permissions?.map((permission: any) => ({
          value: permission,
          label: persissionsData?.find((per: any) => per?.id === permission)?.title || ""
        })) || [],
        AccessMenus: getValue?.accessMenus?.map((menu: string) => ({
          value: menu,
          label: getMenuLabel(menu)
        })) || [],
        IsActive: getValue?.isAdmin ? { value: true, label: "بله" } : { value: false, label: "خیر" },
      });
    } else {
      setInitialValues(initialData);
    }
  }, [getValue, mode,persissionsData]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام دسترسی الزامی است"),
      Title: Yup.string().required("پر کردن عنوان فارسی دسترسی الزامی است"), 
       Permissions: Yup.array().min(1, "انتخاب حداقل یک مجوز الزامی است").required("انتخاب مجوز الزامی است"),
      AccessMenus: Yup.array().min(1, "انتخاب حداقل یک منو الزامی است").required("انتخاب منو الزامی است"),
      IsActive: SelectValidation(Yup),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const requestBody = {
        title: data?.Title,
        name: data?.Name,
        permissions: data?.Permissions?.map((item: any) => item.value),
        accessMenus: data?.AccessMenus?.map((item: any) => item.value),
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
                  <MenuSelect
                    name="AccessMenus"
                    label="منوهای قابل دسترسی"
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

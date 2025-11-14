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
    "all-requests": "همه درخواست ها (کلید)",
    "product-request-status": "مدیریت وضعیت درخواست ها",
    "/product-request-status": "مدیریت وضعیت درخواست ها (مسیر)",
    "pending-orders-financial": "سفارشات در انتظار تایید مالی",
    "/pending-orders-financial": "سفارشات در انتظار تایید مالی (مسیر)",
    "product-requests": "مدیریت درخواست‌های محصول",
    "/product-requests": "مدیریت درخواست‌های محصول (مسیر)",
    "role-management": "مدیریت نقش",
    "/role-management": "مدیریت نقش (مسیر)",
    "users-management": "مدیریت کاربران",
    "/users-management": "مدیریت کاربران (مسیر)",
    "buyer-management": "مدیریت خریداران",
    "/buyer-management": "مدیریت خریداران (مسیر)",
    "pages-management": "مدیریت متن صفحات",
    "/pages-management": "مدیریت متن صفحات (مسیر)",
    "faq-management": "مدیریت سوالات متداول",
    "/faq-management": "مدیریت سوالات متداول (مسیر)",
    "blog-management": "مدیریت مقالات",
    "/blog-management": "مدیریت مقالات (مسیر)",
    "blog-category-management": "مدیریت دسته بندی مقالات",
    "/blog-category-management": "مدیریت دسته بندی مقالات (مسیر)",
    "category-management": "مدیریت دسته بندی",
    "/category-management": "مدیریت دسته بندی (مسیر)",
    "ticket-management": "مدیریت تیکت ها",
    "/ticket-management": "مدیریت تیکت ها (مسیر)",
    "survey-management": "مدیریت نظرسنجی ها",
    "/survey-management": "مدیریت نظرسنجی ها (مسیر)",
    "product-management": "مدیریت محصولات",
    "/product-management": "مدیریت محصولات (مسیر)",
    "product-price-management": "مدیریت قیمت گذاری محصولات",
    "/product-price-management": "مدیریت قیمت گذاری محصولات (مسیر)",
    "purchase-price-management": "مدیریت قیمت خرید",
    "/purchase-price-management": "مدیریت قیمت خرید (مسیر)",
    "view-pricing-management": "مشاهده قیمت گذاری",
    "/view-pricing-management": "مشاهده قیمت گذاری (مسیر)",
    "shipment-management": "محاسبه کرایه ناوگان",
    "/shipment-management": "محاسبه کرایه ناوگان (مسیر)",
    "pb-product-admin-management": "تعریف کالا",
    "/pb-product-admin-management": "تعریف کالا (مسیر)",
    "pb-brand-admin-management": "مدیریت برند",
    "/pb-brand-admin-management": "مدیریت برند (مسیر)",
    "pb-provider-admin-management": "تعریف تامین کنندگان",
    "/pb-provider-admin-management": "تعریف تامین کنندگان (مسیر)",
    "pb-port-admin-management": "تعریف محل بارگیری",
    "/pb-port-admin-management": "تعریف محل بارگیری (مسیر)",
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

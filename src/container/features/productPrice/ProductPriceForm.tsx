import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateProductPriceLoading,
  selectUpdateProductPriceLoading,
} from "../../../redux/slice/productPrice/ProductPriceSlice";
import {
  CreateProductPriceAction,
  UpdateProductPriceAction,
} from "../../../redux/actions/productPrice/ProductPriceActions";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import { SelectValidation } from "../../../utils/SelectValidation";
import SelectField from "../../../components/molcols/formik-fields/SelectField";
import CheckboxField from "../../../components/molcols/formik-fields/CheckboxField";
import Typography from "../../../components/typography/Typography";
import { useFormikContext } from "formik";

// Import the select components we created
import PbProductAdminSelect from "../pbProductAdmin/PbProductAdminSelect";
import PbBrandAdminSelect from "../pbBrandAdmin/PbBrandAdminSelect";
import PbProviderAdminSelect from "../pbProviderAdmin/PbProviderAdminSelect";
import PbPortAdminSelect from "../pbPortAdmin/PbPortAdminSelect";

// Enhanced Status Display Component
const StatusDisplay = () => {
  const { values } = useFormikContext<any>();

  const calculateStatus = () => {
    const sellPrice = Number(values.SellPrice) || 0;
    const constant = Number(values.Constant) || 0;

    // فرمول: S = (قیمت ثابت) / (قیمت فروش)
    const S = sellPrice > 0 ? constant / sellPrice : 0;

    // تعیین وضعیت بر اساس فرمول جدید
    if (S >= 0.12)
      return {
        label: "سوپر الماسی",
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        borderColor: "border-purple-300",
        icon: "💎",
        value: S,
      };
    if (S >= 0.08)
      return {
        label: "الماسی",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-300",
        icon: "💍",
        value: S,
      };
    if (S >= 0.05)
      return {
        label: "طلایی",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-300",
        icon: "🥇",
        value: S,
      };
    if (S >= 0.03)
      return {
        label: "نقره‌ای",
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        borderColor: "border-gray-300",
        icon: "🥈",
        value: S,
      };
    return {
      label: "برنزی",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
      icon: "🥉",
      value: S,
    };
  };

  const status = calculateStatus();
  const sellPrice = Number(values.SellPrice) || 0;
  const constant = Number(values.Constant) || 0;

  return (
    <div
      className={`p-4 rounded-xl border-2 ${status.borderColor} ${status.bgColor} transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <Typography className="text-sm font-medium text-gray-700">
          وضعیت محصول
        </Typography>
        <span className="text-2xl">{status.icon}</span>
      </div>

      <div className="space-y-2">
        <Typography className={`text-xl font-bold ${status.color}`}>
          {status.label}
        </Typography>

        {(!sellPrice || !constant) && (
          <Typography className="text-sm text-gray-500 italic">
            برای محاسبه وضعیت، قیمت فروش و ثابت را وارد کنید
          </Typography>
        )}
      </div>
    </div>
  );
};

// Enhanced Sell Price Display Component
const SellPriceDisplay = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    const buyPrice = Number(values.BuyPrice) || 0;
    const constant = Number(values.Constant) || 0;

    // فرمول: قیمت خرید + قیمت ثابت = قیمت فروش
    if (buyPrice > 0 || constant > 0) {
      const calculatedSellPrice = buyPrice + constant;
      setFieldValue("SellPrice", calculatedSellPrice.toString());
    }
  }, [values.BuyPrice, values.Constant, setFieldValue]);

  const buyPrice = Number(values.BuyPrice) || 0;
  const constant = Number(values.Constant) || 0;
  const sellPrice = buyPrice + constant;

  return (
    <div className="p-4 rounded-xl border-2 border-green-300 bg-green-50 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <Typography className="text-sm font-medium text-gray-700">
          قیمت فروش محاسبه شده
        </Typography>
        <span className="text-2xl">💰</span>
      </div>

      <div className="space-y-2">
        <Typography className="text-2xl font-bold text-green-600">
          {sellPrice > 0 ? sellPrice.toLocaleString("fa-IR") : "0"} تومان
        </Typography>

        {!buyPrice && !constant && (
          <Typography className="text-sm text-gray-500 italic">
            برای محاسبه قیمت فروش، قیمت خرید و ثابت را وارد کنید
          </Typography>
        )}
      </div>
    </div>
  );
};

const ProductPriceForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch = useDispatch();

  const createLoading = useSelector(selectCreateProductPriceLoading);
  const updateLoading = useSelector(selectUpdateProductPriceLoading);

  const initialData = {
    Product: null as any,
    Brand: null as any,
    Provider: null as unknown,
    Port: null as unknown,
    PaymentType: "",
    BuyPrice: "",
    Constant: "",
    SellPrice: "",
    ShowInApp: false,
    ShowInPanel: false,
    CreatedDate: new Date().toLocaleDateString("fa-IR"),
  };

  const [initialValues, setInitialValues] = useState(initialData);

  // Payment type options (نوع فروش)
  const paymentTypeOptions = [
    { value: "CASH", label: "نقدی" },
    { value: "INSTALLMENT1", label: "1 ماهه" },
    { value: "INSTALLMENT2", label: "2 ماهه" },
    { value: "INSTALLMENT3", label: "3 ماهه" },
    { value: "INSTALLMENT4", label: "4 ماهه" },
    { value: "INSTALLMENT5", label: "5 ماهه" },
    { value: "INSTALLMENT6", label: "6 ماهه" },
  ];

  useEffect(() => {
    if ((value?._id || value?.id) && mode === "update") {
      console.log("Setting checkbox values:", {
        showInApp: value?.showInApp,
        showInPanel: value?.showInPanel,
        booleanShowInApp: Boolean(value?.showInApp),
        booleanShowInPanel: Boolean(value?.showInPanel),
      });
      setInitialValues({
        Product: value?.productId
          ? {
              label: value?.productId?.name,
              value: value?.productId?.id || value?.productId?._id,
            }
          : null,
        Brand: value?.brandId
          ? {
              label: value?.brandId?.name,
              value: value?.brandId?.id || value?.brandId?._id,
            }
          : null,
        Provider: value?.providerId
          ? {
              label: value?.providerId?.name,
              value: value?.providerId?.id || value?.providerId?._id,
            }
          : null,
        Port: value?.portId
          ? {
              label: value?.portId?.name,
              value: value?.portId?.id || value?.portId?._id,
            }
          : null,
        PaymentType: value?.paymentType || "",
        BuyPrice: value?.buyPrice?.toString() || "",
        Constant: value?.constant?.toString() || "",
        SellPrice: value?.sellPrice?.toString() || "",
        ShowInApp: Boolean(value?.showInApp),
        ShowInPanel: Boolean(value?.showInPanel),
        CreatedDate: value?.createdAt
          ? new Date(value.createdAt).toLocaleDateString("fa-IR")
          : new Date().toLocaleDateString("fa-IR"),
      });
    } else {
      setInitialValues(initialData);
    }
  }, [value, mode]);

  const validationSchema = () =>
    Yup.object({
      Product: SelectValidation(Yup),
      Brand: SelectValidation(Yup),
      Provider: SelectValidation(Yup),
      Port: SelectValidation(Yup),
      PaymentType: Yup.string().required("نوع فروش الزامی است"),
      BuyPrice: Yup.number().nullable().min(0, "قیمت خرید نمی‌تواند منفی باشد"),
      Constant: Yup.number().nullable().min(0, "قیمت ثابت نمی‌تواند منفی باشد"),
      SellPrice: Yup.number()
        .nullable()
        .min(0, "قیمت فروش نمی‌تواند منفی باشد"),
      ShowInApp: Yup.boolean(),
      ShowInPanel: Yup.boolean(),
    });

  const handleSubmit = (
    data: Record<string, unknown>,
    resetForm: () => void
  ) => {
    if (data) {
      const item = {
        productId: data?.Product?.value,
        brandId: data?.Brand?.value,
        providerId: data?.Provider?.value,
        portId: data?.Port?.value,
        paymentType: data?.PaymentType,
        buyPrice: data?.BuyPrice ? Number(data?.BuyPrice) : null,
        constant: data?.Constant ? Number(data?.Constant) : null,
        sellPrice: data?.SellPrice ? Number(data?.SellPrice) : null,
        showInApp: Boolean(data?.ShowInApp),
        showInPanel: Boolean(data?.ShowInPanel),
      };

      if (mode === "create") {
        dispatch(
          CreateProductPriceAction({
            credentials: item,
            onSubmitForm,
            resetForm,
          }) as unknown
        );
      } else if (mode === "update") {
        dispatch(
          UpdateProductPriceAction({
            id: value?._id || value?.id,
            credentials: item,
            onSubmitForm,
            resetForm,
          }) as unknown
        );
      } else {
        return null;
      }
    }
  };

  return (
    <>
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
                <PbProductAdminSelect
                  name="Product"
                  label="کالا"
                  mode={mode}
                  required
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <PbBrandAdminSelect
                  name="Brand"
                  label="برند"
                  mode={mode}
                  required
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <PbProviderAdminSelect
                  name="Provider"
                  label="تامین کننده"
                  mode={mode}
                  required
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <PbPortAdminSelect
                  name="Port"
                  label="محل بارگیری"
                  mode={mode}
                  required
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <SelectField
                  name="PaymentType"
                  label="نوع فروش"
                  options={paymentTypeOptions}
                  required
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <InputField name="BuyPrice" label="قیمت خرید" type="number" />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <InputField name="Constant" label="قیمت ثابت" type="number" />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <InputField
                  name="CreatedDate"
                  label="تاریخ درج"
                  disabled
                  value={new Date().toLocaleDateString("fa-IR")}
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <SellPriceDisplay />
              </div>
            ),
          },

          {
            component: (
              <div className="col-span-6">
                <StatusDisplay />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6" style={{ display: "none" }}>
                <InputField
                  name="SellPrice"
                  label="قیمت فروش (مخفی)"
                  type="number"
                  disabled
                />
              </div>
            ),
          },

          {
            component: (
              <div className="col-span-6">
                <CheckboxField name="ShowInApp" label="نمایش در اپلیکیشن" />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <CheckboxField name="ShowInPanel" label="نمایش در پنل کاربری" />
              </div>
            ),
          },
        ]}
        {...rest}
      />
    </>
  );
};

export default ProductPriceForm;

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
import StatusDisplay from "./components/ProductPriceForm/StatusDisplay";
import SellPriceDisplay from "./components/ProductPriceForm/SellPriceDisplay";

// Import the select components we created
import PbProductAdminSelect from "../pbProductAdmin/PbProductAdminSelect";
import PbBrandAdminSelect from "../pbBrandAdmin/PbBrandAdminSelect";
import PbProviderAdminSelect from "../pbProviderAdmin/PbProviderAdminSelect";
import PbPortAdminSelect from "../pbPortAdmin/PbPortAdminSelect";

const ProductPriceForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch = useDispatch();

  const createLoading = useSelector(selectCreateProductPriceLoading);
  const updateLoading = useSelector(selectUpdateProductPriceLoading);

  // Add state for categoryId
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Handler for product selection change
  const handleProductChange = (product: any) => {
    // Extract categoryId from selected product
    const categoryId = product?.categoryId?.id || product?.categoryId?._id || null;
    setSelectedCategoryId(categoryId);
  };

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
      
      // Extract categoryId from existing product data for edit mode
      const existingCategoryId = value?.productId?.categoryId?.id || value?.productId?.categoryId?._id || null;
      setSelectedCategoryId(existingCategoryId);
      
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
      setSelectedCategoryId(null);
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
                  onProductChange={handleProductChange}
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
                  categoryId={selectedCategoryId}
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

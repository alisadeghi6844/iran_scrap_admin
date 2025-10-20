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
import IsActiveSelect from "../isActive/IsActiveSelect";
import InventorySelect from "../inventorySelect/InventorySelect";
import { useFormikContext } from "formik";

const formatPrice = (value: string | number) => {
  if (!value) return "";
  // تبدیل به رشته و حذف همه کاراکترهای غیر عددی
  const numericValue = value.toString().replace(/[^\d]/g, "");
  // اضافه کردن کاما هر 3 رقم
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const unformatPrice = (value: string) => {
  if (!value) return "";
  // حذف همه کاراکترهای غیر عددی
  return value.replace(/[^\d]/g, "");
};

const PriceInput = ({ name, label, required }: any) => {
  const { setFieldValue, values }: any = useFormikContext();

  return (
    <InputField 
      name={name} 
      type="text" 
      label={label} 
      required={required}
      value={formatPrice(values[name])}
      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const cursorPosition = input.selectionStart || 0;
        const unformattedValue = unformatPrice(input.value);
        const formattedValue = formatPrice(unformattedValue);
        input.value = formattedValue;
        const newCursorPosition = cursorPosition + (formattedValue.length - unformattedValue.length);
        input.setSelectionRange(newCursorPosition, newCursorPosition);
      }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const unformattedValue = unformatPrice(e.target.value);
        setFieldValue(name, unformattedValue);
      }}
    />
  );
};

const ProductPriceForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch: any = useDispatch();

  const createLoading: any = useSelector(selectCreateProductPriceLoading);
  const updateLoading: any = useSelector(selectUpdateProductPriceLoading);

  const initialData = {
    Name: "",
    Inventory: null,
    // IsActive: null,
    Price: null,
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);

  useEffect(() => {
    console.log("value",value)
    if (value?._id
      && mode === "update") {
      setInitialValues({
        Name: value?.name || "",
        Inventory:{
          label: "کیلو گرم",
          value: "KILOGRAM",
        },
        // IsActive: {
        //   label: value?.isEnable ? "فعال" : "غیرفعال",
        //   value: value?.isEnable || "",
        // },
        Price: value?.lastPrice || "",
      });
    } else {
      setInitialValues(initialData);
    }
  }, [value, mode]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام محصول الزامی است"),
      Inventory: SelectValidation(Yup),
      // IsActive: SelectValidation(Yup),
      Price: Yup.number().required("پر کردن قیمت الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const requestBody = {
        name: data?.Name,
        inventoryType: data?.Inventory?.value,
         isEnable: true,
        price:Number(data?.Price),
      };

      if (mode === "create") {
        dispatch(
          CreateProductPriceAction({
            credentials: requestBody,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          UpdateProductPriceAction({
            id: value?._id,
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
                <InputField name="Name" label={`نام محصول`} required />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <InventorySelect
                  name="Inventory"
                  label={`وزن بر حسب`}
                  required
                  mode={mode}
                />
              </div>
            ),
          },
          // {
          //   component: (
          //     <div className="col-span-6">
          //       <IsActiveSelect
          //         name="IsActive"
          //         label={`وضعیت`}
          //         required
          //         mode={mode}
          //       />
          //     </div>
          //   ),
          // },
          {
            component: (
              <div className="col-span-6">
                <PriceInput name="Price" label="قیمت" required />
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

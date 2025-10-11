import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateShipmentAdminLoading,
} from "../../../redux/slice/shipment/shipmentSlice";
import {
  CreateShipmentAdminAction,
} from "../../../redux/actions/shipment/ShipmentActions";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";
import { SelectValidation } from "../../../utils/SelectValidation";
import SelectField from "../../../components/molcols/formik-fields/SelectField";
import VehicleSelect from "../vehicleSelect/VehicleSelect";
import { useFormikContext } from "formik";
import ProvinceSelect from "../provinceSelect/ProvinceSelect";
import CitySelect from "../provinceSelect/CitySelect";
import { province } from "../provinceSelect/Province";
import { city } from "../provinceSelect/city";

// Custom Province Select Component
const ProvinceSelectField = ({ name, label, required, onProvinceChange, initialProvinceId }: any) => {
  const { setFieldValue, values }: any = useFormikContext();
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Set initial province ID when form values change
    if (values[name]?.value && !hasInitialized) {
      const provinceId = parseInt(values[name].value);
      onProvinceChange(provinceId);
      setHasInitialized(true);
    }
  }, [values[name], onProvinceChange, hasInitialized]);

  return (
    <ProvinceSelect
      name={name}
      label={label}
      required={required}
      onProvinceChange={(provinceId: number | null) => {
        onProvinceChange(provinceId);
        // Reset city when province changes (but not on initial load)
        if (hasInitialized) {
          if (name === "OriginProvince") {
            setFieldValue("OriginCity", null);
          } else if (name === "DestProvince") {
            setFieldValue("DestCity", null);
          }
        }
      }}
    />
  );
};

// Custom City Select Component
const CitySelectField = ({ name, label, required, provinceId }: any) => {
  return (
    <CitySelect
      name={name}
      label={label}
      required={required}
      provinceId={provinceId}
    />
  );
};

const formatPrice = (value: string | number) => {
  if (!value) return "";
  const numericValue = value.toString().replace(/[^\d]/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const unformatPrice = (value: string) => {
  if (!value) return "";
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
      value={formatPrice((values as any)[name])}
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

const ShipmentForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, value, ...rest } = props;

  const dispatch: any = useDispatch();

  const createLoading: any = useSelector(selectCreateShipmentAdminLoading);

  const initialData = {
    OriginProvince: null,
    OriginCity: null,
    DestProvince: null,
    DestCity: null,
    Vehicle: null,
    Weight: "",
    Price: "",
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);
  const [originProvinceId, setOriginProvinceId] = useState<number | null>(null);
  const [destProvinceId, setDestProvinceId] = useState<number | null>(null);

  useEffect(() => {
    if (value?.id && mode === "update") {
      // Find province and city IDs based on names
      const originProvince = province.find(p => p.name === value?.originProvince);
      const destProvince = province.find(p => p.name === value?.destProvince);
      const originCity = city.find(c => c.name === value?.originCity);
      const destCity = city.find(c => c.name === value?.destCity);

      const newInitialValues = {
        OriginProvince: originProvince ? {
          label: originProvince.name,
          value: originProvince.id.toString(),
        } : null,
        OriginCity: originCity ? {
          label: originCity.name,
          value: originCity.id.toString(),
        } : null,
        DestProvince: destProvince ? {
          label: destProvince.name,
          value: destProvince.id.toString(),
        } : null,
        DestCity: destCity ? {
          label: destCity.name,
          value: destCity.id.toString(),
        } : null,
        Vehicle: value?.vehicle ? {
          label: value?.vehicle,
          value: value?.vehicle,
        } : null,
        Weight: value?.weight || "",
        Price: value?.price || "",
      };

      setInitialValues(newInitialValues);
      
      // Set province IDs after setting initial values
      setTimeout(() => {
        setOriginProvinceId(originProvince?.id || null);
        setDestProvinceId(destProvince?.id || null);
      }, 0);
    } else {
      setInitialValues(initialData);
      setOriginProvinceId(null);
      setDestProvinceId(null);
    }
  }, [value, mode]);

  const validationSchema = () =>
    Yup.object({
      OriginProvince: SelectValidation(Yup),
      OriginCity: SelectValidation(Yup),
      DestProvince: SelectValidation(Yup),
      DestCity: SelectValidation(Yup),
      Vehicle: SelectValidation(Yup),
      Weight: Yup.number().required("پر کردن وزن الزامی است").min(1, "وزن باید بیشتر از صفر باشد"),
      Price: Yup.number().required("پر کردن هزینه الزامی است").min(1, "هزینه باید بیشتر از صفر باشد"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const requestBody = {
        originProvince: data?.OriginProvince?.label, // Send the name, not ID
        originCity: data?.OriginCity?.label, // Send the name, not ID
        destProvince: data?.DestProvince?.label, // Send the name, not ID
        destCity: data?.DestCity?.label, // Send the name, not ID
        vehicle: data?.Vehicle?.value,
        weight: Number(data?.Weight),
        price: Number(data?.Price),
      };

      if (mode === "create") {
        dispatch(
          CreateShipmentAdminAction({
            data: requestBody,
            onSubmitForm: () => {
              if (onSubmitForm) onSubmitForm();
              if (resetForm) resetForm();
              setOriginProvinceId(null);
              setDestProvinceId(null);
            },
          })
        );
      }
      // Note: Update functionality would be added here when the API is available
    }
  };

  return (
    <>
      <FORM
        mode={mode}
        loading={[createLoading && createLoading]}
        initialValues={initialValues && initialValues}
        validationSchema={validationSchema}
        handleSubmit={handleSubmit}
        resetForm
        items={[
          {
            component: (
              <div className="col-span-6">
                <ProvinceSelectField
                  name="OriginProvince"
                  label="استان مبدا"
                  required
                  onProvinceChange={setOriginProvinceId}
                  initialProvinceId={originProvinceId}
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <CitySelectField
                  name="OriginCity"
                  label="شهر مبدا"
                  required
                  provinceId={originProvinceId}
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <ProvinceSelectField
                  name="DestProvince"
                  label="استان مقصد"
                  required
                  onProvinceChange={setDestProvinceId}
                  initialProvinceId={destProvinceId}
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <CitySelectField
                  name="DestCity"
                  label="شهر مقصد"
                  required
                  provinceId={destProvinceId}
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <VehicleSelect
                  name="Vehicle"
                  label="نوع ناوگان"
                  required
                  isForm={true}
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-6">
                <InputField 
                  name="Weight" 
                  type="number" 
                  label="وزن (کیلوگرم)" 
                  required 
                />
              </div>
            ),
          },
          {
            component: (
              <div className="col-span-12">
                <PriceInput name="Price" label="هزینه (تومان)" required />
              </div>
            ),
          },
        ]}
        {...rest}
      />
    </>
  );
};

export default ShipmentForm;
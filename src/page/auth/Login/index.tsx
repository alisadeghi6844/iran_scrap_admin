import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

import AuthLayout from "../../container/organism/layouts/AuthLayout";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../redux/actions/account/AccountActions";
import { Formik } from "formik";
import Button from "../../components/button";
import Input from "../../components/input";
import { selectLoginLoading } from "../../redux/slice/account/AccountSlice";

const Login = () => {
  const dispatch = useDispatch();

  const loginLoading = useSelector(selectLoginLoading);

  const [inputValues, setInputValues] = useState({
    PhoneNumber: "",
  });
  const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);

  useEffect(() => {
    if (inputWidth && !inputLookMultiplier) {
      setInputLookMultiplier(inputWidth / 360);
    }
  }, [inputWidth, inputLookMultiplier]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setInputValues((prev) => ({ ...prev, [name]: value }));
    },
    [inputLookMultiplier]
  );

  const initialValues: any = {
    PhoneNumber: "",
  };

  const validationSchema = () =>
    Yup.object({
      PhoneNumber: Yup.string()
        .required("لطفا شماره تلفن خود را وارد کنید")
        .matches(/^(09)\d{9}$/, "لطفا شماره تلفن معتبر وارد کنید"), // اعتبارسنجی شماره تلفن ایرانی
    });
  

  const handleSubmit = (data: any) => {
    if (data) {
      const items: any = {
        personnelCode: data?.PhoneNumber,
      };

      dispatch(LoginAction(items));
    } else {
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white w-full mt-12 p-8 pl-[200px]  rounded-[30px]">
        <div className="flex items-center gap-x-4 mt-32 mb-8">
          <div className="font-bold text-3xl text-primary-500">
            ورود به دیجی فارم
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            touched,
            setFieldTouched,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-12 gap-y-10">
                <div>
                  <Input
                    onInput={() => setFieldTouched("PhoneNumber")}
                    errorMessage={touched?.PhoneNumber && errors?.PhoneNumber}
                    label="شماره تلفن"
                    name="PhoneNumber"
                    type="text"
                    value={values?.PhoneNumber}
                    onChange={(e: any) => {
                      handleChange(e);
                      onInputChange(e);
                    }}
                    ref={(el) => el && setInputWidth(el.offsetWidth)}
                    onBlur={() =>
                      isCheckingInput && (isCheckingInput.value = false)
                    }
                  />
                </div>
         
              </div>
              <div className="mt-20">
                <Button
                  loading={loginLoading ?? false}
                  size="full"
                  className="text-xl"
                >
                  ورود
                </Button>
              </div>
            </form>
          )}
        </Formik>
 
      </div>
    </AuthLayout>
  );
};

export default Login;
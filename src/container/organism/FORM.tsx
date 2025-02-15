import React, { Fragment, useEffect, useState } from "react";

import { Form, Formik } from "formik";

import Button from "../../components/button";
import {FormTypes} from "../../types/organism/FormTypes";
import Spinner from "../../components/loading";

const FORM: React.FC<FormTypes> = (props) => {
  const {
    initialValues,
    className,
    handleSubmit,
    items,
    submitFullButton = false,
    spacingY = 10,
    shadow = false,
    loading = false,
    mode,
    style = "default",
    resetForm=false,
    validationSchema,
    filterButtonText,
    submitButtonSize,
    ...rest
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      if (mode === "create") {
        setIsLoading(loading[0]);
      } else if (mode === "update") {
        setIsLoading(loading[1]);
      } else {
        setIsLoading(false);
      }
    }
  }, [loading]);

  const handleReset = (resetForm:any) => {
    resetForm();
  };

  return (
    <div
      className={` w-full ${
        style === "default" ? "bg-background-paper" : "bg-transparent"
      } ${shadow ? "shadow-lg" : null} ${
        style === "default" ? "rounded-lg p-4 pb-8" : ""
      } ${className ?? ""}`}
    >
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
        {...rest}
      >
        {(formProps) => (
          <Form>
            <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-center w-full">
              {items.length
                ? items.map((item:any) => (
                    <Fragment
                      key={item?.component?.props?.children?.props?.name}
                    >
                      {item.component}
                    </Fragment>
                  ))
                : null}
              <div className="flex col-span-12 justify-end items-center mt-2 gap-x-4 w-full">
                {resetForm ? (
                  <div className="w-26">
                    <Button
                      variant="light"
                      type="button"
                      children="پاک کردن"
                      onClick={handleReset.bind(null, formProps.resetForm)}
                    />
                  </div>
                ) : null}
                <div className={`${submitFullButton ? "w-full" : "w-26"}`}>
                  <Button
                    size={`${submitFullButton ? "full" :submitButtonSize?submitButtonSize: "md"}`}
                    disable={isLoading}
                    endIcon={
                      isLoading ? <Spinner className="mr-2" size="xs" /> : null
                    }
                    type="submit"
                    onClick={handleSubmit}
                    children={filterButtonText ?? "ذخیره"}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FORM;

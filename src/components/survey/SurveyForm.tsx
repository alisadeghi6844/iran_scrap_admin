import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import Button from "../button";
import Typography from "../typography/Typography";
import SurveyInput from "./SurveyInput";
import SurveyTextArea from "./SurveyTextArea";
import SurveySelect from "./SurveySelect";
import SurveyCheckbox from "./SurveyCheckbox";
import { Question, Survey } from "../../redux/types/survey/SurveyTypes";
import { FiPlus, FiTrash2, FiMove } from "react-icons/fi";

interface SurveyFormProps {
  initialData?: Survey;
  onSubmit: (values: any) => void;
  loading?: boolean;
  onCancel: () => void;
}

const questionTypes = [
  { value: "SingleChoice", label: "انتخاب تکی" },
  { value: "MultiChoice", label: "انتخاب چندگانه" },
  { value: "OpenEnded", label: "پاسخ باز" },
];

const validationSchema = Yup.object({
  title: Yup.string().required("عنوان الزامی است"),
  description: Yup.string().required("توضیحات الزامی است"),
  questions: Yup.array().of(
    Yup.object({
      text: Yup.string().required("متن سوال الزامی است"),
      type: Yup.string().required("نوع سوال الزامی است"),
      choices: Yup.array().when("type", {
        is: (type: string) => ["SingleChoice", "MultiChoice"].includes(type),
        then: (schema) => schema.min(2, "حداقل دو گزینه لازم است"),
        otherwise: (schema) => schema,
      }),
    })
  ),
});

const SurveyForm: React.FC<SurveyFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  onCancel,
}) => {
  const initialValues = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    published: initialData?.published || false,
    questions: initialData?.questions || [
      {
        order: 0,
        text: "",
        type: "SingleChoice",
        required: true,
        choices: ["", ""],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <Typography variant="h2" className="text-lg font-semibold mb-4">
        {initialData ? "ویرایش نظرسنجی" : "ایجاد نظرسنجی جدید"}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Survey Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field name="title">
                {({ field }: any) => (
                  <SurveyInput
                    name={field.name}
                    value={field.value}
                    onChange={(value) => setFieldValue("title", value)}
                    onBlur={field.onBlur}
                    label="عنوان نظرسنجی"
                    required
                    error={errors.title && touched.title ? errors.title : ""}
                    placeholder="عنوان نظرسنجی را وارد کنید"
                    size="md"
                  />
                )}
              </Field>

              <div className="flex items-end pb-2">
                <Field name="published">
                  {({ field }: any) => (
                    <SurveyCheckbox
                      {...field}
                      label="منتشر شده"
                      checked={values.published}
                      onChange={(checked: boolean) => setFieldValue("published", checked)}
                      size="md"
                    />
                  )}
                </Field>
              </div>
            </div>

            <Field name="description">
              {({ field }: any) => (
                <SurveyTextArea
                  name={field.name}
                  value={field.value}
                  onChange={(value) => setFieldValue("description", value)}
                  onBlur={field.onBlur}
                  label="توضیحات"
                  required
                  rows={2}
                  error={errors.description && touched.description ? errors.description : ""}
                  placeholder="توضیحات نظرسنجی را وارد کنید"
                />
              )}
            </Field>

            {/* Questions Section */}
            <div className="border-t pt-4">
              <Typography variant="h3" className="text-md font-semibold mb-3">
                سوالات نظرسنجی
              </Typography>

              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div className="space-y-3">
                    {values.questions.map((question: any, index: number) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 bg-gray-50"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <Typography className="font-medium text-sm">
                            سوال {index + 1}
                          </Typography>
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant="error"
                            size="xs"
                            disabled={values.questions.length === 1}
                          >
                            <FiTrash2 />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <Field name={`questions.${index}.text`}>
                            {({ field }: any) => (
                              <SurveyInput
                                name={field.name}
                                value={field.value}
                                onChange={(value) => setFieldValue(`questions.${index}.text`, value)}
                                onBlur={field.onBlur}
                                label="متن سوال"
                                required
                                size="sm"
                                placeholder="متن سوال را وارد کنید"
                              />
                            )}
                          </Field>

                          <Field name={`questions.${index}.type`}>
                            {({ field }: any) => (
                              <SurveySelect
                                {...field}
                                label="نوع سوال"
                                required
                                options={questionTypes}
                                value={field.value}
                                onChange={(value: string) => {
                                  setFieldValue(`questions.${index}.type`, value);
                                  // Reset choices when type changes
                                  if (["SingleChoice", "MultiChoice"].includes(value)) {
                                    setFieldValue(`questions.${index}.choices`, ["", ""]);
                                  } else {
                                    setFieldValue(`questions.${index}.choices`, []);
                                  }
                                }}
                                size="sm"
                              />
                            )}
                          </Field>
                        </div>

                        <div className="mb-3">
                          <Field name={`questions.${index}.required`}>
                            {({ field }: any) => (
                              <SurveyCheckbox
                                {...field}
                                label="اجباری"
                                checked={question.required}
                                onChange={(checked: boolean) => 
                                  setFieldValue(`questions.${index}.required`, checked)
                                }
                                size="sm"
                              />
                            )}
                          </Field>
                        </div>

                        {/* Choices for SingleChoice and MultipleChoice */}
                        {["SingleChoice", "MultiChoice"].includes(question.type) && (
                          <div>
                            <Typography className="text-sm font-medium mb-2">
                              گزینه‌ها
                            </Typography>
                            <FieldArray name={`questions.${index}.choices`}>
                              {({ push: pushChoice, remove: removeChoice }) => (
                                <div className="space-y-2">
                                  {question.choices?.map((choice: string, choiceIndex: number) => (
                                    <div key={choiceIndex} className="flex gap-2">
                                      <Field name={`questions.${index}.choices.${choiceIndex}`}>
                                        {({ field }: any) => (
                                          <SurveyInput
                                            name={field.name}
                                            value={field.value}
                                            onChange={(value) => setFieldValue(`questions.${index}.choices.${choiceIndex}`, value)}
                                            onBlur={field.onBlur}
                                            size="sm"
                                            placeholder={`گزینه ${choiceIndex + 1}`}
                                          />
                                        )}
                                      </Field>
                                      <Button
                                        type="button"
                                        onClick={() => removeChoice(choiceIndex)}
                                        variant="error"
                                        size="xs"
                                        disabled={question.choices?.length <= 2}
                                      >
                                        <FiTrash2 />
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    onClick={() => pushChoice("")}
                                    variant="success"
                                    size="xs"
                                  >
                                    <FiPlus className="ml-1" />
                                    افزودن گزینه
                                  </Button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        )}
                      </div>
                    ))}

                    <Button
                      type="button"
                      onClick={() =>
                        push({
                          order: values.questions.length,
                          text: "",
                          type: "SingleChoice",
                          required: true,
                          choices: ["", ""],
                        })
                      }
                      variant="primary"
                      size="sm"
                    >
                      <FiPlus className="ml-1" />
                      افزودن سوال جدید
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                loading={loading}
                variant="success"
                size="md"
              >
                {initialData ? "ویرایش" : "ایجاد"} نظرسنجی
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                variant="outline-secondary"
                size="md"
              >
                انصراف
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SurveyForm;
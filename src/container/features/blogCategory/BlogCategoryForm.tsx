import React, { useCallback, useEffect, useState } from "react";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FormProps } from "../../../types/organism/Form";
import {
  selectCreateBlogCategoryLoading,
  selectGetBlogCategoryByIdData,
  selectGetBlogCategoryByIdLoading,
  selectUpdateBlogCategoryLoading,
} from "../../../redux/slice/blogCategory/BlogCategorySlice";
import {
  CreateBlogCategoryAction,
  GetBlogCategoryByIdAction,
  UpdateBlogCategoryAction,
} from "../../../redux/actions/blogCategory/BlogCategoryActions";
import FormSkeleton from "../../organism/skeleton/FormSkeleton";
import FORM from "../../organism/FORM";
import InputField from "../../../components/molcols/formik-fields/InputField";

const BlogCategoryForm: React.FC<FormProps> = (props) => {
  const { mode = "create", onSubmitForm, id, ...rest } = props;

  const dispatch: any = useDispatch();

  const getValue = useSelector(selectGetBlogCategoryByIdData);
  const getLoading = useSelector(selectGetBlogCategoryByIdLoading);

  const createLoading: any = useSelector(selectCreateBlogCategoryLoading);
  const updateLoading: any = useSelector(selectUpdateBlogCategoryLoading);

  const initialData = {
    Name: "",
  };

  const [initialValues, setInitialValues] = useState<any>(initialData);

  useEffect(() => {
    if (id && mode === "update") {
      dispatch(GetBlogCategoryByIdAction({ credentials: id }));
    }
  }, [id, mode]);

  useEffect(() => {
    if (getValue?.id && mode === "update") {
      setInitialValues({
        Name: getValue?.title || "",
      });
    } else {
      setInitialValues(initialData);
    }
  }, [getValue, mode]);

  const validationSchema = () =>
    Yup.object({
      Name: Yup.string().required("پر کردن نام دسته بندی مقاله الزامی است"),
    });

  const handleSubmit = (data: any, resetForm: any) => {
    if (data) {
      const item = {
        title: data?.Name,
      };

      if (mode === "create") {
        dispatch(
          CreateBlogCategoryAction({
            credentials: item,
            onSubmitForm,
            resetForm,
          })
        );
      } else if (mode === "update") {
        dispatch(
          UpdateBlogCategoryAction({
            id,
            credentials: item,
            onSubmitForm,
            resetForm,
          })
        );
      } else {
        return null;
      }
      addEventListener;
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
                  <InputField
                    name="Name"
                    label={`عنوان دسته بندی مقاله`}
                    required
                  />
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

export default BlogCategoryForm;

import * as Yup from "yup";

export const createProductEditInitialData = () => ({
  productName: "",
  description: "",
  Price: "",
  minOrder: "",
  minimumOrderQuantity: "",
  Time: "",
  priceExpire: "",
  categoryId: "",
  paymentType: "CASH",
  installmentPrice: [] as Array<{ duration: number; price: number }>,
  images: [] as string[],
  isSpecialOffer: false,
});

export const productEditValidationSchema = Yup.object({
  productName: Yup.string().required("نام محصول الزامی است"),
  description: Yup.string().required("توضیحات محصول الزامی است"),
  Price: Yup.number()
    .required("قیمت محصول الزامی است")
    .min(0, "قیمت نمی‌تواند منفی باشد"),
  minOrder: Yup.number()
    .required("موجودی الزامی است")
    .min(0, "موجودی نمی‌تواند منفی باشد"),
  minimumOrderQuantity: Yup.number()
    .required("حداقل سفارش الزامی است")
    .min(0, "حداقل سفارش نمی‌تواند منفی باشد"),
  Time: Yup.number()
    .required("زمان تحویل الزامی است")
    .min(0, "زمان تحویل نمی‌تواند منفی باشد"),
  priceExpire: Yup.string().required("تاریخ انقضای قیمت الزامی است"),
  categoryId: Yup.string().required("دسته بندی الزامی است"),
  paymentType: Yup.string().required("نوع پرداخت الزامی است"),
  installmentPrice: Yup.array().when("paymentType", {
    is: (val: string) =>
      val === "INSTALLMENTS" || val === "CASH_AND_INSTALLMENTS",
    then: (schema) =>
      schema.min(1, "حداقل یک قسط باید تعریف شود").of(
        Yup.object({
          duration: Yup.number().required().min(1),
          price: Yup.number().required().min(0),
        })
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
});



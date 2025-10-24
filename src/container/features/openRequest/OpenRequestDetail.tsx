import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetProductRequestStatusByIdData,
  selectGetProductRequestStatusByIdLoading,
  selectGetProductRequestStatusData,
  selectUpdateProductRequestStatusLoading,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import {
  GetRequestProductStatusAction,
  UpdateRequestProductAdminProviderAction,
} from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import FormSkeleton from "../../organism/skeleton/FormSkeleton";
import FORM from "../../organism/FORM";
import Checkbox from "../../../components/checkbox";
import { FormProps } from "../../../types/organism/Form";

const OpenRequestDetail: React.FC<FormProps> = (props) => {
  const { mode = "create", id, handleSubmit, ...rest } = props;

  const dispatch: any = useDispatch();
  const getValue = useSelector(selectGetProductRequestStatusByIdData);
  const getLoading = useSelector(selectGetProductRequestStatusByIdLoading);
  const productStatusData = useSelector(selectGetProductRequestStatusData);
  const updateLoading: any = useSelector(
    selectUpdateProductRequestStatusLoading
  );

  // استفاده از استیت به جای فرمیک
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    dispatch(GetRequestProductStatusAction({ page: 0, size: 20 }));
  }, [dispatch]);

  // اگر داده‌ای از سرور دریافت شد، استیت را به‌روز کنیم
  useEffect(() => {
    if (getValue?.data?.items && getValue?.data?.items[0]) {
      setSelectedItem(getValue.data.items[0]);
    }
  }, [getValue]);

  const submitForm = () => {
    dispatch(
      UpdateRequestProductAdminProviderAction({
        credentials: { status: selectedItem },
        id: id?.id,
        handleSubmit,
      })
    );
  };

  const handleCheckboxChange = (code: string) => {
    if (selectedItem === code) {
      setSelectedItem(""); // پاک کردن مقدار
    } else {
      setSelectedItem(code); // به‌روزرسانی مقدار
    }
  };

  // پیدا کردن آیتم فعلی بر اساس id.status
  const currentStatusItem = productStatusData?.data?.find(
    (item:any) => item.code === id?.status
  );

  // فیلتر کردن وضعیت‌های مجاز برای تغییر
  const allowedStatuses = productStatusData?.data?.filter(
    (item:any) => currentStatusItem?.allowedChangeCodes?.includes(item.code)
  );

  // مقادیر اولیه برای کامپوننت FORM
  const initialValues = {
    item: selectedItem
  };

  return (
    <>
      {getLoading ? (
        <FormSkeleton />
      ) : (
        <FORM
          mode={mode}
          loading={[updateLoading, updateLoading]}
          initialValues={initialValues}
          handleSubmit={submitForm}
          items={[
            {
              component: (
                <>
                  {allowedStatuses?.map((item:any) => (
                    <div className="col-span-12" key={item?.code}>
                      <Checkbox
                        id={item?.code}
                        label={item.title}
                        value={item?.code}
                        checked={selectedItem === item?.code}
                        onChange={() => handleCheckboxChange(item?.code)}
                      />
                    </div>
                  ))}
                </>
              ),
            },
          ]}
          {...rest}
        />
      )}
    </>
  );
};

export default OpenRequestDetail;

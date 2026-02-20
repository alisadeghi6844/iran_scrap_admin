import React from "react";
import Modal from "../../../components/modal";
import { convertToJalali } from "../../../utils/MomentConvertor";

interface ProductRequestAdminShowMoreProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const ProductRequestAdminShowMore: React.FC<ProductRequestAdminShowMoreProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="مشاهده جزئیات درخواست">
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">کد درخواست</p>
            <p className="text-lg font-semibold">{data?.code ?? "_"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">دسته بندی</p>
            <p className="text-lg font-semibold">{data?.category?.name ?? "_"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">مقدار (کیلوگرم)</p>
            <p className="text-lg font-semibold">{data?.amount ?? "_"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">تامین کننده</p>
            <p className="text-lg font-semibold">
              {data?.user?.firstName && data?.user?.lastName
                ? `${data.user.firstName} ${data.user.lastName}`
                : data?.user?.mobile ?? "_"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">تاریخ ثبت</p>
            <p className="text-lg font-semibold">
              {data?.createdAt ? convertToJalali(data.createdAt) : "_"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">آدرس</p>
            <p className="text-lg font-semibold">
              {data?.province && data?.city
                ? `${data.province}, ${data.city}`
                : "_"}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">توضیحات</p>
            <p className="text-lg font-semibold">{data?.description ?? "_"}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductRequestAdminShowMore;

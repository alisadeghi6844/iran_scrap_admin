import { useState } from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import { convertToJalali } from "../../../utils/MomentConvertor";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="جزئیات سفارش"
      size="lg"
    >
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات کلی</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شناسه سفارش
              </label>
              <p className="text-sm text-gray-900">{order.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                توضیحات
              </label>
              <p className="text-sm text-gray-900">{order.description || "_"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                دسته بندی
              </label>
              <p className="text-sm text-gray-900">{order.category?.name || "_"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                مقدار
              </label>
              <p className="text-sm text-gray-900">
                {order.amount ? `${order.amount} کیلوگرم` : "_"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع پرداخت
              </label>
              <p className="text-sm text-gray-900">{order.paymentType || "_"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وضعیت
              </label>
              <p className="text-sm text-gray-900">{order.statusTitle || "_"}</p>
            </div>
          </div>
        </div>

        {/* Provider Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات تامین کننده</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام تامین کننده
              </label>
              <p className="text-sm text-gray-900">
                {order.provider?.firstName && order.provider?.lastName
                  ? `${order.provider.firstName} ${order.provider.lastName}`
                  : "_"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                آدرس
              </label>
              <p className="text-sm text-gray-900">
                {order.province && order.city ? `${order.province}, ${order.city}` : "_"}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        {order.finalPrice && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات مالی</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  مبلغ نهایی
                </label>
                <p className="text-sm text-gray-900">
                  {order.finalPrice.toLocaleString()} تومان
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Driver Information */}
        {order.driver && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات راننده</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نام راننده
                </label>
                <p className="text-sm text-gray-900">{order.driver.driverName || "_"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  شماره تماس
                </label>
                <p className="text-sm text-gray-900">{order.driver.driverPhone || "_"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  پلاک خودرو
                </label>
                <p className="text-sm text-gray-900">{order.driver.licensePlate || "_"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نوع خودرو
                </label>
                <p className="text-sm text-gray-900">{order.driver.vehicleName || "_"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">تاریخ‌ها</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تاریخ ثبت سفارش
              </label>
              <p className="text-sm text-gray-900">
                {order.createdAt ? convertToJalali(order.createdAt) : "_"}
              </p>
            </div>
            {order.loadingDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاریخ بارگیری
                </label>
                <p className="text-sm text-gray-900">
                  {convertToJalali(order.loadingDate)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            بستن
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
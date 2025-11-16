import React from "react";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import Image from "../../../components/image";
import Button from "../../../components/button";

interface ProductDetailModalProps {
  product: any;
  open: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  open,
  onClose,
}) => {
  const getInventoryUnit = (inventoryType?: string) => {
    if (!inventoryType) return "";
    switch (inventoryType.toUpperCase()) {
      case "KILOGRAM":
      case "KG":
        return "کیلوگرم";
      case "GRAM":
        return "گرم";
      case "LITER":
        return "لیتر";
      case "PIECE":
        return "عدد";
      default:
        return "";
    }
  };

  const getStatusLabel = (status?: string) => {
    if (!status) return "_";
    switch (status) {
      case "PENDING":
        return "در حال بررسی";
      case "CONFIRM":
        return "تایید شده";
      case "REJECT":
        return "رد شده";
      default:
        return status;
    }
  };

  const getPaymentTypeLabel = (paymentType?: string) => {
    if (!paymentType) return "_";
    switch (paymentType) {
      case "CASH":
        return "نقدی";
      case "INSTALLMENTS":
        return "مدت دار";
      case "CASH_AND_INSTALLMENTS":
        return "نقدی و مدت دار";
      default:
        return paymentType;
    }
  };

  const getDeliveryTimeTypeLabel = (deliveryTimeType?: string) => {
    if (!deliveryTimeType) return "";
    switch (deliveryTimeType) {
      case "WORKING_DAY":
        return "روز کاری";
      case "CALENDAR_DAY":
        return "روز تقویمی";
      default:
        return deliveryTimeType;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "_";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      headerTitle="جزئیات محصول"
      className="max-w-4xl"
    >
      <div className="space-y-4 mt-4 max-h-[75vh] overflow-y-auto">
        {/* هدر محصول */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
          <div className="w-16 h-16 rounded-lg overflow-hidden border">
            <Image
              className="w-full h-full object-cover"
              src={
                product?.images?.[0]?.path || "/images/core/default-image.png"
              }
            />
          </div>
          <div className="flex-1">
            <Typography className="text-lg font-bold text-gray-800 mb-1">
              {product?.name || "_"}
            </Typography>
            <div className="flex items-center gap-3 text-sm">
              <span
                className={`px-2 py-1 rounded text-white text-xs font-medium ${
                  product?.status === "CONFIRM"
                    ? "bg-green-500"
                    : product?.status === "PENDING"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {getStatusLabel(product?.status)}
              </span>
              <span className="text-gray-600">
                {product?.category?.name || "_"}
              </span>
              <span className="text-gray-600">
                {product?.category?.catRoute || "_"}
              </span>
            </div>
          </div>
          <div className="text-left">
            <Typography className="text-xs text-gray-500 mb-1">قیمت</Typography>
            <Typography className="text-lg font-bold text-green-600">
              {product?.price ? `${product.price.toLocaleString()}` : "_"}
              <span className="text-xs text-gray-500 mr-1">تومان</span>
            </Typography>
          </div>
        </div>

        {/* تصاویر محصول */}
        {product?.images?.length > 1 && (
          <div className="p-3 bg-white rounded-lg border">
            <Typography className="font-medium text-sm mb-2 text-gray-700">
              تصاویر محصول
            </Typography>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: any, index: number) => (
                <div key={image.id || index} className="aspect-square">
                  <Image
                    className="w-full h-full rounded object-cover border"
                    src={image.path || "/images/core/default-image.png"}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* اطلاعات اصلی */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* اطلاعات محصول */}
          <div className="p-3 bg-white rounded-lg border">
            <Typography className="font-medium text-sm mb-3 text-gray-700">
              اطلاعات محصول
            </Typography>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">موجودی:</span>
                <span className="font-medium">
                  {product?.inventory
                    ? `${product.inventory.toLocaleString()} ${getInventoryUnit(
                        product?.inventoryType
                      )}`
                    : "_"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">نوع پرداخت:</span>
                <span className="font-medium">
                  {getPaymentTypeLabel(product?.paymentType)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">حداقل سفارش:</span>
                <span className="font-medium">
                  {product?.minimumOrderQuantity
                    ? `${product.minimumOrderQuantity.toLocaleString()} ${getInventoryUnit(
                        product?.inventoryType
                      )}`
                    : "_"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">زمان تحویل:</span>
                <span className="font-medium">
                  {product?.deliveryTime
                    ? `${product.deliveryTime} ${getDeliveryTimeTypeLabel(
                        product?.deliveryTimeType
                      )}`
                    : "_"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">انقضای قیمت:</span>
                <span className="font-medium">
                  {formatDate(product?.priceExpire)}
                </span>
              </div>
            </div>
          </div>

          {/* اطلاعات تامین‌کننده */}
          <div className="p-3 bg-white rounded-lg border">
            <Typography className="font-medium text-sm mb-3 text-gray-700">
              اطلاعات تامین‌کننده
            </Typography>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">نام نماینده:</span>
                <span className="font-medium">
                  {product?.provider?.agentName || "_"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تماس نماینده:</span>
                <span className="font-medium direction-ltr">
                  {product?.provider?.agentPhone || "_"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">موبایل:</span>
                <span className="font-medium direction-ltr">
                  {product?.provider?.mobile || "_"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">نام شرکت:</span>
                <span className="font-medium">
                  {product?.provider?.companyName || "_"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600"> نوع:</span>
                <span className="font-medium">
                  {product?.provider?.userSort === "HAGH" ? "حقیقی" : "حقوقی"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* آدرس */}
        <div className="p-3 bg-white rounded-lg border">
          <Typography className="font-medium text-sm mb-3 text-gray-700">
            آدرس
          </Typography>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">استان:</span>
              <span className="font-medium">
                {product?.address?.province || "_"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">شهر:</span>
              <span className="font-medium">
                {product?.address?.city || "_"}
              </span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-gray-600">عنوان:</span>
              <span className="font-medium">
                {product?.address?.title || "_"}
              </span>
            </div>
            {product?.address?.detail && (
              <div className="flex justify-between col-span-2">
                <span className="text-gray-600">جزئیات:</span>
                <span className="font-medium">{product.address.detail}</span>
              </div>
            )}
          </div>
        </div>

        {/* توضیحات */}
        {product?.description && (
          <div className="p-3 bg-white rounded-lg border">
            <Typography className="font-medium text-sm mb-2 text-gray-700">
              توضیحات
            </Typography>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <Typography className="text-gray-700 leading-relaxed">
                {product.description}
              </Typography>
            </div>
          </div>
        )}

        {/* مدت دار */}
        {product?.installmentPrice?.length > 0 && (
          <div className="p-3 bg-white rounded-lg border">
            <Typography className="font-medium text-sm mb-3 text-gray-700">
              طرح‌های مدت دار
            </Typography>
            <div className="grid grid-cols-3 gap-2">
              {product.installmentPrice.map(
                (installment: any, index: number) => (
                  <div
                    key={index}
                    className="bg-blue-50 p-3 rounded border border-blue-200 text-center"
                  >
                    <div className="text-lg font-bold text-blue-600">
                      {installment.duration}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">ماه</div>
                    <div className="text-sm font-medium text-gray-800">
                      {installment.price.toLocaleString()}
                      <span className="text-xs text-gray-500 mr-1">تومان</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* تاریخ‌های ایجاد و بروزرسانی */}
        <div className="p-3 bg-gray-50 rounded-lg border">
          <Typography className="font-medium text-sm mb-2 text-gray-700">
            اطلاعات سیستم
          </Typography>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">تاریخ ایجاد:</span>
              <span className="font-medium">
                {product?.createdAt
                  ? formatDate(new Date(product.createdAt).toISOString())
                  : "_"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">آخرین بروزرسانی:</span>
              <span className="font-medium">
                {product?.updatedAt
                  ? formatDate(new Date(product.updatedAt).toISOString())
                  : "_"}
              </span>
            </div>
          </div>
        </div>

        {/* دکمه بستن */}
        <div className="flex justify-end pt-3 border-t">
          <Button variant="outline-primary" onClick={onClose} size="sm">
            بستن
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;

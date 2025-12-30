import React from "react";
import Typography from "../../../../../components/typography/Typography";

interface ProductInfoSectionProps {
  order: any;
  getInventoryUnit: (inventoryType: string) => string;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  order,
  getInventoryUnit,
}) => {
  return (
    <div>
      <Typography className="text-lg font-bold mb-3">اطلاعات محصول</Typography>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-sm text-gray-600">نام محصول</Typography>
            <Typography className="font-bold">{order.product?.name || "_"}</Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">مقدار</Typography>
            <Typography className="font-bold">
              {order.quantity} {getInventoryUnit(order.product?.inventoryType)}
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">قیمت واحد</Typography>
            <Typography className="font-bold">
              {order.price?.toLocaleString()} تومان
            </Typography>
          </div>
          <div>
            <Typography className="text-sm text-gray-600">قیمت نهایی</Typography>
            <Typography className="font-bold">
              {order.finalPrice?.toLocaleString()} تومان
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;



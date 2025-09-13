import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button";
import { UpdateProductStatusAction } from "../../../redux/actions/product/ProductActions";
import { selectUpdateProductStatusLoading } from "../../../redux/slice/product/ProductSlice";

interface ProductStatusModalProps {
  product: any;
  onSubmit?: () => void;
}

const ProductStatusModal: React.FC<ProductStatusModalProps> = ({
  product,
  onSubmit,
}) => {
  const dispatch: any = useDispatch();
  const loading = useSelector(selectUpdateProductStatusLoading);

  const handleStatusChange = () => {
    const newStatus = product?.status?.toUpperCase() === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    
    dispatch(
      UpdateProductStatusAction({
        id: product._id,
        credentials: { status: newStatus },
        onSubmitForm: onSubmit,
      })
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">تغییر وضعیت محصول</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-2">
          آیا مطمئن هستید که می‌خواهید وضعیت محصول "{product?.name}" را تغییر دهید؟
        </p>
        <p className="text-sm text-gray-500">
          وضعیت فعلی: <span className="font-medium">{product?.status?.toUpperCase() === "ACTIVE" ? "فعال" : "غیرفعال"}</span>
        </p>
        <p className="text-sm text-gray-500">
          وضعیت جدید: <span className="font-medium">{product?.status?.toUpperCase() === "ACTIVE" ? "غیرفعال" : "فعال"}</span>
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline-secondary"
          onClick={onSubmit}
        >
          انصراف
        </Button>
        <Button
          type="button"
          variant={product?.status?.toUpperCase() === "ACTIVE" ? "warning" : "success"}
          loading={loading}
          onClick={handleStatusChange}
        >
          {product?.status?.toUpperCase() === "ACTIVE" ? "غیرفعال کردن" : "فعال کردن"}
        </Button>
      </div>
    </div>
  );
};

export default ProductStatusModal;
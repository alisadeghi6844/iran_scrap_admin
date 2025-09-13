import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button";
import { DeleteProductAction } from "../../../redux/actions/product/ProductActions";
import { selectDeleteProductLoading } from "../../../redux/slice/product/ProductSlice";

interface ProductDeleteConfirmationProps {
  product: any;
  onSubmit?: () => void;
}

const ProductDeleteConfirmation: React.FC<ProductDeleteConfirmationProps> = ({
  product,
  onSubmit,
}) => {
  const dispatch: any = useDispatch();
  const loading = useSelector(selectDeleteProductLoading);

  const handleDelete = () => {
    dispatch(
      DeleteProductAction({
        id: product._id,
        onSubmitForm: onSubmit,
      })
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-red-600">حذف محصول</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 mb-2">
          آیا مطمئن هستید که می‌خواهید محصول "{product?.name}" را حذف کنید؟
        </p>
        <p className="text-sm text-red-500">
          توجه: این عمل قابل بازگشت نیست و تمام اطلاعات مربوط به این محصول حذف خواهد شد.
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
          variant="danger"
          loading={loading}
          onClick={handleDelete}
        >
          حذف محصول
        </Button>
      </div>
    </div>
  );
};

export default ProductDeleteConfirmation;
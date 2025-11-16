import { useState } from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import TextArea from "../../../components/textarea";
import { convertToJalali } from "../../../utils/MomentConvertor";

interface FinancialApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onSuccess: () => void;
}

const FinancialApprovalModal: React.FC<FinancialApprovalModalProps> = ({
  isOpen,
  onClose,
  order,
  onSuccess,
}) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);

  const handleApprove = async () => {
    setAction("approve");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Approved order:", order.id, "Comment:", comment);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error approving order:", error);
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      alert("لطفا دلیل رد را وارد کنید");
      return;
    }

    setAction("reject");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Rejected order:", order.id, "Reason:", comment);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error rejecting order:", error);
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تائید مالی سفارش"
      size="lg"
    >
      <div className="space-y-6">
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">خلاصه سفارش</h3>
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
                تامین کننده
              </label>
              <p className="text-sm text-gray-900">
                {order.provider?.firstName && order.provider?.lastName
                  ? `${order.provider.firstName} ${order.provider.lastName}`
                  : "_"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع پرداخت
              </label>
              <p className="text-sm text-gray-900">{order.paymentType || "_"}</p>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold mb-3 text-yellow-800">اطلاعات مالی</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-yellow-700 mb-1">
                مبلغ نهایی
              </label>
              <p className="text-lg font-bold text-yellow-900">
                {order.finalPrice ? `${order.finalPrice.toLocaleString()} تومان` : "_"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-700 mb-1">
                تاریخ ثبت سفارش
              </label>
              <p className="text-sm text-yellow-900">
                {order.createdAt ? convertToJalali(order.createdAt) : "_"}
              </p>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div>
          <TextArea
            label="نظر (اختیاری برای تایید، الزامی برای رد)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="نظر خود را در مورد این سفارش وارد کنید..."
            rows={4}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            انصراف
          </Button>
          <Button
            type="button"
            variant="error"
            onClick={handleReject}
            loading={loading && action === "reject"}
            disabled={loading}
          >
            رد سفارش
          </Button>
          <Button
            type="button"
            variant="success"
            onClick={handleApprove}
            loading={loading && action === "approve"}
            disabled={loading}
          >
            تایید مالی
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FinancialApprovalModal;
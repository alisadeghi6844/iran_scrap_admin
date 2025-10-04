import React from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";

interface OrderItem {
  id: string;
  // Add other properties as needed
}

interface OrderApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderItem | null;
  onApprove: (orderId: string) => void;
  loading?: boolean;
}

const OrderApprovalModal: React.FC<OrderApprovalModalProps> = ({
  isOpen,
  onClose,
  order,
  onApprove,
  loading = false,
}) => {
  const handleApprove = () => {
    if (order) {
      onApprove(order.id);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!order) return null;

  return (
    <Modal open={isOpen} onClose={handleClose} size="md" headerTitle="تایید سفارش">
      <div className="space-y-4">
        {/* Content */}
        <div>
          <p className="text-gray-700">
            آیا از تایید این سفارش اطمینان دارید؟ 
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline-secondary"
            onClick={handleClose}
            disabled={loading}
          >
            لغو
          </Button>
          <Button
            type="button"
            variant="success"
            onClick={handleApprove}
            loading={loading}
          >
            {loading ? "در حال تایید..." : "تایید سفارش"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderApprovalModal;
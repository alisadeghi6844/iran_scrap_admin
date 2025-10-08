import React from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";

interface RequestOrderItem {
  id: string;
  // Add other properties as needed
}

interface RequestOrderPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestOrder: RequestOrderItem | null;
  onPayment: (requestOrderId: string) => void;
  loading?: boolean;
}

const RequestOrderPaymentModal: React.FC<RequestOrderPaymentModalProps> = ({
  isOpen,
  onClose,
  requestOrder,
  onPayment,
  loading = false,
}) => {
  const handlePayment = () => {
    if (requestOrder) {
      onPayment(requestOrder.id);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!requestOrder) return null;

  return (
    <Modal open={isOpen} onClose={handleClose} size="md" headerTitle="پرداخت هزینه درخواست">
      <div className="space-y-4">
        {/* Content */}
        <div>
          <p className="text-gray-700">
            آیا از پرداخت هزینه این درخواست اطمینان دارید؟ 
          </p>
          <p className="text-sm text-gray-500 mt-2">
            پس از تایید، به صفحه پرداخت هدایت خواهید شد.
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
            onClick={handlePayment}
            loading={loading}
          >
            {loading ? "در حال پردازش..." : "پرداخت هزینه"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RequestOrderPaymentModal;
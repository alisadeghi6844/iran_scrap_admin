import React, { useState } from "react";
import Modal from "../../../components/modal";
import Typography from "../../../components/typography/Typography";
import Button from "../../../components/button";
import TextArea from "../../../components/textArea";

interface OrderItem {
  id: string;
  // Add other properties as needed
}

interface OrderRejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderItem | null;
  onReject: (orderId: string, reason: string) => void;
  loading?: boolean;
}

const OrderRejectionModal: React.FC<OrderRejectionModalProps> = ({
  isOpen,
  onClose,
  order,
  onReject,
  loading = false,
}) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError("لطفاً دلیل رد را وارد کنید");
      return;
    }

    if (reason.trim().length < 10) {
      setError("دلیل رد باید حداقل ۱۰ کاراکتر باشد");
      return;
    }

    if (order) {
      onReject(order.id, reason.trim());
    }
  };

  const handleClose = () => {
    setReason("");
    setError("");
    onClose();
  };

  const handleReasonChange = (value: string) => {
    setReason(value);
    if (error) {
      setError("");
    }
  };

  if (!order) return null;

  return (
    <Modal open={isOpen} onClose={handleClose} size="md" headerTitle="رد سفارش">
      <div className="space-y-4">
        {/* Reason Input */}
        <div>
          <Typography className="text-sm font-medium mb-2">
            دلیل رد سفارش <span className="text-red-500">*</span>
          </Typography>
          <TextArea
            value={reason}
            onChange={(e) => handleReasonChange(e)}
            placeholder="لطفاً دلیل رد سفارش را به طور کامل توضیح دهید..."
            rows={4}
            className={`w-full ${error ? "border-red-500" : ""}`}
          />
          {error && (
            <Typography className="text-red-500 text-sm mt-1">
              {error}
            </Typography>
          )}
        </div>

        {/* Character Count */}
        <div className="text-left">
          <Typography className="text-xs text-gray-500">
            {reason.length} کاراکتر (حداقل ۱۰ کاراکتر)
          </Typography>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            disabled={loading}
          >
            لغو
          </Button>
          <Button
            variant="error"
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            رد سفارش
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderRejectionModal;

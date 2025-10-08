import React from "react";
import Modal from "./index";
import Button from "../button";
import Typography from "../typography/Typography";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  type?: "danger" | "warning" | "info";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "تأیید",
  cancelText = "انصراف",
  loading = false,
  type = "warning",
}) => {
  const getIconColor = () => {
    switch (type) {
      case "danger":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-yellow-500";
    }
  };

  const getConfirmButtonVariant = () => {
    switch (type) {
      case "danger":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "primary";
      default:
        return "warning";
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="md"
      hideIcon={true}
    >
      <div className="text-center p-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
          <FiAlertTriangle className={`h-6 w-6 ${getIconColor()}`} />
        </div>
        
        <Typography variant="h3" className="text-lg font-medium text-gray-900 mb-2">
          {title}
        </Typography>
        
        <Typography className="text-sm text-gray-500 mb-6">
          {message}
        </Typography>
        
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onConfirm}
            loading={loading}
            variant={getConfirmButtonVariant()}
            size="md"
          >
            {confirmText}
          </Button>
          <Button
            onClick={onClose}
            variant="outline-secondary"
            size="md"
            disabled={loading}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
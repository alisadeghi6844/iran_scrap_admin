import React, { useEffect, useState } from "react";
import Modal from "../../modal";
import Button from "../../button";
import InputField from "../../input"; // Check if this exists, otherwise use standard input
import Typography from "../../typography/Typography";

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (href: string) => void;
  initialHref?: string;
  onRemove?: () => void;
}

const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialHref = "",
  onRemove,
}) => {
  const [href, setHref] = useState(initialHref);

  useEffect(() => {
    setHref(initialHref);
  }, [initialHref, isOpen]);

  const handleSubmit = () => {
    onSubmit(href);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      headerTitle={initialHref ? "ویرایش لینک" : "افزودن لینک"}
      size="md"
    >
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            آدرس لینک (URL)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main"
            placeholder="https://example.com"
            value={href}
            onChange={(e) => setHref(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
           {initialHref && onRemove && (
            <Button
              type="button"
              onClick={() => {
                onRemove();
                onClose();
              }}
              variant="error"
              size="md"
            >
              حذف لینک
            </Button>
          )}
          <Button type="button" onClick={onClose} variant="outline-secondary" size="md">
            انصراف
          </Button>
          <Button type="button" onClick={handleSubmit} variant="primary" size="md">
            ذخیره
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LinkModal;

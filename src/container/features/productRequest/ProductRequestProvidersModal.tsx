import React, { useState, useEffect } from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import Input from "../../../components/input";

interface ProductRequestItem {
  id: string;
  providerIds: string[];
  description: string;
  categoryId: string;
  province: string;
  city: string;
  requestType: string;
  amount: number;
  amountType: string;
  paymentType: string;
  expectedDate: number;
  status: any;
  createdAt: number;
  updatedAt: number;
}

interface ProductRequestProvidersModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
  onUpdateProviders: (requestId: string, providerIds: string[]) => void;
  loading: boolean;
}

const ProductRequestProvidersModal: React.FC<ProductRequestProvidersModalProps> = ({
  isOpen,
  onClose,
  request,
  onUpdateProviders,
  loading,
}) => {
  const [providerIds, setProviderIds] = useState<string[]>([]);
  const [newProviderId, setNewProviderId] = useState("");

  useEffect(() => {
    if (request) {
      setProviderIds(request.providerIds || []);
    }
  }, [request]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (request) {
      onUpdateProviders(request.id, providerIds);
    }
  };

  const handleAddProvider = () => {
    if (newProviderId.trim() && !providerIds.includes(newProviderId.trim())) {
      setProviderIds(prev => [...prev, newProviderId.trim()]);
      setNewProviderId("");
    }
  };

  const handleRemoveProvider = (providerId: string) => {
    setProviderIds(prev => prev.filter(id => id !== providerId));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="مدیریت تامین‌کنندگان"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تامین‌کنندگان فعلی
          </label>
          {providerIds.length > 0 ? (
            <div className="space-y-2">
              {providerIds.map((providerId, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm">{providerId}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="error"
                    onClick={() => handleRemoveProvider(providerId)}
                  >
                    حذف
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">هیچ تامین‌کننده‌ای تعیین نشده</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            افزودن تامین‌کننده جدید
          </label>
          <div className="flex gap-2">
            <Input
              value={newProviderId}
              onChange={(e) => setNewProviderId(e.target.value)}
              placeholder="شناسه تامین‌کننده"
              className="flex-1"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddProvider}
              disabled={!newProviderId.trim()}
            >
              افزودن
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            انصراف
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            ذخیره تغییرات
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductRequestProvidersModal;
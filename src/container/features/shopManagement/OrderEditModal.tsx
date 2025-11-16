import { useState, useEffect } from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import Input from "../../../components/input";
import TextArea from "../../../components/textarea";
import SingleSelect from "../../../components/select/SingleSelect";

interface OrderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onSuccess: () => void;
}

const OrderEditModal: React.FC<OrderEditModalProps> = ({
  isOpen,
  onClose,
  order,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    paymentType: null,
    category: null,
    province: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (order) {
      setFormData({
        description: order.description || "",
        amount: order.amount?.toString() || "",
        paymentType: order.paymentType ? { value: order.paymentType, label: order.paymentType } : null,
        category: order.category ? { value: order.category.id, label: order.category.name } : null,
        province: order.province || "",
        city: order.city || "",
      });
    }
  }, [order]);

  const paymentTypeOptions = [
    { value: "CASH", label: "نقدی" },
    { value: "INSTALLMENT", label: "اقساطی" },
    { value: "CHEQUE", label: "چکی" },
  ];

  const categoryOptions = [
    { value: "1", label: "غلات" },
    { value: "2", label: "حبوبات" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Updated order data:", formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ویرایش سفارش"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">اطلاعات کلی</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شناسه سفارش
              </label>
              <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded">
                {order.id}
              </p>
            </div>
            <div>
              <SingleSelect
                label="دسته بندی"
                options={categoryOptions}
                value={formData.category}
                onChange={(value) => handleInputChange("category", value)}
                placeholder="انتخاب دسته‌بندی..."
                required
              />
            </div>
            <div className="col-span-2">
              <TextArea
                label="توضیحات"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="توضیحات سفارش..."
                rows={3}
              />
            </div>
            <div>
              <Input
                label="مقدار (کیلوگرم)"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="مقدار..."
                required
              />
            </div>
            <div>
              <SingleSelect
                label="نوع پرداخت"
                options={paymentTypeOptions}
                value={formData.paymentType}
                onChange={(value) => handleInputChange("paymentType", value)}
                placeholder="انتخاب نوع پرداخت..."
                required
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">آدرس</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="استان"
                value={formData.province}
                onChange={(e) => handleInputChange("province", e.target.value)}
                placeholder="نام استان..."
                required
              />
            </div>
            <div>
              <Input
                label="شهر"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="نام شهر..."
                required
              />
            </div>
          </div>
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

export default OrderEditModal;
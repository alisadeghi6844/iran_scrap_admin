import React, { useState, useEffect } from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import Input from "../../../components/input";
import SingleSelect from "../../../components/select/SingleSelect";
import TextArea from "../../../components/textArea";

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

interface ProductRequestEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ProductRequestItem | null;
  onEdit: (requestId: string, requestData: any) => void;
  loading: boolean;
}

const ProductRequestEditModal: React.FC<ProductRequestEditModalProps> = ({
  isOpen,
  onClose,
  request,
  onEdit,
  loading,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    categoryId: "",
    province: "",
    city: "",
    requestType: "NORMAL",
    amount: 0,
    amountType: "KILOGRAM",
    paymentType: "CASH",
    expectedDate: 0,
    status: {},
  });

  useEffect(() => {
    if (request) {
      setFormData({
        description: request.description || "",
        categoryId: request.categoryId || "",
        province: request.province || "",
        city: request.city || "",
        requestType: request.requestType || "NORMAL",
        amount: request.amount || 0,
        amountType: request.amountType || "KILOGRAM",
        paymentType: request.paymentType || "CASH",
        expectedDate: request.expectedDate || 0,
        status: request.status || {},
      });
    }
  }, [request]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (request) {
      onEdit(request.id, formData);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const requestTypeOptions = [
    { label: "عادی", value: "NORMAL" },
    { label: "فوری", value: "URGENT" },
  ];

  const amountTypeOptions = [
    { label: "کیلوگرم", value: "KILOGRAM" },
    { label: "گرم", value: "GRAM" },
    { label: "لیتر", value: "LITER" },
    { label: "عدد", value: "PIECE" },
  ];

  const paymentTypeOptions = [
    { label: "نقدی", value: "CASH" },
    { label: "مدت دار", value: "INSTALLMENTS" },
    { label: "اعتباری", value: "CREDIT" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ویرایش درخواست محصول"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextArea
            label="توضیحات"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="توضیحات درخواست را وارد کنید"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="شناسه دسته‌بندی"
            value={formData.categoryId}
            onChange={(e) => handleInputChange("categoryId", e.target.value)}
            placeholder="شناسه دسته‌بندی"
          />
          <SingleSelect
            label="نوع درخواست"
            value={requestTypeOptions.find(opt => opt.value === formData.requestType)}
            onChange={(option) => handleInputChange("requestType", option?.value)}
            options={requestTypeOptions}
            placeholder="نوع درخواست را انتخاب کنید"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="استان"
            value={formData.province}
            onChange={(e) => handleInputChange("province", e.target.value)}
            placeholder="نام استان"
          />
          <Input
            label="شهر"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="نام شهر"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="مقدار"
            type="number"
            value={formData.amount}
            onChange={(e) => handleInputChange("amount", Number(e.target.value))}
            placeholder="مقدار"
          />
          <SingleSelect
            label="واحد مقدار"
            value={amountTypeOptions.find(opt => opt.value === formData.amountType)}
            onChange={(option) => handleInputChange("amountType", option?.value)}
            options={amountTypeOptions}
            placeholder="واحد مقدار را انتخاب کنید"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SingleSelect
            label="نوع پرداخت"
            value={paymentTypeOptions.find(opt => opt.value === formData.paymentType)}
            onChange={(option) => handleInputChange("paymentType", option?.value)}
            options={paymentTypeOptions}
            placeholder="نوع پرداخت را انتخاب کنید"
          />
          <Input
            label="تاریخ مورد انتظار"
            type="number"
            value={formData.expectedDate}
            onChange={(e) => handleInputChange("expectedDate", Number(e.target.value))}
            placeholder="تاریخ مورد انتظار (timestamp)"
          />
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

export default ProductRequestEditModal;
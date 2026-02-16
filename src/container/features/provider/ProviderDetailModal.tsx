import React from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";

interface ProviderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any; // In a real app, you'd want a stronger type here
}

const DetailItem = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between py-2 border-b">
    <span className="font-semibold text-gray-600">{label}:</span>
    <span className="text-gray-800">{value ?? "_"}</span>
  </div>
);

const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!data) {
    return null;
  }

  const usertypeMapping: { [key: string]: string } = {
    Buyer: "خریدار",
    Provider: "تامین کننده",
    Both: "هردو",
  };

  return (
    <Modal open={isOpen} onClose={onClose} headerTitle="جزئیات تامین کننده" size="lg">
      <div className="p-6 space-y-4">
        <DetailItem label="نام" value={data.firstName} />
        <DetailItem label="نام خانوادگی" value={data.lastName} />
        <DetailItem label="تلفن همراه" value={data.mobile} />
        <DetailItem label="نام کاربری" value={data.username} />
        <DetailItem
          label="نوع شخص"
          value={
            data.userSort === "Hagh"
              ? "حقیقی"
              : data.userSort === "Hogh"
              ? "حقوقی"
              : "نامشخص"
          }
        />
        <DetailItem
          label="نوع کاربر"
          value={usertypeMapping[data.usertype] || "نامشخص"}
        />
        <DetailItem
          label="تاریخ ایجاد"
          value={new Date(data.createdAt).toLocaleDateString("fa-IR")}
        />
        <DetailItem
          label="آخرین بروزرسانی"
          value={new Date(data.updatedAt).toLocaleDateString("fa-IR")}
        />
      </div>
      <div className="flex justify-end p-4 bg-gray-50">
        <Button variant="outline-gray" onClick={onClose}>
          بستن
        </Button>
      </div>
    </Modal>
  );
};

export default ProviderDetailModal;

import React from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";

interface BuyerDetailModalProps {
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

const BuyerDetailModal: React.FC<BuyerDetailModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!data) {
    return null;
  }

  return (
    <Modal open={isOpen} onClose={onClose} headerTitle="جزئیات خریدار" size="lg">
      <div className="p-6 space-y-4">
        <DetailItem label="نام" value={data.firstName} />
        <DetailItem label="نام خانوادگی" value={data.lastName} />
        <DetailItem label="تلفن همراه" value={data.mobile} />
        <DetailItem
          label="نوع کاربر"
          value={
            data.userSort === "Hagh"
              ? "حقیقی"
              : data.userSort === "Hogh"
              ? "حقوقی"
              : "نامشخص"
          }
        />
        {/* Add other fields as needed */}
      </div>
      <div className="flex justify-end p-4 bg-gray-50">
        <Button variant="outline-gray" onClick={onClose}>
          بستن
        </Button>
      </div>
    </Modal>
  );
};

export default BuyerDetailModal;

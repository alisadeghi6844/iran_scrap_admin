import React from "react";
import { useDispatch } from "react-redux";
import Typography from "../../../components/typography/Typography";
import ConfirmationCard from "../../organism/ConfirmationCard";
import Image from "../../../components/image";

interface ShipmentDeleteConfirmationProps {
  onSubmit: () => void;
  id: any;
  [key: string]: any;
}

const ShipmentDeleteConfirmation: React.FC<ShipmentDeleteConfirmationProps> = (props) => {
  const { onSubmit, id, ...rest } = props;
  const dispatch: any = useDispatch();

  const handleDelete = () => {
    // Note: Delete functionality would be implemented when the API is available
    // dispatch(DeleteShipmentAdminAction({ credentials: id }));
    console.log("Delete shipment with id:", id);
    onSubmit();
  };

  return (
    <ConfirmationCard
      acceptButtonText="بله، حذف"
      rejectButtonText="خیر، انصراف"
      onAccept={handleDelete}
      onReject={onSubmit}
      {...rest}
    >
      <div className="mb-4">
        <Image src="/images/core/trash.svg" className="w-[90px] h-[90px]" />
      </div>
      <Typography tag="h4 font-bold text-lg">
        آیا از حذف این کرایه ناوگان اطمینان دارید؟
      </Typography>
    </ConfirmationCard>
  );
};

export default ShipmentDeleteConfirmation;
import React from "react";
import { useDispatch } from "react-redux";
import { DeletePbProductAdminAction } from "../../../redux/actions/pbProductAdmin/PbProductAdminActions";
import ConfirmationCard from "../../organism/ConfirmationCard";
import Image from "../../../components/image";
import Typography from "../../../components/typography/Typography";

interface PbProductAdminDeleteConfirmationProps {
  onSubmit: () => void;
  value: any;
  [key: string]: any; // برای سایر props
}

const PbProductAdminDeleteConfirmation: React.FC<PbProductAdminDeleteConfirmationProps> = (
  props
) => {
  const { onSubmit, value, ...rest } = props;
  const dispatch: any = useDispatch();

  const handleDelete = () => {
    dispatch(DeletePbProductAdminAction({id: value?._id || value?.id, onSubmitForm: onSubmit}));
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
        آیا از حذف این کالا اطمینان دارید؟
      </Typography>
    </ConfirmationCard>
  );
};

export default PbProductAdminDeleteConfirmation;
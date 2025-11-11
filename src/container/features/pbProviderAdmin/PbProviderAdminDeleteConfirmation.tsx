import React from "react";
import { useDispatch } from "react-redux";
import { DeletePbProviderAdminAction } from "../../../redux/actions/pbProviderAdmin/PbProviderAdminActions";
import ConfirmationCard from "../../organism/ConfirmationCard";
import Image from "../../../components/image";
import Typography from "../../../components/typography/Typography";

interface PbProviderAdminDeleteConfirmationProps {
  onSubmit: () => void;
  value: any;
  [key: string]: any;
}

const PbProviderAdminDeleteConfirmation: React.FC<PbProviderAdminDeleteConfirmationProps> = (
  props
) => {
  const { onSubmit, value, ...rest } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(DeletePbProviderAdminAction({id: value?._id || value?.id, onSubmitForm: onSubmit}));
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
        آیا از حذف این تامین کننده اطمینان دارید؟
      </Typography>
    </ConfirmationCard>
  );
};

export default PbProviderAdminDeleteConfirmation;
import React from "react";
import { useDispatch } from "react-redux";

import { PublicDictionary } from "../../../../../utils/dictionary";
import Typography from "../../../../../components/typography/Typography";
import ConfirmationCard from "../../../../organism/ConfirmationCard";
import Image from "../../../../../components/image";
import { deleteAppetizerAction } from "../../../../../redux/actions/foodReservation/management/appetizer/AppetizerAction";

interface AppetizerDeleteConfirmationProps {
  onSubmit: () => void;
  value: any;
  [key: string]: any; // برای سایر props
}

const AppetizerDeleteConfirmation: React.FC<AppetizerDeleteConfirmationProps> = (
  props
) => {
  const { onSubmit, value, ...rest } = props;
  const dispatch: any = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAppetizerAction({credentials:value?._id}));
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
        آیا از حذف این {PublicDictionary.appetizer} اطمینان دارید؟
      </Typography>
    </ConfirmationCard>
  );
};

export default AppetizerDeleteConfirmation;

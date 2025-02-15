import React from "react";
import { useDispatch } from "react-redux";

import { PublicDictionary } from "../../../../../utils/dictionary";
import Typography from "../../../../../components/typography/Typography";
import ConfirmationCard from "../../../../organism/ConfirmationCard";
import Image from "../../../../../components/image";
import { deleteFoodShowAction } from "../../../../../redux/actions/foodReservation/management/foodShow/FoodShowAction";

interface FoodShowDeleteConfirmationProps {
  onSubmit: () => void;
  value: any;
  [key: string]: any; // برای سایر props
}

const FoodShowDeleteConfirmation: React.FC<FoodShowDeleteConfirmationProps> = (
  props
) => {
  const { onSubmit, value, ...rest } = props;
  const dispatch: any = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFoodShowAction({credentials:value?._id}));
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
        آیا از حذف این {PublicDictionary.food_show} اطمینان دارید؟
      </Typography>
    </ConfirmationCard>
  );
};

export default FoodShowDeleteConfirmation;

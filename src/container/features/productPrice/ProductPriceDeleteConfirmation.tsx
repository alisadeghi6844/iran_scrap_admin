import React from "react";
import { useDispatch } from "react-redux";

import { PublicDictionary } from "../../../utils/dictionary";
import Typography from "../../../components/typography/Typography";
import ConfirmationCard from "../../organism/ConfirmationCard";
import Image from "../../../components/image";
import { DeleteProductPriceAction } from "../../../redux/actions/productPrice/ProductPriceActions";

interface ProductPriceDeleteConfirmationProps {
  onSubmit: () => void;
  value: any;
  [key: string]: any; // برای سایر props
}

const ProductPriceDeleteConfirmation: React.FC<ProductPriceDeleteConfirmationProps> = (
  props
) => {
  const { onSubmit, id, ...rest } = props;
  const dispatch: any = useDispatch();

  const handleDelete = () => {
    dispatch(DeleteProductPriceAction({credentials:id}));
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
        آیا از حذف این {PublicDictionary.productPrice} اطمینان دارید؟
      </Typography>
    </ConfirmationCard>
  );
};

export default ProductPriceDeleteConfirmation;

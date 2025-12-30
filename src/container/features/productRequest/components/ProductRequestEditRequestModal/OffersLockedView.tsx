import React from "react";
import Typography from "../../../../../components/typography/Typography";
import Button from "../../../../../components/button";

type Props = {
  onClose: () => void;
};

const OffersLockedView: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="text-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <Typography className="text-red-600 text-lg font-bold mb-2">
          امکان ویرایش وجود ندارد
        </Typography>
        <Typography className="text-red-500">
          برای این درخواست پیشنهادی ثبت شده است و امکان ویرایش آن وجود ندارد.
        </Typography>
      </div>
      <div className="mt-6">
        <Button type="button" variant="primary" onClick={onClose}>
          بستن
        </Button>
      </div>
    </div>
  );
};

export default OffersLockedView;



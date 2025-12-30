import React from "react";
import Button from "../../../../../components/button";
import Input from "../../../../../components/input";
import Typography from "../../../../../components/typography/Typography";

interface ChequesSectionProps {
  editableCheques: Array<{ date: string; bank: string; no: string; sayyad: string }>;
  validationErrors: { [key: string]: string };
  updateLoading: any;
  onSaveCheques: () => void;
  onChequeChange: (index: number, field: string, value: string) => void;
}

const ChequesSection: React.FC<ChequesSectionProps> = ({
  editableCheques,
  validationErrors,
  updateLoading,
  onSaveCheques,
  onChequeChange,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Typography className="text-lg font-bold">چک‌ها</Typography>
        {editableCheques && editableCheques.length > 0 && (
          <Button
            variant="primary"
            size="sm"
            onClick={onSaveCheques}
            loading={updateLoading}
            disabled={updateLoading}
          >
            ویرایش چک‌ها
          </Button>
        )}
      </div>
      {editableCheques && editableCheques.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {editableCheques.map((cheque, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
              <div className="space-y-4">
                <div>
                  <Input
                    label="بانک"
                    value={cheque.bank}
                    onChange={(e) => onChequeChange(index, "bank", e.target.value)}
                    size="md"
                    errorMessage={validationErrors[`${index}-bank`]}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="شماره چک"
                    value={cheque.no}
                    onChange={(e) => onChequeChange(index, "no", e.target.value)}
                    size="md"
                    errorMessage={validationErrors[`${index}-no`]}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="شماره صیاد"
                    value={cheque.sayyad}
                    onChange={(e) => onChequeChange(index, "sayyad", e.target.value)}
                    size="md"
                    errorMessage={validationErrors[`${index}-sayyad`]}
                    helperText="باید 16 رقم باشد"
                    required
                  />
                </div>
                <div>
                  <Input
                    label="تاریخ"
                    value={cheque.date}
                    onChange={(e) => onChequeChange(index, "date", e.target.value)}
                    size="md"
                    errorMessage={validationErrors[`${index}-date`]}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <Typography className="text-gray-500">چکی موجود نیست</Typography>
        </div>
      )}
    </div>
  );
};

export default ChequesSection;



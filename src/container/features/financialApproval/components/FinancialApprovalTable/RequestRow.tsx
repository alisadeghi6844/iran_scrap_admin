import React from "react";
import TableRow from "../../../../../components/table/TableRow";
import TableCell from "../../../../../components/table/TableCell";
import Button from "../../../../../components/button";
import { convertToJalali } from "../../../../../utils/MomentConvertor";
import { getOrderStatusColor, getOrderStatusText } from "../../../../../types/OrderStatus";

interface RequestRowProps {
  row: any;
  onViewRequest: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

const RequestRow: React.FC<RequestRowProps> = ({ row, onViewRequest, onApprove, onReject }) => {
  return (
    <TableRow>
      <TableCell>
        {row?.user?.firstName ? row?.user?.firstName + " " + row?.user?.lastName : "_"}
      </TableCell>
      <TableCell>{row?.user?.mobile ?? "_"}</TableCell>
      <TableCell>{row?.category?.name ?? "_"}</TableCell>
      <TableCell>{row?.description ?? "_"}</TableCell>
      <TableCell>
        {row?.user?.firstName && row?.user?.lastName
          ? `${row.user.firstName} ${row.user.lastName}`
          : row?.user?.mobile ?? "_"}
      </TableCell>
      <TableCell>{row?.createdAt ? convertToJalali(row?.createdAt) : "_"}</TableCell>
      <TableCell>{row?.province + " , " + row?.city}</TableCell>
      <TableCell>
        {row?.paymentType
          ? row?.paymentType === "INSTALLMENTS"
            ? "مدت دار"
            : row?.paymentType === "CASH_AND_INSTALLMENTS"
              ? "نقد و مدت دار"
              : "نقد"
          : "_"}
      </TableCell>
      <TableCell>{row?.amount ? `${row?.amount} (کیلوگرم)` : "_"}</TableCell>
      <TableCell>
        <span className={getOrderStatusColor(row?.status)}>
          {getOrderStatusText(row?.status) || row?.statusTitle || "_"}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button size="sm" type="button" variant="primary" onClick={onViewRequest}>
            مشاهده درخواست
          </Button>
          {row?.status === "BUYER_WAITFORFINANCE" && (
            <>
              <Button type="button" size="sm" variant="success" onClick={onApprove}>
                تایید
              </Button>
              <Button type="button" size="sm" variant="error" onClick={onReject}>
                رد
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RequestRow;



import React from "react";
import TableRow from "../../../../../components/table/TableRow";
import TableCell from "../../../../../components/table/TableCell";
import Button from "../../../../../components/button";
import { FaRegEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { formatNumber } from "../../../../../utils/NumberFormated";
import { convertToJalali } from "../../../../../utils/MomentConvertor";

interface ProductPriceRowProps {
  row: any;
  index: number;
  statusInfo: any;
  getPaymentTypeLabel: (type: string) => string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductPriceRow: React.FC<ProductPriceRowProps> = ({
  row,
  index,
  statusInfo,
  getPaymentTypeLabel,
  onEdit,
  onDelete,
}) => {
  return (
    <TableRow key={row?._id || row?.id} className={statusInfo ? statusInfo.textColor : ""}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{row?.productId?.name ?? "_"}</TableCell>
      <TableCell>{row?.brandId?.name ?? "_"}</TableCell>
      <TableCell>{row?.providerId?.name ?? "_"}</TableCell>
      <TableCell>{row?.portId?.name ?? "_"}</TableCell>
      <TableCell>{getPaymentTypeLabel(row?.paymentType) ?? "_"}</TableCell>
      <TableCell>{row?.constant ? formatNumber(row?.constant) + " تومان" : "_"}</TableCell>
      <TableCell>{row?.buyPrice ? formatNumber(row?.buyPrice) + " تومان" : "_"}</TableCell>
      <TableCell>{row?.sellPrice ? formatNumber(row?.sellPrice) + " تومان" : "_"}</TableCell>
      <TableCell>
        {statusInfo ? (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        ) : (
          "_"
        )}
      </TableCell>
      <TableCell>{row?.createdAt ? convertToJalali(row.createdAt) : "_"}</TableCell>
      <TableCell
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
        className="justify-center gap-x-4"
      >
        <Button
          startIcon={<FaRegEdit className="text-xl" />}
          type="button"
          variant="outline-success"
          size="sm"
          onClick={onEdit}
        >
          ویرایش
        </Button>
        <Button
          startIcon={<BiTrash className="text-xl" />}
          type="button"
          variant="outline-error"
          size="sm"
          onClick={onDelete}
        >
          حذف
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductPriceRow;



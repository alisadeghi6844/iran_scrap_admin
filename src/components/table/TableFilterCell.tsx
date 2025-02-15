import { TableFilterCellTypes } from "../../types/components/table/TableFilterCellTypes";
import TableCell from "./TableCell";

const TableFilterCell: React.FC<TableFilterCellTypes> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <TableCell className={` h-[47px] !p-0 ${className}`} {...rest}>
      {children}
    </TableCell>
  );
};

export default TableFilterCell;

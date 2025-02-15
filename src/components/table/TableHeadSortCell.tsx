import React from "react";
import TableHeadCell from "./TableHeadCell";

interface TableHeadSortCellProps extends React.HTMLProps<HTMLTableCellElement> {
  children: React.ReactNode;
  value?: "asc" | "des";
}

const TableHeadSortCell: React.FC<TableHeadSortCellProps> = (props) => {
  const { children, value = "asc", ...rest } = props;

  return (
    <TableHeadCell {...rest}>
      <div className="flex justify-between">
        {children}
        {{
          des: "up",
          asc: "down",
        }[value]}
      </div>
    </TableHeadCell>
  );
};

export default TableHeadSortCell;

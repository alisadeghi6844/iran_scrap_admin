import React from "react";

interface TableRowProps {
  children: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <tr className="cursor-pointer" {...rest}>
      {children}
    </tr>
  );
};

export default TableRow;

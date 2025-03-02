import React from "react";

interface TableRowProps {
  children: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = (props) => {
  const { children,className, ...rest } = props;

  return (
    <tr className={`cursor-pointer ${className}`} {...rest}>
      {children}
    </tr>
  );
};

export default TableRow;

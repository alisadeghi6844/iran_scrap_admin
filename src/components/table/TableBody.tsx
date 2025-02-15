import React from "react";
import { TableBodyTypes } from "../../types/components/table/TableBodyTypes";

const TableBody: React.FC<TableBodyTypes> = (props) => {
  const { children, ...rest } = props;
  return <tbody {...rest}>{children}</tbody>;
};
export default TableBody;

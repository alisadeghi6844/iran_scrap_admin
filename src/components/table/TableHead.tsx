import { TableHeadTypes } from "../../types/components/table/TableHeadTypes";

const TableHead: React.FC<TableHeadTypes> = (props) => {
  const { children, ...rest } = props;
  return (
    <thead className="align-bottom" {...rest}>
      {children}
    </thead>
  );
};
export default TableHead;

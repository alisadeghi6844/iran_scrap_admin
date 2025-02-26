import { TableHeadCellTypes } from "../../types/components/table/TableHeadCellTypes";

const TableHeadCell: React.FC<TableHeadCellTypes> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <th
      className={`text-sm tracking-none whitespace-nowrap border border-solid border-gray-200
       bg-primary-500 px-2  
       py-4 text-start align-middle 
       uppercase text-white shadow-none dark:border-dark-gray-400 
       dark:bg-dark-primary-main dark:text-dark-text-primary  max-sm:text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm ${
         className ?? ""
       }`}
      {...rest}
    >
      {children}
    </th>
  );
};
export default TableHeadCell;

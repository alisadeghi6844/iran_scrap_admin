import { TableHeadCellTypes } from "../../types/components/table/TableHeadCellTypes";

const TableHeadCell: React.FC<TableHeadCellTypes> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <th
      className={`text-md tracking-none whitespace-nowrap border border-solid border-gray-200
       bg-primary-500 px-3  
       py-4 text-start align-middle 
       uppercase text-white shadow-none dark:border-dark-gray-400 
       dark:bg-dark-primary-main dark:text-dark-text-primary  max-sm:text-xs sm:text-sm md:text-[16px] lg:text-[16px] xl:text-[16px] ${
         className ?? ""
       }`}
      {...rest}
    >
      {children}
    </th>
  );
};
export default TableHeadCell;

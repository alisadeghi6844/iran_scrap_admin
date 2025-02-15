import { TableCellTypes } from "../../types/components/table/TableCellTypes";
import TextOverflow from "../../utils/TextOverflow";

const TableCell: React.FC<TableCellTypes> = (props) => {
  const { children, className, tdClassName, ...rest } = props;
  return (
    <td
      className={`whitespace-nowrap border bg-transparent shadow-transparent dark:border-dark-gray-400 text-[16px] ${
        tdClassName ?? ""
      }`}
      {...rest}
    >
      <div
        className={`flex justify-start p-2 dark:text-dark-text-primary ${
          className ? className : ""
        }`}
      >
        <TextOverflow number={50}>{children}</TextOverflow>
      </div>
    </td>
  );
};
export default TableCell;

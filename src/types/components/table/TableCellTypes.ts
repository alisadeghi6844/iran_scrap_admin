export interface TableCellTypes extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
    className?: string;
    tdClassName?: string;
    [key: string]: any;   // برای سایر props غیر مشخص
  }
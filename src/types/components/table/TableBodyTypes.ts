export interface TableBodyTypes extends React.HTMLProps<HTMLTableSectionElement> {
    children: React.ReactNode;
    [key: string]: any;   // برای سایر props غیر مشخص
  }
  
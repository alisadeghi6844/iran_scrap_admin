export interface TableHeadTypes extends React.HTMLProps<HTMLTableSectionElement> {
    children: React.ReactNode;
    [key: string]: any;   // برای سایر props غیر مشخص
  }
  
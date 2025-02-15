export interface TableTypes extends React.HTMLProps<HTMLTableElement> {
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
    titleHeaders?: string[];
    shadow?: boolean;
    [key: string]: any;   // برای سایر props غیر مشخص
  }
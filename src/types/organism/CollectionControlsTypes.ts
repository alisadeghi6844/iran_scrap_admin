import { ReactNode } from "react";

export interface CollectionControlsProps {
    children?: ReactNode;
    buttons?: string[];
    buttonsAfter?: ReactNode;
    buttonsBefore?: ReactNode;
    onButtonClick?: (action: string) => void;
    data?: any; // نوع data را می‌توانید با توجه به نیاز خود تغییر دهید
    title?: any;
    hasBox?: boolean;
    onMetaChange?: (meta: any) => void; // نوع meta را می‌توانید با توجه به نیاز خود تغییر دهید
    filterInitialValues?: any; // نوع initialValues را می‌توانید با توجه به نیاز خود تغییر دهید
    Filter?: ReactNode;
    onFilter?: (values: any) => string; // نوع values را می‌توانید با توجه به نیاز خود تغییر دهید
    createTitle?: string;
    className?: string;
    errorTitle?: string;
    excelTitle?: string;
    excelLoading?: boolean;
  }
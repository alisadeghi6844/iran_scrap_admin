export interface ConfirmationCardTypes {
    children?: React.ReactNode;
    acceptButtonText?: string;
    rejectButtonText?: string;
    onAccept?: () => void;
    onReject?: () => void;
    helperText?: string;
    className?: string;
    isLoading?: boolean;
    isDisable?: boolean;
    [key: string]: any;   // برای سایر props غیر مشخص
  }
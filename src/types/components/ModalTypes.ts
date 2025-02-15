export interface ModalTypes extends React.HTMLProps<HTMLElement> {
    bgModal?: string;
    headerIcon?: any;
    headerTitle?: string;
    headerSubTitle?: string;
    className?: string;
    children?: React.ReactNode;
    hideIcon?: boolean;
    bgColor?:string;
    hideBackground?: boolean;
    onClose: () => void;
    open?: boolean;
    size?: "auto" | "sm" | "md" | "lg" | "xl" | "full";
    [key: string]: any; // برای props اضافی
}

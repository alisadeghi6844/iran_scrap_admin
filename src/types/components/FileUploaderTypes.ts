export interface FileUploaderTypes {
    name?: string;
    allowMultiple?: boolean;
    acceptedFileTypes?: string[];
    imageValidateSizeMaxWidth?: number;
    imageValidateSizeMinWidth?: number;
    imageValidateSizeMaxHeight?: number;
    editImageFile?: any;
    imageValidateSizeMinHeight?: number;
    mode?: string;
    id?:any;
    onreorderfiles?:any,
    setUploaderData?: (files: File[]) => void;
    clear?: boolean;
    maxSize?: number;
    errorLabel?: string|null;
  }
import { ReactNode } from "react";

export interface CRUDProps {
    mode?: string;
    form?: ReactNode;
    confirmation?: ReactNode;
    detail?: ReactNode;
    deleteModal?: ReactNode;
    content?: ReactNode;
    lov?: ReactNode;
    closeLov?: boolean;
    confirmModalSize?: string;
    modalHeaders?: {
      update?: string;
      create?: string;
      detail?: string;
      lov?: string;
      delete?: string;
    };
    onModalClose?: (mode: string) => void;
  }
  
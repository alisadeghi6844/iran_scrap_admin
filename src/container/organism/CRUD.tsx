import Modal from "../../components/modal";
import { useEffect, useState, ReactNode } from "react";
import { CRUDProps } from "../../types/organism/CrudTypes";

const CRUD: React.FC<CRUDProps> = (props) => {
  const {
    mode,
    form,
    confirmation,
    detail,
    content,
    lov,
    closeLov,
    confirmModalSize = "md",
    formModalSize = "md",
    modalHeaders = {},
    onModalClose,
  } = props;

  const [history, setHistory] = useState<string[]>([]);
  const [modalContents, setModalContents] = useState<{[key: string]: ReactNode}>({
    create: form,
    update: form,
    detail: detail,
    LOV: lov,
    delete: confirmation,
  });

  useEffect(() => {
    setHistory((prevHistory:any) => {
      if (prevHistory[prevHistory.length - 1] !== mode) {
        return [...prevHistory, mode];
      }
      return prevHistory;
    });
  }, [mode]);

  useEffect(() => {
    if (closeLov) {
      const newHistory = [...history];
      newHistory.pop(); // حذف آخرین مُد (LOV)
      onModalClose(newHistory[newHistory.length - 1]);
    }
  }, [closeLov, history, onModalClose]);

  useEffect(() => {
    setModalContents(prevContents => ({
      ...prevContents,
      create: form,
      update: form,
      detail: detail,
      LOV: lov,
      delete: confirmation,
    }));
  }, [form, detail, lov, confirmation]);

  const handleClose = (fallbackMode: string) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop(); // حذف آخرین مُد
      return newHistory;
    });
    onModalClose(fallbackMode);
  };

  const currentMode = history[history.length - 1];

  const renderModal = (mode: string, size: string, headerTitle: string | undefined) => (
    <Modal
      size={size}
      headerTitle={headerTitle}
      open={currentMode === mode}
      onClose={() => handleClose(mode === "LOV" ? history[history.length - 2] : "content")}
    >
      {modalContents[mode]}
    </Modal>
  );

  return (
    <div>
      {content}
      {renderModal("create", formModalSize, modalHeaders?.create)}
      {renderModal("update", formModalSize, modalHeaders?.update)}
      {renderModal("detail", "lg", modalHeaders?.detail)}
      {renderModal("LOV", "lg", modalHeaders?.lov)}
      {renderModal("delete", confirmModalSize, modalHeaders?.delete)}
    </div>
  );
};

export default CRUD;
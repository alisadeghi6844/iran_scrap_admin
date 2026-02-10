import React, { useEffect, useState } from "react";
import Modal from "../../modal";
import Button from "../../button";
import FileUploader from "../../FileUploader/FileUploader";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (src: string, alt?: string, className?: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFile(null);
      setAlt("");
      setClassName("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onSubmit(result, alt, className);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      headerTitle="افزودن تصویر"
      size="md"
    >
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            تصویر
          </label>
          <div className="w-full">
            <FileUploader
              allowMultiple={false}
              acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
              setUploaderData={(files: any[]) => {
                if (files && files.length > 0) {
                  setFile(files[0]);
                } else {
                  setFile(null);
                }
              }}
              labelIdle="تصویر خود را اینجا رها کنید یا کلیک کنید"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            متن جایگزین (Alt Text)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main"
            placeholder="توضیح تصویر"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
             کلاس های تیلویند (Tailwind CSS Classes)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main text-left"
            placeholder="e.g. rounded-lg shadow-md border-2"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            dir="ltr"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" onClick={onClose} variant="outline-secondary" size="md">
            انصراف
          </Button>
          <Button type="button" onClick={handleSubmit} variant="primary" size="md">
            افزودن
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;

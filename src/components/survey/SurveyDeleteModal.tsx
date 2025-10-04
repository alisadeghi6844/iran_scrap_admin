import React from "react";
import Modal from "../modal";
import Button from "../button";
import Typography from "../typography/Typography";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { Survey } from "../../redux/types/survey/SurveyTypes";

interface SurveyDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: Survey | null;
  onDelete: (surveyId: string) => void;
  loading?: boolean;
}

const SurveyDeleteModal: React.FC<SurveyDeleteModalProps> = ({
  isOpen,
  onClose,
  survey,
  onDelete,
  loading = false,
}) => {
  const handleDelete = () => {
    if (survey?.id) {
      onDelete(survey.id.toString());
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!survey) return null;

  return (
    <Modal 
      open={isOpen} 
      onClose={handleClose} 
      size="md" 
      headerTitle="حذف نظرسنجی"
      headerIcon={<FiTrash2 className="ml-2 text-red-500" />}
    >
      <div className="space-y-4">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <FiAlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-3">
          <Typography className="text-lg font-semibold text-gray-900">
            آیا از حذف این نظرسنجی اطمینان دارید؟
          </Typography>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <Typography className="font-medium text-sm text-gray-700 mb-1">
              عنوان: {survey.title}
            </Typography>
            <Typography className="text-xs text-gray-600">
              تعداد سوالات: {survey.questions?.length || 0}
            </Typography>
          </div>

          <Typography className="text-sm text-red-600">
            ⚠️ این عمل غیرقابل بازگشت است و تمام داده‌های مربوط به این نظرسنجی حذف خواهد شد.
          </Typography>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline-secondary"
            onClick={handleClose}
            disabled={loading}
            size="md"
          >
            انصراف
          </Button>
          <Button
            type="button"
            variant="error"
            onClick={handleDelete}
            loading={loading}
            size="md"
          >
            <FiTrash2 className="ml-1" />
            {loading ? "در حال حذف..." : "حذف نظرسنجی"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SurveyDeleteModal;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Survey } from "../../redux/types/survey/SurveyTypes";
import Button from "../button";
import Typography from "../typography/Typography";
import { FiEdit, FiTrash2, FiEye, FiUsers, FiFileText } from "react-icons/fi";

interface SurveyListProps {
  surveys: Survey[];
  loading?: boolean;
  onEdit: (survey: Survey) => void;
  onDelete: (survey: Survey) => void;
  onView: (survey: Survey) => void;
  onViewResponses: (survey: Survey) => void;
  deleteLoading?: boolean;
}

const SurveyList: React.FC<SurveyListProps> = ({
  surveys,
  loading = false,
  onEdit,
  onDelete,
  onView,
  onViewResponses,
  deleteLoading = false,
}) => {
  const navigate = useNavigate();

  const handleEdit = (survey: Survey) => {
    navigate(`/survey-management/edit/${survey.id}`);
  };
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <Typography>در حال بارگذاری...</Typography>
        </div>
      </div>
    );
  }

  if (surveys?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <Typography className="text-gray-500 text-lg mb-2">
          هیچ نظرسنجی یافت نشد
        </Typography>
        <Typography className="text-gray-400 text-sm">
          برای شروع، نظرسنجی جدیدی ایجاد کنید
        </Typography>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surveys?.map((survey) => (
        <div key={survey.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <Typography className="font-semibold text-gray-900 text-sm line-clamp-2">
                {survey.title}
              </Typography>
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  survey.published
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {survey.published ? "منتشر" : "پیش‌نویس"}
              </span>
            </div>

            <Typography className="text-gray-600 text-xs mb-3 line-clamp-2">
              {survey.description || "بدون توضیحات"}
            </Typography>

            <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
              <span>{survey.questions?.length || 0} سوال</span>
              <span>
                {survey.createdAt
                  ? new Date(survey.createdAt).toLocaleDateString("fa-IR")
                  : "-"}
              </span>
            </div>

            <div className="flex gap-1">
              <Button
                onClick={() => onView(survey)}
                variant="outline-primary"
                size="xs"
                title="مشاهده"
              >
                <FiEye />
              </Button>
              <Button
                onClick={() => handleEdit(survey)}
                variant="outline-warning"
                size="xs"
                title="ویرایش"
              >
                <FiEdit />
              </Button>
              <Button
                onClick={() => onViewResponses(survey)}
                variant="outline-secondary"
                size="xs"
                title="پاسخ‌ها"
              >
                <FiUsers />
              </Button>
              <Button
                onClick={() => onDelete(survey)}
                loading={deleteLoading}
                variant="outline-error"
                size="xs"
                title="حذف"
              >
                <FiTrash2 />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyList;
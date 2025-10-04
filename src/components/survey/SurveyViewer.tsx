import React from "react";
import { Survey, Question } from "../../redux/types/survey/SurveyTypes";
import Typography from "../typography/Typography";
import Button from "../button";
import Modal from "../modal";
import { FiX, FiEye } from "react-icons/fi";

interface SurveyViewerProps {
  survey: Survey;
  onClose: () => void;
  open?: boolean;
  loading?: boolean;
}

const SurveyViewer: React.FC<SurveyViewerProps> = ({ survey, onClose, open = true, loading = false }) => {
  const renderQuestion = (question: Question, index: number) => {
    return (
      <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
        <div className="flex justify-between items-start mb-2">
          <Typography className="font-medium text-sm">
            {index + 1}. {question.text}
          </Typography>
          {question.required && (
            <span className="text-red-500 text-xs font-medium">اجباری</span>
          )}
        </div>

        <div className="mb-2">
          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
            {getQuestionTypeLabel(question.type)}
          </span>
        </div>

        {renderQuestionPreview(question)}
      </div>
    );
  };

  const getQuestionTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      SingleChoice: "انتخاب تکی",
      MultiChoice: "انتخاب چندگانه",
      OpenEnded: "پاسخ باز",
    };
    return types[type] || type;
  };

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "SingleChoice":
        return (
          <div className="space-y-2">
            {question.choices?.map((choice, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${question.id || Math.random()}`}
                  disabled
                  className="ml-2 h-4 w-4 text-blue-600 border-gray-300"
                />
                <span className="text-gray-700">{choice}</span>
              </label>
            ))}
          </div>
        );

      case "MultiChoice":
        return (
          <div className="space-y-2">
            {question.choices?.map((choice, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  disabled
                  className="ml-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-gray-700">{choice}</span>
              </label>
            ))}
          </div>
        );

      case "OpenEnded":
        return (
          <textarea
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-white text-sm"
            placeholder="پاسخ متنی..."
            rows={2}
          />
        );

      case "Number":
        return (
          <input
            type="number"
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-white text-sm"
            placeholder="عدد را وارد کنید..."
          />
        );

      case "Date":
        return (
          <input
            type="date"
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-white text-sm"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      headerTitle={survey.title}
      headerIcon={<FiEye className="ml-2" />}
    >
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <Typography className="text-gray-500">در حال بارگذاری...</Typography>
          </div>
        ) : (
          <>
            {/* Survey Info */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <Typography className="font-medium mb-2 text-sm">توضیحات:</Typography>
              <Typography className="text-gray-700 text-sm">{survey.description}</Typography>
              
              <div className="flex gap-4 mt-3 text-xs">
                <span className="flex items-center">
                  <span className="font-medium ml-1">وضعیت:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      survey.published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {survey.published ? "منتشر شده" : "پیش‌نویس"}
                  </span>
                </span>
                <span className="flex items-center">
                  <span className="font-medium ml-1">تعداد سوالات:</span>
                  <span>{survey.questions?.length || 0}</span>
                </span>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-3">
              <Typography variant="h3" className="text-md font-semibold">
                سوالات نظرسنجی
              </Typography>
              
              {survey.questions && survey.questions.length > 0 ? (
                survey.questions.map((question, index) => renderQuestion(question, index))
              ) : (
                <div className="text-center py-6">
                  <Typography className="text-gray-500 text-sm">
                    هیچ سوالی برای این نظرسنجی تعریف نشده است
                  </Typography>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default SurveyViewer;
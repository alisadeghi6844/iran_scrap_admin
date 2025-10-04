import React, { useState } from "react";
import { Survey, Question } from "../../redux/types/survey/SurveyTypes";
import Typography from "../typography/Typography";
import Button from "../button";
import SurveyInput from "./SurveyInput";
import SurveyTextArea from "./SurveyTextArea";
import SurveyRadio from "./SurveyRadio";
import SurveyCheckbox from "./SurveyCheckbox";
import SurveyDatePicker from "./SurveyDatePicker";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";

interface SurveyTakerProps {
  survey: Survey;
  onSubmit: (responses: any) => void;
  onCancel: () => void;
  loading?: boolean;
}

const SurveyTaker: React.FC<SurveyTakerProps> = ({
  survey,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: any }>({});
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const questions = survey.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleResponseChange = (questionId: number, value: any) => {
    setResponses({ ...responses, [questionId]: value });
    // Clear error when user provides an answer
    if (errors[questionId]) {
      setErrors({ ...errors, [questionId]: "" });
    }
  };

  const validateCurrentQuestion = () => {
    if (!currentQuestion) return true;

    const questionId = currentQuestion.id || currentQuestionIndex;
    const response = responses[questionId];

    if (currentQuestion.required) {
      if (!response || (Array.isArray(response) && response.length === 0)) {
        setErrors({
          ...errors,
          [questionId]: "این سوال اجباری است",
        });
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = () => {
    if (validateCurrentQuestion()) {
      // Validate all required questions
      let hasErrors = false;
      const newErrors: { [key: number]: string } = {};

      questions.forEach((question, index) => {
        const questionId = question.id || index;
        const response = responses[questionId];

        if (question.required && (!response || (Array.isArray(response) && response.length === 0))) {
          newErrors[questionId] = "این سوال اجباری است";
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setErrors(newErrors);
        // Go to first question with error
        const firstErrorIndex = questions.findIndex((q, index) => {
          const questionId = q.id || index;
          return newErrors[questionId];
        });
        if (firstErrorIndex !== -1) {
          setCurrentQuestionIndex(firstErrorIndex);
        }
        return;
      }

      onSubmit(responses);
    }
  };

  const renderQuestion = (question: Question) => {
    const questionId = question.id || currentQuestionIndex;
    const response = responses[questionId];
    const error = errors[questionId];

    const renderInput = () => {
      switch (question.type) {
        case "SingleChoice":
          return (
            <SurveyRadio
              options={question.choices?.map(choice => ({ value: choice, label: choice })) || []}
              value={response}
              onChange={(value) => handleResponseChange(questionId, value)}
              size="md"
            />
          );

        case "MultiChoice":
          return (
            <div className="space-y-2">
              {question.choices?.map((choice, index) => (
                <SurveyCheckbox
                  key={index}
                  label={choice}
                  checked={response?.includes(choice) || false}
                  onChange={(checked) => {
                    const currentResponses = response || [];
                    if (checked) {
                      handleResponseChange(questionId, [...currentResponses, choice]);
                    } else {
                      handleResponseChange(
                        questionId,
                        currentResponses.filter((r: string) => r !== choice)
                      );
                    }
                  }}
                  size="md"
                />
              ))}
            </div>
          );

        case "OpenEnded":
          return (
            <SurveyTextArea
              value={response || ""}
              onChange={(value) => handleResponseChange(questionId, value)}
              placeholder="پاسخ خود را وارد کنید..."
              rows={3}
            />
          );

        case "Number":
          return (
            <SurveyInput
              type="number"
              value={response || ""}
              onChange={(value) => handleResponseChange(questionId, value)}
              placeholder="عدد را وارد کنید..."
            />
          );

        case "Date":
          return (
            <SurveyDatePicker
              value={response || ""}
              onChange={(value) => handleResponseChange(questionId, value)}
              placeholder="تاریخ را انتخاب کنید"
            />
          );

        default:
          return null;
      }
    };

    return (
      <div className="space-y-3">
        <div>
          <Typography className="text-md font-medium mb-3">
            {currentQuestionIndex + 1}. {question.text}
            {question.required && <span className="text-red-500 mr-1">*</span>}
          </Typography>
          {renderInput()}
          {error && (
            <div className="text-red-500 text-xs mt-2">{error}</div>
          )}
        </div>
      </div>
    );
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Typography className="text-gray-500 text-lg">
            این نظرسنجی هیچ سوالی ندارد
          </Typography>
          <Button
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg mt-4"
          >
            بازگشت
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Header */}
        <div className="bg-blue-50 p-4 border-b">
          <Typography variant="h2" className="text-lg font-semibold mb-2">
            {survey.title}
          </Typography>
          <Typography className="text-gray-600 mb-3 text-sm">
            {survey.description}
          </Typography>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>سوال {currentQuestionIndex + 1} از {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-4">
          {currentQuestion && renderQuestion(currentQuestion)}
        </div>

        {/* Navigation */}
        <div className="bg-gray-50 p-4 border-t flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            variant="outline-info"
            size="sm"
          >
            <FiArrowRight className="ml-1" />
            قبلی
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={onCancel}
              variant="outline-neutral"
              size="sm"
            >
              انصراف
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                loading={loading}
                variant="success"
                size="sm"
              >
                <FiCheck className="ml-1" />
                ارسال پاسخ‌ها
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="primary"
                size="sm"
              >
                بعدی
                <FiArrowLeft className="mr-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyTaker;
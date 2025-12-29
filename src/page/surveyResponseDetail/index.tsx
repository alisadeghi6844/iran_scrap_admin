import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Typography from "../../components/typography/Typography";
import Button from "../../components/button";
import { FiArrowRight, FiUser, FiCalendar, FiCheckCircle, FiClock } from "react-icons/fi";
import {
  GetUserSurveyByIdAction,
} from "../../redux/actions/survey/SurveyActions";
import {
  selectGetUserSurveyByIdData,
  selectGetUserSurveyByIdLoading,
  selectGetUserSurveyByIdError,
} from "../../redux/slice/survey/SurveySlice";

const SurveyResponseDetail = () => {
  const { responseId } = useParams<{ responseId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseData = useSelector(selectGetUserSurveyByIdData);
  const loading = useSelector(selectGetUserSurveyByIdLoading);
  const error = useSelector(selectGetUserSurveyByIdError);

  useEffect(() => {
    if (responseId) {
      dispatch(GetUserSurveyByIdAction(responseId) as any);
    }
  }, [dispatch, responseId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // تبدیل timestamp به تاریخ فارسی
  const formatDate = (timestamp: number) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // تابع برای نمایش پاسخ بر اساس نوع سوال
  const renderAnswer = (answer: any, questionType: string) => {
    if (!answer || !answer.answers) return "-";

    const answers = Array.isArray(answer.answers) ? answer.answers : [answer.answers];

    switch (questionType) {
      case "SingleChoice":
        return (
          <div className="bg-blue-50 px-3 py-2 rounded-lg inline-block">
            <Typography className="text-blue-800 font-medium">
              {answers[0]}
            </Typography>
          </div>
        );
      
      case "MultiChoice":
        return (
          <div className="flex flex-wrap gap-2">
            {answers.map((ans: string, index: number) => (
              <div key={index} className="bg-secondary-50 px-3 py-2 rounded-lg">
                <Typography className="text-secondary-800 font-medium">
                  {ans}
                </Typography>
              </div>
            ))}
          </div>
        );
      
      case "OpenEnded":
        return (
          <div className="bg-gray-50 p-4 rounded-lg border-r-4 border-gray-400">
            <Typography className="text-gray-800 whitespace-pre-wrap">
              {answers[0]}
            </Typography>
          </div>
        );
      
      default:
        return (
          <Typography className="text-gray-600">
            {answers.join(", ")}
          </Typography>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <Typography className="text-gray-600">در حال بارگذاری جزئیات پاسخ...</Typography>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Typography className="text-red-600 mb-4">خطا در بارگذاری اطلاعات</Typography>
            <Button onClick={handleGoBack} variant="outline-primary">
              <FiArrowRight className="ml-2" />
              بازگشت
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!responseData) {
    return (
      <div className="p-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Typography className="text-gray-600 mb-4">پاسخی یافت نشد</Typography>
            <Button onClick={handleGoBack} variant="outline-primary">
              <FiArrowRight className="ml-2" />
              بازگشت
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from new DTO structure
  const userSurvey = responseData.userSurvey;
  const questions = responseData.questions || [];

  return (
    <div className="p-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Typography variant="h1" className="text-2xl font-bold mb-2">
            جزئیات پاسخ نظرسنجی
          </Typography>
          <Typography className="text-gray-600">
            مشاهده پاسخ‌های ارائه شده توسط کاربر
          </Typography>
        </div>
        <Button onClick={handleGoBack} variant="outline-primary">
          <FiArrowRight className="ml-2" />
          بازگشت
        </Button>
      </div>

      {/* Response Info */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FiUser className="text-blue-600" />
            </div>
            <div>
              <Typography className="text-xs text-gray-500">کاربر</Typography>
              <Typography className="font-medium">
                {userSurvey?.userId ? `کاربر ${userSurvey.userId.slice(-8)}` : "کاربر ناشناس"}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${userSurvey?.completed ? 'bg-secondary-100' : 'bg-warning-100'}`}>
              {userSurvey?.completed ? (
                <FiCheckCircle className="text-secondary-600" />
              ) : (
                <FiClock className="text-yellow-600" />
              )}
            </div>
            <div>
              <Typography className="text-xs text-gray-500">وضعیت</Typography>
              <Typography className="font-medium">
                {userSurvey?.completed ? "تکمیل شده" : "در حال انجام"}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <FiCalendar className="text-purple-600" />
            </div>
            <div>
              <Typography className="text-xs text-gray-500">تاریخ ایجاد</Typography>
              <Typography className="font-medium">
                {formatDate(userSurvey?.createdAt)}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <FiCalendar className="text-gray-600" />
            </div>
            <div>
              <Typography className="text-xs text-gray-500">آخرین بروزرسانی</Typography>
              <Typography className="font-medium">
                {formatDate(userSurvey?.updatedAt)}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Statistics */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <Typography variant="h2" className="text-lg font-bold mb-4">
          آمار پاسخگویی
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <Typography className="text-xs text-gray-600">کل سوالات</Typography>
            <Typography className="text-2xl font-bold text-blue-600">
              {questions.length}
            </Typography>
          </div>
          <div className="bg-secondary-50 p-4 rounded-lg">
            <Typography className="text-xs text-gray-600">پاسخ داده شده</Typography>
            <Typography className="text-2xl font-bold text-secondary-600">
              {userSurvey?.answers?.length || 0}
            </Typography>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <Typography className="text-xs text-gray-600">درصد تکمیل</Typography>
            <Typography className="text-2xl font-bold text-purple-600">
              {questions.length > 0 ? Math.round(((userSurvey?.answers?.length || 0) / questions.length) * 100) : 0}%
            </Typography>
          </div>
        </div>
      </div>

      {/* Survey Questions and Answers */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <Typography variant="h2" className="text-xl font-bold mb-6">
          سوالات و پاسخ‌ها
        </Typography>

        {questions.length > 0 ? (
          <div className="space-y-6">
            {questions.map((question: any, index: number) => {
              // پیدا کردن پاسخ مربوط به این سوال
              const userAnswer = userSurvey?.answers?.find(
                (answer: any) => answer.questionId === question.id
              );
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                  {/* Question Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Typography className="font-bold text-gray-900 text-lg">
                        سوال {question.order + 1}
                      </Typography>
                      <div className="flex gap-2">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                          {question.type === "SingleChoice" ? "تک انتخابی" : 
                           question.type === "MultiChoice" ? "چند انتخابی" : 
                           question.type === "OpenEnded" ? "متنی" : question.type}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            question.required
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {question.required ? "اجباری" : "اختیاری"}
                        </span>
                      </div>
                    </div>
                    <Typography className="text-gray-800 mb-3">
                      {question.text}
                    </Typography>
                  </div>

                  {/* Question Choices (if applicable) */}
                  {question.choices && question.choices.length > 0 && (
                    <div className="mb-4">
                      <Typography className="text-sm font-medium text-gray-700 mb-2">
                        گزینه‌های موجود:
                      </Typography>
                      <div className="flex flex-wrap gap-2">
                        {question.choices.map((choice: string, choiceIndex: number) => (
                          <span key={choiceIndex} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                            {choice}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* User Answer */}
                  <div className="mb-3">
                    <Typography className="text-sm font-medium text-gray-700 mb-2">
                      پاسخ کاربر:
                    </Typography>
                    {userAnswer ? (
                      <div>
                        {renderAnswer(userAnswer, question.type)}
                        <div className="text-xs text-gray-400 mt-2">
                          تاریخ پاسخ: {formatDate(userAnswer.updatedAt)}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <Typography className="text-yellow-800 text-sm">
                          پاسخ داده نشده
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Typography className="text-gray-500">
              هیچ سوالی یافت نشد
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyResponseDetail;
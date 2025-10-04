import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Typography from "../../components/typography/Typography";
import SurveyTaker from "../../components/survey/SurveyTaker";
import Button from "../../components/button";
import { GetSurveyByIdAction } from "../../redux/actions/survey/SurveyActions";
import {
  selectGetSurveyByIdData,
  selectGetSurveyByIdLoading,
} from "../../redux/slice/survey/SurveySlice";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const PublicSurvey = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const survey = useSelector(selectGetSurveyByIdData);
  const surveyLoading = useSelector(selectGetSurveyByIdLoading);

  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(GetSurveyByIdAction(id));
    }
  }, [dispatch, id]);

  const handleStartSurvey = () => {
    setIsStarted(true);
  };

  const handleSubmitSurvey = async (responses: any) => {
    setSubmitLoading(true);
    try {
      // Here you would submit the responses to your API
      console.log("Survey responses:", responses);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsCompleted(true);
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancel = () => {
    setIsStarted(false);
  };

  if (surveyLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Typography className="text-lg">در حال بارگذاری نظرسنجی...</Typography>
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <Typography className="text-xl font-semibold mb-2">
              نظرسنجی یافت نشد
            </Typography>
            <Typography className="text-gray-600 mb-4">
              نظرسنجی مورد نظر وجود ندارد یا منتشر نشده است.
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (!survey.published) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <FiAlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <Typography className="text-xl font-semibold mb-2">
              نظرسنجی در دسترس نیست
            </Typography>
            <Typography className="text-gray-600 mb-4">
              این نظرسنجی هنوز منتشر نشده است.
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <Typography className="text-xl font-semibold mb-2">
              با تشکر از شما!
            </Typography>
            <Typography className="text-gray-600 mb-4">
              پاسخ‌های شما با موفقیت ثبت شد. از وقتی که برای تکمیل این نظرسنجی گذاشتید متشکریم.
            </Typography>
            <Typography className="text-sm text-gray-500">
              می‌توانید این صفحه را ببندید.
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (isStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <SurveyTaker
          survey={survey}
          onSubmit={handleSubmitSurvey}
          onCancel={handleCancel}
          loading={submitLoading}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-50 p-8 text-center">
            <Typography variant="h1" className="text-2xl font-bold mb-4">
              {survey.title}
            </Typography>
            <Typography className="text-gray-600 mb-6">
              {survey.description}
            </Typography>
            
            {/* Survey Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4">
                <Typography className="text-sm text-gray-600">تعداد سوالات</Typography>
                <Typography className="text-xl font-bold text-blue-600">
                  {survey.questions?.length || 0}
                </Typography>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Typography className="text-sm text-gray-600">زمان تقریبی</Typography>
                <Typography className="text-xl font-bold text-blue-600">
                  {Math.ceil((survey.questions?.length || 0) * 0.5)} دقیقه
                </Typography>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Typography className="text-sm text-gray-600">نوع نظرسنجی</Typography>
                <Typography className="text-xl font-bold text-blue-600">
                  عمومی
                </Typography>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <Typography className="text-gray-700 mb-6">
              برای شروع نظرسنجی روی دکمه زیر کلیک کنید. پاسخ‌های شما محرمانه خواهد بود.
            </Typography>

            <div className="space-y-4">
              <Button
                onClick={handleStartSurvey}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-600"
              >
                شروع نظرسنجی
              </Button>
              
              <div className="text-sm text-gray-500">
                <Typography>
                  با شرکت در این نظرسنجی، شما با شرایط و قوانین آن موافقت می‌کنید.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicSurvey;
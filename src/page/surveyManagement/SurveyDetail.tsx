import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Typography from "../../components/typography/Typography";
import QuestionManager from "../../components/survey/QuestionManager";
import SurveyViewer from "../../components/survey/SurveyViewer";
import SurveyResponses from "../../components/survey/SurveyResponses";
import {
  GetSurveyByIdAction,
  UpdateSurveyAction,
} from "../../redux/actions/survey/SurveyActions";
import {
  selectGetSurveyByIdData,
  selectGetSurveyByIdLoading,
  selectUpdateSurveyLoading,
} from "../../redux/slice/survey/SurveySlice";
import { Survey } from "../../redux/types/survey/SurveyTypes";
import { FiArrowRight, FiEye, FiUsers, FiEdit, FiSave } from "react-icons/fi";

type TabType = "questions" | "preview" | "responses" | "settings";

const SurveyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const survey = useSelector(selectGetSurveyByIdData);
  const surveyLoading = useSelector(selectGetSurveyByIdLoading);
  const updateLoading = useSelector(selectUpdateSurveyLoading);

  const [activeTab, setActiveTab] = useState<TabType>("questions");
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    title: "",
    description: "",
    published: false,
  });

  useEffect(() => {
    if (id) {
      dispatch(GetSurveyByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (survey) {
      setSettingsForm({
        title: survey.title,
        description: survey.description,
        published: survey.published,
      });
    }
  }, [survey]);

  const handleUpdateSettings = () => {
    if (!id) return;

    dispatch(
      UpdateSurveyAction({
        id,
        data: settingsForm,
      })
    ).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setIsEditingSettings(false);
        dispatch(GetSurveyByIdAction(id));
      }
    });
  };

  const handleQuestionsUpdate = () => {
    if (id) {
      dispatch(GetSurveyByIdAction(id));
    }
  };

  const tabs = [
    { id: "questions", label: "مدیریت سوالات", icon: <FiEdit /> },
    { id: "preview", label: "پیش‌نمایش", icon: <FiEye /> },
    { id: "responses", label: "پاسخ‌ها", icon: <FiUsers /> },
    { id: "settings", label: "تنظیمات", icon: <FiSave /> },
  ];

  if (surveyLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <Typography>در حال بارگذاری...</Typography>
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="p-6">
        <div className="text-center">
          <Typography className="text-red-500">نظرسنجی یافت نشد</Typography>
          <Button
            onClick={() => navigate("/survey-management")}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            بازگشت به لیست
          </Button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "questions":
        return (
          <QuestionManager
            surveyId={id!}
            questions={survey.questions || []}
            onQuestionsUpdate={handleQuestionsUpdate}
          />
        );

      case "preview":
        return (
          <div className="bg-white rounded-lg p-6">
            <Typography variant="h3" className="text-lg font-semibold mb-4">
              پیش‌نمایش نظرسنجی
            </Typography>
            <div className="border border-gray-200 rounded-lg p-4">
              <SurveyViewer survey={survey} onClose={() => {}} />
            </div>
          </div>
        );

      case "responses":
        return (
          <div className="bg-white rounded-lg p-6">
            <SurveyResponses survey={survey} onClose={() => {}} />
          </div>
        );

      case "settings":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h3" className="text-lg font-semibold">
                تنظیمات نظرسنجی
              </Typography>
              {!isEditingSettings && (
                <Button
                  onClick={() => setIsEditingSettings(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  <FiEdit className="ml-1" />
                  ویرایش
                </Button>
              )}
            </div>

            {isEditingSettings ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    عنوان نظرسنجی *
                  </label>
                  <input
                    type="text"
                    value={settingsForm.title}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, title: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    توضیحات *
                  </label>
                  <textarea
                    value={settingsForm.description}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settingsForm.published}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          published: e.target.checked,
                        })
                      }
                      className="ml-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium">منتشر شده</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={handleUpdateSettings}
                    loading={updateLoading}
                    className="bg-secondary-500 text-white px-4 py-2 rounded"
                  >
                    <FiSave className="ml-1" />
                    ذخیره تغییرات
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditingSettings(false);
                      setSettingsForm({
                        title: survey.title,
                        description: survey.description,
                        published: survey.published,
                      });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    انصراف
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Typography className="font-medium mb-1">عنوان:</Typography>
                  <Typography className="text-gray-700">{survey.title}</Typography>
                </div>

                <div>
                  <Typography className="font-medium mb-1">توضیحات:</Typography>
                  <Typography className="text-gray-700">{survey.description}</Typography>
                </div>

                <div>
                  <Typography className="font-medium mb-1">وضعیت:</Typography>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      survey.published
                        ? "bg-secondary-100 text-secondary-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {survey.published ? "منتشر شده" : "پیش‌نویس"}
                  </span>
                </div>

                <div>
                  <Typography className="font-medium mb-1">تعداد سوالات:</Typography>
                  <Typography className="text-gray-700">
                    {survey.questions?.length || 0} سوال
                  </Typography>
                </div>

                <div>
                  <Typography className="font-medium mb-1">تاریخ ایجاد:</Typography>
                  <Typography className="text-gray-700">
                    {survey.createdAt
                      ? new Date(survey.createdAt).toLocaleDateString("fa-IR")
                      : "-"}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/survey-management")}
            className="bg-gray-500 text-white p-2 rounded-lg"
          >
            <FiArrowRight />
          </Button>
          <div>
            <Typography variant="h1" className="text-2xl font-bold">
              {survey.title}
            </Typography>
            <Typography className="text-gray-600">
              مدیریت جزئیات نظرسنجی
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${
              survey.published
                ? "bg-secondary-100 text-secondary-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {survey.published ? "منتشر شده" : "پیش‌نویس"}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default SurveyDetail;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Typography from "../../components/typography/Typography";
import QuestionManager from "../../components/survey/QuestionManager";
import {
  GetSurveyByIdAction,
  UpdateSurveyAction,
} from "../../redux/actions/survey/SurveyActions";
import {
  selectGetSurveyByIdData,
  selectGetSurveyByIdLoading,
  selectUpdateSurveyLoading,
} from "../../redux/slice/survey/SurveySlice";
import { FiArrowRight, FiSave, FiEdit } from "react-icons/fi";

const SurveyEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const surveyData = useSelector(selectGetSurveyByIdData);
  const surveyLoading = useSelector(selectGetSurveyByIdLoading);
  const updateLoading = useSelector(selectUpdateSurveyLoading);

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [surveyForm, setSurveyForm] = useState({
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
    if (surveyData) {
      setSurveyForm({
        title: surveyData.title || "",
        description: surveyData.description || "",
        published: surveyData.published || false,
      });
    }
  }, [surveyData]);

  const handleUpdateSurveyInfo = () => {
    if (!id) return;

    // Only update survey basic info (title, description, published)
    dispatch(
      UpdateSurveyAction({
        id,
        data: surveyForm,
      })
    ).then((result: any) => {
      if (result.type.endsWith("/fulfilled")) {
        setIsEditingInfo(false);
        dispatch(GetSurveyByIdAction(id));
      }
    });
  };

  const handleQuestionsUpdate = () => {
    if (id) {
      dispatch(GetSurveyByIdAction(id));
    }
  };

  const handleCancel = () => {
    navigate("/survey-management");
  };

  if (surveyLoading) {
    return (
      <div className="p-16">
        <div className="text-center">
          <Typography>در حال بارگذاری...</Typography>
        </div>
      </div>
    );
  }

  if (!surveyData && !surveyLoading) {
    return (
      <div className="p-16">
        <div className="text-center">
          <Typography className="text-red-500">نظرسنجی یافت نشد</Typography>
          <Button
            onClick={() => navigate("/survey-management")}
            variant="primary"
            className="mt-4"
          >
            بازگشت به لیست
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-16">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={handleCancel}
          variant="outline-secondary"
          size="sm"
        >
          <FiArrowRight className="ml-1" />
          بازگشت
        </Button>
        <div>
          <Typography variant="h1" className="text-xl font-bold">
            ویرایش نظرسنجی
          </Typography>
          <Typography className="text-gray-600 mt-1 text-sm">
            {surveyData?.title || "در حال بارگذاری..."}
          </Typography>
        </div>
      </div>

      {surveyData && (
        <div className="space-y-6">
          {/* Survey Basic Info */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h3" className="text-lg font-semibold">
                اطلاعات اصلی نظرسنجی
              </Typography>
              {!isEditingInfo && (
                <Button
                  onClick={() => setIsEditingInfo(true)}
                  variant="outline-primary"
                  size="sm"
                >
                  <FiEdit className="ml-1" />
                  ویرایش
                </Button>
              )}
            </div>

            {isEditingInfo ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    عنوان نظرسنجی *
                  </label>
                  <input
                    type="text"
                    value={surveyForm.title}
                    onChange={(e) =>
                      setSurveyForm({ ...surveyForm, title: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="عنوان نظرسنجی را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    توضیحات *
                  </label>
                  <textarea
                    value={surveyForm.description}
                    onChange={(e) =>
                      setSurveyForm({
                        ...surveyForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg h-24"
                    placeholder="توضیحات نظرسنجی را وارد کنید"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={surveyForm.published}
                      onChange={(e) =>
                        setSurveyForm({
                          ...surveyForm,
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
                    onClick={handleUpdateSurveyInfo}
                    loading={updateLoading}
                    variant="primary"
                    size="sm"
                  >
                    <FiSave className="ml-1" />
                    ذخیره تغییرات
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditingInfo(false);
                      setSurveyForm({
                        title: surveyData.title || "",
                        description: surveyData.description || "",
                        published: surveyData.published || false,
                      });
                    }}
                    variant="outline-secondary"
                    size="sm"
                  >
                    انصراف
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Typography className="font-medium mb-1">عنوان:</Typography>
                  <Typography className="text-gray-700">{surveyData.title}</Typography>
                </div>

                <div>
                  <Typography className="font-medium mb-1">توضیحات:</Typography>
                  <Typography className="text-gray-700">{surveyData.description}</Typography>
                </div>

                <div>
                  <Typography className="font-medium mb-1">وضعیت:</Typography>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      surveyData.published
                        ? "bg-secondary-100 text-secondary-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {surveyData.published ? "منتشر شده" : "پیش‌نویس"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Questions Management */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <Typography variant="h3" className="text-lg font-semibold mb-4">
              مدیریت سوالات
            </Typography>
            <QuestionManager
              surveyId={id!}
              questions={surveyData.questions || []}
              onQuestionsUpdate={handleQuestionsUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyEdit;
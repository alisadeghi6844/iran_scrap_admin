import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/button";
import Typography from "../../components/typography/Typography";
import {
  CreateSurveyAction,
  GetAllSurveysAction,
  DeleteSurveyAction,
} from "../../redux/actions/survey/SurveyActions";
import {
  selectGetAllSurveysData,
  selectGetAllSurveysLoading,
  selectCreateSurveyLoading,
  selectDeleteSurveyLoading,
} from "../../redux/slice/survey/SurveySlice";

const SurveyManagement = () => {
  const dispatch = useDispatch();
  
  const surveysData = useSelector(selectGetAllSurveysData);
  const surveysLoading = useSelector(selectGetAllSurveysLoading);
  const createLoading = useSelector(selectCreateSurveyLoading);
  const deleteLoading = useSelector(selectDeleteSurveyLoading);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");

  useEffect(() => {
    dispatch(GetAllSurveysAction({}));
  }, [dispatch]);

  const handleCreateSurvey = () => {
    if (surveyTitle.trim()) {
      dispatch(CreateSurveyAction({
        title: surveyTitle,
        description: surveyDescription,
      }));
      setSurveyTitle("");
      setSurveyDescription("");
      setShowCreateForm(false);
    }
  };

  const handleDeleteSurvey = (id: string) => {
    if (window.confirm("آیا از حذف این نظرسنجی اطمینان دارید؟")) {
      dispatch(DeleteSurveyAction(id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h1" className="text-2xl font-bold">
          مدیریت نظرسنجی ها
        </Typography>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-primary-500 text-white px-4 py-2 rounded"
        >
          ایجاد نظرسنجی جدید
        </Button>
      </div>

      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <Typography variant="h2" className="text-lg font-semibold mb-4">
            ایجاد نظرسنجی جدید
          </Typography>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">عنوان نظرسنجی</label>
              <input
                type="text"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="عنوان نظرسنجی را وارد کنید"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">توضیحات</label>
              <textarea
                value={surveyDescription}
                onChange={(e) => setSurveyDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-24"
                placeholder="توضیحات نظرسنجی را وارد کنید"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCreateSurvey}
                loading={createLoading}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                ایجاد
              </Button>
              <Button
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                انصراف
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        {surveysLoading ? (
          <div className="p-6 text-center">
            <Typography>در حال بارگذاری...</Typography>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    عنوان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    توضیحات
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    تاریخ ایجاد
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {surveysData?.length > 0 ? (
                  surveysData.map((survey: any) => (
                    <tr key={survey.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Typography>{survey.title}</Typography>
                      </td>
                      <td className="px-6 py-4">
                        <Typography className="text-gray-600">
                          {survey.description || "بدون توضیحات"}
                        </Typography>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Typography className="text-gray-500">
                          {survey.createdAt ? new Date(survey.createdAt).toLocaleDateString('fa-IR') : "-"}
                        </Typography>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleDeleteSurvey(survey.id)}
                            loading={deleteLoading}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                          >
                            حذف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center">
                      <Typography className="text-gray-500">
                        هیچ نظرسنجی یافت نشد
                      </Typography>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyManagement;
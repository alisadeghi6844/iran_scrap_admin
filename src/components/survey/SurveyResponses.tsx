import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Survey } from "../../redux/types/survey/SurveyTypes";
import Typography from "../typography/Typography";
import Button from "../button";
import Modal from "../modal";
import { FiX, FiDownload, FiEye, FiUsers } from "react-icons/fi";
import {
  GetUserSurveysAction,
} from "../../redux/actions/survey/SurveyActions";
import {
  selectGetUserSurveysData,
  selectGetUserSurveysLoading,
} from "../../redux/slice/survey/SurveySlice";

interface SurveyResponsesProps {
  survey: Survey;
  onClose: () => void;
  open?: boolean;
}

const SurveyResponses: React.FC<SurveyResponsesProps> = ({ survey, onClose, open = true }) => {
  const dispatch = useDispatch();
  const responsesDataRaw = useSelector(selectGetUserSurveysData);
  const responsesLoading = useSelector(selectGetUserSurveysLoading);
  
  // Handle both array and object response
  const responsesData = Array.isArray(responsesDataRaw) ? responsesDataRaw : (responsesDataRaw?.data || []);

  useEffect(() => {
    if (survey.id) {
      dispatch(GetUserSurveysAction(survey.id.toString()));
    }
  }, [dispatch, survey.id]);

  const handleExportResponses = () => {
    // Implementation for exporting responses to CSV/Excel
    console.log("Exporting responses...");
  };

  const handleViewResponse = (responseId: string) => {
    // Implementation for viewing individual response
    console.log("Viewing response:", responseId);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="2xl"
      headerTitle={`پاسخ‌های: ${survey.title}`}
      headerIcon={<FiUsers className="ml-2" />}
    >
      <div className="space-y-4">
        {/* Export Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleExportResponses}
            variant="success"
            size="sm"
          >
            <FiDownload className="ml-1" />
            خروجی Excel
          </Button>
        </div>

        {/* Survey Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <Typography className="text-xs text-gray-600">کل پاسخ‌ها</Typography>
            <Typography className="text-lg font-bold text-blue-600">
              {responsesData?.length || 0}
            </Typography>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <Typography className="text-xs text-gray-600">تکمیل شده</Typography>
            <Typography className="text-lg font-bold text-green-600">
              {responsesData?.filter((r: any) => r.completed)?.length || 0}
            </Typography>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <Typography className="text-xs text-gray-600">در حال انجام</Typography>
            <Typography className="text-lg font-bold text-yellow-600">
              {responsesData?.filter((r: any) => !r.completed)?.length || 0}
            </Typography>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <Typography className="text-xs text-gray-600">نرخ تکمیل</Typography>
            <Typography className="text-lg font-bold text-purple-600">
              {responsesData?.length > 0
                ? Math.round(
                    (responsesData.filter((r: any) => r.completed).length /
                      responsesData.length) *
                      100
                  )
                : 0}
              %
            </Typography>
          </div>
        </div>

        {/* Responses Table */}
        {responsesLoading ? (
          <div className="text-center py-6">
            <Typography className="text-sm">در حال بارگذاری پاسخ‌ها...</Typography>
          </div>
        ) : (
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                      شناسه
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                      کاربر
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                      وضعیت
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                      تاریخ شروع
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {responsesData?.length > 0 ? (
                    responsesData.map((response: any) => (
                      <tr key={response.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <Typography className="font-medium text-gray-900 text-xs">
                            #{response.id}
                          </Typography>
                        </td>
                        <td className="px-4 py-3">
                          <Typography className="text-gray-900 text-xs">
                            {response.user?.name || response.user?.email || "کاربر ناشناس"}
                          </Typography>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              response.completed
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {response.completed ? "تکمیل" : "در حال انجام"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Typography className="text-gray-500 text-xs">
                            {response.startedAt
                              ? new Date(response.startedAt).toLocaleDateString("fa-IR")
                              : "-"}
                          </Typography>
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            onClick={() => handleViewResponse(response.id)}
                            variant="outline-primary"
                            size="xs"
                            title="مشاهده پاسخ"
                          >
                            <FiEye />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center">
                        <div className="flex flex-col items-center">
                          <Typography className="text-gray-500 text-sm mb-1">
                            هیچ پاسخی یافت نشد
                          </Typography>
                          <Typography className="text-gray-400 text-xs">
                            هنوز کسی به این نظرسنجی پاسخ نداده است
                          </Typography>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SurveyResponses;
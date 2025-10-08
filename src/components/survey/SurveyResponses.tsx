import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Survey } from "../../redux/types/survey/SurveyTypes";
import { HandleFilterParams } from "../../types/FilterParams";
import Typography from "../typography/Typography";
import Button from "../button";
import Modal from "../modal";
import { FiUsers, FiEye } from "react-icons/fi";
import {
  GetUserSurveysAction,
} from "../../redux/actions/survey/SurveyActions";
import {
  selectGetUserSurveysData,
  selectGetUserSurveysLoading,
} from "../../redux/slice/survey/SurveySlice";
import CollectionControls from "../../container/organism/CollectionControls";
import Table from "../table";
import TableHead from "../table/TableHead";
import TableHeadCell from "../table/TableHeadCell";
import TableRow from "../table/TableRow";
import TableBody from "../table/TableBody";
import TableCell from "../table/TableCell";
import EmptyImage from "../image/EmptyImage";
import TableSkeleton from "../../container/organism/skeleton/TableSkeleton";

interface SurveyResponsesProps {
  survey: Survey;
  onClose: () => void;
  open?: boolean;
}

const SurveyResponses: React.FC<SurveyResponsesProps> = ({ survey, onClose, open = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responsesDataRaw = useSelector(selectGetUserSurveysData);
  const responsesLoading = useSelector(selectGetUserSurveysLoading);

  const filterDefaultInitialValues = {};

  const responsesData = responsesDataRaw;

  useEffect(() => {
    if (survey.id) {
      dispatch(GetUserSurveysAction({ 
        surveyId: survey.id.toString(), 
        page: 1, 
        size: 20 
      }) as any);
    }
  }, [dispatch, survey.id]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetUserSurveysAction({
        surveyId: survey.id.toString(),
        page: page ?? 1,
        size: pageSize ?? 20,
      }) as any
    );
  };

  const handleFilterParameters = (data: unknown) => {
    // اگر فیلتری نیاز باشد اینجا پیاده‌سازی می‌شود
    return "";
  };

  const handleViewResponse = (responseId: string) => {
    // Navigate to response detail page with responseId in URL
    navigate(`/survey-response/${responseId}`);
  };

  // محاسبه آمار بر اساس DTO جدید
  const totalResponses = responsesData?.total || 0;
  const currentPageResponses = responsesData?.data || [];
  const completedResponses = currentPageResponses?.filter((r: any) => r.completed)?.length || 0;
  const inProgressResponses = currentPageResponses?.filter((r: any) => !r.completed)?.length || 0;
  const completionRate = currentPageResponses.length > 0 ? Math.round((completedResponses / currentPageResponses.length) * 100) : 0;

  // تبدیل timestamp به تاریخ فارسی
  const formatDate = (timestamp: number) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    return date.toLocaleDateString("fa-IR");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="7xl"
      headerTitle={`پاسخ‌های: ${survey.title}`}
      headerIcon={<FiUsers className="ml-2" />}
    >
      <div className="space-y-4">
        {/* آمار نظرسنجی */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <Typography className="text-xs text-gray-600">کل پاسخ‌ها</Typography>
            <Typography className="text-lg font-bold text-blue-600">
              {totalResponses}
            </Typography>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <Typography className="text-xs text-gray-600">تکمیل شده</Typography>
            <Typography className="text-lg font-bold text-green-600">
              {completedResponses}
            </Typography>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <Typography className="text-xs text-gray-600">در حال انجام</Typography>
            <Typography className="text-lg font-bold text-yellow-600">
              {inProgressResponses}
            </Typography>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <Typography className="text-xs text-gray-600">نرخ تکمیل</Typography>
            <Typography className="text-lg font-bold text-purple-600">
              {completionRate}%
            </Typography>
          </div>
        </div>

        {/* جدول پاسخ‌ها با pagination */}
        <CollectionControls
          buttons={["filter"]}
          hasBox={false}
          filterInitialValues={filterDefaultInitialValues}
          onFilter={handleFilterParameters}
          data={responsesData}
          onMetaChange={handleFilter}
        >
          <Table className="w-full" isLoading={false} shadow={false}>
            <TableHead className="w-full" isLoading={false} shadow={false}>
              <TableRow>
                <TableHeadCell>کاربر</TableHeadCell>
                <TableHeadCell>وضعیت</TableHeadCell>
                <TableHeadCell>تعداد پاسخ‌ها</TableHeadCell>
                <TableHeadCell>تاریخ ایجاد</TableHeadCell>
                <TableHeadCell>آخرین بروزرسانی</TableHeadCell>
                <TableHeadCell>عملیات</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!responsesLoading ? (
                currentPageResponses?.length > 0 ? (
                  currentPageResponses.map((response: any) => (
                    <TableRow key={response.id}>
                      <TableCell>
                        <Typography className="text-gray-900 text-sm">
                          {response.userId ? `کاربر ${response.userId.slice(-8)}` : "کاربر ناشناس"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            response.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {response.completed ? "تکمیل شده" : "در حال انجام"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-gray-900 text-sm">
                          {response.answers?.length || 0} پاسخ
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-gray-500 text-sm">
                          {formatDate(response.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-gray-500 text-sm">
                          {formatDate(response.updatedAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleViewResponse(response.id)}
                          variant="outline-primary"
                          size="sm"
                          title="مشاهده جزئیات پاسخ"
                        >
                          <FiEye className="ml-1" />
                          مشاهده
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colspan="6" className="flex justify-center !py-4">
                      <div className="flex flex-col items-center">
                        <EmptyImage />
                        <Typography className="text-gray-500 text-sm mb-1 mt-2">
                          هیچ پاسخی یافت نشد
                        </Typography>
                        <Typography className="text-gray-400 text-xs">
                          هنوز کسی به این نظرسنجی پاسخ نداده است
                        </Typography>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colspan="6" className="flex justify-center !py-4">
                    <TableSkeleton />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CollectionControls>
      </div>
    </Modal>
  );
};

export default SurveyResponses;
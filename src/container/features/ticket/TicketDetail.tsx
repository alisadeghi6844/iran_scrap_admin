import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button";
import { GetTicketByIdAction } from "../../../redux/actions/ticket/TicketActions";
import { 
  selectGetTicketByIdData, 
  selectGetTicketByIdLoading 
} from "../../../redux/slice/ticket/TicketSlice";

interface TicketDetailProps {
  ticket: any;
  onSubmit: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({
  ticket,
  onSubmit,
}) => {
  const dispatch: any = useDispatch();
  const ticketDetail = useSelector(selectGetTicketByIdData);
  const loading = useSelector(selectGetTicketByIdLoading);

  useEffect(() => {
    if (ticket?._id) {
      dispatch(
        GetTicketByIdAction({
          credentials: ticket._id,
        })
      );
    }
  }, [dispatch, ticket?._id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "WAIT_FOR_ANSWER":
        return "bg-orange-100 text-orange-800";
      case "ANSWERED":
        return "bg-blue-100 text-blue-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      case "OPEN":
        return "bg-primary-100 text-primary-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "WAIT_FOR_ANSWER":
        return "در انتظار پاسخ";
      case "ANSWERED":
        return "پاسخ داده شده";
      case "ADMIN_CLOSED":
        return "بسته شده";
      case "OPEN":
        return "باز";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "LOW":
        return "bg-primary-100 text-primary-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "بالا";
      case "MEDIUM":
        return "متوسط";
      case "LOW":
        return "پایین";
      default:
        return priority;
    }
  };

  const getSubjectText = (subject: string) => {
    switch (subject) {
      case "PRODUCT":
        return "محصول";
      case "ORDER":
        return "سفارش";
      case "SUPPORT":
        return "پشتیبانی";
      default:
        return subject;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  const data = ticketDetail?.data || ticket;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          جزئیات تیکت
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* اطلاعات اصلی */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                عنوان
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                {data?.title || "_"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                موضوع
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                {getSubjectText(data?.subject)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اولویت
              </label>
              <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(data?.priority)}`}>
                {getPriorityText(data?.priority)}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وضعیت
              </label>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(data?.status)}`}>
                {getStatusText(data?.status)}
              </span>
            </div>
          </div>

          {/* اطلاعات کاربر و تاریخ */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                کاربر
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                {data?.user ? `${data.user.firstName} ${data.user.lastName}` : "_"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تاریخ ایجاد
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                {data?.createdAt ? new Date(data.createdAt).toLocaleDateString("fa-IR") : "_"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                آخرین بروزرسانی
              </label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString("fa-IR") : "_"}
              </p>
            </div>
          </div>
        </div>

        {/* محتوای تیکت */}
        {data?.description && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیحات
            </label>
            <div className="bg-gray-50 p-4 rounded-md border">
              <p className="text-gray-900 whitespace-pre-wrap">
                {data.description}
              </p>
            </div>
          </div>
        )}

        {/* پیام‌ها یا پاسخ‌ها */}
        {data?.messages && data.messages.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              پیام‌ها و پاسخ‌ها
            </label>
            <div className="space-y-3">
              {data.messages.map((message: any, index: number) => (
                <div key={index} className="bg-white border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {message.sender || "نامشخص"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {message.createdAt ? new Date(message.createdAt).toLocaleDateString("fa-IR") : ""}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {message.content || message.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={onSubmit}
        >
          بستن
        </Button>
      </div>
    </div>
  );
};

export default TicketDetail;
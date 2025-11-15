import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button";
import { CloseTicketAction } from "../../../redux/actions/ticket/TicketActions";
import { selectCloseTicketLoading } from "../../../redux/slice/ticket/TicketSlice";

interface TicketCloseConfirmProps {
  ticket: any;
  onSubmitForm: () => void;
}

const TicketCloseConfirm: React.FC<TicketCloseConfirmProps> = ({
  ticket,
  onSubmitForm,
}) => {
  const dispatch: any = useDispatch();
  const loading = useSelector(selectCloseTicketLoading);

  const handleConfirm = () => {
    dispatch(
      CloseTicketAction({
        ticketId: ticket._id,
        onSuccess: () => {
          onSubmitForm();
        },
      })
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-red-600">
          بستن تیکت
        </h3>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                هشدار
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>آیا از بستن این تیکت اطمینان دارید؟ این عمل قابل بازگشت نیست.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-md p-4">
          <h4 className="font-medium text-gray-900 mb-2">اطلاعات تیکت:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>عنوان:</strong> {ticket?.title}</p>
            <p><strong>موضوع:</strong> {ticket?.subject === "PRODUCT" ? "محصول" : 
                                        ticket?.subject === "ORDER" ? "سفارش" :
                                        ticket?.subject === "SUPPORT" ? "پشتیبانی" :
                                        ticket?.subject}</p>
            <p><strong>اولویت:</strong> {ticket?.priority === "HIGH" ? "بالا" :
                                         ticket?.priority === "MEDIUM" ? "متوسط" :
                                         ticket?.priority === "LOW" ? "پایین" :
                                         ticket?.priority}</p>
            <p><strong>کاربر:</strong> {ticket?.user ? `${ticket.user.firstName} ${ticket.user.lastName}` : "_"}</p>
            <p><strong>وضعیت فعلی:</strong> 
              <span className={`px-2 py-1 rounded-full text-xs ml-2 ${
                ticket?.status === "WAIT_FOR_ANSWER" ? "bg-orange-100 text-orange-800" :
                ticket?.status === "ANSWERED" ? "bg-blue-100 text-blue-800" :
                ticket?.status === "OPEN" ? "bg-green-100 text-green-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {ticket?.status === "WAIT_FOR_ANSWER" ? "در انتظار پاسخ" :
                 ticket?.status === "ANSWERED" ? "پاسخ داده شده" :
                 ticket?.status === "OPEN" ? "باز" :
                 ticket?.status}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          variant="primary"
          onClick={onSubmitForm}
          disabled={loading}
        >
          انصراف
        </Button>
        <Button
          variant="error"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "در حال بستن..." : "بله، تیکت را ببند"}
        </Button>
      </div>
    </div>
  );
};

export default TicketCloseConfirm;
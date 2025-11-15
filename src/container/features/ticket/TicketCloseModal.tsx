import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import { CloseTicketAction } from "../../../redux/actions/ticket/TicketActions";
import { selectCloseTicketLoading } from "../../../redux/slice/ticket/TicketSlice";
import { getStatusLabel } from "../../../utils/ticketHelpers";

interface TicketCloseModalProps {
  ticket: any;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const TicketCloseModal: React.FC<TicketCloseModalProps> = ({
  ticket,
  open,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectCloseTicketLoading);

  const handleConfirm = () => {
    dispatch(
      CloseTicketAction({
        ticketId: ticket._id,
        onSuccess: () => {
          onClose();
          onSuccess && onSuccess();
        },
      })
    );
  };

  if (!ticket) return null;



  return (
    <Modal
      open={open}
      onClose={onClose}
      headerTitle="بستن تیکت"
      size="md"
    >
      <div className="space-y-4">
        {/* پیام تأیید */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            آیا مطمئن هستید؟
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            این عمل قابل بازگشت نیست. تیکت بسته شده و امکان ارسال پاسخ جدید وجود نخواهد داشت.
          </p>
        </div>

        {/* اطلاعات تیکت */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">عنوان:</span>
              <p className="text-gray-900">{ticket.title}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">وضعیت فعلی:</span>
              <p className="text-gray-900">{getStatusLabel(ticket.status)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">کاربر:</span>
              <p className="text-gray-900">
                {ticket.user ? `${ticket.user.firstName} ${ticket.user.lastName}` : "_"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">تاریخ ایجاد:</span>
              <p className="text-gray-900">
                {ticket.createdAt
                  ? new Date(ticket.createdAt).toLocaleDateString("fa-IR")
                  : "_"}
              </p>
            </div>
          </div>
        </div>

        {/* دکمه‌های عملیات */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            انصراف
          </Button>
          <Button
            variant="error"
            onClick={handleConfirm}
            disabled={loading}
            loading={loading}
          >
            بستن تیکت
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TicketCloseModal;
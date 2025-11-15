import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import TextArea from "../../../components/textArea";
import MessageFileAttachment from "./MessageFileAttachment";
import { AnswerTicketAction } from "../../../redux/actions/ticket/TicketActions";
import { selectAnswerTicketLoading } from "../../../redux/slice/ticket/TicketSlice";

interface TicketAnswerModalProps {
  ticket: any;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const TicketAnswerModal: React.FC<TicketAnswerModalProps> = ({
  ticket,
  open,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState("");
  const loading = useSelector(selectAnswerTicketLoading);

  const handleSubmit = () => {
    if (!message.trim()) {
      return;
    }

    dispatch(
      AnswerTicketAction({
        ticketId: ticket._id,
        message: message.trim(),
        onSuccess: () => {
          setMessage("");
          onClose();
          onSuccess && onSuccess();
        },
      })
    );
  };

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  if (!ticket) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      headerTitle="پاسخ به تیکت"
      size="md"
    >
      <div className="space-y-4">
        {/* اطلاعات تیکت */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            {ticket.title}
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            کاربر: {ticket.user ? `${ticket.user.firstName} ${ticket.user.lastName}` : "_"}
          </p>
          
          {/* آخرین پیام کاربر */}
          {ticket.messages && ticket.messages.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-600 mb-2">آخرین پیام کاربر:</p>
              {(() => {
                const userMessages = [...ticket.messages]
                  .filter((msg: any) => msg.senderType === "USER")
                  .sort((a: any, b: any) => b.createdAt - a.createdAt);
                const lastUserMessage = userMessages[0];
                
                return lastUserMessage ? (
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {lastUserMessage.message}
                    </p>
                    
                    {/* نمایش فایل در صورت وجود */}
                    {lastUserMessage.file && (
                      <MessageFileAttachment
                        fileUrl={lastUserMessage.file}
                        isUserMessage={true}
                      />
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(lastUserMessage.createdAt).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">پیامی از کاربر یافت نشد.</p>
                );
              })()}
            </div>
          )}
        </div>

        {/* فرم پاسخ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            پاسخ شما
          </label>
          <TextArea
            value={message}
            onChange={(value: string) => setMessage(value)}
            placeholder="پاسخ خود را اینجا بنویسید..."
            rows={6}
            className="w-full"
          />
        </div>

        {/* دکمه‌های عملیات */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            انصراف
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!message.trim() || loading}
            loading={loading}
          >
            ارسال پاسخ
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TicketAnswerModal;
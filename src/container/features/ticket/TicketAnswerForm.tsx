import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button";
import { AnswerTicketAction } from "../../../redux/actions/ticket/TicketActions";
import { selectAnswerTicketLoading } from "../../../redux/slice/ticket/TicketSlice";

interface TicketAnswerFormProps {
  ticket: any;
  onSubmitForm: () => void;
}

const TicketAnswerForm: React.FC<TicketAnswerFormProps> = ({
  ticket,
  onSubmitForm,
}) => {
  const dispatch: any = useDispatch();
  const [message, setMessage] = useState<string>("");
  const loading = useSelector(selectAnswerTicketLoading);

  const handleSubmit = () => {
    if (message.trim()) {
      dispatch(
        AnswerTicketAction({
          ticketId: ticket._id,
          message: message,
          onSuccess: () => {
            onSubmitForm();
          },
        })
      );
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          پاسخ به تیکت: {ticket?.title}
        </h3>
        <div className="text-sm text-gray-600 mb-4">
          <p><strong>موضوع:</strong> {ticket?.subject === "PRODUCT" ? "محصول" : 
                                      ticket?.subject === "ORDER" ? "سفارش" :
                                      ticket?.subject === "SUPPORT" ? "پشتیبانی" :
                                      ticket?.subject}</p>
          <p><strong>اولویت:</strong> {ticket?.priority === "HIGH" ? "بالا" :
                                       ticket?.priority === "MEDIUM" ? "متوسط" :
                                       ticket?.priority === "LOW" ? "پایین" :
                                       ticket?.priority}</p>
          <p><strong>کاربر:</strong> {ticket?.user ? `${ticket.user.firstName} ${ticket.user.lastName}` : "_"}</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          پیام پاسخ
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={6}
          placeholder="پیام خود را وارد کنید..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          variant="error"
          onClick={onSubmitForm}
          disabled={loading}
        >
          انصراف
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={!message.trim() || loading}
        >
          {loading ? "در حال ارسال..." : "ارسال پاسخ"}
        </Button>
      </div>
    </div>
  );
};

export default TicketAnswerForm;
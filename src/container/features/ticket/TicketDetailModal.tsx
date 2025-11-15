import React from "react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import MessageFileAttachment from "./MessageFileAttachment";
import {
  getSubjectLabel,
  getPriorityLabel,
  getStatusLabel,
  getPriorityColor,
  getStatusColor,
} from "../../../utils/ticketHelpers";

interface TicketDetailModalProps {
  ticket: any;
  open: boolean;
  onClose: () => void;
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({
  ticket,
  open,
  onClose,
}) => {
  if (!ticket) return null;



  return (
    <Modal
      open={open}
      onClose={onClose}
      headerTitle="جزئیات تیکت"
      size="lg"
    >
      <div className="space-y-6">
        {/* اطلاعات اصلی تیکت */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان تیکت
            </label>
            <p className="text-gray-900 bg-gray-50 p-2 rounded">
              {ticket.title || "_"}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              موضوع
            </label>
            <p className="text-gray-900 bg-gray-50 p-2 rounded">
              {getSubjectLabel(ticket.subject)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اولویت
            </label>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${getPriorityColor(
                ticket.priority
              )}`}
            >
              {getPriorityLabel(ticket.priority)}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وضعیت
            </label>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(
                ticket.status
              )}`}
            >
              {getStatusLabel(ticket.status)}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              کاربر
            </label>
            <p className="text-gray-900 bg-gray-50 p-2 rounded">
              {ticket.user
                ? `${ticket.user.firstName} ${ticket.user.lastName}`
                : "_"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاریخ ایجاد
            </label>
            <p className="text-gray-900 bg-gray-50 p-2 rounded">
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleDateString("fa-IR")
                : "_"}
            </p>
          </div>
        </div>

        {/* گفتگوها */}
        {ticket.messages && ticket.messages.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              گفتگوها ({ticket.messages.length})
            </label>
            <div className="space-y-4 max-h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg">
              {[...ticket.messages]
                .sort((a: any, b: any) => a.createdAt - b.createdAt)
                .map((message: any, index: number) => (
                  <div
                    key={message.id || index}
                    className={`flex ${
                      message.senderType === "USER" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.senderType === "USER"
                          ? "bg-white border border-gray-200 text-gray-900"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`text-xs font-medium ${
                            message.senderType === "USER"
                              ? "text-gray-600"
                              : "text-blue-100"
                          }`}
                        >
                          {message.senderType === "USER" ? "کاربر" : "ادمین"}
                        </span>
                        <span
                          className={`text-xs ${
                            message.senderType === "USER"
                              ? "text-gray-500"
                              : "text-blue-100"
                          }`}
                        >
                          {message.createdAt
                            ? new Date(message.createdAt).toLocaleDateString("fa-IR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.message}
                      </p>
                      
                      {/* نمایش فایل در صورت وجود */}
                      {message.file && (
                        <MessageFileAttachment
                          fileUrl={message.file}
                          isUserMessage={message.senderType === "USER"}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* در صورت عدم وجود پیام */}
        {(!ticket.messages || ticket.messages.length === 0) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              گفتگوها
            </label>
            <div className="bg-gray-50 p-4 rounded-lg border text-center">
              <p className="text-gray-500">هیچ پیامی برای این تیکت ثبت نشده است.</p>
            </div>
          </div>
        )}

        {/* دکمه‌های عملیات */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            بستن
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TicketDetailModal;
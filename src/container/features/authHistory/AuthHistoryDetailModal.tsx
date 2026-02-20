import React from 'react';
import Modal from '../../../components/modal';
import Button from '../../../components/button';

interface AuthHistoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const DetailItem = ({ label, value }: { label: string; value: any }) => (
  <div className="py-2 border-b flex justify-between">
    <span className="font-semibold text-gray-600">{label}:</span>
    <span className="text-gray-800 text-left" dir="ltr">{value ?? '_'}</span>
  </div>
);

const typeToPersian = (type: string) => {
  switch (type) {
    case "LOGIN":
      return "ورود به سیستم";
    case "LOGOUT":
      return "خروج از سیستم";
    default:
      return type;
  }
};

const AuthHistoryDetailModal: React.FC<AuthHistoryDetailModalProps> = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  let userAgentData = {};
  try {
    if (data.userAgent) {
      userAgentData = JSON.parse(data.userAgent);
    }
  } catch (error) {
    console.warn("JSON Parse Failed for userAgent:", error.message);
    // Fallback for plain string or malformed JSON
    userAgentData = { raw: data.userAgent };
  }

  const { ua, browser, cpu, device, engine, os, raw } = userAgentData as any;

  return (
    <Modal open={isOpen} onClose={onClose} headerTitle="جزئیات کامل ورود" size="2xl">
      <div className="p-6 space-y-4">
        <h3 className="font-bold text-lg border-b pb-2 mb-4">اطلاعات کاربر</h3>
        <DetailItem label="نام کامل" value={`${data.user?.firstName || ''} ${data.user?.lastName || ''}`.trim()} />
        <DetailItem label="موبایل" value={data.user?.mobile} />
        <DetailItem label="شناسه کاربر" value={data.userId} />

        <h3 className="font-bold text-lg border-b pb-2 my-4 pt-4">اطلاعات اتصال</h3>
        <DetailItem label="آدرس IP" value={data.ip} />
        <DetailItem label="نوع رویداد" value={typeToPersian(data.type)} />
        <DetailItem label="تاریخ" value={new Date(data.createdAt).toLocaleString('fa-IR')} />

        <h3 className="font-bold text-lg border-b pb-2 my-4 pt-4">اطلاعات دستگاه (User Agent)</h3>
        {raw ? (
          <DetailItem label="Raw User Agent" value={raw} />
        ) : (
          <>
            <DetailItem label="مرورگر" value={`${browser?.name || 'N/A'} (${browser?.version || 'N/A'})`} />
            <DetailItem label="موتور مرورگر" value={`${engine?.name || 'N/A'} (${engine?.version || 'N/A'})`} />
            <DetailItem label="سیستم عامل" value={`${os?.name || 'N/A'} (${os?.version || 'N/A'})`} />
            <DetailItem label="پردازنده" value={cpu?.architecture || 'N/A'} />
            <DetailItem label="User Agent کامل" value={ua} />
          </>
        )}
      </div>
      <div className="flex justify-end p-4 bg-gray-50">
        <Button variant="outline-gray" onClick={onClose}>
          بستن
        </Button>
      </div>
    </Modal>
  );
};

export default AuthHistoryDetailModal;

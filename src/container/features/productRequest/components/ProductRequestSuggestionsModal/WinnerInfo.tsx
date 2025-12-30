import React from "react";
import Typography from "../../../../../components/typography/Typography";

interface WinnerInfoProps {
  offerData: any;
  getProviderName: (provider: any) => string;
  formatPrice: (price: number) => string;
  formatDate: (timestamp: number) => string;
  formatDateTime: (timestamp: number) => string;
  getStatusText: (status: string) => string;
}

// Extracted from ProductRequestSuggestionsModal without UI/logic changes
const WinnerInfo: React.FC<WinnerInfoProps> = ({
  offerData,
  getProviderName,
  formatPrice,
  formatDate,
  formatDateTime,
  getStatusText,
}) => {
  if (!offerData?.winner) return null;

  return (
    <div className="mt-10 relative">
      {/* Winner Badge */}
      <div className="absolute -top-6 right-4 z-10">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <span className="text-lg">🏆</span>
          <Typography variant="body2" className="font-bold">
            پیشنهاد برنده
          </Typography>
        </div>
      </div>

      <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 border-2 border-secondary-200 rounded-xl p-6 shadow-lg">
        {/* Header with Provider Info */}
        <div className="mb-6">
          {(() => {
            const winnerProvider = offerData.providerIds?.find(
              (p: any) => p.id === offerData.winner.providerId
            );
            return winnerProvider ? (
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Typography variant="h6" className="text-secondary-800 font-bold">
                    {getProviderName(winnerProvider)}
                  </Typography>
                  <Typography variant="body2" className="text-secondary-600">
                    {winnerProvider.mobile}
                  </Typography>
                </div>
                <div className="text-left">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    {getStatusText(offerData.winner.status)}
                  </span>
                </div>
              </div>
            ) : null;
          })()}
        </div>

        {/* Price Highlight */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-green-100">
          <div className="text-center">
            <Typography variant="caption" className="text-green-600 block mb-2">
              قیمت نهایی
            </Typography>
            <Typography variant="h4" className="font-bold text-green-800 mb-2">
              {formatPrice(offerData.winner.price + offerData.winner.shippingPrice)}
            </Typography>
            <div className="flex justify-center gap-4 text-sm text-green-600">
              <span>قیمت کالا: {formatPrice(offerData.winner.price)}</span>
              <span>•</span>
              <span>حمل: {formatPrice(offerData.winner.shippingPrice)}</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600">📅</span>
              <Typography variant="caption" className="text-green-600 font-medium">
                زمان تحویل
              </Typography>
            </div>
            <Typography variant="body2" className="text-green-800 font-bold">
              {formatDate(offerData.winner.deliveryTime)}
            </Typography>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600">💳</span>
              <Typography variant="caption" className="text-green-600 font-medium">
                نوع پرداخت
              </Typography>
            </div>
            <Typography variant="body2" className="text-green-800 font-bold">
              {offerData.winner.paymentType === "CASH" ? "نقدی" : "مدت دار"}
              {offerData.winner.installmentMonths && (
                <span className="text-sm text-green-600 block">
                  {offerData.winner.installmentMonths} ماهه
                </span>
              )}
            </Typography>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600">🚚</span>
              <Typography variant="caption" className="text-green-600 font-medium">
                نحوه ارسال
              </Typography>
            </div>
            <Typography variant="body2" className="text-green-800 font-bold">
              {offerData.winner.shippings === "provider" ? "توسط تامین کننده" : "توسط خریدار"}
            </Typography>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100 mb-4">
          <Typography variant="body2" className="text-green-600 font-medium mb-3">
            ⏱️ زمان‌بندی
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Typography variant="caption" className="text-gray-500 block">
                ثبت پیشنهاد
              </Typography>
              <Typography variant="body2" className="text-green-800 font-medium">
                {formatDate(offerData.winner.createdAt)}
              </Typography>
            </div>

            <div>
              <Typography variant="caption" className="text-gray-500 block">
                تایید شده
              </Typography>
              <Typography variant="body2" className="text-green-800 font-medium">
                {formatDateTime(offerData.winner.confirmDate)}
              </Typography>
            </div>

            <div>
              <Typography variant="caption" className="text-gray-500 block">
                انقضا
              </Typography>
              <Typography variant="body2" className="text-green-800 font-medium">
                {formatDate(offerData.winner.expireDate)}
              </Typography>
            </div>
          </div>
        </div>

        {/* Description */}
        {offerData.winner.description && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
            <Typography
              variant="body2"
              className="text-green-600 font-medium mb-2 flex items-center gap-2"
            >
              📝 توضیحات پیشنهاد
            </Typography>
            <Typography variant="body2" className="text-green-800 leading-relaxed">
              {offerData.winner.description}
            </Typography>
          </div>
        )}

        {/* Comments */}
        {offerData.winner.comments && offerData.winner.comments.length > 0 && (
          <div className="mt-4 bg-white rounded-lg p-4 shadow-sm border border-green-100">
            <Typography
              variant="body2"
              className="text-green-600 font-medium mb-3 flex items-center gap-2"
            >
              💬 نظرات و یادداشت‌ها
            </Typography>
            <div className="space-y-2">
              {offerData.winner.comments.map((comment: any, index: number) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-100 p-3 rounded-lg"
                >
                  <Typography variant="body2" className="text-green-800">
                    {typeof comment === "string" ? comment : JSON.stringify(comment)}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnerInfo;



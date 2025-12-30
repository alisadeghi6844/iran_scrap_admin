import React from "react";
import Table from "../../../../../components/table";
import TableHead from "../../../../../components/table/TableHead";
import TableHeadCell from "../../../../../components/table/TableHeadCell";
import TableRow from "../../../../../components/table/TableRow";
import TableBody from "../../../../../components/table/TableBody";
import TableCell from "../../../../../components/table/TableCell";
import EmptyImage from "../../../../../components/image/EmptyImage";
import TableSkeleton from "../../../../organism/skeleton/TableSkeleton";
import Typography from "../../../../../components/typography/Typography";

interface SuggestionsTableProps {
  offerLoading: boolean;
  offerData: any;
  getProviderName: (provider: any) => string;
  formatPrice: (price: number) => string;
  formatDate: (timestamp: number) => string;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

// Extracted from ProductRequestSuggestionsModal without UI/logic changes
const SuggestionsTable: React.FC<SuggestionsTableProps> = ({
  offerLoading,
  offerData,
  getProviderName,
  formatPrice,
  formatDate,
  getStatusColor,
  getStatusText,
}) => {
  if (offerLoading) {
    return <TableSkeleton />;
  }

  if (!offerData?.providerIds?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <EmptyImage />
        <Typography variant="body2" className="text-gray-500 mt-4">
          هیچ پیشنهادی برای این درخواست ثبت نشده است
        </Typography>
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>تامین کننده</TableHeadCell>
          <TableHeadCell>شماره تماس</TableHeadCell>
          <TableHeadCell>قیمت پیشنهادی</TableHeadCell>
          <TableHeadCell>هزینه حمل</TableHeadCell>
          <TableHeadCell>زمان تحویل</TableHeadCell>
          <TableHeadCell>وضعیت</TableHeadCell>
          <TableHeadCell>توضیحات</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {offerData.providerIds?.map((provider: any) => {
          const winner =
            offerData.winner?.providerId === provider.id ? offerData.winner : null;

          return (
            <TableRow key={provider.id}>
              <TableCell>
                <Typography variant="body2" className="font-medium">
                  {getProviderName(provider)}
                </Typography>
                {provider.companyName && provider.agentName && (
                  <Typography variant="caption" className="text-gray-500">
                    شرکت: {provider.companyName}
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Typography variant="body2">{provider.mobile}</Typography>
                {provider.agentPhone && (
                  <Typography variant="caption" className="text-gray-500 block">
                    نماینده: {provider.agentPhone}
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                {winner ? (
                  <Typography variant="body2" className="font-medium text-secondary-600">
                    {formatPrice(winner.price)}
                  </Typography>
                ) : (
                  <Typography variant="body2" className="text-gray-400">
                    در انتظار پیشنهاد
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                {winner ? (
                  <Typography variant="body2">{formatPrice(winner.shippingPrice)}</Typography>
                ) : (
                  <Typography variant="body2" className="text-gray-400">
                    _
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                {winner ? (
                  <Typography variant="body2">{formatDate(winner.deliveryTime)}</Typography>
                ) : (
                  <Typography variant="body2" className="text-gray-400">
                    _
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                {winner ? (
                  <span className={getStatusColor(winner.status)}>{getStatusText(winner.status)}</span>
                ) : (
                  <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-600">
                    بدون پیشنهاد
                  </span>
                )}
              </TableCell>
              <TableCell>
                {winner ? (
                  <Typography variant="body2" className="max-w-xs truncate">
                    {winner.description || "_"}
                  </Typography>
                ) : (
                  <Typography variant="body2" className="text-gray-400">
                    _
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SuggestionsTable;



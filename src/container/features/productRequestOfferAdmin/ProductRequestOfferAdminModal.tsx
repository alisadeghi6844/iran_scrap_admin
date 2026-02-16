import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/modal";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableRow from "../../../components/table/TableRow";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import { GetProductRequestOfferAdminAction } from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectGetProductRequestOfferAdminData,
  selectGetProductRequestOfferAdminLoading,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";

interface ProductRequestOfferAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
}

const ProductRequestOfferAdminModal: React.FC<ProductRequestOfferAdminModalProps> = ({
  isOpen,
  onClose,
  requestId,
}) => {
  const dispatch: any = useDispatch();
  const offersData = useSelector(selectGetProductRequestOfferAdminData);
  const offersLoading = useSelector(selectGetProductRequestOfferAdminLoading);

  useEffect(() => {
    if (isOpen && requestId) {
      dispatch(
        GetProductRequestOfferAdminAction({ filter: `request=${requestId}` })
      );
    }
  }, [isOpen, requestId, dispatch]);

  return (
    <Modal open={isOpen} onClose={onClose} headerTitle="پیشنهادات" size="2xl">
      <Table className="w-full" isLoading={offersLoading} shadow={false}>
        <TableHead>
          <TableRow>
            <TableHeadCell>تامین کننده</TableHeadCell>
            <TableHeadCell>قیمت واحد</TableHeadCell>
            <TableHeadCell>هزینه حمل</TableHeadCell>
            <TableHeadCell>قیمت کل</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>شهر</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offersData?.data?.length > 0 ? (
            offersData.data.map((offer: any) => (
              <TableRow key={offer.id}>
                <TableCell>
                  {offer?.provider?.firstName && offer?.provider?.lastName
                    ? `${offer.provider.firstName} ${offer.provider.lastName}`
                    : offer?.provider?.mobile || "-"}
                </TableCell>
                <TableCell>
                  {offer?.price ? `${offer.price.toLocaleString()} تومان` : "-"}
                </TableCell>
                <TableCell>
                  {offer?.shippingPrice ? `${offer.shippingPrice.toLocaleString()} تومان` : "-"}
                </TableCell>
                <TableCell>
                  {offer?.totalprice ? `${offer.totalprice.toLocaleString()} تومان` : "-"}
                </TableCell>
                <TableCell>
                  {offer?.paymentType === 'CASH' ? 'نقدی' : 
                   offer?.paymentType === 'INSTALLMENT' ? 'اقساطی' : 
                   offer?.paymentType || "-"}
                </TableCell>
                <TableCell>
                  {offer?.city && offer?.province ? `${offer.city}, ${offer.province}` : "-"}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    offer?.status === 'BUYER_CONFIRMED' ? 'bg-green-100 text-green-800' :
                    offer?.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {offer?.statusFa || offer?.status || "-"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                هیچ پیشنهادی یافت نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Modal>
  );
};

export default ProductRequestOfferAdminModal;

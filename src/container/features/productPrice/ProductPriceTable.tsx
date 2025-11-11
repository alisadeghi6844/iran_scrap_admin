import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { HandleFilterParams } from "../../../types/FilterParams";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableFilterCell from "../../../components/table/TableFilterCell";
import TableCell from "../../../components/table/TableCell";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";

import {
  selectCreateProductPriceData,
  selectGetProductPriceData,
  selectGetProductPriceLoading,
  selectUpdateProductPriceData,
  selectDeleteProductPriceData,
} from "../../../redux/slice/productPrice/ProductPriceSlice";
import { GetProductPriceAction } from "../../../redux/actions/productPrice/ProductPriceActions";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import Button from "../../../components/button";
import { FaRegEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { formatNumber } from "../../../utils/NumberFormated";

interface ProductPriceItem {
  _id?: string;
  id?: string;
  productId: {
    id: string;
    name: string;
  };
  brandId: {
    id: string;
    name: string;
  };
  providerId: {
    id: string;
    name: string;
  };
  portId: {
    id: string;
    name: string;
  };
  paymentType: string;
  showInApp: boolean;
  showInPanel: boolean;
  buyPrice: number;
  constant: number;
  sellPrice: number;
  createdAt: number;
  updatedAt: number;
}

interface ProductPriceTypes {
  onRowClick?: (action: string, row: ProductPriceItem) => void;
}

const ProductPriceTable: React.FC<ProductPriceTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch = useDispatch<AppDispatch>();

  const filterDefaultInitialValues = {
    ProductName: "",
  };

  const loading = useSelector(selectGetProductPriceLoading);
  const productPriceData = useSelector(selectGetProductPriceData);
  const updateData = useSelector(selectUpdateProductPriceData);
  const createData = useSelector(selectCreateProductPriceData);
  const deleteData = useSelector(selectDeleteProductPriceData);

  useEffect(() => {
    dispatch(
      GetProductPriceAction({
        page: 0,
        size: 10,
        include: ["brand", "provider", "product", "port"],
      })
    );
  }, [dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetProductPriceAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 10,
        include: ["brand", "provider", "product", "port"],
      })
    );
  };

  const handleFilterParameters = (data: unknown) => {
    const { ProductName } = data as {
      ProductName?: string;
    };
    let queryParam = "";
    if (ProductName) queryParam += "productName=" + ProductName + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (
      updateData?.status == 200 ||
      createData?.status == 201 ||
      deleteData?.status == 200
    ) {
      dispatch(
        GetProductPriceAction({
          page: 0,
          size: 10,
          include: ["brand", "provider", "product", "port"],
        })
      );
    }
  }, [updateData, createData, deleteData, dispatch]);

  const getPaymentTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      CASH: "نقدی",
      INSTALLMENT1: "1 ماهه",
      INSTALLMENT2: "2 ماهه",
      INSTALLMENT3: "3 ماهه",
      INSTALLMENT4: "4 ماهه",
      INSTALLMENT5: "5 ماهه",
      INSTALLMENT6: "6 ماهه",
    };
    return types[type] || type;
  };

  const calculateStatus = (sellPrice: number, constant: number) => {
    // فرمول: S = (قیمت ثابت) / (قیمت فروش)
    const S = sellPrice > 0 ? constant / sellPrice : 0;

    if (S >= 0.12)
      return { label: "سوپر الماسی", color: "text-purple-600 bg-purple-100" };
    if (S >= 0.08)
      return { label: "الماسی", color: "text-blue-600 bg-blue-100" };
    if (S >= 0.05)
      return { label: "طلایی", color: "text-yellow-600 bg-yellow-100" };
    if (S >= 0.03)
      return { label: "نقره‌ای", color: "text-gray-600 bg-gray-100" };
    return { label: "برنزی", color: "text-orange-600 bg-orange-100" };
  };

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت قیمت گذاری جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={productPriceData}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (onRowClick) {
          if (button === "create") {
            onRowClick("create", {} as ProductPriceItem);
          }
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>کالا</TableHeadCell>
            <TableHeadCell>برند</TableHeadCell>
            <TableHeadCell>تامین کننده</TableHeadCell>
            <TableHeadCell>محل بارگیری</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>قیمت خرید</TableHeadCell>
            <TableHeadCell>قیمت فروش</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
            <TableHeadCell>عملیات</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell>
              <SearchInputField
                name="ProductName"
                noBorder
                placeholder="جستجوی نام کالا..."
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            productPriceData?.data?.length > 0 ? (
              productPriceData?.data?.map((row: ProductPriceItem) => (
                <TableRow key={row?._id || row?.id}>
                  <TableCell>{row?.productId?.name ?? "_"}</TableCell>
                  <TableCell>{row?.brandId?.name ?? "_"}</TableCell>
                  <TableCell>{row?.providerId?.name ?? "_"}</TableCell>
                  <TableCell>{row?.portId?.name ?? "_"}</TableCell>
                  <TableCell>
                    {getPaymentTypeLabel(row?.paymentType) ?? "_"}
                  </TableCell>
                  <TableCell>
                    {row?.buyPrice
                      ? formatNumber(row?.buyPrice) + " تومان"
                      : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.sellPrice
                      ? formatNumber(row?.sellPrice) + " تومان"
                      : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.sellPrice && row?.constant ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          calculateStatus(row.sellPrice, row.constant).color
                        }`}
                      >
                        {calculateStatus(row.sellPrice, row.constant).label}
                      </span>
                    ) : (
                      "_"
                    )}
                  </TableCell>
                  <TableCell
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                    }}
                    className="justify-center gap-x-4"
                  >
                    <Button
                      startIcon={<FaRegEdit className="text-xl" />}
                      type="button"
                      variant="outline-success"
                      size="sm"
                      onClick={() => {
                        if (onRowClick) {
                          onRowClick("update", row);
                        }
                      }}
                    >
                      ویرایش
                    </Button>
                    <Button
                      startIcon={<BiTrash className="text-xl" />}
                      type="button"
                      variant="outline-error"
                      size="sm"
                      onClick={() => {
                        if (onRowClick) {
                          onRowClick("delete", row);
                        }
                      }}
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colspan="9" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="9" className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default ProductPriceTable;

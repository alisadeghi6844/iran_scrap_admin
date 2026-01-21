import React, { useEffect, useState } from "react";
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
import Image from "../../../components/image";
import ProductDetailModal from "./ProductDetailModal";

import {
  selectCreateProductData,
  selectGetProductData,
  selectGetProductLoading,
  selectUpdateProductData,
  selectUpdateProductStatusData,
  selectChangeProductStatusData,
  selectEditProductAdminData,
} from "../../../redux/slice/product/ProductSlice";
import {
  GetProductAction,
  ChangeProductStatusAction,
} from "../../../redux/actions/product/ProductActions";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import ProductCategoryFilter from "./ProductCategoryFilter";
import RadioGroup from "../../../components/radio/RadioGroup";
import Button from "../../../components/button";
import { FaRegEdit } from "react-icons/fa";
import { NormalizeBaseUrl } from "../../../utils/NormalizeBaseUrl";

interface ProductItem {
  _id: string;
  providerId: string;
  name: string;
  images?: Array<{ url: string }>;
  category?: { name: string; _id: string };
  provider?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    agentName?: string;
  };
  address?: { city: string };
  price?: number;
  priceExpire?: string;
  inventory?: number;
  inventoryType?: string;
  minimumOrderQuantity?: number;
  minimumOrderType?: string;
  paymentType?: string;
  installmentPrice?: Array<{ duration: number; price: number }>;
  deliveryTime?: number;
  deliveryTimeType?: string;
  displayType?: Array<any>;
  attributes?: Array<any>;
  status: string;
  createdAt: number;
  updatedAt: number;
}

interface ProductTypes {
  onRowClick?: (action: string, row: ProductItem) => void;
}

const ProductTable: React.FC<ProductTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch = useDispatch<AppDispatch>();
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filterDefaultInitialValues = {
    ProductName: "",
    Category: null,
    Status: null,
    Provider: null,
    City: null,
  };

  const loading = useSelector(selectGetProductLoading);
  const productData = useSelector(selectGetProductData);
  const updateData = useSelector(selectUpdateProductData);
  const createData = useSelector(selectCreateProductData);
  const updateStatusData = useSelector(selectUpdateProductStatusData);
  const changeStatusData = useSelector(selectChangeProductStatusData);
  const editProductAdminData = useSelector(selectEditProductAdminData);

  useEffect(() => {
    dispatch(GetProductAction({ page: 0, size: 20 }));
  }, [dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetProductAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
      })
    );
  };

  const handleFilterParameters = (data: unknown) => {
    const { ProductName, Category, Status, Provider, City } = data as {
      ProductName?: string;
      Category?: { label: string; value: string };
      Status?: { label: string; value: string };
      Provider?: { label: string; value: string };
      City?: { label: string; value: string };
    };
    let queryParam = "";
    if (ProductName) queryParam += "name=" + ProductName + ",";
    if (Category?.label) queryParam += "categoryId=" + Category?.value + ",";
    if (Status?.label) queryParam += "status=" + Status?.value + ",";
    if (Provider?.label) queryParam += "providerId=" + Provider?.value + ",";
    if (City?.label) queryParam += "city=" + City?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (
      updateData?.status == 200 ||
      createData?.status == 201 ||
      updateStatusData?.status == 200 ||
      changeStatusData?.status == 200 ||
      editProductAdminData?.status == 200
    ) {
      dispatch(
        GetProductAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [
    updateData,
    createData,
    updateStatusData,
    changeStatusData,
    editProductAdminData,
    dispatch,
  ]);

  const getInventoryUnit = (inventoryType?: string) => {
    if (!inventoryType) return "";
    switch (inventoryType.toUpperCase()) {
      case "KILOGRAM":
      case "KG":
        return "کیلوگرم";
      case "GRAM":
        return "گرم";
      case "LITER":
        return "لیتر";
      case "PIECE":
        return "عدد";
      default:
        return "";
    }
  };

  const getPaymentTypeLabel = (paymentType?: string) => {
    if (!paymentType) return "_";
    switch (paymentType) {
      case "CASH":
        return "نقدی";
      case "INSTALLMENTS":
        return "مدت دار";
      case "CASH_AND_INSTALLMENTS":
        return "نقدی و مدت دار";
      default:
        return paymentType;
    }
  };

  const handleStatusChange = (productId: string, newStatus: string) => {
    dispatch(
      ChangeProductStatusAction({
        productId,
        status: newStatus,
        onSuccess: () => {
          // Status will be updated automatically via useEffect
        },
      })
    );
  };

  const statusOptions = [
    { value: "PENDING", label: "در حال بررسی" },
    { value: "CONFIRM", label: "تایید شده" },
    { value: "REJECT", label: "رد شده" },
  ];

  return (
    <CollectionControls
      buttons={[]}
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={productData}
      onMetaChange={handleFilter}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>تصویر محصول</TableHeadCell>
            <TableHeadCell>نام محصول</TableHeadCell>
            <TableHeadCell>دسته بندی</TableHeadCell>
            <TableHeadCell>تامین کننده</TableHeadCell>
            <TableHeadCell>شهر</TableHeadCell>
            <TableHeadCell>قیمت</TableHeadCell>
            <TableHeadCell>موجودی</TableHeadCell>
            <TableHeadCell>نوع پرداخت</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
            <TableHeadCell>عملیات</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <SearchInputField
                name="ProductName"
                noBorder
                placeholder="جستجوی نام محصول..."
              />
            </TableFilterCell>
            <TableFilterCell>
              <ProductCategoryFilter name="Category" />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            productData?.data?.length > 0 ? (
              productData?.data?.map((row: ProductItem) => (
                <TableRow key={row?._id}>
                  <TableCell>
                    <Image
                      className="w-[60px] h-[60px] rounded-lg"
                      src={
                        row?.images?.[0]?.path
                          ? NormalizeBaseUrl + row?.images[0].path
                          : "/images/core/default-image.png"
                      }
                    />
                  </TableCell>
                  <TableCell>{row?.name ?? "_"}</TableCell>
                  <TableCell>{row?.category?.name ?? "_"}</TableCell>
                  <TableCell>
                    {row?.provider?.firstName && row?.provider?.lastName
                      ? row?.provider?.firstName + " " + row?.provider?.lastName
                      : row?.provider?.agentName}
                  </TableCell>
                  <TableCell>{row?.address?.city ?? "_"}</TableCell>
                  <TableCell>
                    {row?.price ? `${row.price.toLocaleString()} تومان` : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.inventory
                      ? `${row.inventory} ${getInventoryUnit(
                          row?.inventoryType || ""
                        )}`
                      : "_"}
                  </TableCell>
                  <TableCell>{getPaymentTypeLabel(row?.paymentType)}</TableCell>
                  <TableCell>
                    <RadioGroup
                      name={`status-${row?._id}`}
                      value={row?.status || "PENDING"}
                      options={statusOptions}
                      onChange={(newStatus) =>
                        handleStatusChange(row?._id, newStatus)
                      }
                      className="flex-row gap-1"
                    />
                  </TableCell>
                  <TableCell
                    onClick={(e: unknown) => {
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
                        onRowClick && onRowClick("update", row);
                      }}
                    >
                      ویرایش
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

      {/* مودال جزئیات محصول */}
      <ProductDetailModal
        product={selectedProduct}
        open={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedProduct(null);
        }}
      />
    </CollectionControls>
  );
};

export default ProductTable;

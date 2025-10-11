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
import Image from "../../../components/image";

import {
  selectCreateProductData,
  selectGetProductData,
  selectGetProductLoading,
  selectUpdateProductData,
  selectUpdateProductStatusData,
  selectChangeProductStatusData,
} from "../../../redux/slice/product/ProductSlice";
import {
  GetProductAction,
  ChangeProductStatusAction,
} from "../../../redux/actions/product/ProductActions";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import ProductCategoryFilter from "./ProductCategoryFilter";
import RadioGroup from "../../../components/radio/RadioGroup";

interface ProductItem {
  _id: string;
  name: string;
  images?: Array<{ url: string }>;
  category?: { name: string };
  provider?: { name: string };
  address?: { city: string };
  price?: number;
  inventory?: number;
  inventoryType?: string;
  status: string;
}

interface ProductTypes {
  onRowClick?: (action: string, row: ProductItem) => void;
}

const ProductTable: React.FC<ProductTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch = useDispatch<AppDispatch>();

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
      changeStatusData?.status == 200
    ) {
      dispatch(
        GetProductAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [updateData, createData, updateStatusData, changeStatusData, dispatch]);

  const getInventoryUnit = (inventoryType: string) => {
    switch (inventoryType?.toUpperCase()) {
      case "TON":
        return "تن";
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
            <TableHeadCell>وضعیت</TableHeadCell>
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
          </TableRow>
          {!loading ? (
            productData?.data?.length > 0 ? (
              productData?.data?.map((row: ProductItem) => (
                <TableRow key={row?._id}>
                  <TableCell>
                    <Image
                      className="w-[60px] h-[60px] rounded-lg"
                      src={
                        row?.images?.[0]?.url
                          ? row?.images[0].url
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
                          row?.inventoryType
                        )}`
                      : "_"}
                  </TableCell>
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colspan="8" className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colspan="8" className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CollectionControls>
  );
};

export default ProductTable;

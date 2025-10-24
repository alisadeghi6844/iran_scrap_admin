import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGetProductRequestStatusData,
  selectGetProductRequestStatusLoading,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { GetRequestProductStatusAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import { HandleFilterParams } from "../../../types/FilterParams";
import CollectionControls from "../../organism/CollectionControls";
import Table from "../../../components/table";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableBody from "../../../components/table/TableBody";
import TableFilterCell from "../../../components/table/TableFilterCell";
import TableCell from "../../../components/table/TableCell";
import Button from "../../../components/button";
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";

interface ProductRequestStatusTypes {
  onRowClick?: any;
}

const ProductRequestStatus: React.FC<ProductRequestStatusTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    Category: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetProductRequestStatusLoading);
  const productStatusData = useSelector(selectGetProductRequestStatusData);

  useEffect(() => {
    dispatch(GetRequestProductStatusAction({ page: 0, size: 20 }));
  }, []);

  const handleFilter = ({
    filter,
    page,
    pageSize,
  }: HandleFilterParams) => {
    dispatch(
      GetRequestProductStatusAction({
        filter,
        page: page ?? 0,
        size: pageSize??20,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { FoodName, Category, Restaurant } = data;
    let queryParam = "";
    if (FoodName) queryParam += "title=" + FoodName + ",";
    if (Category?.label) queryParam += "categoriesId=" + Category?.value + ",";
    if (Restaurant?.label)
      queryParam += "restaurantId=" + Restaurant?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  return (
    <CollectionControls
      title="مدیریت وضعیت درخواست ها"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={productStatusData}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (!!onRowClick) {
          button === "create" && onRowClick("create");
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>نام وضعیت</TableHeadCell>
            <TableHeadCell>وضعیت های مجاز</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            productStatusData?.data?.length > 0 ? (
              productStatusData?.data?.map((row: any) => (
                <TableRow key={row?.code}>
                  <TableCell>{row?.title ?? "_"}</TableCell>
                  <TableCell>
                    {row?.allowedChangeCodes?.map(
                      (item: any) => item + " , "
                    ) ?? "_"}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <Button
                      onClick={() => {
                        onRowClick && onRowClick("update", row);
                      }}
                      variant="outline-primary"
                    >
                      افزودن شرط
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
export default ProductRequestStatus;

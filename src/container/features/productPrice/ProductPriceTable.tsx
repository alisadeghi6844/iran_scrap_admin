import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import { FaRegEdit } from "react-icons/fa";
import {
  selectCreateProductPriceData,
  selectDeleteProductPriceData,
  selectGetProductPriceData,
  selectGetProductPriceLoading,
  selectUpdateProductPriceData,
} from "../../../redux/slice/productPrice/ProductPriceSlice";
import { GetProductPriceAction } from "../../../redux/actions/productPrice/ProductPriceActions";
import { formatNumber } from "../../../utils/NumberFormated";
import PriceStatus from "../../../components/PriceStatus";
import { BiTrashAlt } from "react-icons/bi";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";

interface ProductPriceTypes {
  onRowClick?: any;
}

const ProductPriceTable: React.FC<ProductPriceTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    ProductPrice: null,
    Restaurant: null,
  };

  const [inputName, setInputName] = useState("");

  const loading = useSelector(selectGetProductPriceLoading);
  const productPriceData = useSelector(selectGetProductPriceData);
  const updateData = useSelector(selectUpdateProductPriceData);
  const createData = useSelector(selectCreateProductPriceData);
  const deleteData = useSelector(selectDeleteProductPriceData);

  useEffect(() => {
    if(inputName?.length > 0){
      dispatch(GetProductPriceAction({ page: 0, size: 20, name: inputName }));
    }else{
      dispatch(GetProductPriceAction({ page: 0, size: 20 }));
    } 
  }, [inputName]);


  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetProductPriceAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    // const { FoodName, ProductPrice, Restaurant } = data;
    // let queryParam = "";
    // if (FoodName) queryParam += "title=" + FoodName + ",";
    // return queryParam.substring(0, queryParam.length - 1);
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
          size: 20,
        })
      );
    }
  }, [updateData, createData, deleteData]);

  useEffect(() => {
    console.log("productPriceData", productPriceData);
  }, [productPriceData]);

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت محصول جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={productPriceData}
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
            <TableHeadCell>نام محصول </TableHeadCell>
            <TableHeadCell>آخرین قیمت </TableHeadCell>
            <TableHeadCell>تغییر قیمت </TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell>
              <SearchInputField onChange={(e: any) => setInputName(e.target.value)} name="Name" noBorder />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            productPriceData?.data?.length > 0 ? (
              productPriceData?.data?.map((row: any) => (
                <TableRow key={row?._id}>
                  <TableCell>{row?.name ?? "_"}</TableCell>
                  <TableCell>
                    {row?.lastPrice
                      ? `هر ${
                          row?.inventoryType === "TON" ? "تن" : "کیلوگرم"
                        } ${formatNumber(row?.lastPrice)} تومان`
                      : "_"}{" "}
                  </TableCell>
                  <TableCell
                    start={true}
                    className={"w-[200px] justify-center"}
                  >
                    <PriceStatus
                      status={
                        row?.changePercent > 0
                          ? "up"
                          : row?.changePercent < 0
                          ? "down"
                          : "dontChange"
                      }
                      number={row?.changePercent}
                    />
                  </TableCell>
                  <TableCell
                    onClick={(e: any) => {
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

                    <Button
                      startIcon={<BiTrashAlt className="text-xl" />}
                      type="button"
                      variant="outline-error"
                      size="sm"
                      onClick={() => {
                        onRowClick && onRowClick("delete", row);
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

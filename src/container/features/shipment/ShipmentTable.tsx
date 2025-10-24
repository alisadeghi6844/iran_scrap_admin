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
import { BiTrashAlt } from "react-icons/bi";
import SearchInputField from "../../../components/molcols/formik-fields/SearchInputField";
import { formatNumber } from "../../../utils/NumberFormated";
import {
  selectCreateShipmentAdminData,
  selectGetShipmentAdminData,
  selectGetShipmentAdminLoading,
  resetCreateShipmentAdmin,
} from "../../../redux/slice/shipment/shipmentSlice";
import { GetShipmentAdminAction } from "../../../redux/actions/shipment/ShipmentActions";

interface ShipmentTableTypes {
  onRowClick?: any;
}

const ShipmentTable: React.FC<ShipmentTableTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    originProvince: "",
    destProvince: "",
  };

  const loading = useSelector(selectGetShipmentAdminLoading);
  const shipmentData = useSelector(selectGetShipmentAdminData);
  const createData = useSelector(selectCreateShipmentAdminData);

  useEffect(() => {
    dispatch(GetShipmentAdminAction({ page: 0, limit: 10 }));
  }, []);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetShipmentAdminAction({
        filter,
        page: page ?? 1,
        limit: pageSize ?? 10,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { originProvince, destProvince } = data as {
      originProvince?: string;
      destProvince?: string;
    };
    let queryParam = "";
    if (originProvince) queryParam += "originProvince=" + originProvince + ",";
    if (destProvince) queryParam += "destProvince=" + destProvince + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (createData?.status === 200 || createData?.status === 201) {
      // Refresh the table data
      dispatch(GetShipmentAdminAction({ page: 0, limit: 10 }));
      // Reset the create state to prevent multiple refreshes
      dispatch(resetCreateShipmentAdmin());
    }
  }, [createData, dispatch]);

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت کرایه ناوگان جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={shipmentData}
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
            <TableHeadCell>استان مبدا</TableHeadCell>
            <TableHeadCell>شهر مبدا</TableHeadCell>
            <TableHeadCell>استان مقصد</TableHeadCell>
            <TableHeadCell>شهر مقصد</TableHeadCell>
            <TableHeadCell>نوع ناوگان</TableHeadCell>
            <TableHeadCell>وزن</TableHeadCell>
            <TableHeadCell>هزینه</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell>
              <SearchInputField 
                name="originProvince" 
                noBorder 
                placeholder="جستجوی استان مبدا..."
              />
            </TableFilterCell>
            <TableFilterCell>
              <SearchInputField 
                name="destProvince" 
                noBorder 
                placeholder="جستجوی استان مقصد..."
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            shipmentData?.data?.length > 0 ? (
              shipmentData?.data?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell>{row?.originProvince ?? "_"}</TableCell>
                  <TableCell>{row?.originCity ?? "_"}</TableCell>
                  <TableCell>{row?.destProvince ?? "_"}</TableCell>
                  <TableCell>{row?.destCity ?? "_"}</TableCell>
                  <TableCell>{row?.vehicle ?? "_"}</TableCell>
                  <TableCell>{row?.weight ? `${formatNumber(row?.weight)} کیلوگرم` : "_"}</TableCell>
                  <TableCell>{row?.price ? `${formatNumber(row?.price)} تومان` : "_"}</TableCell>
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

export default ShipmentTable;
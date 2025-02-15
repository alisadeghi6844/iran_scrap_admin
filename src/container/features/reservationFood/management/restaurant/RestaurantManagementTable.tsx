import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionControls from "../../../../organism/CollectionControls";
import Button from "../../../../../components/button";
import { PublicDictionary } from "../../../../../utils/dictionary";
import Typography from "../../../../../components/typography/Typography";
import Table from "../../../../../components/table";
import TableHead from "../../../../../components/table/TableHead";
import TableRow from "../../../../../components/table/TableRow";
import TableHeadCell from "../../../../../components/table/TableHeadCell";
import TableBody from "../../../../../components/table/TableBody";
import TableCell from "../../../../../components/table/TableCell";
import TableSkeleton from "../../../../organism/skeleton/TableSkeleton";
import { getAllRestaurantAction } from "../../../../../redux/actions/foodReservation/management/restaurant/RestaurantAction";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import TableFilterCell from "../../../../../components/table/TableFilterCell";
import SearchInputField from "../../../../../components/molcols/formik-fields/SearchInputField";
import { HandleFilterParams } from "../../../../../types/FilterParams";
import {
  selectGetAllRestaurantData,
  selectGetAllRestaurantLoading,
} from "../../../../../redux/slice/foodReservation/management/restaurant/RestaurantSlice";
import EmptyImage from "../../../../../components/image/EmptyImage";

interface RestaurantManagementTableTypes {
  onRowClick?: any;
}

const RestaurantManagementTable: React.FC<RestaurantManagementTableTypes> = (
  props
) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    RestaurantName: "",
  };

  const loading = useSelector(selectGetAllRestaurantLoading);
  const data = useSelector(selectGetAllRestaurantData);

  useEffect(() => {
    dispatch(getAllRestaurantAction());
  }, []);

  const handleFilter = ({
    filter,
    search,
    page,
    pageSize,
  }: HandleFilterParams) => {
    dispatch(
      getAllRestaurantAction({
        filter,
        search,
        page,
        pageSize,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { RestaurantName } = data;
    let queryParam = "";
    if (RestaurantName) queryParam += "name=" + RestaurantName + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  return (
    <CollectionControls
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      buttons={["filter", "create"]}
      data={data}
      createTitle="ایجاد رستوران جدید"
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
            <TableHeadCell>
              {PublicDictionary?.food_restaurant_name}
            </TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell>
              <SearchInputField name="RestaurantName" />
            </TableFilterCell>
            <TableFilterCell />
          </TableRow>
          {!loading ? (
            data?.data?.length > 0 ? (
              data?.data?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell>{row?.name ?? "_"}</TableCell>
                  <TableCell
                    onClick={(e: any) => {
                      e.stopPropagation();
                    }}
                    className="justify-center"
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
                      {PublicDictionary.edit}
                    </Button>
                    <Button
                      startIcon={<FaRegTrashCan className="text-lg" />}
                      type="button"
                      variant="outline-error"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        onRowClick && onRowClick("delete", row);
                      }}
                    >
                      {PublicDictionary.delete}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colspan="9" className="flex justify-center !py-4">
                  <EmptyImage/>
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
export default RestaurantManagementTable;

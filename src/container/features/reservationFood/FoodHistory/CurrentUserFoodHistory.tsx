import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionControls from "../../../organism/CollectionControls";
import Table from "../../../../components/table";
import TableHead from "../../../../components/table/TableHead";
import TableRow from "../../../../components/table/TableRow";
import TableHeadCell from "../../../../components/table/TableHeadCell";
import TableBody from "../../../../components/table/TableBody";
import TableCell from "../../../../components/table/TableCell";
import TableSkeleton from "../../../organism/skeleton/TableSkeleton";
import Image from "../../../../components/image/index";
import TableFilterCell from "../../../../components/table/TableFilterCell";
import SearchInputField from "../../../../components/molcols/formik-fields/SearchInputField";
import { HandleFilterParams } from "../../../../types/FilterParams";
import EmptyImage from "../../../../components/image/EmptyImage";

import {
  convertGregorianToPersian,
  convertPersianToGregorian,
  p2e,
} from "../../../../utils/MomentConvertor";
import DatePickerField from "../../../../components/molcols/formik-fields/DatePickerField";
import { PublicDictionary } from "../../../../utils/dictionary";
import { getCurrentUserHistoryAction } from "../../../../redux/actions/foodReservation/management/foodReserve/FoodReserveAction";
import { selectGetCurrentUserHistoryData, selectGetCurrentUserHistoryLoading } from "../../../../redux/slice/foodReservation/management/foodReserve/FoodReserveSlice";

interface CurrentUserFoodHistoryTypes {
  onRowClick?: any;
}

const CurrentUserFoodHistory: React.FC<CurrentUserFoodHistoryTypes> = (
  props
) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    User: null,
    FoodName: "",
    Date: "",
  };

  const loading = useSelector(selectGetCurrentUserHistoryLoading);
  const data = useSelector(selectGetCurrentUserHistoryData);

  useEffect(() => {
    dispatch(getCurrentUserHistoryAction());
  }, []);

  const handleFilter = ({
    filter,
    search,
    page,
    pageSize,
  }: HandleFilterParams) => {
    dispatch(
      getCurrentUserHistoryAction({
        filter,
        search,
        page,
        pageSize,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { FoodName, Date } = data;
    let queryParam = "";
    if (FoodName) queryParam += "foodName=" + FoodName + ",";
    if (Date?.length)
      queryParam += "date=" + convertPersianToGregorian(p2e(Date)) + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  return (
    <CollectionControls
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      buttons={["filter"]}
      data={data}
      onMetaChange={handleFilter}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell className="w-[150px]">
              {PublicDictionary?.food_image}
            </TableHeadCell>
            <TableHeadCell>{PublicDictionary?.food_name}</TableHeadCell>

            <TableHeadCell>{PublicDictionary?.reserve_date}</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell />

            <TableFilterCell>
              <SearchInputField name="FoodName" />
            </TableFilterCell>
            <TableFilterCell>
              <DatePickerField
                isTime={false}
                name="Date"
                inputClassName="p-0 border-none"
              />
            </TableFilterCell>
          </TableRow>
          {!loading ? (
            data?.data?.length > 0 ? (
              data?.data?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell className="flex items-center justify-center">
                    <div className="w-[140px] h-[90px] rounded-xl relative">
                      {row?.foodId?.image?.length ? (
                        <Image
                          base64
                          src={row?.foodId?.image[0]?.file}
                          className="w-full h-full rounded-xl absolute top-0 right-0"
                        />
                      ) : (
                        <Image
                          src="/images/core/placeholder.png"
                          className="w-full h-full rounded-xl absolute top-0 right-0"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{`${row?.foodId?.title ?? "_"}  ${
                    row?.appetizerId?.title
                      ? ` + ${row?.appetizerId?.title}`
                      : "_"
                  }`}</TableCell>
           
                  <TableCell>
                    {row?.date ? convertGregorianToPersian(row?.date) : "_"}
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
export default CurrentUserFoodHistory;

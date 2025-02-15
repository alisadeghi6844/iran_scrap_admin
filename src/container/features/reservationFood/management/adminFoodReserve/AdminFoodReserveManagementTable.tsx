import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionControls from "../../../../organism/CollectionControls";
import Button from "../../../../../components/button";
import { PublicDictionary } from "../../../../../utils/dictionary";
import Table from "../../../../../components/table";
import TableHead from "../../../../../components/table/TableHead";
import TableRow from "../../../../../components/table/TableRow";
import TableHeadCell from "../../../../../components/table/TableHeadCell";
import TableBody from "../../../../../components/table/TableBody";
import TableCell from "../../../../../components/table/TableCell";
import TableSkeleton from "../../../../organism/skeleton/TableSkeleton";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "../../../../../components/image/index";
import TableFilterCell from "../../../../../components/table/TableFilterCell";
import SearchInputField from "../../../../../components/molcols/formik-fields/SearchInputField";
import { HandleFilterParams } from "../../../../../types/FilterParams";
import EmptyImage from "../../../../../components/image/EmptyImage";
import {
  selectExportFoodReserveData,
  selectExportFoodReserveLoading,
  selectGetAllAdminFoodReserveData,
  selectGetAllAdminFoodReserveLoading,
} from "../../../../../redux/slice/foodReservation/management/foodReserve/AdminReserveSlice";
import {
  exportFoodReserveAction,
  getAllAdminFoodReserveAction,
} from "../../../../../redux/actions/foodReservation/management/foodReserve/AdminFoodReserveAction";
import {
  convertGregorianToPersian,
  convertPersianToGregorian,
  p2e,
} from "../../../../../utils/MomentConvertor";
import UsersSelect from "../../../account/UsersSelect";
import DatePickerField from "../../../../../components/molcols/formik-fields/DatePickerField";
import JalaliDatepicker from "../../../../../components/jalaliDatepicker";

interface CategoryManagementTableTypes {
  onRowClick?: any;
}

const CategoryManagementTable: React.FC<CategoryManagementTableTypes> = (
  props
) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [excelFile, setExcelFile] = useState<any>("");

  const filterDefaultInitialValues = {
    User: null,
    FoodName: "",
    Date: "",
  };

  const loading = useSelector(selectGetAllAdminFoodReserveLoading);
  const data = useSelector(selectGetAllAdminFoodReserveData);
  const exportData = useSelector(selectExportFoodReserveData);
  const exportLoading = useSelector(selectExportFoodReserveLoading);

  useEffect(() => {
    dispatch(getAllAdminFoodReserveAction());
  }, []);

  const handleFilter = ({
    filter,
    search,
    page,
    pageSize,
  }: HandleFilterParams) => {
    dispatch(
      getAllAdminFoodReserveAction({
        filter,
        search,
        page,
        pageSize,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { User, FoodName, Date } = data;
    let queryParam = "";
    if (User?.label) queryParam += "userId=" + User?.value + ",";
    if (FoodName) queryParam += "foodName=" + FoodName + ",";
    if (Date?.length)
      queryParam += "date=" + convertPersianToGregorian(p2e(Date)) + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  const handleDownloadExcel = () => {
    dispatch(
      exportFoodReserveAction({
        startDate: startDate ? convertPersianToGregorian(p2e(startDate)) : null,
        endDate: endDate ? convertPersianToGregorian(p2e(endDate)) : null,
      })
    );
  };
  useEffect(() => {
    setExcelFile("");
  }, []);

  useEffect(() => {
    setExcelFile(exportData?.data);
  }, [exportData]);

  useEffect(() => {
    if (excelFile?.length) {
      const link = document.createElement("a");
      link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${excelFile}`;
      link.download = `تاریخچه رزرو غذای کارکنان از تاریخ ${startDate} تا ${endDate}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [excelFile]);

  return (
    <CollectionControls
    excelLoading={exportLoading}
      hasBox={false}
      buttonsBefore={
        <div className="-mt-2 ml-4 flex items-center gap-x-4">
          <JalaliDatepicker
            value={startDate}
            onChange={(e: any) => setStartDate(e)}
            label="از تاریخ"
          />
          <JalaliDatepicker
            value={endDate}
            onChange={(e: any) => setEndDate(e)}
            label="تا تاریخ"
          />
        </div>
      }
      filterInitialValues={filterDefaultInitialValues}
      excelTitle="دانلود فایل اکسل"
      onFilter={handleFilterParameters}
      buttons={["filter", "create", "excel"]}
      data={data}
      createTitle="ثبت رزرو جدید"
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (!!onRowClick) {
          button === "create" && onRowClick("create");
          button === "excel" && handleDownloadExcel();
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell className="w-[150px]">
              {PublicDictionary?.food_image}
            </TableHeadCell>
            <TableHeadCell>{PublicDictionary?.food_name}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.user}</TableHeadCell>

            <TableHeadCell>{PublicDictionary?.reserve_date}</TableHeadCell>

            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell />

            <TableFilterCell>
              <SearchInputField name="FoodName" />
            </TableFilterCell>
            <TableFilterCell>
              <UsersSelect
                noBorder
                placeholder="جست و جو"
                label=""
                name="User"
              />
            </TableFilterCell>
            <TableFilterCell>
              <DatePickerField
                isTime={false}
                name="Date"
                inputClassName="p-0 border-none"
              />
            </TableFilterCell>
            <TableFilterCell />
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
                  <TableCell>{`${row?.userId?.firstName} ${row?.userId?.lastName} (${row?.userId?.personnelCode})`}</TableCell>
                  <TableCell>
                    {row?.date ? convertGregorianToPersian(row?.date) : "_"}
                  </TableCell>
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
export default CategoryManagementTable;

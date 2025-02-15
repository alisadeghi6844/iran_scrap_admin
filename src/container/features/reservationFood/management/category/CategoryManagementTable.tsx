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
import { getAllFoodCategoryAction } from "../../../../../redux/actions/foodReservation/management/category/CategoriesAction";
import {
  selectGetAllFoodCategoryData,
  selectGetAllFoodCategoryLoading,
} from "../../../../../redux/slice/foodReservation/management/category/CategoriesSlice";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "../../../../../components/image/index";
import TableFilterCell from "../../../../../components/table/TableFilterCell";
import SearchInputField from "../../../../../components/molcols/formik-fields/SearchInputField";
import { HandleFilterParams } from "../../../../../types/FilterParams";
import EmptyImage from "../../../../../components/image/EmptyImage";

interface CategoryManagementTableTypes {
  onRowClick?: any;
}

const CategoryManagementTable: React.FC<CategoryManagementTableTypes> = (
  props
) => {
  const { onRowClick } = props;

  const dispatch :any = useDispatch();

  const filterDefaultInitialValues = {
    CategoryName: "",
  };


  const loading = useSelector(selectGetAllFoodCategoryLoading);
  const data = useSelector(selectGetAllFoodCategoryData);

  useEffect(() => {
    dispatch(getAllFoodCategoryAction());
  }, []);

  const handleFilter = ({ filter, search, page, pageSize }:HandleFilterParams) => {
  dispatch(
    getAllFoodCategoryAction({
      filter,
      search,
      page,
      pageSize,
    })
  );
  };

  const handleFilterParameters = (data:any) => {
    const { CategoryName } = data;
    let queryParam = "";
    if (CategoryName) queryParam += "name=" + CategoryName + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  return (
    <CollectionControls
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      buttons={["filter", "create"]}
      data={data}
      createTitle="ایجاد دسته بندی جدید"
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
            <TableHeadCell className="w-[180px]">{PublicDictionary?.food_image}</TableHeadCell>
            <TableHeadCell>
              {PublicDictionary?.food_category_name}
            </TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell />

            <TableFilterCell>
              <SearchInputField name="CategoryName" />
            </TableFilterCell>
            <TableFilterCell />
          </TableRow>
          {!loading ? (
            data?.data?.length > 0 ? (
              data?.data?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell className="flex items-center justify-center">
                    <div className="w-[160px] h-[90px] rounded-xl relative">
                      {row?.image?.length ? (
                        <Image
                          base64
                          src={row?.image[0]?.file}
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
export default CategoryManagementTable;

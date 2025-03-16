import React, { useEffect } from "react";
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
import { MdOutlineFeaturedPlayList } from "react-icons/md";

import { LuGitPullRequestCreateArrow } from "react-icons/lu";
import {
  selectCreateCategoryData,
  selectGetCategoryData,
  selectGetCategoryLoading,
  selectUpdateCategoryData,
} from "../../../redux/slice/category/CategorySlice";
import { GetCategoryAction } from "../../../redux/actions/category/CategoryActions";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "../../../components/image";

interface CategoryTypes {
  onRowClick?: any;
}

const CategoryTable: React.FC<CategoryTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    Category: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetCategoryLoading);
  const categoryData = useSelector(selectGetCategoryData);
  const updateData = useSelector(selectUpdateCategoryData);
  const createData = useSelector(selectCreateCategoryData);

  useEffect(() => {
    dispatch(GetCategoryAction({ page: 0, size: 20 }));
  }, []);

  const handleFilter = ({
    filter,
    page,
    pageSize,
  }: HandleFilterParams) => {
    dispatch(
      GetCategoryAction({
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

  useEffect(() => {
    if (updateData?.status == 200 || createData?.status == 201) {
      dispatch(
        GetCategoryAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [updateData, createData]);

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت دسته بندی جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={categoryData}
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
            <TableHeadCell>تصویر دسته بندی</TableHeadCell>
            <TableHeadCell>نام دسته بندی </TableHeadCell>
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
            categoryData?.data?.length > 0 ? (
              categoryData?.data?.map((row: any) => (
                <TableRow key={row?._id}>
                  <TableCell>
                    <Image
                      className="w-[60px] h-[60px] rounded-lg"
                      src={
                        row?.image
                          ? row?.image
                          : "/images/core/default-image.png"
                      }
                    />
                  </TableCell>
                  <TableCell>{row?.name ?? "_"}</TableCell>
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
                      startIcon={
                        <LuGitPullRequestCreateArrow className="text-xl" />
                      }
                      type="button"
                      variant="outline-warning"
                      size="sm"
                      onClick={() => {
                        onRowClick && onRowClick("delete", row);
                      }}
                    >
                      ساخت ویژگی
                    </Button>
                    <Button
                      startIcon={
                        <MdOutlineFeaturedPlayList className="text-xl" />
                      }
                      type="button"
                      variant="outline-primary"
                      size="sm"
                      onClick={() => {
                        onRowClick && onRowClick("detail", row);
                      }}
                    >
                      نمایش ویژگی ها
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
export default CategoryTable;

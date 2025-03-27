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

import { FaRegEdit } from "react-icons/fa";
import Image from "../../../components/image";
import {
  selectCreateBlogData,
  selectGetBlogData,
  selectGetBlogLoading,
  selectUpdateBlogData,
} from "../../../redux/slice/blog/BlogSlice";
import { GetBlogAction } from "../../../redux/actions/blog/BlogActions";
import TextOverflow from "../../../utils/TextOverflow";
import { BiTrashAlt } from "react-icons/bi";

interface BlogTypes {
  onRowClick?: any;
}

const BlogTable: React.FC<BlogTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    Blog: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetBlogLoading);
  const blogData = useSelector(selectGetBlogData);
  const updateData = useSelector(selectUpdateBlogData);
  const createData = useSelector(selectCreateBlogData);

  useEffect(() => {
    dispatch(GetBlogAction({ page: 0, size: 20 }));
  }, []);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetBlogAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
      })
    );
  };

  const handleFilterParameters = (data: any) => {
    const { FoodName, Blog, Restaurant } = data;
    let queryParam = "";
    if (FoodName) queryParam += "title=" + FoodName + ",";
    if (Blog?.label) queryParam += "categoriesId=" + Blog?.value + ",";
    if (Restaurant?.label)
      queryParam += "restaurantId=" + Restaurant?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  useEffect(() => {
    if (updateData?.status == 200 || createData?.status == 201) {
      dispatch(
        GetBlogAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [updateData, createData]);

  useEffect(() => {
    console.log("blogData", blogData);
  }, [blogData]);

  return (
    <CollectionControls
      buttons={["create"]}
      createTitle="ساخت مقاله جدید"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={blogData}
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
            <TableHeadCell>تصویر مقاله</TableHeadCell>
            <TableHeadCell>عنوان مقاله </TableHeadCell>
            <TableHeadCell>دسته بندی</TableHeadCell>
            <TableHeadCell>وضعیت</TableHeadCell>
            <TableHeadCell>توضیح کوتاه</TableHeadCell>
            <TableHeadCell>متن مقاله</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            blogData?.data?.length > 0 ? (
              blogData?.data?.map((row: any) => (
                <TableRow key={row?._id}>
                  <TableCell>
                    <Image
                      className="w-[94px] h-[84px] rounded-lg"
                      src={
                        row?.thumbnail
                          ? row?.thumbnail
                          : "/images/core/default-image.png"
                      }
                    />
                  </TableCell>
                  <TableCell>{row?.title ?? "_"}</TableCell>
                  <TableCell>{row?.category?.title ?? "_"}</TableCell>
                  <TableCell>{row?.isActive ? "فعال" : "غیر فعال"}</TableCell>
                  <TableCell>{row?.summery ?? "_"}</TableCell>
                  <TableCell>
                    <TextOverflow>{row?.description ?? "_"}</TextOverflow>
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
export default BlogTable;

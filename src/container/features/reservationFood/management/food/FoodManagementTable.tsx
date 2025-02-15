import React, { useEffect } from "react";
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
import { getAllFoodAction } from "../../../../../redux/actions/foodReservation/management/food/FoodAction";
import {
  selectGetAllFoodData,
  selectGetAllFoodLoading,
} from "../../../../../redux/slice/foodReservation/management/food/FoodSlice";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "../../../../../components/image/index";
import TableFilterCell from "../../../../../components/table/TableFilterCell";
import SearchInputField from "../../../../../components/molcols/formik-fields/SearchInputField";
import { HandleFilterParams } from "../../../../../types/FilterParams";
import EmptyImage from "../../../../../components/image/EmptyImage";
import CategorySelect from "../category/CategorySelect";
import RestaurantSelect from "../restaurant/RestaurantSelect";

interface FoodManagementTableTypes {
  onRowClick?: any;
}

const FoodManagementTable: React.FC<FoodManagementTableTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  const filterDefaultInitialValues = {
    FoodName: "",
    Category: null,
    Restaurant: null,
  };

  const loading = useSelector(selectGetAllFoodLoading);
  const foodData = useSelector(selectGetAllFoodData);

  useEffect(() => {
    dispatch(getAllFoodAction());
  }, []);

  const handleFilter = ({
    filter,
    search,
    page,
    pageSize,
  }: HandleFilterParams) => {
    dispatch(
      getAllFoodAction({
        filter,
        search,
        page,
        pageSize,
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
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      buttons={["filter", "create"]}
      data={foodData}
      createTitle="ایجاد غذای جدید"
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
            <TableHeadCell className="w-[180px]">
              {PublicDictionary?.food_image}
            </TableHeadCell>
            <TableHeadCell>{PublicDictionary?.food_name}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.food_category}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.food_restaurant}</TableHeadCell>
            <TableHeadCell>{PublicDictionary?.food_description}</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell />
            <TableFilterCell>
              <SearchInputField name="FoodName" placeholder="جست و جو" />
            </TableFilterCell>
            <TableFilterCell>
              <CategorySelect
                noBorder
                placeholder="جست و جو"
                label=""
                name="Category"
              />
            </TableFilterCell>
            <TableFilterCell>
              <RestaurantSelect
                noBorder
                placeholder="جست و جو"
                label=""
                name="Restaurant"
              />
            </TableFilterCell>
            <TableFilterCell />
            <TableFilterCell />
          </TableRow>
          {!loading ? (
            foodData?.data?.length > 0 ? (
              foodData?.data?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell className="flex items-center justify-center">
                    <div className="w-[130px] h-[90px] rounded-xl relative">
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
                  <TableCell>{row?.title ?? "_"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 flex-wrap">
                      {row?.categoriesId
                        ? row?.categoriesId?.map((item: any) => (
                            <div className="py-1 px-2 rounded-lg bg-success-50 text-success-800">
                              {item?.name}
                            </div>
                          ))
                        : "_"}
                    </div>
                  </TableCell>
                  <TableCell>{row?.restaurantId?.name ?? "_"}</TableCell>
                  <TableCell>{row?.description ?? "_"}</TableCell>
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
export default FoodManagementTable;

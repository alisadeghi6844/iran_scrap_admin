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
import SingleSelect from "../../../components/select/SingleSelect";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import {
  selectGetProductRequestAdminData,
  selectGetProductRequestAdminLoading,
  selectUpdateProductRequestAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { GetRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  convertToJalali,
  convertToJalali_2,
} from "../../../utils/MomentConvertor";
import { CloseRequestAction } from "../../../redux/actions/product-request-offer-admin/ProductRequestOfferAdminActions";
import {
  selectCloseRequestLoading,
  selectCloseRequestData,
} from "../../../redux/slice/product-request-offer-admin/ProductRequestOfferAdminSlice";
import {
  selectGetCategoryData,
  selectGetCategoryLoading,
} from "../../../redux/slice/category/CategorySlice";
import { GetCategoryAction } from "../../../redux/actions/category/CategoryActions";
import {
  selectGetUsersProvidersData,
  selectGetUsersProvidersLoading,
} from "../../../redux/slice/users/UsersSlice";
import { GetUsersProvidersAction } from "../../../redux/actions/users/UsersActions";
import { 
  orderStatusOptions,
  getOrderStatusText,
  getOrderStatusColor
} from "../../../types/OrderStatus";

interface ProductRequestAdminTypes {
  onRowClick?: any;
}

const ProductRequestAdmin: React.FC<ProductRequestAdminTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  // Filter states
  const [categoryFilter, setCategoryFilter] =
    useState<SelectOptionTypes | null>(null);
  const [providerFilter, setProviderFilter] =
    useState<SelectOptionTypes | null>(null);
  const [statusFilter, setStatusFilter] = useState<SelectOptionTypes | null>(
    null
  );

  const filterDefaultInitialValues = {
    Category: categoryFilter,
    Provider: providerFilter,
    Status: statusFilter,
  };

  const loading = useSelector(selectGetProductRequestAdminLoading);
  const productAdminData = useSelector(selectGetProductRequestAdminData);
  const updateData = useSelector(selectUpdateProductRequestAdminData);
  const closeRequestLoading = useSelector(selectCloseRequestLoading);
  const closeRequestData = useSelector(selectCloseRequestData);
  const categoryData = useSelector(selectGetCategoryData);
  const categoryLoading = useSelector(selectGetCategoryLoading);
  const providersData = useSelector(selectGetUsersProvidersData);
  const providersLoading = useSelector(selectGetUsersProvidersLoading);

  useEffect(() => {
    dispatch(
      GetRequestProductAdminAction({
        page: 0,
        size: 20,
      })
    );
    dispatch(GetCategoryAction({}));
    dispatch(GetUsersProvidersAction({ credentials: {} }));
  }, []);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Category: categoryFilter,
      Provider: providerFilter,
      Status: statusFilter,
    };

    const filterString = handleFilterParameters(filterData);

    dispatch(
      GetRequestProductAdminAction({
        filter: filterString || undefined,
        page: 0,
        size: 20,
      })
    );
  }, [categoryFilter, providerFilter, statusFilter, dispatch]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    dispatch(
      GetRequestProductAdminAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
      })
    );
  };

  const handleFilterParameters = (data: unknown) => {
    const { Category, Provider, Status } = data as {
      Category?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
      Status?: SelectOptionTypes;
    };
    let queryParam = "";
    if (Category?.value) queryParam += "categoryId=" + Category?.value + ",";
    if (Provider?.value) queryParam += "providerId=" + Provider?.value + ",";
    if (Status?.value) queryParam += "status=" + Status?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };



  // Get categories from category API
  const categoryOptions = React.useMemo(() => {
    if (!categoryData?.data) return [];
    return categoryData.data.map((category: any) => ({
      value: category._id || category.id,
      label: category.name,
    }));
  }, [categoryData]);

  // Get providers from users API with Provider or Both usertype
  const providerOptions = React.useMemo(() => {
    if (!providersData?.data?.data) return [];
    return providersData.data.data
      .filter(
        (user: any) => user.usertype === "Provider" || user.usertype === "Both"
      )
      .map((user: any) => ({
        value: user.id,
        label:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.mobile || user.companyName || "نامشخص",
      }));
  }, [providersData]);

  useEffect(() => {
    if (updateData?.status == 200) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [updateData]);

  useEffect(() => {
    if (closeRequestData?.status == 200) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [closeRequestData]);

  const handleCloseRequest = (requestId: string) => {
    dispatch(CloseRequestAction({ requestId }));
  };

  return (
    <CollectionControls
      title="مدیریت درخواست ها"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      data={productAdminData}
      onMetaChange={handleFilter}
      onButtonClick={(button) => {
        if (onRowClick) {
          button === "create" && onRowClick("create");
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">دسته بندی</TableHeadCell>
            <TableHeadCell> مقدار</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">
              {" "}
              تامین کننده
            </TableHeadCell>
            <TableHeadCell>تاریخ ثبت درخواست</TableHeadCell>
            <TableHeadCell>تاریخ تحویل</TableHeadCell>
            <TableHeadCell>آدرس</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">وضعیت</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <SingleSelect
                isLoading={categoryLoading}
                options={categoryOptions}
                onChange={(value: any) => setCategoryFilter(value)}
                value={categoryFilter}
                placeholder="انتخاب دسته‌بندی..."
                noBorder
                isClearable
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <SingleSelect
                isLoading={providersLoading}
                options={providerOptions}
                onChange={(value: any) => setProviderFilter(value)}
                value={providerFilter}
                placeholder="انتخاب تامین‌کننده..."
                noBorder
                isClearable
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell></TableFilterCell>
            <TableFilterCell>
              <SingleSelect
                isLoading={false}
                options={orderStatusOptions}
                onChange={(value: any) => setStatusFilter(value)}
                value={statusFilter}
                placeholder="انتخاب وضعیت..."
                noBorder
                isClearable
              />
            </TableFilterCell>
            <TableFilterCell></TableFilterCell>
          </TableRow>
          {!loading ? (
            productAdminData?.data?.length > 0 ? (
              productAdminData?.data?.map((row: unknown) => (
                <TableRow key={row?.id}>
                  <TableCell>{row?.description ?? "_"}</TableCell>
                  <TableCell>{row?.category?.name ?? "_"}</TableCell>
                  <TableCell>
                    {row?.amount ? `${row?.amount} (کیلوگرم)` : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.user?.firstName && row?.user?.lastName
                      ? `${row.user.firstName} ${row.user.lastName}`
                      : row?.user?.mobile ?? "_"}
                  </TableCell>
                  <TableCell>
                    {row?.createdAt ? convertToJalali(row?.createdAt) : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.expectedDate
                      ? convertToJalali_2(row?.expectedDate)
                      : "_"}
                  </TableCell>
                  <TableCell>{row?.province + " , " + row?.city}</TableCell>
                  <TableCell>
                    <span className={getOrderStatusColor(row?.status)}>
                      {getOrderStatusText(row?.status) || row?.statusTitle || "_"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      {(row?.status === "REGISTERED" ||
                        row?.status === "WAITING_FOR_OFFERS") && (
                        <Button
                          size="sm"
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            onRowClick && onRowClick("detail", row);
                          }}
                        >
                          ویرایش درخواست
                        </Button>
                      )}
                      <Button
                        size="sm"
                        type="button"
                        variant="primary"
                        onClick={() => {
                          onRowClick && onRowClick("update", row);
                        }}
                      >
                        پردازش درخواست
                      </Button>
                      <Button
                        size="sm"
                        type="button"
                        variant="error"
                        onClick={() => handleCloseRequest(row?.id)}
                        loading={closeRequestLoading}
                      >
                        تغییر وضعیت درخواست
                      </Button>
                    </div>
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
export default ProductRequestAdmin;

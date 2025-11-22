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
  selectUpdateProductRequestProviderAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { GetRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import { convertToJalali } from "../../../utils/MomentConvertor";
import { selectUpdateRequestProductOfferSendToBuyerData } from "../../../redux/slice/productRequestOffer/ProductStatusRequestSlice";
import RequestDetailModal from "./RequestDetailModal";
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

const CloseRequest: React.FC<ProductRequestAdminTypes> = (props) => {
  const { onRowClick } = props;

  const dispatch: any = useDispatch();

  // Filter states
  const [categoryFilter, setCategoryFilter] =
    useState<SelectOptionTypes | null>(null);
  const [providerFilter, setProviderFilter] =
    useState<SelectOptionTypes | null>(null);
  const [paymentTypeFilter, setPaymentTypeFilter] =
    useState<SelectOptionTypes | null>(null);
  const [statusFilter, setStatusFilter] = useState<SelectOptionTypes | null>(
    null
  );

  const filterDefaultInitialValues = {
    Category: categoryFilter,
    Provider: providerFilter,
    PaymentType: paymentTypeFilter,
    Status: statusFilter,
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const loading = useSelector(selectGetProductRequestAdminLoading);
  const productAdminData = useSelector(selectGetProductRequestAdminData);
  const updateData = useSelector(
    selectUpdateRequestProductOfferSendToBuyerData
  );
  const updateData_2 = useSelector(selectUpdateProductRequestProviderAdminData);
  const categoryData = useSelector(selectGetCategoryData);
  const categoryLoading = useSelector(selectGetCategoryLoading);
  const providersData = useSelector(selectGetUsersProvidersData);
  const providersLoading = useSelector(selectGetUsersProvidersLoading);

  // تعریف آرایه وضعیت‌های پیش‌فرض برای جلوگیری از تکرار
  const defaultStatuses = [
    "SEND_FINAL_OFFER_TO_BUYER",
    "SEND_FINAL_OFFER_TO_BUYER",
  ];

  useEffect(() => {
    dispatch(
      GetRequestProductAdminAction({
        page: 0,
        size: 20,
        status: selectedStatus ? [selectedStatus?.value] : defaultStatuses,
      })
    );
    dispatch(GetCategoryAction({}));
    dispatch(GetUsersProvidersAction({ credentials: {} }));
  }, [selectedStatus, dispatch]);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Category: categoryFilter,
      Provider: providerFilter,
      PaymentType: paymentTypeFilter,
      Status: statusFilter,
    };

    const filterString = handleFilterParameters(filterData);

    dispatch(
      GetRequestProductAdminAction({
        filter: filterString || undefined,
        page: 0,
        size: 20,
        status: selectedStatus ? [selectedStatus?.value] : defaultStatuses,
      })
    );
  }, [
    categoryFilter,
    providerFilter,
    paymentTypeFilter,
    statusFilter,
    dispatch,
    selectedStatus,
  ]);

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    console.log("search ", filter, page, pageSize);
    dispatch(
      GetRequestProductAdminAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 20,
        status: selectedStatus ? [selectedStatus?.value] : defaultStatuses,
      })
    );
  };

  const handleFilterParameters = (data: unknown) => {
    const { Category, Provider, PaymentType, Status } = data as {
      Category?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
      PaymentType?: SelectOptionTypes;
      Status?: SelectOptionTypes;
    };
    let queryParam = "";
    if (Category?.value) queryParam += "categoryId=" + Category?.value + ",";
    if (Provider?.value) queryParam += "providerId=" + Provider?.value + ",";
    if (PaymentType?.value)
      queryParam += "paymentType=" + PaymentType?.value + ",";
    if (Status?.value) queryParam += "status=" + Status?.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  // Filter options
  const paymentTypeOptions = [
    { value: "CASH", label: "نقدی" },
    { value: "INSTALLMENTS", label: "مدت دار" },
    { value: "CASH_AND_INSTALLMENTS", label: "نقدی و مدت دار" },
  ];

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
    console.log("updateData_2", updateData_2);
    if (updateData?.status === 200 || updateData_2?.id) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
          status: selectedStatus ? [selectedStatus?.value] : defaultStatuses,
        })
      );
    }
  }, [updateData, updateData_2, dispatch, selectedStatus]);

  return (
    <CollectionControls
      title="درخواست های  دارای پیشنهاد"
      hasBox={false}
      filterInitialValues={filterDefaultInitialValues}
      onFilter={handleFilterParameters}
      onMetaChange={handleFilter}
      data={productAdminData}
      onButtonClick={(button) => {
        if (!!onRowClick) {
          button === "create" && onRowClick("create");
        }
      }}
    >
      <Table className="w-full" isLoading={false} shadow={false}>
        <TableHead className="w-full" isLoading={false} shadow={false}>
          <TableRow>
            <TableHeadCell>نام درخواست کننده</TableHeadCell>
            <TableHeadCell>تلفن همراه درخواست کننده</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">دسته بندی</TableHeadCell>
            <TableHeadCell>توضیحات</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">
              {" "}
              تامین کننده
            </TableHeadCell>
            <TableHeadCell>تاریخ ثبت درخواست</TableHeadCell>
            <TableHeadCell>آدرس</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">نوع پرداخت</TableHeadCell>
            <TableHeadCell>مقدار درخواستی</TableHeadCell>
            <TableHeadCell className="min-w-[170px]">وضعیت</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell></TableFilterCell>
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
            <TableFilterCell>
              <SingleSelect
                isLoading={false}
                options={paymentTypeOptions}
                onChange={(value: any) => setPaymentTypeFilter(value)}
                value={paymentTypeFilter}
                placeholder="انتخاب نوع پرداخت..."
                noBorder
                isClearable
              />
            </TableFilterCell>
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
              productAdminData?.data?.map((row: any) => (
                <TableRow key={row?.id}>
                  <TableCell>
                    {row?.user?.firstName
                      ? row?.user?.firstName + " " + row?.user?.lastName
                      : "_"}
                  </TableCell>
                  <TableCell>{row?.user?.mobile ?? "_"}</TableCell>
                  <TableCell>{row?.category?.name ?? "_"}</TableCell>
                  <TableCell>{row?.description ?? "_"}</TableCell>
                  <TableCell>
                    {row?.user?.firstName && row?.user?.lastName
                      ? `${row.user.firstName} ${row.user.lastName}`
                      : row?.user?.mobile ?? "_"}
                  </TableCell>
                  <TableCell>
                    {row?.createdAt ? convertToJalali(row?.createdAt) : "_"}
                  </TableCell>
                  <TableCell>{row?.province + " , " + row?.city}</TableCell>
                  <TableCell>
                    {row?.paymentType
                      ? row?.paymentType === "INSTALLMENTS"
                        ? "مدت دار"
                        : row?.paymentType === "CASH_AND_INSTALLMENTS"
                        ? "نقد و مدت دار"
                        : "نقد"
                      : "_"}
                  </TableCell>
                  <TableCell>
                    {row?.amount ? `${row?.amount} (کیلوگرم)` : "_"}
                  </TableCell>

                  <TableCell>
                    <span className={getOrderStatusColor(row?.status)}>
                      {getOrderStatusText(row?.status) || row?.statusTitle || "_"}
                    </span>
                  </TableCell>
                  {/* <TableCell className="flex justify-center">
                    <Button
                      type="button"
                      onClick={() => {
                        onRowClick && onRowClick("detail", row);
                      }}
                      variant="outline-warning"
                    >
                      تغییر وضعیت
                    </Button>
                  </TableCell> */}
                  <TableCell className="flex justify-center gap-2">
                    <Button
                      onClick={() => {
                        setSelectedRequest(row);
                        setIsDetailModalOpen(true);
                      }}
                      variant="outline-primary"
                    >
                      مشاهده درخواست
                    </Button>
                    {/* <Button
                      onClick={() => {
                        onRowClick && onRowClick("update", row);
                      }}
                      variant="outline-success"
                      size="sm"
                    >
                      پیشنهادات
                    </Button> */}
                  </TableCell>
                  {/* {row?.status === "SEND_FINAL_OFFER_TO_BUYER" && (
                    <TableCell className="flex justify-center">
                      <Button
                        onClick={() => {
                          onRowClick && onRowClick("payment", row);
                        }}
                        variant="outline-success"
                      >
                        پرداخت هزینه
                      </Button>
                    </TableCell>
                  )} */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={13} className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={13} className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* مودال جزئیات درخواست */}
      <RequestDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
      />
    </CollectionControls>
  );
};

export default CloseRequest;

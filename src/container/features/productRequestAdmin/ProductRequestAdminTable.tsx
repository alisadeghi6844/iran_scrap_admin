import React, { useEffect, useState, useMemo } from "react";
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
import EmptyImage from "../../../components/image/EmptyImage";
import TableSkeleton from "../../organism/skeleton/TableSkeleton";
import SingleSelect from "../../../components/select/SingleSelect";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import Input from "../../../components/input";
import {
  selectGetProductRequestAdminData,
  selectGetProductRequestAdminLoading,
  selectUpdateProductRequestAdminData,
} from "../../../redux/slice/productRequestStatus/ProductStatusRequestSlice";
import { GetRequestProductAdminAction } from "../../../redux/actions/productRequestStatus/RequestProductStatus";
import {
  convertToJalali,
} from "../../../utils/MomentConvertor";
import {
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
  getOrderStatusColor,
} from "../../../types/OrderStatus";
import useDebounce from "../../../hooks/UseDebounce";
import ProductRequestOfferAdminModal from "../productRequestOfferAdmin/ProductRequestOfferAdminModal";
import ProductRequestAdminShowMore from "./ProductRequestAdminShowMore";
import ActionsDropdown from "./ActionsDropdown";

interface ProductRequestAdminTypes {
  onRowClick?: (name: string, row?: any) => void;
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
  const [codeFilter, setCodeFilter] = useState("");
  const [debouncedCodeFilter, setDebouncedCodeFilter] = useState("");

  // Modal states
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);
  const [isSowMoreModalOpen, setIsSowMoreModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  useDebounce(
    () => {
      setDebouncedCodeFilter(codeFilter);
    },
    [codeFilter],
    800
  );

  const filterDefaultInitialValues = {
    Category: categoryFilter,
    Provider: providerFilter,
    Status: statusFilter,
    Code: debouncedCodeFilter,
  };

  const loading = useSelector(selectGetProductRequestAdminLoading);
  const productAdminData = useSelector(selectGetProductRequestAdminData);
  const updateData = useSelector(selectUpdateProductRequestAdminData);
  const closeRequestData = useSelector(selectCloseRequestData);
  const categoryData = useSelector(selectGetCategoryData);
  const categoryLoading = useSelector(selectGetCategoryLoading);
  const providersData = useSelector(selectGetUsersProvidersData);
  const providersLoading = useSelector(selectGetUsersProvidersLoading);

  useEffect(() => {
    dispatch(GetCategoryAction({}));
    dispatch(GetUsersProvidersAction({ credentials: {} }));
  }, [dispatch]);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Category: categoryFilter,
      Provider: providerFilter,
      Status: statusFilter,
      Code: debouncedCodeFilter,
    };

    const filterString = handleFilterParameters(filterData);

    const promise = dispatch(
      GetRequestProductAdminAction({
        filter: filterString || undefined,
        page: 0,
        size: 20,
      })
    );

    return () => {
      promise.abort();
    };
  }, [categoryFilter, providerFilter, statusFilter, debouncedCodeFilter, dispatch]);

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
    const { Category, Provider, Status, Code } = data as {
      Category?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
      Status?: SelectOptionTypes;
      Code?: string;
    };
    let queryParam = "";
    if (Category?.value) queryParam += "categoryId=" + Category?.value + ",";
    if (Provider?.value) queryParam += "providerId=" + Provider?.value + ",";
    if (Status?.value) queryParam += "status=" + Status?.value + ",";
    if (Code) queryParam += "code=" + Code + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  const categoryOptions = useMemo(() => {
    if (!categoryData?.data) return [];
    return categoryData.data.map((category: any) => ({
      value: category._id || category.id,
      label: category.name,
    }));
  }, [categoryData]);

  const providerOptions = useMemo(() => {
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
    if (updateData?.status === 200 || closeRequestData?.status === 200) {
      dispatch(
        GetRequestProductAdminAction({
          page: 0,
          size: 20,
        })
      );
    }
  }, [updateData, closeRequestData, dispatch]);

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
            <TableHeadCell>کد</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">دسته بندی</TableHeadCell>
            <TableHeadCell> مقدار</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">
              تامین کننده
            </TableHeadCell>
            <TableHeadCell>تاریخ ثبت درخواست</TableHeadCell>
            <TableHeadCell>آدرس</TableHeadCell>
            <TableHeadCell className="min-w-[230px]">وضعیت</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableFilterCell>
              <Input
                value={codeFilter}
                onChange={(e: any) => setCodeFilter(e.target.value)}
                placeholder="جستجو..."
                noBorder
                className="min-w-[80px]"
              />
            </TableFilterCell>
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
                  <TableCell>{row?.code ?? "_"}</TableCell>
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
                  <TableCell>{row?.province + " , " + row?.city}</TableCell>
                  <TableCell>
                    <span className={getOrderStatusColor(row?.status)}>
                      {getOrderStatusText(row?.status) || row?.statusTitle || "_"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <ActionsDropdown
                      row={row}
                      onRowClick={onRowClick}
                      onSuggestionsClick={(r) => {
                        setSelectedRow(r);
                        setIsSuggestionsModalOpen(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="flex justify-center !py-4">
                  <EmptyImage />
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="flex justify-center !py-4">
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {isSuggestionsModalOpen && selectedRow && (
        <ProductRequestOfferAdminModal
          isOpen={isSuggestionsModalOpen}
          onClose={() => setIsSuggestionsModalOpen(false)}
          requestId={selectedRow?.id || selectedRow?._id}
        />
      )}
      {isSowMoreModalOpen && selectedRow && (
        <ProductRequestAdminShowMore
          isOpen={isSowMoreModalOpen}
          onClose={() => setIsSowMoreModalOpen(false)}
          data={selectedRow}
        />
      )}
    </CollectionControls>
  );
};
export default ProductRequestAdmin;

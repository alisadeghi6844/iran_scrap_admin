import React from "react";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableFilterCell from "../../../components/table/TableFilterCell";
import TableCell from "../../../components/table/TableCell";
import SingleSelect from "../../../components/select/SingleSelect";
import Button from "../../../components/button";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import { getOrderStatusColor, getOrderStatusText } from "../../../types/OrderStatus";

export const OpenRequestTableHead: React.FC = () => {
  return (
    <TableHead className="w-full" isLoading={false} shadow={false}>
      <TableRow>
        <TableHeadCell>نام درخواست کننده</TableHeadCell>
        <TableHeadCell className="min-w-[230px]">دسته بندی</TableHeadCell>
        <TableHeadCell>تلفن همراه درخواست کننده</TableHeadCell>
        <TableHeadCell>توضیحات</TableHeadCell>
        <TableHeadCell className="min-w-[230px]"> تامین کننده</TableHeadCell>
        <TableHeadCell>آدرس</TableHeadCell>
        <TableHeadCell>مقدار درخواست</TableHeadCell>
        <TableHeadCell className="min-w-[230px]">نوع پرداخت</TableHeadCell>
        <TableHeadCell className="min-w-[170px]">وضعیت</TableHeadCell>
        <TableHeadCell>عملیات</TableHeadCell>
      </TableRow>
    </TableHead>
  );
};

interface OpenRequestTableFilterRowProps {
  categoryLoading: boolean;
  categoryOptions: Array<{ value: string; label: string }>;
  categoryFilter: SelectOptionTypes | null;
  onCategoryChange: (value: any) => void;

  providersLoading: boolean;
  providerOptions: Array<{ value: string; label: string }>;
  providerFilter: SelectOptionTypes | null;
  onProviderChange: (value: any) => void;

  paymentTypeOptions: Array<{ value: string; label: string }>;
  paymentTypeFilter: SelectOptionTypes | null;
  onPaymentTypeChange: (value: any) => void;
}

export const OpenRequestTableFilterRow: React.FC<
  OpenRequestTableFilterRowProps
> = (props) => {
  const {
    categoryLoading,
    categoryOptions,
    categoryFilter,
    onCategoryChange,
    providersLoading,
    providerOptions,
    providerFilter,
    onProviderChange,
    paymentTypeOptions,
    paymentTypeFilter,
    onPaymentTypeChange,
  } = props;

  return (
    <TableRow>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell>
        <SingleSelect
          isLoading={categoryLoading}
          options={categoryOptions}
          onChange={onCategoryChange}
          value={categoryFilter}
          placeholder="انتخاب دسته‌بندی..."
          noBorder
          isClearable
        />
      </TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell>
        <SingleSelect
          isLoading={providersLoading}
          options={providerOptions}
          onChange={onProviderChange}
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
          onChange={onPaymentTypeChange}
          value={paymentTypeFilter}
          placeholder="انتخاب نوع پرداخت..."
          noBorder
          isClearable
        />
      </TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell></TableFilterCell>
    </TableRow>
  );
};

interface OpenRequestTableDataRowProps {
  row: any;
  onOpenDetail: (row: any) => void;
  onEditDriver: (row: any) => void;
}

export const OpenRequestTableDataRow: React.FC<OpenRequestTableDataRowProps> = (
  props
) => {
  const { row, onOpenDetail, onEditDriver } = props;

  return (
    <TableRow>
      <TableCell>
        {row?.user?.firstName
          ? row?.user?.firstName + " " + row?.user?.lastName
          : "_"}
      </TableCell>
      <TableCell>{row?.category?.name ?? "_"}</TableCell>
      <TableCell>{row?.user?.mobile ?? "_"}</TableCell>
      <TableCell>{row?.description ?? "_"}</TableCell>
      <TableCell>
        {row?.user?.firstName && row?.user?.lastName
          ? `${row.user.firstName} ${row.user.lastName}`
          : row?.user?.mobile ?? "_"}
      </TableCell>
      <TableCell>{row?.province + " , " + row?.city}</TableCell>
      <TableCell>{row?.amount ? `${row?.amount} (کیلوگرم)` : "_"}</TableCell>
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
        <span className={getOrderStatusColor(row?.status)}>
          {getOrderStatusText(row?.status) || row?.statusTitle || "_"}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            size="sm"
            type="button"
            variant="primary"
            onClick={() => onOpenDetail(row)}
          >
            مشاهده درخواست
          </Button>
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={() => onEditDriver(row)}
          >
            ویرایش اطلاعات راننده
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};



import React from "react";
import TableHead from "../../../components/table/TableHead";
import TableHeadCell from "../../../components/table/TableHeadCell";
import TableRow from "../../../components/table/TableRow";
import TableFilterCell from "../../../components/table/TableFilterCell";
import TableCell from "../../../components/table/TableCell";
import SingleSelect from "../../../components/select/SingleSelect";
import Button from "../../../components/button";
import { SelectOptionTypes } from "../../../types/features/FeatureSelectTypes";
import { convertToJalali } from "../../../utils/MomentConvertor";
import {
  getOrderStatusColor,
  getOrderStatusText,
  orderStatusOptions,
} from "../../../types/OrderStatus";

export const CloseRequestTableHead: React.FC = () => {
  return (
    <TableHead className="w-full" isLoading={false} shadow={false}>
      <TableRow>
        <TableHeadCell>نام درخواست کننده</TableHeadCell>
        <TableHeadCell>تلفن همراه درخواست کننده</TableHeadCell>
        <TableHeadCell className="min-w-[230px]">دسته بندی</TableHeadCell>
        <TableHeadCell>توضیحات</TableHeadCell>
        <TableHeadCell className="min-w-[230px]"> تامین کننده</TableHeadCell>
        <TableHeadCell>تاریخ ثبت درخواست</TableHeadCell>
        <TableHeadCell>آدرس</TableHeadCell>
        <TableHeadCell className="min-w-[230px]">نوع پرداخت</TableHeadCell>
        <TableHeadCell>مقدار درخواستی</TableHeadCell>
        <TableHeadCell className="min-w-[170px]">وضعیت</TableHeadCell>
        <TableHeadCell />
      </TableRow>
    </TableHead>
  );
};

interface CloseRequestTableFilterRowProps {
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

  statusFilter: SelectOptionTypes | null;
  onStatusChange: (value: any) => void;
}

export const CloseRequestTableFilterRow: React.FC<
  CloseRequestTableFilterRowProps
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
    statusFilter,
    onStatusChange,
  } = props;

  return (
    <TableRow>
      <TableFilterCell></TableFilterCell>
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
      <TableFilterCell>
        <SingleSelect
          isLoading={false}
          options={orderStatusOptions}
          onChange={onStatusChange}
          value={statusFilter}
          placeholder="انتخاب وضعیت..."
          noBorder
          isClearable
        />
      </TableFilterCell>
      <TableFilterCell></TableFilterCell>
    </TableRow>
  );
};

interface CloseRequestTableDataRowProps {
  row: any;
  onOpenDetail: (row: any) => void;
}

export const CloseRequestTableDataRow: React.FC<CloseRequestTableDataRowProps> =
  (props) => {
    const { row, onOpenDetail } = props;

    return (
      <TableRow>
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
        <TableCell>{row?.amount ? `${row?.amount} (کیلوگرم)` : "_"}</TableCell>

        <TableCell>
          <span className={getOrderStatusColor(row?.status)}>
            {getOrderStatusText(row?.status) || row?.statusTitle || "_"}
          </span>
        </TableCell>
        <TableCell className="flex justify-center gap-2">
          <Button onClick={() => onOpenDetail(row)} variant="outline-primary">
            مشاهده درخواست
          </Button>
        </TableCell>
      </TableRow>
    );
  };



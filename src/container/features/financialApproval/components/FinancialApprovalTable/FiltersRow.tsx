import React from "react";
import TableRow from "../../../../../components/table/TableRow";
import TableFilterCell from "../../../../../components/table/TableFilterCell";
import SingleSelect from "../../../../../components/select/SingleSelect";
import Input from "../../../../../components/input";

interface FiltersRowProps {
  categoryLoading: boolean;
  categoryOptions: any[];
  categoryFilter: any;
  onCategoryChange: (value: any) => void;

  providersLoading: boolean;
  providerOptions: any[];
  providerFilter: any;
  onProviderChange: (value: any) => void;

  paymentTypeOptions: any[];
  paymentTypeFilter: any;
  onPaymentTypeChange: (value: any) => void;

  orderStatusOptions: any[];
  statusFilter: any;
  onStatusChange: (value: any) => void;

  codeFilter: string;
  onCodeChange: (value: string) => void;
}

const FiltersRow: React.FC<FiltersRowProps> = ({
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
  orderStatusOptions,
  statusFilter,
  onStatusChange,
  codeFilter,
  onCodeChange,
}) => {
  return (
    <TableRow>
      <TableFilterCell>
        <Input
          value={codeFilter}
          onChange={(e: any) => onCodeChange(e.target.value)}
          placeholder="جستجو..."
          noBorder
          className="min-w-[80px]"
        />
      </TableFilterCell>
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

export default FiltersRow;



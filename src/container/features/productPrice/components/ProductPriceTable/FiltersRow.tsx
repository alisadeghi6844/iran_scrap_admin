import React from "react";
import TableRow from "../../../../../components/table/TableRow";
import TableFilterCell from "../../../../../components/table/TableFilterCell";
import ProductFilterSelect from "../../filters/ProductFilterSelect";
import BrandFilterSelect from "../../filters/BrandFilterSelect";
import ProviderFilterSelect from "../../filters/ProviderFilterSelect";
import PortFilterSelect from "../../filters/PortFilterSelect";
import PaymentTypeFilterSelect from "../../filters/PaymentTypeFilterSelect";
import StatusFilterSelect from "../../filters/StatusFilterSelect";

interface FiltersRowProps {
  productFilter: any;
  onProductChange: (value: any) => void;

  brandFilter: any;
  onBrandChange: (value: any) => void;

  providerFilter: any;
  onProviderChange: (value: any) => void;

  portFilter: any;
  onPortChange: (value: any) => void;

  paymentTypeFilter: any;
  onPaymentTypeChange: (value: any) => void;

  statusFilter: any;
  onStatusChange: (value: any) => void;
}

const FiltersRow: React.FC<FiltersRowProps> = ({
  productFilter,
  onProductChange,
  brandFilter,
  onBrandChange,
  providerFilter,
  onProviderChange,
  portFilter,
  onPortChange,
  paymentTypeFilter,
  onPaymentTypeChange,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <TableRow>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell>
        <ProductFilterSelect
          name="Product"
          value={productFilter}
          onChange={onProductChange}
          placeholder="انتخاب کالا..."
        />
      </TableFilterCell>
      <TableFilterCell>
        <BrandFilterSelect
          name="Brand"
          value={brandFilter}
          onChange={onBrandChange}
          placeholder="انتخاب برند..."
        />
      </TableFilterCell>
      <TableFilterCell>
        <ProviderFilterSelect
          name="Provider"
          value={providerFilter}
          onChange={onProviderChange}
          placeholder="انتخاب تامین کننده..."
        />
      </TableFilterCell>
      <TableFilterCell>
        <PortFilterSelect
          name="Port"
          value={portFilter}
          onChange={onPortChange}
          placeholder="انتخاب محل بارگیری..."
        />
      </TableFilterCell>
      <TableFilterCell>
        <PaymentTypeFilterSelect
          name="PaymentType"
          value={paymentTypeFilter}
          onChange={onPaymentTypeChange}
          placeholder="انتخاب نوع پرداخت..."
        />
      </TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell>
        <StatusFilterSelect
          name="Status"
          value={statusFilter}
          onChange={onStatusChange}
          placeholder="انتخاب وضعیت..."
        />
      </TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell></TableFilterCell>
    </TableRow>
  );
};

export default FiltersRow;



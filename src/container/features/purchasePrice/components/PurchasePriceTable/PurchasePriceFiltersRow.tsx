import React from "react";
import TableRow from "../../../../../components/table/TableRow";
import TableFilterCell from "../../../../../components/table/TableFilterCell";
import { SelectOptionTypes } from "../../../../../types/features/FeatureSelectTypes";
import ProductFilterSelect from "../../filters/ProductFilterSelect";
import BrandFilterSelect from "../../filters/BrandFilterSelect";
import ProviderFilterSelect from "../../filters/ProviderFilterSelect";
import PortFilterSelect from "../../filters/PortFilterSelect";
import PaymentTypeFilterSelect from "../../filters/PaymentTypeFilterSelect";

interface PurchasePriceFiltersRowProps {
  productFilter: SelectOptionTypes | null;
  brandFilter: SelectOptionTypes | null;
  providerFilter: SelectOptionTypes | null;
  portFilter: SelectOptionTypes | null;
  paymentTypeFilter: SelectOptionTypes | null;
  onProductFilterChange: (value: SelectOptionTypes | null) => void;
  onBrandFilterChange: (value: SelectOptionTypes | null) => void;
  onProviderFilterChange: (value: SelectOptionTypes | null) => void;
  onPortFilterChange: (value: SelectOptionTypes | null) => void;
  onPaymentTypeFilterChange: (value: SelectOptionTypes | null) => void;
}

const PurchasePriceFiltersRow: React.FC<PurchasePriceFiltersRowProps> = ({
  productFilter,
  brandFilter,
  providerFilter,
  portFilter,
  paymentTypeFilter,
  onProductFilterChange,
  onBrandFilterChange,
  onProviderFilterChange,
  onPortFilterChange,
  onPaymentTypeFilterChange,
}) => {
  return (
    <TableRow>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell>
        <ProductFilterSelect
          name="Product"
          value={productFilter}
          onChange={onProductFilterChange}
          placeholder="انتخاب کالا..."
        />
      </TableFilterCell>
      <TableFilterCell>
        <BrandFilterSelect
          name="Brand"
          value={brandFilter}
          onChange={onBrandFilterChange}
          placeholder="انتخاب برند..."
        />
      </TableFilterCell>
      <TableFilterCell>
        <ProviderFilterSelect
          name="Provider"
          value={providerFilter}
          onChange={onProviderFilterChange}
          placeholder="انتخاب تامین کننده..."
        />
      </TableFilterCell>
      <TableFilterCell>
        <PortFilterSelect
          name="Port"
          value={portFilter}
          onChange={onPortFilterChange}
          placeholder="انتخاب محل بارگیری..."
        />
      </TableFilterCell>
      <TableFilterCell>
        <PaymentTypeFilterSelect
          name="PaymentType"
          value={paymentTypeFilter}
          onChange={onPaymentTypeFilterChange}
          placeholder="انتخاب نوع پرداخت..."
        />
      </TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell></TableFilterCell>
    </TableRow>
  );
};

export default PurchasePriceFiltersRow;



import { useEffect, useState } from "react";
import moment from "jalali-moment";
import { AppDispatch } from "../../../../redux/store";
import { GetProductPriceAction } from "../../../../redux/actions/productPrice/ProductPriceActions";
import { HandleFilterParams } from "../../../../types/FilterParams";
import { SelectOptionTypes } from "../../../../types/features/FeatureSelectTypes";

interface UsePurchasePriceTableQueryParams {
  dispatch: AppDispatch;
  updateData: any;
}

export const usePurchasePriceTableQuery = ({
  dispatch,
  updateData,
}: UsePurchasePriceTableQueryParams) => {
  // Filter states
  const [productFilter, setProductFilter] = useState<SelectOptionTypes | null>(
    null
  );
  const [brandFilter, setBrandFilter] = useState<SelectOptionTypes | null>(null);
  const [providerFilter, setProviderFilter] =
    useState<SelectOptionTypes | null>(null);
  const [portFilter, setPortFilter] = useState<SelectOptionTypes | null>(null);
  const [paymentTypeFilter, setPaymentTypeFilter] =
    useState<SelectOptionTypes | null>(null);

  // Default sort: newest first
  const sortBy = "createdAt";
  const sortOrder = "desc";

  const getFilterInitialValues = () => ({
    Product: productFilter,
    Brand: brandFilter,
    Provider: providerFilter,
    Port: portFilter,
    PaymentType: paymentTypeFilter,
  });

  // Get date range for last 10 days
  const getLast10DaysRange = () => {
    const today = moment();
    const tenDaysAgo = moment().subtract(10, "days");

    return {
      datef: tenDaysAgo.valueOf().toString(), // 10 روز قبل
      datet: today.valueOf().toString(), // امروز
    };
  };

  const handleFilterParameters = (data: unknown) => {
    const { Product, Brand, Provider, Port, PaymentType } = data as {
      Product?: SelectOptionTypes;
      Brand?: SelectOptionTypes;
      Provider?: SelectOptionTypes;
      Port?: SelectOptionTypes;
      PaymentType?: SelectOptionTypes;
    };

    let queryParam = "";
    if (Product?.value) queryParam += "productId=" + Product.value + ",";
    if (Brand?.value) queryParam += "brandId=" + Brand.value + ",";
    if (Provider?.value) queryParam += "providerId=" + Provider.value + ",";
    if (Port?.value) queryParam += "portId=" + Port.value + ",";
    if (PaymentType?.value) queryParam += "paymentType=" + PaymentType.value + ",";

    return queryParam.substring(0, queryParam.length - 1);
  };

  const handleFilter = ({ filter, page, pageSize }: HandleFilterParams) => {
    const dateRange = getLast10DaysRange();
    dispatch(
      GetProductPriceAction({
        filter,
        page: page ?? 0,
        size: pageSize ?? 10,
        include: ["brand", "provider", "product", "port"],
        sortBy: sortBy,
        sortOrder: sortOrder,
        datef: dateRange.datef,
        datet: dateRange.datet,
      })
    );
  };

  useEffect(() => {
    const dateRange = getLast10DaysRange();
    dispatch(
      GetProductPriceAction({
        page: 0,
        size: 10,
        include: ["brand", "provider", "product", "port"],
        sortBy: sortBy,
        sortOrder: sortOrder,
        datef: dateRange.datef,
        datet: dateRange.datet,
      })
    );
  }, [dispatch]);

  // Trigger filtering when filter values change
  useEffect(() => {
    const filterData = {
      Product: productFilter,
      Brand: brandFilter,
      Provider: providerFilter,
      Port: portFilter,
      PaymentType: paymentTypeFilter,
    };

    const filterString = handleFilterParameters(filterData);
    const dateRange = getLast10DaysRange();

    // Always dispatch the action - if no filters are applied, it will load all data
    dispatch(
      GetProductPriceAction({
        filter: filterString || undefined, // Pass undefined instead of empty string when no filters
        page: 0,
        size: 10,
        include: ["brand", "provider", "product", "port"],
        sortBy: sortBy,
        sortOrder: sortOrder,
        datef: dateRange.datef,
        datet: dateRange.datet,
      })
    );
  }, [productFilter, brandFilter, providerFilter, portFilter, paymentTypeFilter, dispatch]);

  useEffect(() => {
    if (updateData?.status == 200) {
      const dateRange = getLast10DaysRange();
      dispatch(
        GetProductPriceAction({
          page: 0,
          size: 10,
          include: ["brand", "provider", "product", "port"],
          sortBy: sortBy,
          sortOrder: sortOrder,
          datef: dateRange.datef,
          datet: dateRange.datet,
        })
      );
    }
  }, [updateData, dispatch]);

  // Handle filter changes
  const handleProductFilterChange = (value: SelectOptionTypes | null) => {
    setProductFilter(value);
  };

  const handleBrandFilterChange = (value: SelectOptionTypes | null) => {
    setBrandFilter(value);
  };

  const handleProviderFilterChange = (value: SelectOptionTypes | null) => {
    setProviderFilter(value);
  };

  const handlePortFilterChange = (value: SelectOptionTypes | null) => {
    setPortFilter(value);
  };

  const handlePaymentTypeFilterChange = (value: SelectOptionTypes | null) => {
    setPaymentTypeFilter(value);
  };

  return {
    productFilter,
    brandFilter,
    providerFilter,
    portFilter,
    paymentTypeFilter,
    getFilterInitialValues,
    handleFilterParameters,
    handleFilter,
    handleProductFilterChange,
    handleBrandFilterChange,
    handleProviderFilterChange,
    handlePortFilterChange,
    handlePaymentTypeFilterChange,
  };
};



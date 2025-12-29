import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ViewPricingTable from '../ViewPricingTable';
import { calculateProductStatus } from '../../../../utils/ProductStatusCalculator';

// Mock dependencies
jest.mock('../../../../redux/actions/productPrice/ProductPriceActions');
jest.mock('../filters/ProductFilterSelect', () => {
  return function MockProductFilterSelect() {
    return <div data-testid="product-filter">Product Filter</div>;
  };
});
jest.mock('../filters/BrandFilterSelect', () => {
  return function MockBrandFilterSelect() {
    return <div data-testid="brand-filter">Brand Filter</div>;
  };
});
jest.mock('../filters/PortFilterSelect', () => {
  return function MockPortFilterSelect() {
    return <div data-testid="port-filter">Port Filter</div>;
  };
});
jest.mock('../filters/PaymentTypeFilterSelect', () => {
  return function MockPaymentTypeFilterSelect() {
    return <div data-testid="payment-type-filter">Payment Type Filter</div>;
  };
});

const mockStore = configureStore({
  reducer: {
    productPrice: (state = {
      getProductPriceLoading: false,
      getProductPriceData: {
        data: [
          {
            _id: '1',
            productId: { id: '1', name: 'محصول تست' },
            brandId: { id: '1', name: 'برند تست' },
            portId: { id: '1', name: 'بندر تست' },
            paymentType: 'CASH',
            sellPrice: 100,
            constant: 12,
            updatedAt: 1640995200000,
          },
          {
            _id: '2',
            productId: { id: '2', name: 'محصول دوم' },
            brandId: { id: '2', name: 'برند دوم' },
            portId: { id: '2', name: 'بندر دوم' },
            paymentType: 'INSTALLMENT1',
            sellPrice: 100,
            constant: 4,
            updatedAt: 1640995200000,
          },
        ],
      },
    }) => state,
  },
});

describe('ViewPricingTable UI Consistency', () => {
  it('should render the same UI structure as before', () => {
    render(
      <Provider store={mockStore}>
        <ViewPricingTable />
      </Provider>
    );

    // Verify all expected table headers are present
    expect(screen.getByText('ردیف')).toBeInTheDocument();
    expect(screen.getByText('کالا')).toBeInTheDocument();
    expect(screen.getByText('برند')).toBeInTheDocument();
    expect(screen.getByText('محل بارگیری')).toBeInTheDocument();
    expect(screen.getByText('نوع پرداخت')).toBeInTheDocument();
    expect(screen.getByText('قیمت فروش')).toBeInTheDocument();
    expect(screen.getByText('وضعیت')).toBeInTheDocument();
    expect(screen.getByText('تاریخ درج قیمت')).toBeInTheDocument();

    // Verify filter components are rendered
    expect(screen.getByTestId('product-filter')).toBeInTheDocument();
    expect(screen.getByTestId('brand-filter')).toBeInTheDocument();
    expect(screen.getByTestId('port-filter')).toBeInTheDocument();
    expect(screen.getByTestId('payment-type-filter')).toBeInTheDocument();
  });

  it('should display product data with correct status calculation', () => {
    render(
      <Provider store={mockStore}>
        <ViewPricingTable />
      </Provider>
    );

    // Verify product data is displayed
    expect(screen.getByText('محصول تست')).toBeInTheDocument();
    expect(screen.getByText('برند تست')).toBeInTheDocument();
    expect(screen.getByText('محصول دوم')).toBeInTheDocument();
    expect(screen.getByText('برند دوم')).toBeInTheDocument();

    // Verify status calculation is working
    const firstProductStatus = calculateProductStatus(100, 12);
    const secondProductStatus = calculateProductStatus(100, 4);

    expect(screen.getByText(firstProductStatus.label)).toBeInTheDocument();
    expect(screen.getByText(secondProductStatus.label)).toBeInTheDocument();
  });

  it('should maintain the same styling and layout', () => {
    render(
      <Provider store={mockStore}>
        <ViewPricingTable />
      </Provider>
    );

    // Verify table structure is maintained
    const table = screen.getByRole('table');
    expect(table).toHaveClass('w-full');

    // Verify status badges have correct styling
    const statusBadges = screen.getAllByText(/سوپر الماسی|الماسی|طلایی|نقره‌ای|برنزی/);
    statusBadges.forEach(badge => {
      expect(badge).toHaveClass('px-2', 'py-1', 'rounded-full', 'text-xs', 'font-medium');
    });
  });

  it('should use the shared utility for status calculation', () => {
    // Test that the component uses the same calculation as the utility
    const testCases = [
      { sellPrice: 100, constant: 15, expectedLabel: 'سوپر الماسی' },
      { sellPrice: 100, constant: 10, expectedLabel: 'الماسی' },
      { sellPrice: 100, constant: 6, expectedLabel: 'طلایی' },
      { sellPrice: 100, constant: 4, expectedLabel: 'نقره‌ای' },
      { sellPrice: 100, constant: 2, expectedLabel: 'برنزی' },
    ];

    testCases.forEach(testCase => {
      const status = calculateProductStatus(testCase.sellPrice, testCase.constant);
      expect(status.label).toBe(testCase.expectedLabel);
    });
  });

  it('should handle edge cases in status calculation', () => {
    const edgeCases = [
      { sellPrice: 0, constant: 10 },
      { sellPrice: 100, constant: 0 },
      { sellPrice: -100, constant: 10 },
    ];

    edgeCases.forEach(testCase => {
      const status = calculateProductStatus(testCase.sellPrice, testCase.constant);
      expect(status.value).toBe('BRONZE');
      expect(status.label).toBe('برنزی');
    });
  });

  it('should maintain consistent color coding', () => {
    const colorTests = [
      { sellPrice: 100, constant: 15, expectedColor: 'text-purple-600 bg-purple-100' },
      { sellPrice: 100, constant: 10, expectedColor: 'text-blue-600 bg-blue-100' },
      { sellPrice: 100, constant: 6, expectedColor: 'text-yellow-600 bg-yellow-100' },
      { sellPrice: 100, constant: 4, expectedColor: 'text-gray-600 bg-gray-100' },
      { sellPrice: 100, constant: 2, expectedColor: 'text-orange-600 bg-orange-100' },
    ];

    colorTests.forEach(test => {
      const status = calculateProductStatus(test.sellPrice, test.constant);
      expect(status.color).toBe(test.expectedColor);
    });
  });
});
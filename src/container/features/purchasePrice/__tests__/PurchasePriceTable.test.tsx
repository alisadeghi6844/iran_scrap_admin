import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import PurchasePriceTable from '../PurchasePriceTable';
import { UpdatePurchasePriceAction } from '../../../../redux/actions/productPrice/ProductPriceActions';

// Mock dependencies
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../../redux/actions/productPrice/ProductPriceActions', () => ({
  GetProductPriceAction: jest.fn(),
  UpdatePurchasePriceAction: jest.fn(),
}));

jest.mock('../../../../utils/PurchasePriceCalculator', () => ({
  safeCalculatePurchasePrice: jest.fn(),
}));

// Mock store setup
const mockStore = configureStore({
  reducer: {
    productPrice: (state = {
      data: {
        data: [
          {
            id: '1',
            productId: { id: '1', name: 'Test Product' },
            brandId: { id: '1', name: 'Test Brand' },
            providerId: { id: '1', name: 'Test Provider' },
            portId: { id: '1', name: 'Test Port' },
            paymentType: 'CASH',
            buyPrice: 100000,
            constant: 10000,
            sellPrice: 110000,
            showInApp: true,
            showInPanel: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          }
        ],
        totalElements: 1
      },
      loading: false,
      updateProductPriceData: { status: 200 }
    }) => state,
  },
});

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};

describe('PurchasePriceTable Auto-Calculation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Real-time Calculation', () => {
    it('should calculate sellPrice when buyPrice changes', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      safeCalculatePurchasePrice.mockReturnValue({
        sellPrice: 120000,
        status: { value: 'DIAMOND', label: 'الماسی', color: 'text-blue-600 bg-blue-100' }
      });

      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '110000' } });

      await waitFor(() => {
        expect(safeCalculatePurchasePrice).toHaveBeenCalledWith({
          buyPrice: 110000,
          constant: 10000,
          paymentType: 'CASH'
        });
      });

      expect(screen.getByText('120,000 تومان')).toBeInTheDocument();
      expect(screen.getByText('الماسی')).toBeInTheDocument();
    });

    it('should update status when sellPrice changes', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      safeCalculatePurchasePrice.mockReturnValue({
        sellPrice: 150000,
        status: { value: 'GOLD', label: 'طلایی', color: 'text-yellow-600 bg-yellow-100' }
      });

      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '140000' } });

      await waitFor(() => {
        expect(screen.getByText('طلایی')).toBeInTheDocument();
      });
    });

    it('should show visual feedback for calculated values', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      safeCalculatePurchasePrice.mockReturnValue({
        sellPrice: 120000,
        status: { value: 'DIAMOND', label: 'الماسی', color: 'text-blue-600 bg-blue-100' }
      });

      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '110000' } });

      await waitFor(() => {
        expect(screen.getByText('💰 محاسبه شده')).toBeInTheDocument();
        expect(screen.getByText('✨ محاسبه شده')).toBeInTheDocument();
      });
    });
  });

  describe('API Integration', () => {
    it('should send correct data to backend when saving', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      const mockDispatch = jest.fn();
      
      safeCalculatePurchasePrice.mockReturnValue({
        sellPrice: 120000,
        status: { value: 'DIAMOND', label: 'الماسی', color: 'text-blue-600 bg-blue-100' }
      });

      // Mock useDispatch
      jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '110000' } });

      await waitFor(() => {
        const saveButton = screen.getByTitle('ذخیره');
        fireEvent.click(saveButton);
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        UpdatePurchasePriceAction({
          id: '1',
          credentials: {
            buyPrice: 110000,
            sellPrice: 120000,
            status: 'DIAMOND'
          },
          sellPrice: 120000,
          constant: 10000,
        })
      );
    });

    it('should show success message after successful save', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      const mockDispatch = jest.fn().mockResolvedValue({ type: 'fulfilled' });
      
      safeCalculatePurchasePrice.mockReturnValue({
        sellPrice: 120000,
        status: { value: 'DIAMOND', label: 'الماسی', color: 'text-blue-600 bg-blue-100' }
      });

      jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '110000' } });

      await waitFor(() => {
        const saveButton = screen.getByTitle('ذخیره');
        fireEvent.click(saveButton);
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('قیمت با موفقیت به‌روزرسانی شد');
      });
    });
  });

  describe('Error Handling', () => {
    it('should show validation error for negative buyPrice', async () => {
      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '-1000' } });

      await waitFor(() => {
        expect(screen.getByText('قیمت خرید نمی‌تواند منفی باشد')).toBeInTheDocument();
      });
    });

    it('should show validation error for invalid input', async () => {
      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: 'invalid' } });

      await waitFor(() => {
        expect(screen.getByText('قیمت خرید باید عدد باشد')).toBeInTheDocument();
      });
    });

    it('should disable save button when validation fails', async () => {
      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '-1000' } });

      await waitFor(() => {
        const saveButton = screen.getByTitle('ذخیره');
        expect(saveButton).toBeDisabled();
      });
    });

    it('should handle calculation errors gracefully', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      safeCalculatePurchasePrice.mockReturnValue(null);

      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '110000' } });

      await waitFor(() => {
        expect(screen.getByText('❌ خطا در محاسبه')).toBeInTheDocument();
      });
    });

    it('should restore original values on cancel', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      safeCalculatePurchasePrice.mockReturnValue({
        sellPrice: 120000,
        status: { value: 'DIAMOND', label: 'الماسی', color: 'text-blue-600 bg-blue-100' }
      });

      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '110000' } });

      await waitFor(() => {
        const cancelButton = screen.getByTitle('لغو');
        fireEvent.click(cancelButton);
      });

      expect(buyPriceInput).toHaveValue('100000');
    });
  });

  describe('Loading States', () => {
    it('should show loading spinner during save', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      const mockDispatch = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      safeCalculatePurchasePrice.mockReturnValue({
        sellPrice: 120000,
        status: { value: 'DIAMOND', label: 'الماسی', color: 'text-blue-600 bg-blue-100' }
      });

      jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '110000' } });

      await waitFor(() => {
        const saveButton = screen.getByTitle('ذخیره');
        fireEvent.click(saveButton);
      });

      expect(screen.getByTitle('در حال ذخیره...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /در حال ذخیره/ })).toBeDisabled();
    });

    it('should disable input during save', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      const mockDispatch = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      safeCalculatePurchasePrice.mockReturnValue({
        sellPrice: 120000,
        status: { value: 'DIAMOND', label: 'الماسی', color: 'text-blue-600 bg-blue-100' }
      });

      jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

      renderWithProvider(<PurchasePriceTable />);

      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '110000' } });

      await waitFor(() => {
        const saveButton = screen.getByTitle('ذخیره');
        fireEvent.click(saveButton);
      });

      expect(buyPriceInput).toBeDisabled();
    });
  });

  describe('User Interaction Flow', () => {
    it('should complete full edit-calculate-save flow', async () => {
      const { safeCalculatePurchasePrice } = require('../../../../utils/PurchasePriceCalculator');
      const mockDispatch = jest.fn().mockResolvedValue({ type: 'fulfilled' });
      
      safeCalculatePurchasePrice.mockReturnValue({
        sellPrice: 120000,
        status: { value: 'DIAMOND', label: 'الماسی', color: 'text-blue-600 bg-blue-100' }
      });

      jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

      renderWithProvider(<PurchasePriceTable />);

      // Step 1: Edit buy price
      const buyPriceInput = screen.getByDisplayValue('100000');
      fireEvent.change(buyPriceInput, { target: { value: '110000' } });

      // Step 2: Verify calculation
      await waitFor(() => {
        expect(screen.getByText('120,000 تومان')).toBeInTheDocument();
        expect(screen.getByText('الماسی')).toBeInTheDocument();
      });

      // Step 3: Save changes
      const saveButton = screen.getByTitle('ذخیره');
      fireEvent.click(saveButton);

      // Step 4: Verify API call and success
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith('قیمت با موفقیت به‌روزرسانی شد');
      });
    });
  });
});
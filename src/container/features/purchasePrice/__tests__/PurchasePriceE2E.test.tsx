import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PurchasePriceTable from '../PurchasePriceTable';

/**
 * End-to-End tests for the complete purchase price auto-calculation flow
 */
describe('Purchase Price Auto-Calculation E2E Tests', () => {
  const mockStore = configureStore({
    reducer: {
      productPrice: (state = {
        data: {
          data: [
            {
              id: 'test-product-1',
              productId: { id: '1', name: 'محصول تست' },
              brandId: { id: '1', name: 'برند تست' },
              providerId: { id: '1', name: 'تامین کننده تست' },
              portId: { id: '1', name: 'انبار تست' },
              paymentType: 'CASH',
              buyPrice: 1000000,
              constant: 70000,
              sellPrice: 1070000,
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

  const renderComponent = () => {
    return render(
      <Provider store={mockStore}>
        <PurchasePriceTable />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Complete User Flow', () => {
    it('should complete the full edit-calculate-save-success flow', async () => {
      // Mock the calculation utility
      const mockCalculation = {
        sellPrice: 1120000,
        status: { 
          value: 'GOLD', 
          label: 'طلایی', 
          color: 'text-yellow-600 bg-yellow-100' 
        }
      };

      jest.doMock('../../../../utils/PurchasePriceCalculator', () => ({
        safeCalculatePurchasePrice: jest.fn().mockReturnValue(mockCalculation),
      }));

      // Mock the dispatch function
      const mockDispatch = jest.fn().mockResolvedValue({ type: 'fulfilled' });
      jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

      renderComponent();

      // Step 1: User sees the initial data
      expect(screen.getByDisplayValue('1000000')).toBeInTheDocument();
      expect(screen.getByText('1,070,000 تومان')).toBeInTheDocument();

      // Step 2: User starts editing buy price
      const buyPriceInput = screen.getByDisplayValue('1000000');
      fireEvent.change(buyPriceInput, { target: { value: '1050000' } });

      // Step 3: System shows editing state
      await waitFor(() => {
        expect(screen.getByTitle('ذخیره')).toBeInTheDocument();
        expect(screen.getByTitle('لغو')).toBeInTheDocument();
      });

      // Step 4: System calculates new values (after debounce)
      await waitFor(() => {
        expect(screen.getByText('1,120,000 تومان')).toBeInTheDocument();
        expect(screen.getByText('طلایی')).toBeInTheDocument();
        expect(screen.getByText('💰 محاسبه شده')).toBeInTheDocument();
        expect(screen.getByText('✨ محاسبه شده')).toBeInTheDocument();
      }, { timeout: 1000 });

      // Step 5: User saves the changes
      const saveButton = screen.getByTitle('ذخیره');
      fireEvent.click(saveButton);

      // Step 6: System shows loading state
      await waitFor(() => {
        expect(screen.getByTitle('در حال ذخیره...')).toBeInTheDocument();
      });

      // Step 7: System completes save and shows success
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: expect.stringContaining('UPDATE_PURCHASE_PRICE')
          })
        );
      });
    });

    it('should handle validation errors gracefully', async () => {
      renderComponent();

      const buyPriceInput = screen.getByDisplayValue('1000000');
      
      // Enter invalid value
      fireEvent.change(buyPriceInput, { target: { value: '-5000' } });

      // Should show validation error
      await waitFor(() => {
        expect(screen.getByText('قیمت خرید نمی‌تواند منفی باشد')).toBeInTheDocument();
      });

      // Save button should be disabled
      await waitFor(() => {
        const saveButton = screen.getByTitle('ذخیره');
        expect(saveButton).toBeDisabled();
      });

      // Should show error indicators
      expect(screen.getByText('❌ خطا در محاسبه')).toBeInTheDocument();
    });

    it('should handle cancel operation correctly', async () => {
      renderComponent();

      const buyPriceInput = screen.getByDisplayValue('1000000');
      
      // Change value
      fireEvent.change(buyPriceInput, { target: { value: '1100000' } });

      // Cancel the change
      await waitFor(() => {
        const cancelButton = screen.getByTitle('لغو');
        fireEvent.click(cancelButton);
      });

      // Should restore original value
      expect(buyPriceInput).toHaveValue('1000000');
      
      // Should hide editing buttons
      expect(screen.queryByTitle('ذخیره')).not.toBeInTheDocument();
      expect(screen.queryByTitle('لغو')).not.toBeInTheDocument();
    });
  });

  describe('Error Scenarios', () => {
    it('should handle network errors during save', async () => {
      const mockCalculation = {
        sellPrice: 1120000,
        status: { 
          value: 'GOLD', 
          label: 'طلایی', 
          color: 'text-yellow-600 bg-yellow-100' 
        }
      };

      jest.doMock('../../../../utils/PurchasePriceCalculator', () => ({
        safeCalculatePurchasePrice: jest.fn().mockReturnValue(mockCalculation),
      }));

      // Mock failed dispatch
      const mockDispatch = jest.fn().mockRejectedValue(new Error('Network error'));
      jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

      renderComponent();

      const buyPriceInput = screen.getByDisplayValue('1000000');
      fireEvent.change(buyPriceInput, { target: { value: '1100000' } });

      await waitFor(() => {
        const saveButton = screen.getByTitle('ذخیره');
        fireEvent.click(saveButton);
      });

      // Should restore original values on error
      await waitFor(() => {
        expect(buyPriceInput).toHaveValue('1000000');
      });
    });

    it('should handle calculation failures', async () => {
      // Mock failed calculation
      jest.doMock('../../../../utils/PurchasePriceCalculator', () => ({
        safeCalculatePurchasePrice: jest.fn().mockReturnValue(null),
      }));

      renderComponent();

      const buyPriceInput = screen.getByDisplayValue('1000000');
      fireEvent.change(buyPriceInput, { target: { value: '1100000' } });

      await waitFor(() => {
        expect(screen.getByText('❌ خطا در محاسبه')).toBeInTheDocument();
      });

      // Save button should be disabled
      const saveButton = screen.getByTitle('ذخیره');
      expect(saveButton).toBeDisabled();
    });
  });

  describe('Performance and UX', () => {
    it('should debounce calculations properly', async () => {
      const mockCalculate = jest.fn().mockReturnValue({
        sellPrice: 1120000,
        status: { 
          value: 'GOLD', 
          label: 'طلایی', 
          color: 'text-yellow-600 bg-yellow-100' 
        }
      });

      jest.doMock('../../../../utils/PurchasePriceCalculator', () => ({
        safeCalculatePurchasePrice: mockCalculate,
      }));

      renderComponent();

      const buyPriceInput = screen.getByDisplayValue('1000000');
      
      // Rapid changes should be debounced
      fireEvent.change(buyPriceInput, { target: { value: '1100000' } });
      fireEvent.change(buyPriceInput, { target: { value: '1150000' } });
      fireEvent.change(buyPriceInput, { target: { value: '1200000' } });

      // Should only calculate once after debounce period
      await waitFor(() => {
        expect(mockCalculate).toHaveBeenCalledTimes(1);
      }, { timeout: 1000 });
    });

    it('should provide immediate visual feedback', async () => {
      renderComponent();

      const buyPriceInput = screen.getByDisplayValue('1000000');
      fireEvent.change(buyPriceInput, { target: { value: '1100000' } });

      // Should immediately show editing state
      expect(screen.getByTitle('ذخیره')).toBeInTheDocument();
      expect(screen.getByTitle('لغو')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should provide proper ARIA labels and keyboard navigation', () => {
      renderComponent();

      const buyPriceInput = screen.getByDisplayValue('1000000');
      
      // Should be focusable
      buyPriceInput.focus();
      expect(document.activeElement).toBe(buyPriceInput);

      // Should have proper placeholder
      expect(buyPriceInput).toHaveAttribute('placeholder', 'قیمت خرید');
    });

    it('should provide clear error messages', async () => {
      renderComponent();

      const buyPriceInput = screen.getByDisplayValue('1000000');
      fireEvent.change(buyPriceInput, { target: { value: 'invalid' } });

      await waitFor(() => {
        const errorMessage = screen.getByText('قیمت خرید باید عدد باشد');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveClass('text-red-500');
      });
    });
  });

  describe('Data Consistency', () => {
    it('should maintain data consistency throughout the flow', async () => {
      const mockCalculation = {
        sellPrice: 1120000,
        status: { 
          value: 'GOLD', 
          label: 'طلایی', 
          color: 'text-yellow-600 bg-yellow-100' 
        }
      };

      jest.doMock('../../../../utils/PurchasePriceCalculator', () => ({
        safeCalculatePurchasePrice: jest.fn().mockReturnValue(mockCalculation),
      }));

      const mockDispatch = jest.fn().mockResolvedValue({ type: 'fulfilled' });
      jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

      renderComponent();

      const buyPriceInput = screen.getByDisplayValue('1000000');
      fireEvent.change(buyPriceInput, { target: { value: '1050000' } });

      await waitFor(() => {
        const saveButton = screen.getByTitle('ذخیره');
        fireEvent.click(saveButton);
      });

      // Verify the exact data sent to backend
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            payload: expect.objectContaining({
              credentials: {
                buyPrice: 1050000,
                sellPrice: 1120000,
                status: 'GOLD'
              }
            })
          })
        );
      });
    });
  });
});
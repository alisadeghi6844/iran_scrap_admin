import { configureStore } from '@reduxjs/toolkit';
import { UpdateProductPriceAction } from '../actions/productPrice/ProductPriceActions';
import * as productPriceServices from '../service/productPrice/ProductPriceServices';

// Mock dependencies
jest.mock('../service/productPrice/ProductPriceServices');
jest.mock('react-toastify');

const mockedUpdateProductPriceService = productPriceServices.updateProductPriceService as jest.MockedFunction<typeof productPriceServices.updateProductPriceService>;

describe('Backward Compatibility Tests', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        test: (state = {}) => state,
      },
    });
    jest.clearAllMocks();
  });

  it('should maintain backward compatibility with existing API calls', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    // Test with legacy payload structure (no sellPrice/constant)
    const legacyCredentials = {
      buyPrice: 80,
      showInApp: true,
      showInPanel: false,
    };

    const actionPayload = {
      id: '123',
      credentials: legacyCredentials,
      onSubmitForm: jest.fn(),
      resetForm: jest.fn(),
    };

    await store.dispatch(UpdateProductPriceAction(actionPayload));

    // Should work exactly as before - no status field added
    expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
      legacyCredentials,
      '123'
    );
  });

  it('should handle partial data updates without breaking', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const partialUpdates = [
      { buyPrice: 90 }, // Only buy price
      { showInApp: false }, // Only visibility flag
      { sellPrice: 120 }, // Only sell price (no constant)
      { constant: 15 }, // Only constant (no sell price)
    ];

    for (const credentials of partialUpdates) {
      const actionPayload = {
        id: '123',
        credentials,
        onSubmitForm: jest.fn(),
        resetForm: jest.fn(),
      };

      await store.dispatch(UpdateProductPriceAction(actionPayload));

      // Should pass through unchanged for partial updates
      expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
        credentials,
        '123'
      );

      jest.clearAllMocks();
      mockedUpdateProductPriceService.mockResolvedValue(mockResponse);
    }
  });

  it('should preserve all existing functionality', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const onSubmitForm = jest.fn();
    const resetForm = jest.fn();

    const actionPayload = {
      id: '123',
      credentials: { buyPrice: 80 },
      onSubmitForm,
      resetForm,
    };

    await store.dispatch(UpdateProductPriceAction(actionPayload));

    // All existing callbacks should still work
    expect(onSubmitForm).toHaveBeenCalled();
    expect(resetForm).toHaveBeenCalled();
  });

  it('should handle error scenarios the same way as before', async () => {
    const mockError = {
      response: {
        data: { message: 'Validation error' },
      },
    };
    mockedUpdateProductPriceService.mockRejectedValue(mockError);

    const actionPayload = {
      id: '123',
      credentials: { buyPrice: 80 },
      onSubmitForm: jest.fn(),
      resetForm: jest.fn(),
    };

    const result = await store.dispatch(UpdateProductPriceAction(actionPayload));

    // Error handling should remain unchanged
    expect(result.type).toBe('PRODUCT_PRICE/UPDATE_PRODUCT_PRICE/rejected');
    expect(result.payload).toEqual({ message: 'Validation error' });
  });

  it('should not break when backend does not expect status field', async () => {
    // Simulate backend that ignores unknown fields
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const credentials = {
      sellPrice: 100,
      constant: 8,
      buyPrice: 80,
    };

    const actionPayload = {
      id: '123',
      credentials,
      onSubmitForm: jest.fn(),
      resetForm: jest.fn(),
    };

    await store.dispatch(UpdateProductPriceAction(actionPayload));

    // Should include status but backend should handle gracefully
    expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
      {
        ...credentials,
        status: 'DIAMOND',
      },
      '123'
    );

    // Should still succeed
    expect(mockedUpdateProductPriceService).toHaveReturnedWith(
      Promise.resolve(mockResponse)
    );
  });

  it('should maintain the same response structure', async () => {
    const mockResponse = { 
      status: 200, 
      data: { 
        id: '123',
        sellPrice: 100,
        buyPrice: 80,
        updatedAt: '2023-01-01T00:00:00Z'
      } 
    };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const credentials = {
      sellPrice: 100,
      constant: 8,
      buyPrice: 80,
    };

    const actionPayload = {
      id: '123',
      credentials,
      onSubmitForm: jest.fn(),
      resetForm: jest.fn(),
    };

    const result = await store.dispatch(UpdateProductPriceAction(actionPayload));

    // Response structure should be unchanged
    expect(result.type).toBe('PRODUCT_PRICE/UPDATE_PRODUCT_PRICE/fulfilled');
    expect(result.payload).toEqual(mockResponse);
  });
});
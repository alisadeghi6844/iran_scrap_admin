import { configureStore } from '@reduxjs/toolkit';
import { UpdateProductPriceAction } from '../actions/productPrice/ProductPriceActions';
import * as productPriceServices from '../service/productPrice/ProductPriceServices';
import { calculateProductStatus, getProductStatusValue } from '../../utils/ProductStatusCalculator';

// Mock dependencies
jest.mock('../service/productPrice/ProductPriceServices');
jest.mock('react-toastify');

const mockedUpdateProductPriceService = productPriceServices.updateProductPriceService as jest.MockedFunction<typeof productPriceServices.updateProductPriceService>;

describe('Product Price Status Integration', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        test: (state = {}) => state,
      },
    });
    jest.clearAllMocks();
  });

  it('should maintain consistency between UI calculation and backend payload', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const testCases = [
      { sellPrice: 100, constant: 15 }, // SUPER_DIAMOND
      { sellPrice: 100, constant: 10 }, // DIAMOND
      { sellPrice: 100, constant: 6 },  // GOLD
      { sellPrice: 100, constant: 4 },  // SILVER
      { sellPrice: 100, constant: 2 },  // BRONZE
    ];

    for (const testCase of testCases) {
      // Calculate status using UI utility (same as ViewPricingTable)
      const uiStatus = calculateProductStatus(testCase.sellPrice, testCase.constant);
      const backendStatusValue = getProductStatusValue(testCase.sellPrice, testCase.constant);

      // Verify UI and backend calculations match
      expect(uiStatus.value).toBe(backendStatusValue);

      // Test the action
      const credentials = {
        sellPrice: testCase.sellPrice,
        constant: testCase.constant,
        buyPrice: 80,
      };

      const actionPayload = {
        id: '123',
        credentials,
        onSubmitForm: jest.fn(),
        resetForm: jest.fn(),
      };

      await store.dispatch(UpdateProductPriceAction(actionPayload));

      // Verify that the service was called with the correct status
      expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
        {
          ...credentials,
          status: uiStatus.value,
        },
        '123'
      );

      jest.clearAllMocks();
      mockedUpdateProductPriceService.mockResolvedValue(mockResponse);
    }
  });

  it('should handle edge cases consistently', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const edgeCases = [
      { sellPrice: 0, constant: 10 }, // Zero sellPrice
      { sellPrice: 100, constant: 0 }, // Zero constant
      { sellPrice: -100, constant: 10 }, // Negative sellPrice
    ];

    for (const testCase of edgeCases) {
      const uiStatus = calculateProductStatus(testCase.sellPrice, testCase.constant);
      const backendStatusValue = getProductStatusValue(testCase.sellPrice, testCase.constant);

      // Both should return BRONZE for edge cases
      expect(uiStatus.value).toBe('BRONZE');
      expect(backendStatusValue).toBe('BRONZE');
      expect(uiStatus.value).toBe(backendStatusValue);

      const credentials = {
        sellPrice: testCase.sellPrice,
        constant: testCase.constant,
      };

      const actionPayload = {
        id: '123',
        credentials,
        onSubmitForm: jest.fn(),
        resetForm: jest.fn(),
      };

      await store.dispatch(UpdateProductPriceAction(actionPayload));

      expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
        {
          ...credentials,
          status: 'BRONZE',
        },
        '123'
      );

      jest.clearAllMocks();
      mockedUpdateProductPriceService.mockResolvedValue(mockResponse);
    }
  });

  it('should handle missing price data gracefully', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const incompleteCases = [
      { buyPrice: 80 }, // Missing both sellPrice and constant
      { sellPrice: 100, buyPrice: 80 }, // Missing constant
      { constant: 10, buyPrice: 80 }, // Missing sellPrice
    ];

    for (const testCase of incompleteCases) {
      const actionPayload = {
        id: '123',
        credentials: testCase,
        onSubmitForm: jest.fn(),
        resetForm: jest.fn(),
      };

      await store.dispatch(UpdateProductPriceAction(actionPayload));

      // Should not include status when data is incomplete
      expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
        testCase,
        '123'
      );

      jest.clearAllMocks();
      mockedUpdateProductPriceService.mockResolvedValue(mockResponse);
    }
  });

  it('should verify boundary calculations are consistent', () => {
    const boundaryTests = [
      { sellPrice: 100, constant: 12, expectedStatus: 'SUPER_DIAMOND' }, // Exactly 0.12
      { sellPrice: 100, constant: 8, expectedStatus: 'DIAMOND' }, // Exactly 0.08
      { sellPrice: 100, constant: 5, expectedStatus: 'GOLD' }, // Exactly 0.05
      { sellPrice: 100, constant: 3, expectedStatus: 'SILVER' }, // Exactly 0.03
      { sellPrice: 100, constant: 11.9, expectedStatus: 'DIAMOND' }, // Just below 0.12
      { sellPrice: 100, constant: 7.9, expectedStatus: 'GOLD' }, // Just below 0.08
    ];

    boundaryTests.forEach(test => {
      const uiStatus = calculateProductStatus(test.sellPrice, test.constant);
      const backendStatus = getProductStatusValue(test.sellPrice, test.constant);

      expect(uiStatus.value).toBe(test.expectedStatus);
      expect(backendStatus).toBe(test.expectedStatus);
      expect(uiStatus.value).toBe(backendStatus);
    });
  });
});
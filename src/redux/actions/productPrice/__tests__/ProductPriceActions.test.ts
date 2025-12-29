import { configureStore } from '@reduxjs/toolkit';
import { UpdateProductPriceAction } from '../ProductPriceActions';
import * as productPriceServices from '../../../service/productPrice/ProductPriceServices';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('../../../service/productPrice/ProductPriceServices');
jest.mock('react-toastify');

const mockedUpdateProductPriceService = productPriceServices.updateProductPriceService as jest.MockedFunction<typeof productPriceServices.updateProductPriceService>;
const mockedToast = toast as jest.Mocked<typeof toast>;

describe('UpdateProductPriceAction', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        test: (state = {}) => state,
      },
    });
    jest.clearAllMocks();
  });

  it('should include calculated status when sellPrice and constant are provided', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const credentials = {
      sellPrice: 100,
      constant: 12, // This should result in SUPER_DIAMOND status (12/100 = 0.12)
      buyPrice: 80,
    };

    const actionPayload = {
      id: '123',
      credentials,
      onSubmitForm: jest.fn(),
      resetForm: jest.fn(),
    };

    await store.dispatch(UpdateProductPriceAction(actionPayload));

    // Verify that the service was called with enhanced credentials including status
    expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
      {
        ...credentials,
        status: 'SUPER_DIAMOND',
      },
      '123'
    );
  });

  it('should not include status when sellPrice is missing', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const credentials = {
      constant: 12,
      buyPrice: 80,
    };

    const actionPayload = {
      id: '123',
      credentials,
      onSubmitForm: jest.fn(),
      resetForm: jest.fn(),
    };

    await store.dispatch(UpdateProductPriceAction(actionPayload));

    // Verify that the service was called without status
    expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
      credentials,
      '123'
    );
  });

  it('should not include status when constant is missing', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const credentials = {
      sellPrice: 100,
      buyPrice: 80,
    };

    const actionPayload = {
      id: '123',
      credentials,
      onSubmitForm: jest.fn(),
      resetForm: jest.fn(),
    };

    await store.dispatch(UpdateProductPriceAction(actionPayload));

    // Verify that the service was called without status
    expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
      credentials,
      '123'
    );
  });

  it('should calculate correct status for different price ranges', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const testCases = [
      { sellPrice: 100, constant: 15, expectedStatus: 'SUPER_DIAMOND' }, // 15/100 = 0.15 >= 0.12
      { sellPrice: 100, constant: 10, expectedStatus: 'DIAMOND' }, // 10/100 = 0.10 >= 0.08
      { sellPrice: 100, constant: 6, expectedStatus: 'GOLD' }, // 6/100 = 0.06 >= 0.05
      { sellPrice: 100, constant: 4, expectedStatus: 'SILVER' }, // 4/100 = 0.04 >= 0.03
      { sellPrice: 100, constant: 2, expectedStatus: 'BRONZE' }, // 2/100 = 0.02 < 0.03
    ];

    for (const testCase of testCases) {
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

      expect(mockedUpdateProductPriceService).toHaveBeenCalledWith(
        {
          ...credentials,
          status: testCase.expectedStatus,
        },
        '123'
      );

      jest.clearAllMocks();
      mockedUpdateProductPriceService.mockResolvedValue(mockResponse);
    }
  });

  it('should call success callbacks when update is successful', async () => {
    const mockResponse = { status: 200, data: { success: true } };
    mockedUpdateProductPriceService.mockResolvedValue(mockResponse);

    const onSubmitForm = jest.fn();
    const resetForm = jest.fn();

    const actionPayload = {
      id: '123',
      credentials: { sellPrice: 100, constant: 8 },
      onSubmitForm,
      resetForm,
    };

    await store.dispatch(UpdateProductPriceAction(actionPayload));

    expect(mockedToast.success).toHaveBeenCalledWith('قیمت محصول با موفقیت ویرایش شد');
    expect(onSubmitForm).toHaveBeenCalled();
    expect(resetForm).toHaveBeenCalled();
  });

  it('should handle service errors properly', async () => {
    const mockError = {
      response: {
        data: { message: 'Service error' },
      },
    };
    mockedUpdateProductPriceService.mockRejectedValue(mockError);

    const actionPayload = {
      id: '123',
      credentials: { sellPrice: 100, constant: 8 },
      onSubmitForm: jest.fn(),
      resetForm: jest.fn(),
    };

    const result = await store.dispatch(UpdateProductPriceAction(actionPayload));

    expect(result.type).toBe('PRODUCT_PRICE/UPDATE_PRODUCT_PRICE/rejected');
    expect(result.payload).toEqual({ message: 'Service error' });
  });
});
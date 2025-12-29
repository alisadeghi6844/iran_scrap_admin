import { updateProductPriceService } from '../ProductPriceServices';
import HttpServises from '../../../../api/HttpServises';
import { BASE_URL } from '../../../../api/config';
import { UPDATE_PRODUCT_PRICE_POINT } from '../../../api/productPrice/ProductPriceApi';

// Mock dependencies
jest.mock('../../../../api/HttpServises');
jest.mock('../../../../api/config');
jest.mock('../../../api/productPrice/ProductPriceApi');

const mockedHttpServices = HttpServises as jest.Mocked<typeof HttpServises>;

describe('ProductPriceServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateProductPriceService', () => {
    it('should send PATCH request with enhanced payload including status', async () => {
      const mockResponse = { status: 200, data: { success: true } };
      mockedHttpServices.patch.mockResolvedValue(mockResponse);

      const payload = {
        sellPrice: 100,
        constant: 12,
        buyPrice: 80,
        status: 'SUPER_DIAMOND' as const,
      };
      const id = '123';

      const result = await updateProductPriceService(payload, id);

      expect(mockedHttpServices.patch).toHaveBeenCalledWith(
        `${BASE_URL}${UPDATE_PRODUCT_PRICE_POINT}/${id}`,
        payload
      );
      expect(result).toEqual(mockResponse);
    });

    it('should send PATCH request with payload without status', async () => {
      const mockResponse = { status: 200, data: { success: true } };
      mockedHttpServices.patch.mockResolvedValue(mockResponse);

      const payload = {
        sellPrice: 100,
        buyPrice: 80,
      };
      const id = '123';

      const result = await updateProductPriceService(payload, id);

      expect(mockedHttpServices.patch).toHaveBeenCalledWith(
        `${BASE_URL}${UPDATE_PRODUCT_PRICE_POINT}/${id}`,
        payload
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle different status values correctly', async () => {
      const mockResponse = { status: 200, data: { success: true } };
      mockedHttpServices.patch.mockResolvedValue(mockResponse);

      const statusValues = ['BRONZE', 'SILVER', 'GOLD', 'DIAMOND', 'SUPER_DIAMOND'] as const;

      for (const status of statusValues) {
        const payload = {
          sellPrice: 100,
          constant: 8,
          status,
        };
        const id = '123';

        await updateProductPriceService(payload, id);

        expect(mockedHttpServices.patch).toHaveBeenCalledWith(
          `${BASE_URL}${UPDATE_PRODUCT_PRICE_POINT}/${id}`,
          payload
        );

        jest.clearAllMocks();
        mockedHttpServices.patch.mockResolvedValue(mockResponse);
      }
    });

    it('should handle service errors', async () => {
      const mockError = new Error('Network error');
      mockedHttpServices.patch.mockRejectedValue(mockError);

      const payload = {
        sellPrice: 100,
        constant: 8,
        status: 'DIAMOND' as const,
      };
      const id = '123';

      await expect(updateProductPriceService(payload, id)).rejects.toThrow('Network error');
    });

    it('should log the payload for debugging', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const mockResponse = { status: 200, data: { success: true } };
      mockedHttpServices.patch.mockResolvedValue(mockResponse);

      const payload = {
        sellPrice: 100,
        constant: 8,
        status: 'DIAMOND' as const,
      };
      const id = '123';

      await updateProductPriceService(payload, id);

      expect(consoleSpy).toHaveBeenCalledWith('item', payload);
      
      consoleSpy.mockRestore();
    });
  });
});
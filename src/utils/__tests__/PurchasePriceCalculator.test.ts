import {
  calculatePurchasePrice,
  validateCalculationInput,
  safeCalculatePurchasePrice,
  CalculationInput,
  PurchasePriceCalculation
} from '../PurchasePriceCalculator';

describe('PurchasePriceCalculator', () => {
  describe('calculatePurchasePrice', () => {
    it('should calculate sellPrice correctly using formula: sellPrice = buyPrice + constant', () => {
      const input: CalculationInput = {
        buyPrice: 1000000,
        constant: 70000,
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.sellPrice).toBe(1070000); // 1000000 + 70000
    });

    it('should calculate status correctly using formula: S = constant / sellPrice', () => {
      const input: CalculationInput = {
        buyPrice: 1000000,
        constant: 70000, // S = 70000 / 1070000 = 0.065 -> Gold
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.status.value).toBe('GOLD');
      expect(result.status.label).toBe('طلایی');
    });

    it('should return SUPER_DIAMOND status when S >= 0.12', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: 15000, // S = 15000 / 115000 = 0.13 -> Super Diamond
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.status.value).toBe('SUPER_DIAMOND');
      expect(result.status.label).toBe('سوپر الماسی');
    });

    it('should return DIAMOND status when 0.08 <= S < 0.12', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: 10000, // S = 10000 / 110000 = 0.09 -> Diamond
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.status.value).toBe('DIAMOND');
      expect(result.status.label).toBe('الماسی');
    });

    it('should return SILVER status when 0.03 <= S < 0.05', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: 4000, // S = 4000 / 104000 = 0.038 -> Silver
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.status.value).toBe('SILVER');
      expect(result.status.label).toBe('نقره‌ای');
    });

    it('should return BRONZE status when S < 0.03', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: 2000, // S = 2000 / 102000 = 0.019 -> Bronze
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.status.value).toBe('BRONZE');
      expect(result.status.label).toBe('برنزی');
    });

    it('should handle zero buyPrice correctly', () => {
      const input: CalculationInput = {
        buyPrice: 0,
        constant: 50000,
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.sellPrice).toBe(50000);
      expect(result.status.value).toBe('SUPER_DIAMOND'); // S = 50000 / 50000 = 1
    });

    it('should handle zero constant correctly', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: 0,
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.sellPrice).toBe(100000);
      expect(result.status.value).toBe('BRONZE'); // S = 0 / 100000 = 0
    });

    it('should throw error for negative buyPrice', () => {
      const input: CalculationInput = {
        buyPrice: -1000,
        constant: 50000,
        paymentType: 'CASH'
      };

      expect(() => calculatePurchasePrice(input)).toThrow('قیمت خرید نمی‌تواند منفی باشد');
    });

    it('should throw error for negative constant', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: -5000,
        paymentType: 'CASH'
      };

      expect(() => calculatePurchasePrice(input)).toThrow('قیمت ثابت نمی‌تواند منفی باشد');
    });

    it('should work with different payment types', () => {
      const paymentTypes = ['CASH', 'INSTALLMENT1', 'INSTALLMENT3', 'INSTALLMENT6'];
      
      paymentTypes.forEach(paymentType => {
        const input: CalculationInput = {
          buyPrice: 100000,
          constant: 10000,
          paymentType
        };

        const result = calculatePurchasePrice(input);

        expect(result.sellPrice).toBe(110000);
        expect(result.status.value).toBe('DIAMOND');
      });
    });
  });

  describe('validateCalculationInput', () => {
    it('should return true for valid input', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: 10000,
        paymentType: 'CASH'
      };

      expect(validateCalculationInput(input)).toBe(true);
    });

    it('should return false for NaN buyPrice', () => {
      const input: CalculationInput = {
        buyPrice: NaN,
        constant: 10000,
        paymentType: 'CASH'
      };

      expect(validateCalculationInput(input)).toBe(false);
    });

    it('should return false for NaN constant', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: NaN,
        paymentType: 'CASH'
      };

      expect(validateCalculationInput(input)).toBe(false);
    });

    it('should return false for negative buyPrice', () => {
      const input: CalculationInput = {
        buyPrice: -1000,
        constant: 10000,
        paymentType: 'CASH'
      };

      expect(validateCalculationInput(input)).toBe(false);
    });

    it('should return false for negative constant', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: -5000,
        paymentType: 'CASH'
      };

      expect(validateCalculationInput(input)).toBe(false);
    });

    it('should return true for zero values', () => {
      const input: CalculationInput = {
        buyPrice: 0,
        constant: 0,
        paymentType: 'CASH'
      };

      expect(validateCalculationInput(input)).toBe(true);
    });
  });

  describe('safeCalculatePurchasePrice', () => {
    it('should return calculation result for valid input', () => {
      const input: CalculationInput = {
        buyPrice: 100000,
        constant: 10000,
        paymentType: 'CASH'
      };

      const result = safeCalculatePurchasePrice(input);

      expect(result).not.toBeNull();
      expect(result?.sellPrice).toBe(110000);
      expect(result?.status.value).toBe('DIAMOND');
    });

    it('should return null for invalid input (NaN values)', () => {
      const input: CalculationInput = {
        buyPrice: NaN,
        constant: 10000,
        paymentType: 'CASH'
      };

      const result = safeCalculatePurchasePrice(input);

      expect(result).toBeNull();
    });

    it('should return null for invalid input (negative values)', () => {
      const input: CalculationInput = {
        buyPrice: -1000,
        constant: 10000,
        paymentType: 'CASH'
      };

      const result = safeCalculatePurchasePrice(input);

      expect(result).toBeNull();
    });

    it('should handle calculation errors gracefully', () => {
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const input: CalculationInput = {
        buyPrice: -1000,
        constant: 10000,
        paymentType: 'CASH'
      };

      const result = safeCalculatePurchasePrice(input);

      expect(result).toBeNull();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large numbers', () => {
      const input: CalculationInput = {
        buyPrice: 999999999,
        constant: 100000000,
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.sellPrice).toBe(1099999999);
      expect(result.status.value).toBe('DIAMOND'); // S = 100000000 / 1099999999 ≈ 0.09
    });

    it('should handle very small numbers', () => {
      const input: CalculationInput = {
        buyPrice: 1,
        constant: 1,
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.sellPrice).toBe(2);
      expect(result.status.value).toBe('SUPER_DIAMOND'); // S = 1 / 2 = 0.5
    });

    it('should maintain precision with decimal calculations', () => {
      const input: CalculationInput = {
        buyPrice: 100000.50,
        constant: 10000.25,
        paymentType: 'CASH'
      };

      const result = calculatePurchasePrice(input);

      expect(result.sellPrice).toBe(110000.75);
    });
  });
});
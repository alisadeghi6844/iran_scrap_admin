import { calculateProductStatus, getProductStatusValue, ProductStatusValue } from '../ProductStatusCalculator';

describe('ProductStatusCalculator', () => {
  describe('calculateProductStatus', () => {
    it('should return SUPER_DIAMOND status when S >= 0.12', () => {
      const result = calculateProductStatus(100, 12); // S = 12/100 = 0.12
      expect(result.value).toBe('SUPER_DIAMOND');
      expect(result.label).toBe('سوپر الماسی');
      expect(result.textColor).toBe('text-purple-600');
    });

    it('should return DIAMOND status when 0.08 <= S < 0.12', () => {
      const result = calculateProductStatus(100, 10); // S = 10/100 = 0.10
      expect(result.value).toBe('DIAMOND');
      expect(result.label).toBe('الماسی');
      expect(result.textColor).toBe('text-blue-600');
    });

    it('should return GOLD status when 0.05 <= S < 0.08', () => {
      const result = calculateProductStatus(100, 6); // S = 6/100 = 0.06
      expect(result.value).toBe('GOLD');
      expect(result.label).toBe('طلایی');
      expect(result.textColor).toBe('text-yellow-600');
    });

    it('should return SILVER status when 0.03 <= S < 0.05', () => {
      const result = calculateProductStatus(100, 4); // S = 4/100 = 0.04
      expect(result.value).toBe('SILVER');
      expect(result.label).toBe('نقره‌ای');
      expect(result.textColor).toBe('text-gray-600');
    });

    it('should return BRONZE status when S < 0.03', () => {
      const result = calculateProductStatus(100, 2); // S = 2/100 = 0.02
      expect(result.value).toBe('BRONZE');
      expect(result.label).toBe('برنزی');
      expect(result.textColor).toBe('text-orange-600');
    });

    it('should handle zero sellPrice gracefully', () => {
      const result = calculateProductStatus(0, 10);
      expect(result.value).toBe('BRONZE');
    });

    it('should handle negative sellPrice gracefully', () => {
      const result = calculateProductStatus(-100, 10);
      expect(result.value).toBe('BRONZE');
    });

    it('should handle zero constant', () => {
      const result = calculateProductStatus(100, 0);
      expect(result.value).toBe('BRONZE');
    });

    it('should handle boundary values correctly', () => {
      // Exactly 0.12
      const superDiamond = calculateProductStatus(100, 12);
      expect(superDiamond.value).toBe('SUPER_DIAMOND');

      // Exactly 0.08
      const diamond = calculateProductStatus(100, 8);
      expect(diamond.value).toBe('DIAMOND');

      // Exactly 0.05
      const gold = calculateProductStatus(100, 5);
      expect(gold.value).toBe('GOLD');

      // Exactly 0.03
      const silver = calculateProductStatus(100, 3);
      expect(silver.value).toBe('SILVER');
    });
  });

  describe('getProductStatusValue', () => {
    it('should return only the status value', () => {
      const result = getProductStatusValue(100, 12);
      expect(result).toBe('SUPER_DIAMOND');
    });

    it('should return BRONZE for low ratios', () => {
      const result = getProductStatusValue(100, 1);
      expect(result).toBe('BRONZE');
    });

    it('should match calculateProductStatus value', () => {
      const sellPrice = 100;
      const constant = 8;
      
      const fullResult = calculateProductStatus(sellPrice, constant);
      const valueOnly = getProductStatusValue(sellPrice, constant);
      
      expect(valueOnly).toBe(fullResult.value);
    });
  });
});
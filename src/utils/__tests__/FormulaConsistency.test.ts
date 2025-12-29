import { calculatePurchasePrice } from '../PurchasePriceCalculator';
import { calculateProductStatus } from '../ProductStatusCalculator';

/**
 * Test suite to ensure consistency between PurchasePriceTable calculations
 * and ProductPriceForm calculations
 */
describe('Formula Consistency Tests', () => {
  describe('PurchasePriceCalculator vs ProductPriceForm', () => {
    const testCases = [
      {
        buyPrice: 100000,
        constant: 10000,
        expectedSellPrice: 110000,
        paymentType: 'CASH',
        description: 'Basic calculation'
      },
      {
        buyPrice: 1000000,
        constant: 70000,
        expectedSellPrice: 1070000,
        paymentType: 'INSTALLMENT1',
        description: 'Large numbers'
      },
      {
        buyPrice: 0,
        constant: 50000,
        expectedSellPrice: 50000,
        paymentType: 'CASH',
        description: 'Zero buy price'
      },
      {
        buyPrice: 100000,
        constant: 0,
        expectedSellPrice: 100000,
        paymentType: 'INSTALLMENT3',
        description: 'Zero constant'
      },
      {
        buyPrice: 50000.50,
        constant: 10000.25,
        expectedSellPrice: 60000.75,
        paymentType: 'CASH',
        description: 'Decimal values'
      }
    ];

    testCases.forEach(testCase => {
      it(`should match ProductPriceForm formula for ${testCase.description}`, () => {
        const result = calculatePurchasePrice({
          buyPrice: testCase.buyPrice,
          constant: testCase.constant,
          paymentType: testCase.paymentType
        });

        // Test the core formula: sellPrice = buyPrice + constant
        // This is the same formula used in ProductPriceForm's SellPriceDisplay component
        expect(result.sellPrice).toBe(testCase.expectedSellPrice);
      });
    });

    it('should use the same status calculation logic as ProductPriceForm', () => {
      const buyPrice = 100000;
      const constant = 12000;
      const expectedSellPrice = 112000;

      // Calculate using PurchasePriceCalculator
      const purchaseResult = calculatePurchasePrice({
        buyPrice,
        constant,
        paymentType: 'CASH'
      });

      // Calculate using the same logic as ProductPriceForm's StatusDisplay
      const directStatusResult = calculateProductStatus(expectedSellPrice, constant);

      // Both should produce the same results
      expect(purchaseResult.sellPrice).toBe(expectedSellPrice);
      expect(purchaseResult.status.value).toBe(directStatusResult.value);
      expect(purchaseResult.status.label).toBe(directStatusResult.label);
      expect(purchaseResult.status.color).toBe(directStatusResult.color);
    });
  });

  describe('Status Calculation Consistency', () => {
    const statusTestCases = [
      {
        sellPrice: 100000,
        constant: 15000, // S = 15000/100000 = 0.15 -> SUPER_DIAMOND
        expectedStatus: 'SUPER_DIAMOND',
        expectedLabel: 'سوپر الماسی'
      },
      {
        sellPrice: 100000,
        constant: 10000, // S = 10000/100000 = 0.10 -> DIAMOND
        expectedStatus: 'DIAMOND',
        expectedLabel: 'الماسی'
      },
      {
        sellPrice: 100000,
        constant: 6000, // S = 6000/100000 = 0.06 -> GOLD
        expectedStatus: 'GOLD',
        expectedLabel: 'طلایی'
      },
      {
        sellPrice: 100000,
        constant: 4000, // S = 4000/100000 = 0.04 -> SILVER
        expectedStatus: 'SILVER',
        expectedLabel: 'نقره‌ای'
      },
      {
        sellPrice: 100000,
        constant: 2000, // S = 2000/100000 = 0.02 -> BRONZE
        expectedStatus: 'BRONZE',
        expectedLabel: 'برنزی'
      }
    ];

    statusTestCases.forEach(testCase => {
      it(`should calculate ${testCase.expectedLabel} status consistently`, () => {
        // Calculate buyPrice that would result in the test sellPrice
        const buyPrice = testCase.sellPrice - testCase.constant;

        // Use PurchasePriceCalculator
        const purchaseResult = calculatePurchasePrice({
          buyPrice,
          constant: testCase.constant,
          paymentType: 'CASH'
        });

        // Use direct ProductStatusCalculator (same as ProductPriceForm)
        const directResult = calculateProductStatus(testCase.sellPrice, testCase.constant);

        // Both should match
        expect(purchaseResult.status.value).toBe(testCase.expectedStatus);
        expect(purchaseResult.status.label).toBe(testCase.expectedLabel);
        expect(purchaseResult.status.value).toBe(directResult.value);
        expect(purchaseResult.status.label).toBe(directResult.label);
      });
    });
  });

  describe('Edge Cases Consistency', () => {
    it('should handle zero sellPrice consistently', () => {
      const buyPrice = 0;
      const constant = 0;

      const purchaseResult = calculatePurchasePrice({
        buyPrice,
        constant,
        paymentType: 'CASH'
      });

      const directResult = calculateProductStatus(0, 0);

      expect(purchaseResult.sellPrice).toBe(0);
      expect(purchaseResult.status.value).toBe(directResult.value);
      expect(purchaseResult.status.value).toBe('BRONZE'); // S = 0/0 = 0 -> BRONZE
    });

    it('should handle very large numbers consistently', () => {
      const buyPrice = 999999999;
      const constant = 100000000;
      const expectedSellPrice = 1099999999;

      const purchaseResult = calculatePurchasePrice({
        buyPrice,
        constant,
        paymentType: 'CASH'
      });

      const directResult = calculateProductStatus(expectedSellPrice, constant);

      expect(purchaseResult.sellPrice).toBe(expectedSellPrice);
      expect(purchaseResult.status.value).toBe(directResult.value);
    });

    it('should handle decimal precision consistently', () => {
      const buyPrice = 100000.123;
      const constant = 10000.456;
      const expectedSellPrice = 110000.579;

      const purchaseResult = calculatePurchasePrice({
        buyPrice,
        constant,
        paymentType: 'CASH'
      });

      const directResult = calculateProductStatus(expectedSellPrice, constant);

      expect(purchaseResult.sellPrice).toBeCloseTo(expectedSellPrice, 3);
      expect(purchaseResult.status.value).toBe(directResult.value);
    });
  });

  describe('Payment Type Independence', () => {
    it('should produce same results regardless of payment type', () => {
      const buyPrice = 100000;
      const constant = 10000;
      const paymentTypes = ['CASH', 'INSTALLMENT1', 'INSTALLMENT2', 'INSTALLMENT3', 'INSTALLMENT6'];

      const results = paymentTypes.map(paymentType => 
        calculatePurchasePrice({ buyPrice, constant, paymentType })
      );

      // All results should be identical since payment type doesn't affect the formula
      results.forEach(result => {
        expect(result.sellPrice).toBe(110000);
        expect(result.status.value).toBe('DIAMOND');
        expect(result.status.label).toBe('الماسی');
      });
    });
  });

  describe('Real-world Scenarios', () => {
    it('should match ProductPriceForm behavior for typical product pricing', () => {
      // Simulate the same data that would be used in ProductPriceForm
      const scenarios = [
        { buyPrice: 500000, constant: 50000 },   // Typical mid-range product
        { buyPrice: 1200000, constant: 80000 },  // Higher-end product
        { buyPrice: 200000, constant: 30000 },   // Lower-end product
        { buyPrice: 2000000, constant: 150000 }, // Premium product
      ];

      scenarios.forEach(scenario => {
        const purchaseResult = calculatePurchasePrice({
          buyPrice: scenario.buyPrice,
          constant: scenario.constant,
          paymentType: 'CASH'
        });

        // Verify the formula matches ProductPriceForm's SellPriceDisplay
        const expectedSellPrice = scenario.buyPrice + scenario.constant;
        expect(purchaseResult.sellPrice).toBe(expectedSellPrice);

        // Verify status calculation matches ProductPriceForm's StatusDisplay
        const expectedStatus = calculateProductStatus(expectedSellPrice, scenario.constant);
        expect(purchaseResult.status.value).toBe(expectedStatus.value);
        expect(purchaseResult.status.label).toBe(expectedStatus.label);
      });
    });
  });
});
export enum PaymentType {
  CASH = "CASH",
  INSTALLMENTS = "INSTALLMENTS", 
  CASH_AND_INSTALLMENTS = "CASH_AND_INSTALLMENTS"
}

export const PaymentTypeLabels = {
  [PaymentType.CASH]: "نقدی",
  [PaymentType.INSTALLMENTS]: "مدت دار",
  [PaymentType.CASH_AND_INSTALLMENTS]: "نقدی و مدت دار"
};
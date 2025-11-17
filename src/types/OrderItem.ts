import { PaymentType } from "./PaymentType";

export interface OrderItem {
  id: string;
  buyerId: string;
  providerId: string | {
    id: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    companyName?: string;
  };
  product: {
    id: string;
    name?: string;
    categoryId: string;
    inventoryType: string;
    category?: {
      id: string;
      name: string;
    };
  };
  category?: {
    id: string;
    name: string;
  };
  provider?: {
    id: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    companyName?: string;
  };
  quantity: number;
  price: number;
  finalPrice: number;
  payingPrice: number;
  paymentType: PaymentType;
  installmentMonths: number;
  status: string;
  description?: string;
  amount?: number;
  city: string;
  province: string;
  createdAt: number;
  updatedAt: number;
  loadingDate?: string;
  unloadingDate?: string;
  cheques?: Array<{
    date: string;
    bank: string;
    no: string;
    sayyad: string;
  }>;
  driver?: {
    billNumber: string;
    licensePlate: string;
    vehicleName: string;
    driverName: string;
    driverPhone: string;
  };
  shippings: {
    digifarm: number;
    provider: number;
  };
  shippingPrice: number;
}
export interface PurchasePriceItem {
  _id?: string;
  id?: string;
  productId: {
    id: string;
    name: string;
  };
  brandId: {
    id: string;
    name: string;
  };
  providerId: {
    id: string;
    name: string;
  };
  portId: {
    id: string;
    name: string;
  };
  paymentType: string;
  showInApp: boolean;
  showInPanel: boolean;
  buyPrice: number;
  constant: number;
  sellPrice: number;
  createdAt: number;
  updatedAt: number;
}



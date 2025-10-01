// Order module constants
export const ORDER = "order";
export const GET_PENDING_ORDERS = "GET_PENDING_ORDERS";
export const APPROVE_ORDER = "APPROVE_ORDER";
export const REJECT_ORDER = "REJECT_ORDER";

// Order interfaces
export interface Order {
  id: string;
  providerId: string;
  providerName: string;
  orderDate: string;
  status: 'pending' | 'approved' | 'rejected';
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

// Redux state interface
export interface OrderState {
  // Get pending orders
  getPendingOrdersError: string | null;
  getPendingOrdersLoading: boolean;
  getPendingOrdersData: Order[];

  // Approve order
  approveOrderError: string | null;
  approveOrderLoading: boolean;
  approveOrderData: any;

  // Reject order
  rejectOrderError: string | null;
  rejectOrderLoading: boolean;
  rejectOrderData: any;
}

// API request/response types
export interface GetPendingOrdersRequest {
  page?: number;
  limit?: number;
  providerName?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface ApproveOrderRequest {
  orderId: string;
}

export interface RejectOrderRequest {
  orderId: string;
  comments: string;
}
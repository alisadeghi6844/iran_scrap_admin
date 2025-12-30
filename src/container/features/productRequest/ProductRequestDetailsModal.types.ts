export interface ProductRequestItem {
  _id: string;
  id?: string;
  address: string;
  amount: number;
  amountType: string;
  category: {
    _id: string;
    name: string;
    code: string;
    image: string;
  };
  catRoute: string;
  categoryId: {
    id: string;
    name: string;
    code: string;
    isLast: boolean;
    catRoute: string;
    createdAt: number;
    image: string;
    parentId: string;
    updatedAt: number;
  };
  city: string;
  createdAt: number;
  description: string;
  expectedDate: number;
  expireDate: number;
  installmentMonths: number;
  invoiceId?: {
    id: string;
    offerId: string;
    code: string;
    cheques: Array<{
      date: string;
      bank: string;
      no: string;
      sayyad: string;
    }>;
    comments: string[];
    createdAt: number;
    finalPrice: number;
    payingPrice: number;
    paymentType: string;
    price: number;
    selectedShipping: {
      name: string;
      price: string | number;
    };
    shippingPrice: number;
    totalprice: number;
    updatedAt: number;
  };
  paymentType: string;
  postalCode: string;
  providerIds: Array<{
    id: string;
    mobile: string;
    phone?: string;
    companyName?: string;
    agentName?: string;
    agentPhone?: string;
    firstName?: string;
    lastName?: string;
  }>;
  province: string;
  requestType: string;
  status: string;
  statusTitle: string;
  updatedAt: number;
  user: {
    id: string;
    mobile: string;
    firstName: string;
    lastName: string;
    authCode: string;
    authCodeExpireTime: number;
    createdAt: number;
    extraImages: unknown[];
    isWelcomeComplete: boolean;
    lastLoginAt: number;
    permissions: unknown[];
    productCategories: string[];
    roles: string[];
    updatedAt: number;
    updatedBy: string;
    updatedFields: string;
    userSort: string;
    usertype: string;
  };
  userId: {
    id: string;
    mobile: string;
    firstName: string;
    lastName: string;
    authCode: string;
    authCodeExpireTime: number;
    createdAt: number;
    extraImages: unknown[];
    isWelcomeComplete: boolean;
    lastLoginAt: number;
    permissions: unknown[];
    productCategories: string[];
    roles: string[];
    updatedAt: number;
    updatedBy: string;
    updatedFields: string;
    userSort: string;
    usertype: string;
  };
  winner?: {
    id: string;
    requestId: string;
    [key: string]: unknown;
  };
  winnerId?: string;
  __v: number;
}

export interface ProductRequestDetailsDisplayData {
  createdAt?: number;
  updatedAt?: number;
  status?: string;
  statusTitle?: string;

  category?: {
    name?: string;
    catRoute?: string;
  };

  description?: string;
  amount?: number;
  amountType?: string;
  city?: string;
  province?: string;
  address?: string;
  requestType?: string;
  postalCode?: string;

  invoiceId?: {
    paymentType?: string;
    price?: number;
    finalPrice?: number;
    payingPrice?: number;
    shippingPrice?: number;
    selectedShipping?: {
      name?: string;
    };
  };

  paymentType?: string;
  installmentMonths?: number;

  user?: {
    firstName?: string;
    lastName?: string;
    mobile?: string;
    usertype?: string;
  };

  expectedDate?: number;
  expireDate?: number;

  winner?: {
    status?: string;
    price?: number;
    totalprice?: number;
    shippingPrice?: number;
    paymentType?: string;
    installmentMonths?: number;
    description?: string;
    createdAt?: number;
    confirmDate?: number;
    expireDate?: number;
    updatedAt?: number;
  };
}



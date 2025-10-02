# Design Document

## Overview

The pending orders management feature will be implemented following the existing codebase architecture patterns. The system will include Redux state management with actions, reducers, and services, a dedicated page component using the CRUD pattern, and integration with the existing sidebar navigation.

## Architecture

### Redux Architecture
Following the existing pattern used in product management:
- **Slice**: `src/redux/slice/order/orderSlice.ts` - State management with loading, error, and data states
- **Actions**: `src/redux/actions/order/OrderActions.ts` - Async thunks for API calls
- **Services**: `src/redux/service/order/OrderServices.ts` - API service functions
- **Types**: `src/redux/types/order/OrderTypes.ts` - Type definitions

### Page Structure
Following the existing CRUD pattern:
- **Page Component**: `src/page/pendingOrdersManagement/index.tsx` - Main page wrapper
- **Table Component**: `src/container/features/order/PendingOrdersTable.tsx` - Data display and filtering
- **Modal Components**: 
  - `src/container/features/order/OrderDetailsModal.tsx` - View complete order details with cheques display
  - `src/container/features/order/OrderApprovalModal.tsx` - Approval confirmation
  - `src/container/features/order/OrderRejectionModal.tsx` - Rejection with reason form

### Navigation Integration
- Add new menu item to `src/container/features/sideBar/DesktopSidebar.tsx`
- Add route to `src/routes/index.ts`

## Components and Interfaces

### Redux State Interface
```typescript
interface OrderState {
  // Get pending orders
  getPendingOrdersError: string | null;
  getPendingOrdersLoading: boolean;
  getPendingOrdersData: any[];

  // Approve order
  approveOrderError: string | null;
  approveOrderLoading: boolean;
  approveOrderData: any;

  // Reject order
  rejectOrderError: string | null;
  rejectOrderLoading: boolean;
  rejectOrderData: any;
}
```

### Order Data Model
```typescript
interface Order {
  id: string;
  code: string;
  buyerId: string;
  providerId: string;
  product: {
    id: string;
    name?: string;
    categoryId: string;
    inventoryType: string;
  };
  quantity: number;
  price: number;
  finalPrice: number;
  payingPrice: number;
  paymentType: string;
  installmentMonths: number;
  status: string;
  city: string;
  province: string;
  createdAt: number;
  updatedAt: number;
  cheques?: Cheque[];
  shippings: {
    digifarm: number;
    provider: number;
  };
  shippingPrice: number;
}

interface Cheque {
  date: string;
  bank: string;
  no: string;
  sayyad: string;
}
```

### API Integration
- **Endpoint**: `/api/order/provider`
- **Methods**:
  - GET: Fetch pending orders with filtering
  - PUT: Approve order (status update)
  - PUT: Reject order with comments

### Component Architecture

#### PendingOrdersManagement Page
- Uses CRUD container pattern
- Manages modal states (details/approval/rejection)
- Handles row selection and actions

#### PendingOrdersTable Component
- Displays orders in table format
- Implements filtering functionality
- Provides action buttons (view more/approve/reject)
- Follows existing table component patterns

#### OrderDetailsModal Component
- Comprehensive modal displaying complete order information
- Modal sections:
  - Order header (code, status, date)
  - Product information (name, quantity, price)
  - Payment details (type, installments, final price)
  - Shipping information (city, province, shipping costs)
  - Cheques section with grid layout
- Cheques display:
  - Grid layout (responsive: 2 columns desktop, 1 mobile)
  - Each cheque card shows: bank, number, sayyad, date
  - Empty state when no cheques
  - Persian date formatting
- Close functionality with X button and backdrop click
- Responsive design with proper spacing

#### OrderApprovalModal Component
- Simple confirmation modal
- Calls approve API action
- Shows success/error feedback

#### OrderRejectionModal Component
- Form modal with textarea for rejection reason
- Form elements:
  - Order code display (read-only)
  - Textarea for rejection reason (required)
  - Submit and Cancel buttons
- Validation:
  - Required field validation for rejection reason
  - Minimum character length validation
  - Real-time validation feedback
- API integration:
  - Calls reject API action with reason
  - Loading state during submission
  - Success/error feedback with toast notifications
- Modal behavior:
  - Cancel functionality (closes without saving)
  - Form reset on close
  - Backdrop click prevention during submission

## Data Models

### Redux Actions
Following the existing pattern:
- `GetOrderAdminAction` - Fetch orders from API (already exists)
- `ApproveOrderAction` - Approve order by ID
- `RejectOrderAction` - Reject order with reason

### API Service Functions
- `getOrderAdminService(params)` - GET request with filtering (already exists)
- `approveOrderService(orderId)` - PUT request to approve
- `rejectOrderService(orderId, reason)` - PUT request to reject with reason

### Filter Options
Based on common filtering patterns:
- Date range filter
- Provider name filter
- Order amount range
- Status filter (if needed)

## Error Handling

### API Error Handling
- Follow existing pattern using try-catch in actions
- Return `rejectWithValue` for errors
- Display toast notifications for success/error states
- Handle network errors and validation errors

### Form Validation
- Required field validation for rejection comments
- Client-side validation before API calls
- Error message display in modals

### Loading States
- Show loading indicators during API calls
- Disable action buttons during processing
- Loading states for table data fetching

## Testing Strategy

### Component Testing
- Unit tests for Redux actions and reducers
- Component rendering tests
- User interaction tests (approve/reject actions)
- Form validation tests

### Integration Testing
- API integration tests
- Redux state management tests
- Navigation and routing tests

### Error Scenario Testing
- Network failure handling
- Invalid data handling
- Permission-based access testing

## Implementation Details

### Menu Integration
Add to the "مدیریت درخواست ها" section in DesktopSidebar:
```typescript
{
  path: "/pending-orders",
  title: "سفارشات در انتظار",
  icon: <LuPackageOpen className="text-2xl" />,
  id: 300,
  isNew: false,
  subRoutes: [],
  notif: "",
  role: ["admin", "client", "reservation"],
}
```

### Route Configuration
```typescript
{
  path: "/pending-orders",
  breadCrumb: "سفارشات در انتظار",
  component: lazy(() => import("../page/pendingOrdersManagement")),
  layout: "admin",
  role: ["admin", "client", "reservation"],
}
```

### Redux Store Integration
- Add order reducer to store configuration
- Export selectors for component usage
- Maintain consistency with existing slice patterns

### Styling and UI
- Use existing Tailwind CSS classes
- Follow existing modal and table styling patterns
- Maintain RTL (Persian) text direction
- Use consistent spacing and typography

#### Cheques Display Design
- Display cheques in a grid layout (2 columns on desktop, 1 on mobile)
- Each cheque card should include:
  - Bank name as header
  - Check number with label
  - Sayyad number with label
  - Date in Persian format
- Use card-style design with border and shadow
- Empty state message when no cheques available
- Responsive design for different screen sizes

### Performance Considerations
- Lazy loading for page component
- Efficient filtering implementation
- Optimized re-renders using proper selectors
- Pagination for large order lists (if needed)

This design ensures complete consistency with the existing codebase architecture while providing all the required functionality for pending orders management.
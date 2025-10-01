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
  - `src/container/features/order/OrderApprovalModal.tsx` - Approval confirmation
  - `src/container/features/order/OrderRejectionModal.tsx` - Rejection with comments

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
  providerId: string;
  providerName: string;
  orderDate: string;
  status: 'pending' | 'approved' | 'rejected';
  items: OrderItem[];
  totalAmount: number;
  // Additional fields based on API response
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
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
- Manages modal states (approval/rejection)
- Handles row selection and actions

#### PendingOrdersTable Component
- Displays orders in table format
- Implements filtering functionality
- Provides action buttons (approve/reject)
- Follows existing table component patterns

#### OrderApprovalModal Component
- Simple confirmation modal
- Calls approve API action
- Shows success/error feedback

#### OrderRejectionModal Component
- Form modal with comment textarea
- Validates required comments
- Calls reject API action with comments
- Shows success/error feedback

## Data Models

### Redux Actions
Following the existing pattern:
- `GetPendingOrdersAction` - Fetch orders from `/api/order/provider`
- `ApproveOrderAction` - Approve order by ID
- `RejectOrderAction` - Reject order with comments

### API Service Functions
- `getPendingOrdersService(query)` - GET request with filtering
- `approveOrderService(orderId)` - PUT request to approve
- `rejectOrderService(orderId, comments)` - PUT request to reject

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

### Performance Considerations
- Lazy loading for page component
- Efficient filtering implementation
- Optimized re-renders using proper selectors
- Pagination for large order lists (if needed)

This design ensures complete consistency with the existing codebase architecture while providing all the required functionality for pending orders management.
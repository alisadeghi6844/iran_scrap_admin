# Implementation Plan

- [x] 1. Set up Redux order management structure

  - Create order types, actions, services, and slice following the existing product management pattern
  - Implement Redux state management for pending orders with proper TypeScript interfaces
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 1.1 Create order types and interfaces




  - Write TypeScript interfaces for Order, OrderItem, and OrderState in `src/redux/types/order/OrderTypes.ts`
  - Define action type constants following existing naming conventions
  - _Requirements: 2.1, 2.2_





- [ ] 1.2 Implement order services for API integration
  - Create `src/redux/service/order/OrderServices.ts` with functions for getPendingOrdersService, approveOrderService, and rejectOrderService


  - Follow existing service patterns with proper error handling and response formatting
  - _Requirements: 2.1, 2.4_





- [ ] 1.3 Create order Redux actions
  - Implement `src/redux/actions/order/OrderActions.ts` with GetPendingOrdersAction, ApproveOrderAction, and RejectOrderAction


  - Use createAsyncThunk pattern with proper error handling and toast notifications
  - _Requirements: 2.1, 2.2, 2.4_





- [ ] 1.4 Implement order Redux slice
  - Create `src/redux/slice/order/orderSlice.ts` with state management for all order operations
  - Include proper loading states, error handling, and data management following existing patterns
  - Export selectors for component usage
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 1.5 Integrate order reducer into Redux store


  - Add order reducer to the main store configuration
  - Ensure proper TypeScript integration with existing store structure
  - _Requirements: 2.1, 2.2_



- [ ] 2. Create navigation and routing for pending orders
  - Add menu item to sidebar and create route configuration
  - Implement navigation following existing patterns
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2.1 Add pending orders menu item to sidebar
  - Update `src/container/features/sideBar/DesktopSidebar.tsx` to include "سفارشات در انتظار" menu item


  - Add to "مدیریت درخواست ها" section with appropriate icon and routing
  - _Requirements: 1.1, 1.2_

- [ ] 2.2 Configure pending orders route
  - Add route configuration to `src/routes/index.ts` with proper breadcrumb and lazy loading
  - Set appropriate permissions and layout configuration
  - _Requirements: 1.2, 1.3_



- [ ] 3. Implement pending orders page structure
  - Create main page component using CRUD pattern
  - Set up modal state management and component structure
  - _Requirements: 3.1, 3.2, 3.3, 6.1, 6.5_

- [ ] 3.1 Create pending orders management page component
  - Implement `src/page/pendingOrdersManagement/index.tsx` following existing page patterns
  - Use CRUD container with proper modal state management for approval and rejection
  - _Requirements: 3.1, 3.2, 6.1, 6.5_



- [ ] 4. Implement pending orders table component
  - Create table component with data display and filtering capabilities
  - Implement action buttons for approve and reject operations
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 4.1 Add "View More" button to existing pending orders table
  - Add "مشاهده بیشتر" button to the actions column in PendingOrdersTable component
  - Implement onClick handler to open order details modal
  - Update table layout to accommodate the new button alongside approve/reject buttons
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 5. Implement order details modal with cheques display
  - Create comprehensive order details modal with proper UI for cheques array
  - Display all order information in organized sections
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 5.1 Create order details modal component
  - Implement `src/container/features/order/OrderDetailsModal.tsx` with complete order information display
  - Create sections for order header, product info, payment details, shipping info, and cheques
  - Implement responsive grid layout for cheques display (2 columns desktop, 1 mobile)
  - Add proper empty state when no cheques are available
  - Include close functionality with X button and backdrop click
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 5.2 Design and implement cheques UI components
  - Create individual cheque card component with bank, number, sayyad, and date
  - Implement Persian date formatting for cheque dates
  - Style cheques with card design (border, shadow, proper spacing)
  - Ensure responsive design works across different screen sizes
  - _Requirements: 4.3, 4.6_

- [ ] 6. Implement order approval functionality
  - Create approval modal and integrate with Redux actions
  - Handle success and error states with proper user feedback
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 6.1 Create order approval modal component
  - Implement `src/container/features/order/OrderApprovalModal.tsx` as confirmation modal
  - Integrate with ApproveOrderAction and handle loading/error states
  - Show success feedback and update UI state after approval
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 7. Implement enhanced order rejection functionality with reason form
  - Create rejection modal with proper form validation and user experience
  - Handle rejection API calls with reason parameter
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 7.1 Create enhanced order rejection modal component
  - Implement `src/container/features/order/OrderRejectionModal.tsx` with textarea form
  - Add order code display (read-only) at the top of modal
  - Implement required field validation with minimum character length
  - Add real-time validation feedback and error messages
  - Include Submit and Cancel buttons with proper loading states
  - Integrate with RejectOrderAction passing rejection reason
  - Handle success/error scenarios with toast notifications
  - Implement form reset on modal close and backdrop click prevention during submission
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 8. Update main page to handle all modal states
  - Integrate all three modals (details, approval, rejection) into the main page component
  - Implement proper modal state management and data passing
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 8.1 Update pending orders management page for new modals
  - Add state management for OrderDetailsModal (open/close, selected order data)
  - Update existing modal handlers to work with the new "View More" functionality
  - Ensure proper data flow between table component and all modals
  - Test modal opening/closing and data passing functionality
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 9. Integrate all components and test complete functionality
  - Wire all enhanced components together and test end-to-end workflows
  - Ensure proper error handling and user feedback throughout
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 9.1 Complete integration and comprehensive testing
  - Test "View More" button functionality and order details modal display
  - Verify cheques display works correctly with different data scenarios (empty, single, multiple)
  - Test enhanced rejection modal with form validation and reason submission
  - Ensure all modals work properly together without conflicts
  - Verify responsive design works across different screen sizes
  - Test complete workflows: view details → approve/reject, direct approve/reject
  - Confirm UI consistency with existing codebase patterns and Persian RTL layout
  - _Requirements: 6.1, 6.2, 6.3, 6.4_
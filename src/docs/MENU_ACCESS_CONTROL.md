# Menu Access Control System

This document explains how the menu access control system works based on the user profile's `accessMenus` array.

## Overview

The system controls both sidebar menu visibility and route access based on the `accessMenus` array returned from the `/api/users/profile` endpoint.

## User Profile Structure

```typescript
interface UserProfile {
  accessMenus: string[];
  // ... other properties
}
```

Example `accessMenus` array:
```javascript
[
  "/",
  "all-requests", 
  "product-request-status",
  "product-requests",
  "role-management",
  "users-management",
  // ... more menu paths
]
```

## How It Works

### 1. Sidebar Menu Filtering

The `DesktopSidebar` component automatically filters menu items based on user access:

- Menu groups with no accessible items are hidden
- Parent menu items with no accessible sub-items are hidden
- Only menus the user has access to are displayed

### 2. Route Protection

The `PermissionRoute` component protects routes:

- Checks if the current route path is in the user's `accessMenus`
- Redirects unauthorized users to the home page (`/`)
- Handles different path formats (with/without leading slash)

### 3. Component-Level Protection

The `ProtectedRoute` component can be used to protect specific components:

```tsx
<ProtectedRoute requiredPath="/admin-only-feature">
  <AdminComponent />
</ProtectedRoute>
```

## Path Matching Logic

The system handles multiple path formats:

1. **Exact match**: `/product-management` matches `product-management`
2. **Root path special case**: `/` matches both `/` and `all-requests`
3. **Format variations**: Handles paths with and without leading slashes

## Menu Configuration

Menus are defined in `src/container/features/sideBar/DesktopSidebar.tsx`:

```typescript
const allMenuData = [
  {
    id: 1,
    menuTitle: "مدیریت درخواست ها",
    menus: [
      {
        path: "/",
        title: "درخواست های مناقصه",
        // ... other properties
      },
      // ... more menu items
    ]
  }
  // ... more menu groups
];
```

## Route Configuration

Routes are defined in `src/routes/index.ts`:

```typescript
const routes = [
  {
    path: "/",
    breadCrumb: "درخواست های مناقصه",
    component: lazy(() => import("../page/allRequests")),
    layout: "admin",
  },
  // ... more routes
];
```

## Utility Functions

The `src/utils/menuAccess.ts` file provides utility functions:

- `hasMenuAccess(userAccessMenus, targetPath)`: Check if user has access to a path
- `filterMenuItems(menuItems, userAccessMenus)`: Filter menu items based on access
- `filterMenuGroups(menuGroups, userAccessMenus)`: Filter menu groups based on access

## Testing

Tests are available in `src/utils/__tests__/menuAccess.test.ts` to verify the access control logic.

## Usage Examples

### Checking Access in Components

```typescript
import { useSelector } from 'react-redux';
import { selectGetUserProfileData } from '../redux/slice/account/AccountSlice';
import { hasMenuAccess } from '../utils/menuAccess';

const MyComponent = () => {
  const userProfile = useSelector(selectGetUserProfileData);
  const userAccessMenus = userProfile?.accessMenus || [];
  
  const canAccessProductManagement = hasMenuAccess(userAccessMenus, '/product-management');
  
  return (
    <div>
      {canAccessProductManagement && (
        <button>Go to Product Management</button>
      )}
    </div>
  );
};
```

### Protecting Routes

Routes are automatically protected when using the `PermissionRoute` component in the main routing configuration.

## Troubleshooting

1. **Menu not showing**: Check if the menu path is included in the user's `accessMenus` array
2. **Route access denied**: Verify the route path matches one of the paths in `accessMenus`
3. **Inconsistent behavior**: Ensure the menu path in the sidebar matches the route path exactly

## Security Notes

- This is a UI-level access control system
- Backend APIs should also validate user permissions
- The `accessMenus` array should be validated and sanitized on the server side
- Consider implementing role-based access control (RBAC) for more complex scenarios
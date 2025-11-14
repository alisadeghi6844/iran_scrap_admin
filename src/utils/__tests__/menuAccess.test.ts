import { hasMenuAccess, filterMenuItems, filterMenuGroups } from '../menuAccess';

describe('Menu Access Utilities', () => {
  const mockUserAccessMenus = [
    '/',
    'all-requests',
    'product-request-status',
    'product-requests',
    'role-management',
    'users-management',
    'buyer-management',
    'pages-management',
    'blog-management',
    'faq-management',
    'pending-orders-financial',
    'blog-category-management',
    'ticket-management',
    'category-management',
    'product-price-management',
    'product-management',
    'purchase-price-management',
    'shipment-management',
    'view-pricing-management',
    'survey-management',
    'pb-product-admin-management',
    'pb-brand-admin-management',
    'pb-provider-admin-management',
    'pb-port-admin-management'
  ];

  describe('hasMenuAccess', () => {
    it('should allow access when user has no access menus defined', () => {
      expect(hasMenuAccess([], '/some-path')).toBe(true);
    });

    it('should allow access to root path when user has "/" in access menus', () => {
      expect(hasMenuAccess(['/'], '/')).toBe(true);
    });

    it('should allow access to root path when user has "all-requests" in access menus', () => {
      expect(hasMenuAccess(['all-requests'], '/')).toBe(true);
    });

    it('should allow access to matching paths', () => {
      expect(hasMenuAccess(mockUserAccessMenus, '/product-management')).toBe(true);
      expect(hasMenuAccess(mockUserAccessMenus, 'product-management')).toBe(true);
    });

    it('should deny access to non-matching paths', () => {
      expect(hasMenuAccess(mockUserAccessMenus, '/unauthorized-path')).toBe(false);
      expect(hasMenuAccess(mockUserAccessMenus, 'unauthorized-path')).toBe(false);
    });

    it('should handle different path formats', () => {
      const accessMenus = ['product-management'];
      expect(hasMenuAccess(accessMenus, '/product-management')).toBe(true);
      expect(hasMenuAccess(accessMenus, 'product-management')).toBe(true);
    });
  });

  describe('filterMenuItems', () => {
    const mockMenuItems = [
      {
        path: '/product-management',
        title: 'Product Management',
        id: 1
      },
      {
        path: '/unauthorized-menu',
        title: 'Unauthorized Menu',
        id: 2
      },
      {
        title: 'Parent Menu',
        id: 3,
        subRoutes: [
          {
            path: '/role-management',
            title: 'Role Management',
            id: 31
          },
          {
            path: '/unauthorized-submenu',
            title: 'Unauthorized Submenu',
            id: 32
          }
        ]
      }
    ];

    it('should filter out unauthorized menu items', () => {
      const filtered = filterMenuItems(mockMenuItems, mockUserAccessMenus);
      expect(filtered).toHaveLength(2); // product-management and parent menu
      expect(filtered.find(item => item.path === '/unauthorized-menu')).toBeUndefined();
    });

    it('should filter subRoutes recursively', () => {
      const filtered = filterMenuItems(mockMenuItems, mockUserAccessMenus);
      const parentMenu = filtered.find(item => item.title === 'Parent Menu');
      expect(parentMenu?.subRoutes).toHaveLength(1); // only role-management should remain
      expect(parentMenu?.subRoutes[0].path).toBe('/role-management');
    });
  });

  describe('filterMenuGroups', () => {
    const mockMenuGroups = [
      {
        id: 1,
        menuTitle: 'Group 1',
        menus: [
          {
            path: '/product-management',
            title: 'Product Management',
            id: 1
          }
        ]
      },
      {
        id: 2,
        menuTitle: 'Group 2',
        menus: [
          {
            path: '/unauthorized-menu',
            title: 'Unauthorized Menu',
            id: 2
          }
        ]
      }
    ];

    it('should filter menu groups and remove empty groups', () => {
      const filtered = filterMenuGroups(mockMenuGroups, mockUserAccessMenus);
      expect(filtered).toHaveLength(1); // only Group 1 should remain
      expect(filtered[0].menuTitle).toBe('Group 1');
    });
  });
});
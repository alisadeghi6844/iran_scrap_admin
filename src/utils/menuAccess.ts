/**
 * Utility functions for checking menu and route access permissions
 */

/**
 * Check if a user has access to a specific menu/route path
 * @param userAccessMenus - Array of accessible menu paths from user profile
 * @param targetPath - The path to check access for
 * @returns boolean indicating if user has access
 */
export const hasMenuAccess = (userAccessMenus: string[], targetPath: string): boolean => {
  // If user has no access menus defined, allow access (fallback)
  if (!userAccessMenus.length) return true;
  
  // Handle root path specially
  if (targetPath === '/') {
    return userAccessMenus.includes('/') || userAccessMenus.includes('all-requests');
  }
  
  // Create different path formats to check
  const pathWithoutSlash = targetPath.replace(/^\//, '');
  const pathWithSlash = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  
  // Convert route paths to menu access format (keeping the same format as provided)
  const menuAccessFormat = pathWithoutSlash.replace(/-/g, '-');
  
  return userAccessMenus.includes(targetPath) || 
         userAccessMenus.includes(pathWithoutSlash) || 
         userAccessMenus.includes(pathWithSlash) ||
         userAccessMenus.includes(menuAccessFormat);
};

/**
 * Filter menu items based on user access permissions
 * @param menuItems - Array of menu items to filter
 * @param userAccessMenus - Array of accessible menu paths from user profile
 * @returns Filtered array of menu items
 */
export const filterMenuItems = (menuItems: any[], userAccessMenus: string[]): any[] => {
  return menuItems.filter(item => {
    // If item has a path, check if it's accessible
    if (item.path && !hasMenuAccess(userAccessMenus, item.path)) {
      return false;
    }
    
    // If item has subRoutes, filter them recursively
    if (item.subRoutes && item.subRoutes.length > 0) {
      item.subRoutes = filterMenuItems(item.subRoutes, userAccessMenus);
      // If no subRoutes remain after filtering, hide the parent item
      return item.subRoutes.length > 0;
    }
    
    return true;
  });
};

/**
 * Filter menu groups based on user access permissions
 * @param menuGroups - Array of menu groups to filter
 * @param userAccessMenus - Array of accessible menu paths from user profile
 * @returns Filtered array of menu groups
 */
export const filterMenuGroups = (menuGroups: any[], userAccessMenus: string[]): any[] => {
  return menuGroups.map(group => ({
    ...group,
    menus: filterMenuItems(group.menus, userAccessMenus)
  })).filter(group => group.menus.length > 0); // Remove empty groups
};
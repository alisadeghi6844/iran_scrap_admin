import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectGetUserProfileData } from "../../redux/slice/account/AccountSlice";
import { hasMenuAccess } from "../../utils/menuAccess";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPath 
}) => {
  const userProfile = useSelector(selectGetUserProfileData);
  const location = useLocation();
  const userAccessMenus = userProfile?.accessMenus || [];

  // If no specific path is required, allow access
  if (!requiredPath) {
    return <>{children}</>;
  }

  // Function to check if user has access to the route
  const hasAccess = (): boolean => {
    return hasMenuAccess(userAccessMenus, requiredPath);
  };

  // If user doesn't have access, redirect to home or show unauthorized page
  if (!hasAccess()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
import React, { useEffect, useState, useCallback } from "react";
import {
  Navigate,
  RouteProps,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectGetUserProfileData,
} from "../redux/slice/account/AccountSlice";
import EventEmitter from "../api/EventEmitter";
import { hasMenuAccess } from "../utils/menuAccess";

interface PermissionRouteProps {
  element: React.ReactElement;
  permission: string | null;
  role?: string[];
  userId?: string;
}

const PermissionRoute: React.FC<PermissionRouteProps> = ({
  element,
  permission,
  role,
  userId,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userProfile = useSelector(selectGetUserProfileData);
  const location = useLocation();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);

  // Function to check if user has access to the current route
  const hasCurrentRouteAccess = (): boolean => {
    const userAccessMenus = userProfile?.accessMenus || [];
    const currentPath = location.pathname;
    return hasMenuAccess(userAccessMenus, currentPath);
  };

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    if (!isAuthenticated) {
      setRedirect(true);
    }
  }, [isAuthenticated]);

  const handleChangePassword = useCallback(() => {
    setIsChangePasswordActive(true);
    navigate("/change-password", { replace: true });
  }, [navigate]);

  useEffect(() => {
    EventEmitter.on("changePassword", handleChangePassword);

    return () => {
      EventEmitter.off("changePassword", handleChangePassword); // استفاده از متد off
    };
  }, [handleChangePassword]);

  useEffect(() => {
    if (!isChangePasswordActive && isAuthenticated) {
      if (location.pathname === "/change-password") {
        navigate("/", { replace: true });
      }
    }
  }, [isChangePasswordActive, isAuthenticated, location, navigate]);

  if (redirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userId && permission && !role?.includes(permission)) {
    return <Navigate to="/not-found" replace />;
  }

  // Check menu access permissions
  if (isAuthenticated && !hasCurrentRouteAccess()) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default PermissionRoute;

import React, { useEffect, useState, useCallback } from "react";
import {
  Navigate,
  RouteProps,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/slice/account/AccountSlice";
import EventEmitter from "../api/EventEmitter";

interface PermissionRouteProps extends RouteProps {
  element: React.ReactElement;
  permission: string | null;
  role?: any;
  userId: any;
}

const PermissionRoute: React.FC<PermissionRouteProps> = ({
  element,
  permission,
  role,
  userId,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);

  useEffect(() => {
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
  }, []);

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

  return element;
};

export default PermissionRoute;


import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from "../redux/slice/account/AccountSlice";
import {Outlet, Navigate, useLocation, RouteProps} from "react-router-dom";

interface ContentRouteProps extends RouteProps {
    element: React.ComponentType;
}
const Content: React.FC<ContentRouteProps> = ({element: Component}) => {
    const isAuthenticated = true; // استفاده از useSelector برای دسترسی به وضعیت
    const location = useLocation();
    const from = location.state?.from || "/";
    return !isAuthenticated ? <Component /> : <Navigate to={from} replace />;
};

export default Content;

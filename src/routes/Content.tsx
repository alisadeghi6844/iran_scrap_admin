
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from "../redux/slice/account/AccountSlice";
import {Navigate, useLocation} from "react-router-dom";

interface ContentRouteProps {
    element: React.ComponentType;
}
const Content: React.FC<ContentRouteProps> = ({element: Component}) => {

    const isAuthenticated = useSelector(selectIsAuthenticated); // استفاده از useSelector برای دسترسی به وضعیت
    const location = useLocation();

    const from = location.state?.from || "/";
    return !isAuthenticated ? <Component /> : <Navigate to={from} replace />;
};

export default Content;

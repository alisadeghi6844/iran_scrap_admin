import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PermissionRoute from "./routes/PermissionRoute";
import routes, { privateRoutes } from "./routes";
import Content from "./routes/Content";
import MainTheme from "./container/themes/MainTheme.tsx";
import FeatureLoading from "./components/loading/FeatureLoading";

import { GetUserProfileAction } from "./redux/actions/account/AccountActions.ts";
import {
  selectGetUserProfileLoading,
  selectIsAuthenticated,
} from "./redux/slice/account/AccountSlice.ts";
import LoadingPage from "./components/loading/LoadingPage.tsx";

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);

  const pageLoading = useSelector(selectGetUserProfileLoading);

  useEffect(() => {
      dispatch(GetUserProfileAction());
  }, []);

  const renderRoutes = (
    basePath: any,
    crumb: any,
    { component: Component, layout, path, subRoutes, breadCrumb, role }: any
  ) => {
    return (
      <React.Fragment key={basePath + path}>
        <Route
          key={basePath + path}
          path={path && basePath + path}
          element={
            <PermissionRoute
              element={
                layout === "admin" ? (
                  <MainTheme
                    title={breadCrumb}
                    crumb={[
                      ...crumb,
                      {
                        title: breadCrumb,
                        link: basePath + path + "/",
                      },
                    ]}
                  >
                    <Suspense fallback={<FeatureLoading />}>
                      {Component ? (
                        <Component
                          crumb={[
                            ...crumb,
                            {
                              title: breadCrumb,
                              link: basePath + path + "/",
                            },
                          ]}
                          title={breadCrumb}
                          // userData={userData} // ارسال userData به کامپوننت
                        />
                      ) : (
                        <Navigate
                          to={`${
                            basePath + path + "/" + (subRoutes?.[0]?.path || "")
                          }`}
                        />
                      )}
                    </Suspense>
                  </MainTheme>
                ) : layout === "login" ? (
                  <Suspense fallback={<FeatureLoading />}>
                    {Component ? (
                      <Component
                        crumb={[
                          ...crumb,
                          {
                            title: breadCrumb,
                            link: basePath + path + "/",
                          },
                        ]}
                        title={breadCrumb}
                        // userData={userData} // ارسال userData به کامپوننت
                      />
                    ) : (
                      <Navigate
                        to={`${
                          basePath + path + "/" + (subRoutes?.[0]?.path || "")
                        }`}
                      />
                    )}
                  </Suspense>
                ) : null
              }
              permission={role}
              // role={userData}
              // userId={userData.id}
            />
          }
        />
        {subRoutes?.length > 0 &&
          subRoutes.map((route: any) => {
            return renderRoutes(
              basePath + path + "/",
              [
                ...crumb,
                {
                  title: Component
                    ? `${crumb[crumb.length - 1]?.title} ${breadCrumb} > `
                    : "",
                  link: Component ? basePath + path + "/" : null,
                },
              ],
              route
            );
          })}
      </React.Fragment>
    );
  };

  return (
    <>
      {pageLoading ? (
        <LoadingPage />
      ) : (
        <Router>
          <Routes>
            {routes.map((route: any) =>
              renderRoutes("", [{ title: "", link: "/" }], route)
            )}
            {privateRoutes.map(({ path, component: Component }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<FeatureLoading />}>
                    <Content element={Component} />
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;

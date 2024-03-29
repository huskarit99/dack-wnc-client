import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { Route, Redirect, useLocation } from "react-router-dom";

import roleState from "../../../state/roleState";
import isAuthenticatedState from "../../../state/isAuthenticatedState";
import stateOfAuthentication from "../../../utils/enums/stateOfAuthentication";

const routeAdmin = [
  "/categories",
  "/courses",
  "/students",
  "/teachers",
  "/profile",
];
const routeTeacher = [
  "/profile",
  "/upload-course",
  "/teacher/courses",
  "/teacher/course",
];
const routeStudent = ["/watch-list", "/profile", "/subscribed-courses"];

const roleBelongToRoute = {
  teacher: routeTeacher,
  admin: routeAdmin,
  student: routeStudent,
};

const checkRouteByRole = (routes, pathname) => {
  for (let i = 0; i < routes.length; i++) {
    if (pathname.includes(routes[i])) return true;
  }
  return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const role = useRecoilValue(roleState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  if (isAuthenticated === stateOfAuthentication.PROCESSING) {
    return <Fragment />;
  } else {
    if (location.pathname === "/login" || location.pathname === "/register") {
      return (
        <Route
          {...rest}
          render={() => {
            if (isAuthenticated === stateOfAuthentication.SUCCESS)
              return <Redirect to="/" />;
            else if (isAuthenticated === stateOfAuthentication.FAIL)
              return <Component />;
          }}
        />
      );
    } else {
      return (
        <Route
          {...rest}
          render={() => {
            if (isAuthenticated === stateOfAuthentication.FAIL) {
              return <Redirect to="/" />;
            } else {
              if (isAuthenticated === stateOfAuthentication.SUCCESS) {
                if (
                  checkRouteByRole(roleBelongToRoute[role], location.pathname)
                ) {
                  return <Component />;
                }
              }
              return <Redirect to="/" />;
            }
          }}
        />
      );
    }
  }
};

export default PrivateRoute;

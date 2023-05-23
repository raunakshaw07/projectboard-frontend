import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

// Check if the user is authenticated or has access to the route
const isAuthenticated = () => {
  // Implement your authentication logic here
  // Return true if the user is authenticated, false otherwise
  if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ path, ...props }) => {
  return isAuthenticated() ? (
    // <Route {...props} path={path} />
  <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;


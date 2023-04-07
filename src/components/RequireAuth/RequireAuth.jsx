import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentRoles } from '../../features/auth/authSlice';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
  const isAuth = useSelector(selectCurrentToken);
  const roles = useSelector(selectCurrentRoles);
  const location = useLocation();

  return isAuth && roles.find(role => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;

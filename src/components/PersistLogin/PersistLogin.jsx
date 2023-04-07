import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PersistLogin = () => {
  const isAuth = useSelector(selectCurrentToken);
  const location = useLocation();

  const refreshToken = async () => {
    axios
      .get('http://localhost:1234/refresh', { withCredentials: true })
      .then(data => console.log(data.accessToken))
      .catch(err => console.log(err));
  };

  return (
    <>
      {isAuth ? (
        <Outlet />
      ) : refreshToken() ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default PersistLogin;

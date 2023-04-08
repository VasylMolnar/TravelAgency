import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogIn } from '../../features/modal/authModalSlice';
import { setCredentials } from '../../features/auth/authSlice';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Loading } from 'notiflix';

const PersistLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectCurrentToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await axios
        .get('http://localhost:1234/refresh', { withCredentials: true })
        .then(data => {
          const decoded = jwt_decode(data.data.accessToken);
          dispatch(setCredentials({ ...decoded.UserInfo, ...data.data }));
        })
        .catch(err => {
          console.error(err);
          setTimeout(() => {
            dispatch(setIsLogIn(true));
          }, 300);
          navigate('/');
        })
        .finally(() => {
          Loading.remove(300);
          setIsLoading(false);
        });
    };

    if (!isAuth) {
      verifyRefreshToken();
    } else {
      Loading.remove(300);
      setIsLoading(false);
    }
  }, []);

  return <>{isAuth ? <Outlet /> : isLoading ? Loading.dots('Завантаження') : <Outlet />} </>;
};

export default PersistLogin;

import { useState, React } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Formik, FastField, ErrorMessage } from 'formik';
import { userLoginSchema, userRegisterSchema } from '../../utils/validationSchema';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import CancelIcon from '@mui/icons-material/Cancel';
import { Report, Loading } from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useLogInMutation, useRegisterMutation } from '../../features/auth/authApiSlice';
import { selectIsLogIn, setIsLogIn } from '../../features/modal/authModalSlice';
import jwt_decode from 'jwt-decode';

const AuthModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //select
  const isLogIn = useSelector(selectIsLogIn);

  const [changeContent, setChangeContent] = useState(true);

  //fn Api
  const [register] = useRegisterMutation();
  const [logIn] = useLogInMutation();

  const handleRegistration = async values => {
    Loading.dots('');

    const rez = await register(values);

    !rez?.error
      ? setTimeout(() => {
          Loading.remove();
          Report.success('Реєстрація успішна.', 'Можете увійти до свого обл. запису');
        }, 500)
      : setTimeout(() => {
          Loading.remove();
          Report.failure(`Реєстрація невдала.`, `${rez.error.data.message}`);
        }, 500);
  };

  const handleLogIn = async values => {
    Loading.dots('Вхід у обліковий запис');

    const userData = await logIn(values);

    !userData?.error
      ? setTimeout(() => {
          const decoded = jwt_decode(userData.data.accessToken); //decoded Token take secret info

          dispatch(setCredentials({ ...decoded.UserInfo, ...userData.data }));
          dispatch(setIsLogIn(false));

          navigate('/userPage');
          Loading.remove();
          Report.success(`Вітаємо ${decoded.UserInfo.username} `, '');
        }, 500)
      : setTimeout(() => {
          Loading.remove();
          Report.failure(`Вхід невдалий.`, userData.error.data.message);
        }, 500);
  };

  return ReactDOM.createPortal(
    <div className={isLogIn ? 'backdropAuth' : 'backdropAuth is-hidden'}>
      <div className="authModal">
        <button
          type="submit"
          className="btn cancelIcon"
          onClick={() => dispatch(setIsLogIn(false))}
        >
          <CancelIcon />
        </button>

        <div className="btn-list">
          <button
            className={changeContent ? 'btn btn-warning' : 'btn btn-outline-primary'}
            onClick={() => setChangeContent(true)}
          >
            Вхід
          </button>
          <button
            className={!changeContent ? 'btn btn-warning' : 'btn btn-outline-primary'}
            onClick={() => setChangeContent(false)}
          >
            Реєстрація
          </button>
        </div>

        <div
          className={changeContent ? 'authModal_logIn' : 'authModal_register'}
          style={{ display: 'flex' }}
        >
          <div className="section_logIn">
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={handleLogIn}
              validationSchema={userLoginSchema}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="logIn">
                  <h1 className="title">Вхід у обліковий запис</h1>

                  <label className="label">
                    <MailOutlineIcon className="icon" />

                    <FastField type="email" name="email" placeholder="Пошта:" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <PasswordIcon className="icon" />

                    <FastField type="password" name="password" placeholder="Пароль:" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <button
                    className="btn btn-outline-primary"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    Увійти
                  </button>
                </form>
              )}
            </Formik>
          </div>

          <div className="section_register">
            <Formik
              initialValues={{ username: '', email: '', password: '' }}
              onSubmit={handleRegistration}
              validationSchema={userRegisterSchema}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="register">
                  <h1 className="title">Реєстрація облікового запису</h1>

                  <label className="label">
                    <AccountCircleIcon className="icon" />

                    <FastField type="text" name="username" placeholder="Ваше імя:" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label htmlFor="email" className="label">
                    <MailOutlineIcon className="icon" />

                    <FastField type="email" name="email" placeholder="Пошта:" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <PasswordIcon className="icon" />

                    <FastField type="password" name="password" placeholder="Пароль:" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: '100%', marginTop: '30px' }}
                  >
                    Реєстрація
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('authModal')
  );
};

export default AuthModal;

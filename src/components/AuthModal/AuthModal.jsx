import { useState, React } from 'react';
import ReactDOM from 'react-dom';
import { Formik, FastField, ErrorMessage } from 'formik';
import {
  userLoginSchema,
  userRegisterSchema,
} from '../../utils/validationSchema';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import CancelIcon from '@mui/icons-material/Cancel';

const AuthModal = ({ isLogIn, setIsLogIn }) => {
  const [changeContent, setChangeContent] = useState(true);

  return ReactDOM.createPortal(
    <div className={isLogIn ? 'backdropAuth' : 'backdropAuth is-hidden'}>
      <div className="authModal">
        <button
          type="submit"
          className="btn cancelIcon"
          onClick={() => setIsLogIn(false)}
        >
          <CancelIcon />
        </button>

        <div className="btn-list">
          <button
            className={
              changeContent ? 'btn btn-warning' : 'btn btn-outline-primary'
            }
            onClick={() => setChangeContent(true)}
          >
            LogIn
          </button>
          <button
            className={
              !changeContent ? 'btn btn-warning' : 'btn btn-outline-primary'
            }
            onClick={() => setChangeContent(false)}
          >
            Register
          </button>
        </div>

        <div
          className={changeContent ? 'authModal_logIn' : 'authModal_register'}
          style={{ display: 'flex' }}
        >
          <div className="section_logIn">
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
              }}
              validationSchema={userLoginSchema}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="logIn">
                  <h1 className="title">Вхід у обліковий запис</h1>

                  <label htmlFor="email" className="label">
                    <MailOutlineIcon className="icon" />

                    <FastField type="email" name="email" placeholder="Пошта:" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label htmlFor="password" className="label">
                    <PasswordIcon className="icon" />

                    <FastField
                      type="password"
                      name="password"
                      placeholder="Пароль:"
                    />
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
              initialValues={{ name: '', email: '', password: '' }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
              }}
              validationSchema={userRegisterSchema}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="register">
                  <h1 className="title">Реєстрація облікового запису</h1>

                  <label className="label">
                    <AccountCircleIcon className="icon" />

                    <FastField
                      type="text"
                      name="name"
                      placeholder="Ваше імя:"
                    />
                    <ErrorMessage
                      name="name"
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

                    <FastField
                      type="password"
                      name="password"
                      placeholder="Пароль:"
                    />
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

import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, FastField, ErrorMessage } from 'formik';
import { userLoginSchema } from '../../utils/validationSchema';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';

const AuthModal = ({ isLogIn, setIsLogIn }) => {
  return ReactDOM.createPortal(
    <div className={isLogIn ? 'backdropAuth' : 'backdropAuth is-hidden'}>
      <div className="authModal">
        <div className="btn-list">
          <button className="btn btn-primary">LogIn</button>
          <button className="btn btn-primary">Register</button>
        </div>

        <div className="authModal_content">
          <div className="section_logIn">
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
              }}
              validationSchema={userLoginSchema}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="logIn">
                  <h1 className="title">Вхід у обліковий запис</h1>
                  <label htmlFor="name" className="label">
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
                  >
                    Увійти
                  </button>
                </form>
              )}
            </Formik>
          </div>

          {/* <div className="section_register">
            <h1>register</h1>

            <button className="btn btn-outline-success">
              Створити обліковий запис
            </button>
          </div> */}
        </div>
      </div>
    </div>,
    document.getElementById('authModal')
  );
};

export default AuthModal;

import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Formik, FastField, ErrorMessage } from 'formik';
import { userRegisterSchema } from '../utils/validationSchema';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Rooms from './Rooms';
import Table from '../components/UI/Table/Table';

const UserPage = () => {
  // fetch user data from server

  return (
    <main className="section userPage">
      <div className="container">
        <div className="user_content">
          <div className="user">
            <Avatar
              className="img"
              src={require('../img/team/Igor-desk2x.jpg')}
              alt="Remy Sharp"
              sx={{ width: 200, height: 200 }}
            />

            <input className="custom-file-input" type="file" />
            <p
              style={{
                marginTop: '30px',
                marginBottom: '30px',
              }}
            >
              Ігор Дем'яненко
            </p>
          </div>

          <div className="userEdit">
            <Formik
              initialValues={{
                name: 'User1',
                email: 'test123@gmail.com',
                password: '123213123',
              }} //select data from server
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
              }}
              validationSchema={userRegisterSchema}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="edit_profile">
                  <h1 className="title">Редагувати профіль</h1>

                  <label className="label">
                    <AccountCircleIcon className="icon" />

                    <FastField type="text" name="name" placeholder="Імя:" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

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
                    style={{ width: '85%' }}
                  >
                    Змінити
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>

        <div className="hotel_content">
          {/* list of hotel */}
          {/* namehotel Rooms(Flor) datastart dataend allMoney */}
          <Table />
          {/* select table options from user data */}
        </div>
        <div className="tickets_content">{/* list of tickets */}</div>

        <div className="gallery_content"></div>
      </div>
    </main>
  );
};

export default UserPage;

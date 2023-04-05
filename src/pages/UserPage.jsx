import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Formik, FastField, ErrorMessage } from 'formik';
import { userRegisterSchema } from '../utils/validationSchema';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import Table from '../components/UI/Table/Table';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../features/auth/authApiSlice';
import { Report, Loading } from 'notiflix';

const UserPage = () => {
  // select user data from Redux store
  const { id, username, email, password } = useSelector(state => state.auth);

  //fn
  const [update] = useUpdateUserMutation();

  const handleChange = async values => {
    Loading.dots('Оновлення даних ... ');

    try {
      await update({ ...values, id });
      Loading.remove();
      Report.success('Користувача було оновлено', '');
    } catch (e) {
      Loading.remove();
      Report.failure(e.message, '');
    }
  };

  const data = {
    id: 1, //user
    idHotels: { 2: [1, 2, 4], 7: [2, 5], 8: [1] }, //hotels id(key) room(value)
  };

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
              {username}
            </p>
          </div>

          <div className="userEdit">
            <Formik
              initialValues={{
                username,
                email,
                password,
              }} //select data from server
              onSubmit={handleChange}
              validationSchema={userRegisterSchema}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="edit_profile">
                  <h1 className="title">Редагувати профіль</h1>

                  <label className="label">
                    <AccountCircleIcon className="icon" />

                    <FastField type="text" name="username" placeholder="Імя:" />
                    <ErrorMessage
                      name="username"
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
          <Table data={data.idHotels} content="hotelContent" />
          {/* select table options from user data */}
        </div>
        <div className="tickets_content">
          {/* list of tickets */}
          <Table data={data} content="ticketsContent" />
        </div>

        <div className="gallery_content"></div>
      </div>
    </main>
  );
};

export default UserPage;

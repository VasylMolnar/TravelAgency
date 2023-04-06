import { useState, React } from 'react';
import Avatar from '@mui/material/Avatar';
import { Formik, FastField, ErrorMessage } from 'formik';
import { userRegisterSchema } from '../utils/validationSchema';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Table from '../components/UI/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../features/auth/authApiSlice';
import { Report, Loading } from 'notiflix';
import { setCredentials, logOut } from '../features/auth/authSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  const [canUpdate, setCanUpdate] = useState(false);

  // select user data from Redux store
  const { id, username, email, password } = useSelector(state => state.auth);

  //fn
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleChange = async values => {
    Loading.dots('Оновлення даних ... ');

    const updateData = await updateUser({ ...values, id });

    !updateData?.error
      ? setTimeout(() => {
          dispatch(setCredentials({ ...values }));
          Loading.remove();
          Report.success('Користувача було оновлено', '');
        }, 500)
      : setTimeout(() => {
          Loading.remove();
          Report.failure(
            updateData.error.data.message || 'Помилка оновлення',
            ''
          );
        }, 500);
  };

  const handleDelete = async () => {
    Loading.dots('Видалення ваших даних ... ');

    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      var deleteData = await deleteUser({ id });
    } else {
      Loading.remove();
      Report.info('Видалення скасовано', '');
    }

    !deleteData?.error && confirmDelete
      ? setTimeout(() => {
          dispatch(logOut());
          Loading.remove();
          Report.success('Користувача було видалено', '');
        }, 500)
      : setTimeout(() => {
          Loading.remove();
          Report.failure(
            deleteData.error.data.message || 'Помилка видалення',
            ''
          );
        }, 500);
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
              {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                isChanging,
              }) => (
                <form onSubmit={handleSubmit} className="edit_profile">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <h1 className="title">Редагувати профіль</h1>

                    <div>
                      <DriveFileRenameOutlineIcon
                        type="button"
                        onClick={() => setCanUpdate(!canUpdate)}
                        style={{ marginRight: '10px' }}
                      />

                      <DeleteForeverIcon type="button" onClick={handleDelete} />
                    </div>
                  </div>

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
                    disabled={!canUpdate}
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

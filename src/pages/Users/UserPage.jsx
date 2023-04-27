import { useState, React, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { Formik, FastField, ErrorMessage } from 'formik';
import { userRegisterSchema } from '../../utils/validationSchema';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PasswordIcon from '@mui/icons-material/Password';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Table from '../../components/UI/Table/Table';
import { Report, Loading, Notify } from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { useLogOutMutation } from '../../features/auth/authApiSlice';
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadImgMutation,
  useGetUserQuery,
} from '../../features/user/userApiSlice';
import { logOut, selectCurrentRoles } from '../../features/auth/authSlice';
import allowedRoles from '../../utils/roles_list';
import ButtonList from '../../components/ButtonList/ButtonList';

const UserPage = () => {
  const dispatch = useDispatch();
  const [canUpdate, setCanUpdate] = useState(false);

  // select user data from Redux Api
  const { id } = useSelector(state => state.auth);
  const { data, isSuccess } = useGetUserQuery(id);
  const role = useSelector(selectCurrentRoles);

  //fn Api
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [logOutUser] = useLogOutMutation();
  const [uploadIMG] = useUploadImgMutation();

  const handleChange = async values => {
    Loading.dots('Оновлення даних ... ');

    const updateData = await updateUser({ ...values, id });

    !updateData?.error
      ? setTimeout(() => {
          Loading.remove();
          Report.success('Користувача було оновлено', '');
        }, 500)
      : setTimeout(() => {
          Loading.remove();
          Report.failure(updateData.error.data.message || 'Помилка оновлення', '');
        }, 500);
  };

  const handleDelete = async () => {
    Loading.dots('Видалення ваших даних ... ');

    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteUser({ id })
        .then(data => {
          dispatch(logOut());
          Loading.remove();
          Report.success('Користувача було видалено', '');
        })
        .catch(error => {
          Loading.remove();
          Report.failure(error || 'Помилка видалення', '');
        });
    } else {
      Loading.remove();
      Report.info('Видалення скасовано', '');
    }
  };

  const handleLogOut = async () => {
    await logOutUser();
    dispatch(logOut());
    Notify.success('😀 До зустрічі');
  };

  const changeImage = async (e, folder) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    // for (const key of formData) {
    //   console.log(key);
    // }

    await uploadIMG({ formData, id })
      .then(response => {
        Loading.remove();
        Report.success('Користувача було оновлено', '');
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error, '');
      });
  };

  return (
    <main className="section userPage">
      {isSuccess && (
        <div className="container">
          <div className="user_content">
            <div className="user">
              <Avatar
                className="img"
                //src={require('../../img/avatar.jpg')}
                src={data.imageUrl || require('../../img/avatar.jpg')}
                sx={{ width: 200, height: 200 }}
              />

              <p
                style={{
                  marginTop: '30px',
                  marginBottom: '30px',
                }}
              >
                {data.username}
              </p>

              <input
                className="custom-file-input"
                type="file"
                name="image"
                style={{ marginBottom: '10px' }}
                onChange={e => changeImage(e, 'Avatar')}
              />

              <button
                type="button"
                className="btn btn-outline-primary"
                style={{ width: '50%', marginBottom: '10px' }}
                onClick={handleLogOut}
              >
                Вийти
              </button>
            </div>

            <div className="userEdit">
              <Formik
                initialValues={{
                  username: data.username,
                  email: data.email,
                  password: data.password || '*******',
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
                  setFieldValue,
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
                        onClick={() => setFieldValue('password', '')}
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

          {role.includes(allowedRoles.Admin) ? (
            <section className="section">
              <div className="container">
                <h1 className="title"> Admin Панель </h1>
                <ButtonList />
              </div>
            </section>
          ) : (
            <>
              <div className="hotel_content">
                <Table content="hotelContent" />
              </div>
              {/* <div className="tickets_content">
                <Table data={dataForm} content="ticketsContent" />
              </div> */}

              <div className="gallery_content"></div>
            </>
          )}
        </div>
      )}
    </main>
  );
};

export default UserPage;

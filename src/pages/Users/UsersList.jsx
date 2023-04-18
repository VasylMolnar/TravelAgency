import React from 'react';
import { useGetAllUsersQuery, selectUsersIds } from '../../features/user/userApiSlice';
import { useSelector } from 'react-redux';
import { Report, Loading } from 'notiflix';
import UserCard from '../../components/UserCard/UserCard';

const UsersList = () => {
  //for admin page User list

  //fetch Users data
  const { isLoading, isSuccess, isError, error } = useGetAllUsersQuery();

  //select Users IDS
  const orderedUsersIds = useSelector(selectUsersIds);

  return (
    <main className="section userList" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container">
        <h1 className="title" style={{ marginTop: '10px', paddingBottom: '10px' }}>
          Список Користувачів
        </h1>
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

        <div className="userList_cards">
          {isSuccess && !isError && orderedUsersIds.map(id => <UserCard id={id} />)}
        </div>
      </div>
    </main>
  );
};

export default UsersList;

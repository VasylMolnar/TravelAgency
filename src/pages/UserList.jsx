import React from 'react';
import { useGetAllUsersQuery, selectUsersIds } from '../features/user/userApiSlice';
import { useSelector } from 'react-redux';
import { Report, Loading } from 'notiflix';
import UserCards from '../components/UserCards/UserCards';

const UserList = () => {
  //fetch Users data
  const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery();

  //select Users IDS
  const orderedPostIds = useSelector(selectUsersIds);

  return (
    <main className="section userList" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container">
        <h1 className="title">Список Користувачів</h1>
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error}`), Loading.remove())}{' '}
        {isSuccess && !isError && <UserCards itemIDs={orderedPostIds} />}
      </div>
    </main>
  );
};

export default UserList;

import React from 'react';
import { useGetAllUsersQuery, selectUsersIds } from '../../features/user/userApiSlice';
import { useSelector } from 'react-redux';
import { Report, Loading } from 'notiflix';
import UserCard from '../../components/UserCard/UserCard';

const Users = () => {
  //fetch Users data
  const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery();

  console.log(data);
  //select Users IDS
  const orderedPostIds = useSelector(selectUsersIds);

  return (
    <main className="section userList" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="container">
        <h1 className="title" style={{ marginTop: '10px', paddingBottom: '10px' }}>
          Список Користувачів
        </h1>
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error}`), Loading.remove())}

        <div className="userList_cards">
          {isSuccess && !isError && orderedPostIds.map(id => <UserCard id={id} />)}
        </div>
      </div>
    </main>
  );
};

export default Users;

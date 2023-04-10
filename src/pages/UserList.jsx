import React from 'react';
import { useGetAllUsersQuery, selectUsersIds } from '../features/user/userApiSlice';
import { useSelector } from 'react-redux';

const UserList = () => {
  //fetch Users data
  const { isLoading, isSuccess, isError, error } = useGetAllUsersQuery();

  //select Users IDS
  const orderedPostIds = useSelector(selectUsersIds);
  console.log(orderedPostIds);

  return (
    <main className="section userList">
      <h1 className="title">Список Користувачів</h1>
    </main>
  );
};

export default UserList;

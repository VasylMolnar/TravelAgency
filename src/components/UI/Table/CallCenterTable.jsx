import React from 'react';
import {
  useGetAllMessageQuery,
  useDeleteMessageMutation,
} from '../../../features/callCenter/callCenterApiSlice';
import { Loading, Report } from 'notiflix';

const CallCenterTable = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetAllMessageQuery();

  //fn Api

  const [deleteMessage] = useDeleteMessageMutation();

  const handleDelete = async id => {
    Loading.dots('Видалення');

    await deleteMessage(id)
      .then(response => {
        Loading.remove();
        Report.success('Успішно видаленно', '');
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error, '');
      });
  };

  return (
    <>
      {!isLoading && data && (
        <div
          className="table-responsive"
          style={{ backgroundColor: 'white', padding: '10px 0px 10px 10px' }}
        >
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Імя</th>
                <th scope="col">Телефон</th>
                <th scope="col">Пошта</th>
                <th scope="col">Повідомлення</th>
                <th scope="col">Видалення</th>
              </tr>
            </thead>

            {data.map((item, index) => (
              <tbody key={item._id}>
                <tr>
                  <th scope="row">{index + 1}</th>

                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.text}</td>

                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </>
  );
};

export default CallCenterTable;

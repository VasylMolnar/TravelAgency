import { useState, React } from 'react';
import Card from '../../components/Card/Card';
import { useParams } from 'react-router-dom';
import { useGetAllAirCraftQuery } from '../../features/airCraft/airCraftApiSlice';
import { Report, Loading } from 'notiflix';

const Aircraft = () => {
  //select Airline id from url and fetch data in Aircraft folder (in server)
  //for User other style
  const { id } = useParams();

  //fetch AirCraft data
  const { data, isLoading, isSuccess, isError, error } = useGetAllAirCraftQuery({
    id,
  });

  return (
    <main className="section hotel">
      <div className="container">
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

        {isSuccess && data.length > 0 ? (
          <div>
            <h1 className="title" style={{ marginTop: '10px', paddingBottom: '10px' }}>
              Список Літаків
            </h1>

            <div
              className="userList_cards"
              style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
              {isSuccess &&
                !isError &&
                data.map(item => <Card element={item} key={item.id} />)}
            </div>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            <p className="title" style={{ color: 'red' }}>
              Список порожній
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Aircraft;

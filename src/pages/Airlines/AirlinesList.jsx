import { useState, React } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetAllAirLinesQuery,
  selectAirLinesIds,
} from '../../features/airLine/airLineApiSlice';
import { Report, Loading } from 'notiflix';
import HotelCard from '../../components/HotelCard/HotelCard';
import { FcPlus } from 'react-icons/fc';
import AirLineModal from '../../components/AirLineModal/AirLineModal';

const AirlinesList = () => {
  //for admin other style
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateAirLineId, setUpdateAirLineId] = useState(null); //for update Hotel

  //fetch Hotels data
  const { isLoading, isSuccess, isError, error } = useGetAllAirLinesQuery();

  //select Hotels IDS
  const orderedAirLinesIds = useSelector(selectAirLinesIds);

  return (
    <main className="hotelList section">
      <div className="container">
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

        {orderedAirLinesIds.length === 0 ? (
          <>
            <p className="title" style={{ color: 'red' }}>
              Список порожній
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <button className="btn btn-outline-secondary" style={{ border: 'none' }}>
                <FcPlus
                  style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                  onClick={() => setIsOpenModal(true)}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="title" style={{ marginTop: '10px', paddingBottom: '10px' }}>
              Список Авіакомпаній
            </h1>

            <div className="userList_cards">
              {isSuccess &&
                !isError &&
                orderedAirLinesIds.map(id => (
                  <HotelCard
                    id={id}
                    key={id}
                    setUpdateHotelId={setUpdateAirLineId}
                    setIsOpenModal={setIsOpenModal}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      {isOpenModal && (
        <AirLineModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          updateAirLineId={updateAirLineId}
          setUpdateAirLineId={setUpdateAirLineId}
        />
      )}
    </main>
  );
};

export default AirlinesList;

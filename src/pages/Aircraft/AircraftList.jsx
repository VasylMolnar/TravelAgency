import { useState, React } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllAirCraftQuery } from '../../features/airCraft/airCraftApiSlice';
import { Report, Loading } from 'notiflix';
import { FcPlus } from 'react-icons/fc';
import AdminTable from '../../components/UI/Table/AdminTable';
import AirCraftCard from '../../components/AirCraftCard/AirCraftCard';
import AirCraftModal from '../../components/AirCraftModal/AirCraftModal';

const AircraftList = () => {
  //for admin other style

  //select AirLine ID
  const { id } = useParams();

  const [isBookingTable, setIsBookingTable] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateAirCraftId, setUpdateAirCraftId] = useState(null); //for update Room

  //fetch Rooms data
  const { data, isLoading, isSuccess, isError, error } = useGetAllAirCraftQuery({
    id,
  });

  return (
    <main className="userList section">
      <div className="container">
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error.data}`), Loading.remove())}
        {isSuccess && data.length > 0 ? (
          <>
            <h1 className="title" style={{ marginTop: '10px', paddingBottom: '10px' }}>
              Список Літаків
            </h1>

            <div className="userList_cards">
              {isSuccess &&
                !isError &&
                data.map(item => (
                  <AirCraftCard
                    data={item}
                    key={item.id}
                    setUpdateAirCraftId={setUpdateAirCraftId}
                    setIsOpenModal={setIsOpenModal}
                    setIsBookingTable={setIsBookingTable}
                  />
                ))}
            </div>
          </>
        ) : (
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
        )}

        {/* create and update room */}
        {isOpenModal && (
          <AirCraftModal
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            updateAirCraftId={updateAirCraftId}
            setUpdateAirCraftId={setUpdateAirCraftId}
          />
        )}

        {/* table for get and update, delete booking */}
        {isBookingTable && (
          <AdminTable
            isBookingTable={isBookingTable}
            setIsBookingTable={setIsBookingTable}
            roomId={updateAirCraftId}
            setUpdateRoomId={setUpdateAirCraftId}
          />
        )}
      </div>
    </main>
  );
};

export default AircraftList;

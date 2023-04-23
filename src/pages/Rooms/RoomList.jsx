import { useState, React } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllRoomsQuery } from '../../features/room/roomApiSlice';
import RoomCard from '../../components/RoomCard/RoomCard';
import { Report, Loading } from 'notiflix';
import { FcPlus } from 'react-icons/fc';
import RoomModal from '../../components/RoomModal/RoomModal';

const RoomList = () => {
  //for admin other style
  const { id } = useParams();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateRoomId, setUpdateRoomId] = useState(null); //for update Room

  //fetch Rooms data
  const { data, isLoading, isSuccess, isError, error } = useGetAllRoomsQuery({
    id,
  });

  // if (isSuccess) {
  //   console.log('data', data);
  // }

  return (
    <main className="userList section">
      <div className="container">
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

        {isSuccess && data.length > 0 ? (
          <>
            <h1 className="title" style={{ marginTop: '10px', paddingBottom: '10px' }}>
              Список Кімнат
            </h1>

            <div className="userList_cards">
              {isSuccess &&
                !isError &&
                data.map(item => (
                  <RoomCard
                    data={item}
                    key={item.id}
                    setUpdateRoomId={setUpdateRoomId}
                    setIsOpenModal={setIsOpenModal}
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

        {isOpenModal && (
          <RoomModal
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            updateRoomId={updateRoomId}
            setUpdateRoomId={setUpdateRoomId}
          />
        )}
      </div>
    </main>
  );
};

export default RoomList;

import { useState, React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetAllHotelsQuery,
  selectHotelsIds,
} from '../../features/hotel/hotelApiSlice';
import { Report, Loading } from 'notiflix';
import HotelCard from '../../components/HotelCard/HotelCard';
import HotelModal from '../../components/HotelModal/HotelModal';
import { FcPlus } from 'react-icons/fc';

const HotelList = () => {
  //for admin other style
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateHotelId, setUpdateHotelId] = useState(null); //for update Hotel

  //fetch Hotels data
  const { isLoading, isSuccess, isError, error } = useGetAllHotelsQuery();

  //select Users IDS
  const orderedHotelsIds = useSelector(selectHotelsIds);

  return (
    <main className="hotelList section">
      <div className="container">
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

        {orderedHotelsIds.length === 0 ? (
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
                  onClick={() => dispatch(setIsOpenModal(true))}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="title" style={{ marginTop: '10px', paddingBottom: '10px' }}>
              Список Готелів
            </h1>

            <div className="userList_cards">
              {isSuccess &&
                !isError &&
                orderedHotelsIds.map(id => (
                  <HotelCard
                    id={id}
                    key={id}
                    setUpdateHotelId={setUpdateHotelId}
                    setIsOpenModal={setIsOpenModal}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      {isOpenModal && (
        <HotelModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          updateHotelId={updateHotelId}
          setUpdateHotelId={setUpdateHotelId}
        />
      )}
    </main>
  );
};

export default HotelList;

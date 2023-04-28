import { useState, React, useEffect } from 'react';
import { Modal } from 'antd';
import { Loading, Report } from 'notiflix';
import {
  useGetAllBookingByRoomMutation,
  useDeleteBookingMutation,
} from '../../../features/booking/roomBookingApiSlice';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 700px;
  }

  @media (max-width: 768px) {
    .ant-modal-content {
      width: 100%;
    }
  }
`;

const AdminTable = ({ setIsBookingTable, isBookingTable, roomId, setUpdateRoomId }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState([]);

  //fn Api
  const [getBooking] = useGetAllBookingByRoomMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const handleDeleteBooking = async bookingIdHotel => {
    //in Room bookingIdHotel delete in Hotel + Room list {HotelID:'123', Rooms:[{RoomId:"123"...., _id: bookingIdHotel:'123'}]}
    //in User bookingIdUser delete in User + Hotel + Room list {HotelID:'123',Rooms:[{RoomId:"123", _id: bookingIdUser:'123'}]}

    Loading.dots('Видалення');
    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteBooking({ hotelId: id, roomId, bookingIdHotel })
        .then(data => {
          Loading.remove();
          Report.success('Бронювання було видалено', '');
          setIsBookingTable(false);
        })
        .catch(error => {
          Loading.remove();
          Report.failure(error || 'Помилка видалення', '');
        });
    } else {
      Loading.remove();
      Report.info('Видалення скасовано', '');
    }
  };

  useEffect(() => {
    const selectCurrentRoom = async () => {
      Loading.dots('Завантаження');

      await getBooking({ hotelId: id, roomId })
        .then(result => {
          Loading.remove();

          setBookingData(result.data);
          setLoading(false);
        })
        .catch(error => {
          Loading.remove();
        });
    };

    if (isBookingTable) {
      selectCurrentRoom();
      setLoading(true);
    }
  }, [isBookingTable]);

  return (
    <>
      {!loading && bookingData && (
        <div>
          <StyledModal
            title="Бронювання "
            centered
            width={700}
            open={isBookingTable}
            onCancel={() => {
              setIsBookingTable(false);
              setUpdateRoomId(null);
            }}
            className="AdminTable"
          >
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Користувач</th>
                    <th scope="col">Заселення</th>
                    <th scope="col">Виселення</th>
                    <th scope="col">Ціна</th>
                  </tr>
                </thead>

                {bookingData.map((booking, index) => (
                  <tbody key={booking._id}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <Link to={`/userPage/userList/${booking.userID}`}>
                          Користувач
                        </Link>
                      </td>
                      <td>{booking.dataEnd}</td>
                      <td>{booking.dataOff}</td>
                      <td>{booking.finalPrice}</td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteBooking(booking._id, booking.userID)}
                        >
                          Видалити
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </StyledModal>
        </div>
      )}
    </>
  );
};

export default AdminTable;

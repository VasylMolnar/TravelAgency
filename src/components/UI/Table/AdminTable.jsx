import { useState, React, useEffect } from 'react';
import { Modal } from 'antd';
import { Loading, Report } from 'notiflix';
import { useGetAllBookingByRoomMutation } from '../../../features/booking/roomBookingApiSlice';
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

  useEffect(() => {
    const selectCurrentRoom = async () => {
      Loading.dots('Завантаження');

      await getBooking({ hotelId: id, roomId })
        .then(result => {
          Loading.dots('Заватнаження');
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
            <div class="table-responsive">
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
                        {/* <Link to="/userPage/userList/">Користувач</Link> */}
                        <Link to={`/userPage/userList/${booking.userID}`}>
                          Користувач
                        </Link>
                      </td>
                      <td>{booking.dataEnd}</td>
                      <td>{booking.dataOff}</td>
                      <td>{booking.finalPrice}</td>
                      <td>
                        <button class="btn btn-warning">Змінити</button>
                      </td>
                      <td>
                        <button class="btn btn-danger">Видалити</button>
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

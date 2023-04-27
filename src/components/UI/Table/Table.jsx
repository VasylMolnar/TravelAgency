import { useEffect, useState, React } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';
import { Loading, Report, Notify } from 'notiflix';
import {
  useGetBookingMutation,
  useDeleteBookingMutation,
} from '../../../features/booking/roomBookingApiSlice';
import { useSelector } from 'react-redux';

const Table = ({ content }) => {
  const navigate = useNavigate();
  //for user booking table
  const userID = useSelector(state => state.auth.id);
  const [bookingData, setBookingData] = useState([]);

  //fn Api
  const [getBooking] = useGetBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  useEffect(() => {
    const selectBooking = async () => {
      Loading.dots('Завантаження');

      await getBooking({ userID })
        .then(result => {
          Loading.remove();
          setBookingData([...result.data]);
        })
        .catch(error => {
          Loading.remove();
        });
    };

    if (userID) {
      selectBooking();
    }
  }, [userID]);

  const handleDeleteBooking = async (hotelId, roomId, bookingId, cardID) => {
    Loading.dots('Видалення');
    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteBooking({ hotelId, roomId, bookingId, userID, cardID })
        .then(data => {
          Loading.remove();
          Report.success('Бронювання було видалено', '');
          navigate('/hotels');
          setTimeout(() => {
            Notify.success('Можливо ви виберете щось інше!');
          }, 300);
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

  return (
    <>
      {bookingData.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '50px', padding: '30px' }}>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  {content === 'hotelContent' ? (
                    <>
                      <th scope="col">#</th>
                      <th scope="col">Готель</th>
                      <th scope="col">Кімната</th>
                      <th scope="col">Заселення</th>
                      <th scope="col">Виселення</th>
                      <th scope="col">Ціна</th>
                      <th scope="col">Редагувати</th>
                      <th scope="col">Видалити</th>
                    </>
                  ) : (
                    <>
                      <th scope="col">#</th>
                      <th scope="col">Авіакомпанія</th>
                      <th scope="col">Квиток</th>
                      <th scope="col">Відліт</th>
                      <th scope="col">Приліт</th>
                      <th scope="col">Ціна</th>
                    </>
                  )}
                </tr>
              </thead>

              {bookingData.map((item, index) => (
                <tbody key={item.booking._id}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Link to={`/hotels/${item.hotelId}`}>Готель</Link>
                    </td>
                    <td>
                      <Link to={`/hotels/${item.hotelId}/rooms/${item.roomId}`}>
                        Кімната
                      </Link>
                    </td>

                    <td>{item.booking.dataEnd}</td>
                    <td>{item.booking.dataOff}</td>
                    <td>{item.booking.finalPrice}</td>

                    <td style={{ width: '50px' }}>
                      <button
                        className="btn btn-warning"
                        //onClick={() => handleDeleteBooking(booking._id)}
                      >
                        Редагувати
                      </button>
                    </td>

                    <td style={{ width: '50px' }}>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteBooking(
                            item.hotelId,
                            item.roomId,
                            item.booking._id,
                            item.cardId
                          )
                        }
                      >
                        Видалити
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </TableContainer>
      )}
    </>
  );
};

export default Table;

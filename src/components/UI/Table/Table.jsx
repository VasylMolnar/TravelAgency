import { React, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Loading, Report, Notify } from 'notiflix';
import {
  useGetBookingQuery,
  useDeleteBookingMutation,
} from '../../../features/booking/roomBookingApiSlice';
import { useDeleteBookingPlaneMutation } from '../../../features/booking/airCraftBookingApiSlice.js';
import { useSelector } from 'react-redux';
import BookingModal from '../../BookingModal/BookingModal';
import AirCraftBookingModal from '../../AirCraftBookingModal/AirCraftBookingModal';

const Table = ({ content }) => {
  //for user booking table
  const [isBooking, setIsBooking] = useState(false);
  const [updateOpt, setUpdateOpt] = useState({});

  //select User id and fetch User Booking Data
  const userID = useSelector(state => state.auth.id); //cahge fetch or ather get method
  const { data, isLoading, isSuccess, isError, error } = useGetBookingQuery({ userID });

  //fn Api
  const [deleteBooking] = useDeleteBookingMutation();
  const [deleteBookingPlane] = useDeleteBookingPlaneMutation();

  const handleDeleteBooking = async (hotelId, roomId, bookingIdHotel, bookingIdUser) => {
    //bookingIdHotel delete in Hotel + Room list {HotelID:'123', Rooms:[{RoomId:"123"...., _id: bookingIdHotel:'123'}]}
    //bookingIdUser delete in User + Hotel + Room list {HotelID:'123',Rooms:[{RoomId:"123", _id: bookingIdUser:'123'}]}

    Loading.dots('Видалення');
    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteBooking({ hotelId, roomId, bookingIdHotel, userID, bookingIdUser })
        .then(data => {
          Loading.remove();
          Report.success('Бронювання було видалено', '');
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

  const handleDeleteBookingPlane = async (
    airCraftId,
    airLineId,
    bookingIdAirLine,
    bookingIdUser
  ) => {
    Loading.dots('Видалення');
    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteBookingPlane({
        airCraftId,
        airLineId,
        bookingIdAirLine,
        userID,
        bookingIdUser,
      })
        .then(data => {
          Loading.remove();
          Report.success('Бронювання було видалено', '');
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
      {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
      {error && (Report.failure('Error', `${error.data}`), Loading.remove())}
      {isSuccess && data.length > 0 ? (
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
                      <th scope="col">Дата</th>
                      <th scope="col">Ціна</th>
                      <th scope="col">Редагувати</th>
                      <th scope="col">Видалити</th>
                    </>
                  )}
                </tr>
              </thead>

              {content === 'hotelContent'
                ? data[0].map((item, index) => (
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
                            onClick={() => {
                              setIsBooking(true);
                              setUpdateOpt({
                                hotelId: item.hotelId,
                                roomId: item.roomId,
                                dataEnd: item.booking.dataEnd,
                                dataOff: item.booking.dataOff,
                                finalPrice: item.booking.finalPrice,
                                bookingIdHotel: item.booking._id,
                                bookingIdUser: item.cardId,
                              });
                            }}
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
                                item.booking._id, //for delete booking in Hotel + Room + bookingID
                                item.cardId //for delete booking in User + Hotel + Room + bookingID
                              )
                            }
                          >
                            Видалити
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))
                : data[1].map((item, index) => (
                    <tbody key={item.booking._id}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <Link to={`/airLine/${item.airLineId}`}>Авіакомпанія</Link>
                        </td>
                        <td>
                          <Link
                            to={`/airLine/${item.airLineId}/aircraft/${item.airCraftId}`}
                          >
                            Квиток
                          </Link>
                        </td>

                        <td>{item.booking.departure}</td>
                        <td>{item.booking.arrival}</td>
                        <td>{item.booking.date}</td>
                        <td>{item.booking.price}</td>

                        <td style={{ width: '50px' }}>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setIsBooking(true);
                              setUpdateOpt({
                                airLineId: item.airLineId,
                                airCraftId: item.airCraftId,
                                date: item.booking.date,
                                price: item.booking.price,
                                bookingIdAirLine: item.booking._id,
                                bookingIdUser: item.cardId,
                              });
                            }}
                          >
                            Редагувати
                          </button>
                        </td>

                        <td style={{ width: '50px' }}>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              handleDeleteBookingPlane(
                                item.airCraftId,
                                item.airLineId,
                                item.booking._id, //for delete booking in AirLine + AirCraft + bookingID
                                item.cardId //for delete booking in User + AirLine + AirCraft + bookingID
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
      ) : (
        <div style={{ width: '100%', marginTop: '100px' }}>
          <p className="title" style={{ color: 'red' }}>
            Список порожній
          </p>
        </div>
      )}
      {isBooking && content === 'hotelContent' && (
        <BookingModal
          isBooking={isBooking}
          setIsBooking={setIsBooking}
          updateOpt={updateOpt}
        />
      )}

      {isBooking && content === 'planeContent' && (
        <AirCraftBookingModal
          isBooking={isBooking}
          setIsBooking={setIsBooking}
          updateOpt={updateOpt}
        />
      )}
    </>
  );
};

export default Table;

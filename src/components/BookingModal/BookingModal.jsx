import { useState, React, useEffect } from 'react';
import { Modal } from 'antd';
import { Formik, FastField, ErrorMessage } from 'formik';
import { bookingSchema } from '../../utils/validationSchema';
import { Loading, Report } from 'notiflix';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateBookingMutation } from '../../features/booking/roomBookingApiSlice';
import { useGetRoomMutation } from '../../features/room/roomApiSlice';
import { calculatePrice } from '../../utils/calculatePrice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

const BookingModal = ({ isBooking, setIsBooking }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ids = pathname.split('/');
  const hotelId = ids[2];
  const roomId = ids[4];
  const userID = useSelector(state => state.auth.id);

  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState({});

  //fn Api booking
  const [createBooking] = useCreateBookingMutation();
  const [dataRoom] = useGetRoomMutation();

  //get current room data
  useEffect(() => {
    const selectCurrentRoom = async () => {
      Loading.dots('Завантаження');

      await dataRoom({ hotelId, roomId })
        .then(result => {
          Loading.dots('Заватнаження');
          Loading.remove();

          setRoomData({ ...roomData, ...result.data });
          setLoading(false);
        })
        .catch(error => {
          Loading.remove();
        });
    };

    if (isBooking) {
      selectCurrentRoom();
      setLoading(true);
    }
  }, [isBooking]);

  const handleBooking = async value => {
    if (!userID) navigate('/userPage');
    const { dataEnd, dataOff, finalPrice } = value;
    const newValue = { dataEnd, dataOff, finalPrice, userID };

    Loading.dots('Бронювання Кімнати');

    await createBooking({ hotelId, roomId, newValue })
      .then(response => {
        Report.success('Бронювання успішне', '');
        Loading.remove();
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error, '');
      });
  };

  return (
    <>
      {!loading && (
        <div>
          <Modal
            title="Бронювання Кімнати"
            centered
            open={isBooking}
            onCancel={() => {
              setIsBooking(false);
              //   setUpdateRoomId(null);
            }}
            className="hotelModal"
          >
            <Formik
              initialValues={{
                roomNumber: roomData.roomNumber || '',
                roomFloor: roomData.roomFloor || '',
                price: roomData.price || '',
                capacity: roomData.capacity || '',
                dataEnd:
                  JSON.parse(sessionStorage.getItem('searchValues'))?.dataEnd || '',
                dataOff:
                  JSON.parse(sessionStorage.getItem('searchValues'))?.dataOff || '',
                finalPrice:
                  calculatePrice(
                    roomData.price,
                    JSON.parse(sessionStorage.getItem('searchValues'))?.dataEnd,
                    JSON.parse(sessionStorage.getItem('searchValues'))?.dataOff
                  ) || '',
              }}
              onSubmit={handleBooking}
              validationSchema={bookingSchema}
            >
              {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <label className="label">
                    <p style={{ marginBottom: '3px' }}>Номер Кімнати</p>
                    <FastField
                      type="number"
                      name="roomNumber"
                      placeholder="Номер Кімнати:"
                    />

                    <ErrorMessage
                      name="roomNumber"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <p style={{ marginBottom: '3px' }}>Поверх</p>
                    <FastField type="number" name="roomFloor" placeholder="Поверх:" />
                    <ErrorMessage
                      name="roomFloor"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <p style={{ marginBottom: '3px' }}>Кількість місць</p>
                    <FastField
                      type="number"
                      name="capacity"
                      placeholder="Кількість місць:"
                    />
                    <ErrorMessage
                      name="capacity"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <p style={{ marginBottom: '3px' }}>Ціна</p>
                    <FastField type="number" name="price" placeholder="Ціна:" />
                    <ErrorMessage
                      name="price"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <p style={{ marginBottom: '3px' }}>Дата заселення</p>
                    <FastField
                      type="date"
                      name="dataEnd"
                      placeholder="Дата заселення:"
                      onChange={event => {
                        const dataEnd = event.target.value;
                        const dataOff = values.dataOff;
                        const price = values.price;

                        const finalPrice = calculatePrice(price, dataEnd, dataOff);
                        setFieldValue('finalPrice', finalPrice);
                        setFieldValue('dataEnd', dataEnd);
                      }}
                    />
                    <ErrorMessage
                      name="dataEnd"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <p style={{ marginBottom: '3px' }}>Дата виселення</p>
                    <FastField
                      type="date"
                      name="dataOff"
                      placeholder="Дата виселення:"
                      onChange={event => {
                        const dataOff = event.target.value;
                        const dataEnd = values.dataEnd;
                        const price = values.price;

                        const finalPrice = calculatePrice(price, dataEnd, dataOff);
                        setFieldValue('finalPrice', finalPrice);
                        setFieldValue('dataOff', dataOff);
                      }}
                    />
                    <ErrorMessage
                      name="dataOff"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <p style={{ marginBottom: '3px' }}>Загальна Ціна</p>
                    <FastField
                      key={values.dataEnd}
                      type="number"
                      name="finalPrice"
                      placeholder="Загальна Ціна:"
                    />
                    <ErrorMessage
                      name="finalPrice"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <button type="submit" className="btn btn-outline-primary">
                    Бронювати
                  </button>
                </form>
              )}
            </Formik>
          </Modal>
        </div>
      )}
    </>
  );
};

export default BookingModal;

import { useState, React, useEffect } from 'react';
import { Modal } from 'antd';
import { Formik, FastField, ErrorMessage } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { airCraftBookingSchema } from '../../utils/validationSchema';
import { Loading, Report } from 'notiflix';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useBookingMutation } from '../../features/user/userApiSlice';
import {
  useCreateBookingMutation,
  useUpdateBookingMutation,
} from '../../features/booking/airCraftBookingApiSlice';
import { useGetAirCraftMutation } from '../../features/airCraft/airCraftApiSlice';

const AirCraftBookingModal = ({ isBooking, setIsBooking, updateOpt = {} }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ids = pathname.split('/');
  const airLineId = ids[2] || updateOpt.airLineId;
  const airCraftId = ids[4] || updateOpt.airCraftId;
  const userID = useSelector(state => state.auth.id);

  const [loading, setLoading] = useState(false);
  const [airCraftData, setAirCraftData] = useState({});

  //fn Api booking
  const [createBooking] = useCreateBookingMutation(); //Booking save in AirLine list
  const [createBookingUser] = useBookingMutation(); //Booking save in User list
  const [updateBooking] = useUpdateBookingMutation();
  const [dataRoom] = useGetAirCraftMutation();

  //get current AirCraft data
  useEffect(() => {
    const selectCurrentAirCraft = async () => {
      Loading.dots('Завантаження');

      await dataRoom({ airLineId, airCraftId })
        .then(result => {
          Loading.dots('Заватнаження');
          Loading.remove();

          setAirCraftData({ ...airCraftData, ...result.data });
          setLoading(false);
        })
        .catch(error => {
          Loading.remove();
        });
    };

    if (isBooking) {
      selectCurrentAirCraft();
      setLoading(true);
    }
  }, []);

  //2method
  const handleBooking = async value => {
    if (!userID) navigate('/userPage');
    const { date, price, departure, arrival } = value;
    const newValue = { date, price, departure, arrival, userID };

    Loading.dots('Бронювання Польоту');

    //in this we updateBooking 2 fn (in serve we have 2 fn)
    await createBooking({ airLineId, airCraftId, newValue })
      .then(response => {
        Report.success('Політ успішно заброньовано', '');
        Loading.remove();
        setIsBooking(false);
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error, '');
      });

    await createBookingUser({ userID, userValue: { airLineId, airCraftId } })
      .then(response => {
        Loading.remove();
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error, '');
      });
  };

  const handleUpdateBooking = async value => {
    if (!userID) navigate('/userPage');
    const { date, price, departure, arrival } = value;
    const newValue = { date, price, departure, arrival };

    Loading.dots('Бронювання Польоту');

    //in this we updateBooking 1 fn (in serve we have 2 fn)
    await updateBooking({
      airLineId,
      airCraftId,
      bookingIdAirLine: updateOpt.bookingIdAirLine,
      newValue,
    })
      .then(response => {
        Report.success('Бронювання успішне', '');
        Loading.remove();
        setIsBooking(false);
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
            title="Бронювання Польоту"
            centered
            open={isBooking}
            onCancel={() => {
              setIsBooking(false);
            }}
            className="hotelModal"
          >
            <Formik
              initialValues={{
                departure: airCraftData.departure || '',
                arrival: airCraftData.arrival || '',
                price: airCraftData.price || '',
                date:
                  JSON.parse(sessionStorage.getItem('searchValues'))?.date ||
                  updateOpt.date ||
                  '',
              }}
              onSubmit={!updateOpt.date ? handleBooking : handleUpdateBooking}
              validationSchema={airCraftBookingSchema}
            >
              {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <label className="label">
                    <p style={{ marginBottom: '3px' }}>Відліт</p>
                    <FastField type="text" name="departure" placeholder="Відліт:" />

                    <ErrorMessage
                      name="departure"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <p style={{ marginBottom: '3px' }}>Приліт</p>
                    <FastField type="text" name="arrival" placeholder="Приліт:" />

                    <ErrorMessage
                      name="arrival"
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
                    <p style={{ marginBottom: '3px' }}>Дата відльоту</p>
                    <FastField type="date" name="date" placeholder="Дата заселення:" />
                    <ErrorMessage
                      name="date"
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

export default AirCraftBookingModal;

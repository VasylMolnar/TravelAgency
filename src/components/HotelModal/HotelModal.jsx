import { useState, React, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';
import { selectIsOpenHotel, setOpenHotel } from '../../features/modal/hotelModalSlice';
import {
  useGetHotelMutation,
  useCreateHotelMutation,
} from '../../features/hotel/hotelApiSlice';
import { selectHotelId, setUpdateHotelId } from '../../features/modal/hotelModalSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, FastField, ErrorMessage } from 'formik';
import { hotelSchema } from '../../utils/validationSchema';
import { Loading, Report } from 'notiflix';

const HotelModal = ({ isOpenModal, setIsOpenModal, updateHotelId, setUpdateHotelId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [files, setFile] = useState();
  const [hotelData, setHotelData] = useState({});

  //select is Open Modal
  //const openHotelModal = useSelector(selectIsOpenHotel);

  //select hotel Id form (HOTELMODAL) for Update Hotel Data
  //const id = useSelector(selectHotelId);

  //fn Api
  const [createHotel] = useCreateHotelMutation();
  const [dataUpdateHotel] = useGetHotelMutation();

  useEffect(() => {
    const selectCurrentHotel = async () => {
      Loading.dots('Завантаження');

      await dataUpdateHotel(updateHotelId)
        .then(result => {
          Loading.dots('Заватнаження');
          Loading.remove();

          setHotelData({ ...hotelData, ...result.data });
          setLoading(false);
        })
        .catch(error => {
          Loading.remove();
        });
    };

    if (updateHotelId) {
      selectCurrentHotel();
      setLoading(true);
    }
  }, [updateHotelId]);

  //in this fn we can create or update Hotel data
  const handleCreate = async values => {
    const file = files;
    const formData = new FormData();

    for (let item of file) {
      formData.append('image', item);
    }
    formData.append('values', JSON.stringify(values));

    Loading.dots('Створення Готелю');
    //send data

    dispatch(setUpdateHotelId(null));

    await createHotel({ formData })
      .then(response => {
        Loading.remove();
        Report.success('Готель було створено', '');
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error, '');
      });
  };

  return (
    <>
      {!loading &&
        ReactDOM.createPortal(
          <div>
            <Modal
              title="Створення готелю"
              centered
              open={isOpenModal}
              onCancel={() => {
                setIsOpenModal(false);
                setUpdateHotelId(null);

                // if (updateHotelId) {
                //   dispatch(setUpdateHotelId(null));
                //   //document.location.reload();
                // }
              }}
              className="hotelModal"
            >
              <Formik
                initialValues={{
                  name: hotelData.name || '',
                  country: hotelData.country || '',
                  city: hotelData.city || '',
                  address: hotelData.address || '',
                  price: hotelData.price || '',
                  capacity: hotelData.capacity || '',
                  description: hotelData.description || '',
                }}
                onSubmit={handleCreate}
                validationSchema={hotelSchema}
              >
                {({ values, errors, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <label className="label">
                      <FastField type="text" name="name" placeholder="Назва Готелю:" />

                      <ErrorMessage
                        name="name"
                        component="div"
                        style={{ color: 'red', textTransform: 'upperCase' }}
                      />
                    </label>

                    <label className="label">
                      <FastField type="text" name="country" placeholder="Країна:" />
                      <ErrorMessage
                        name="country"
                        component="div"
                        style={{ color: 'red', textTransform: 'upperCase' }}
                      />
                    </label>

                    <label className="label">
                      <FastField type="text" name="city" placeholder="Місто:" />
                      <ErrorMessage
                        name="city"
                        component="div"
                        style={{ color: 'red', textTransform: 'upperCase' }}
                      />
                    </label>

                    <label className="label">
                      <FastField type="text" name="address" placeholder="Адреса:" />
                      <ErrorMessage
                        name="address"
                        component="div"
                        style={{ color: 'red', textTransform: 'upperCase' }}
                      />
                    </label>

                    <label className="label">
                      <FastField type="number" name="price" placeholder="Ціна:" />
                      <ErrorMessage
                        name="price"
                        component="div"
                        style={{ color: 'red', textTransform: 'upperCase' }}
                      />
                    </label>

                    <label className="label">
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
                      <FastField
                        as="textarea"
                        type="text"
                        name="description"
                        placeholder="Опис:"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        style={{ color: 'red', textTransform: 'upperCase' }}
                      />
                    </label>

                    <label className="label">
                      <input
                        type="file"
                        name="image"
                        className="file"
                        onChange={e => setFile(e.target.files)}
                        required
                        multiple
                      />
                    </label>

                    <button type="submit" className="btn btn-outline-primary">
                      Створити
                    </button>
                  </form>
                )}
              </Formik>
            </Modal>
          </div>,
          document.getElementById('hotelModal')
        )}
    </>
  );
};

export default HotelModal;

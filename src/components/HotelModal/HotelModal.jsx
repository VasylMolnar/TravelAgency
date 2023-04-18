import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';
import { selectIsOpenHotel, setOpenHotel } from '../../features/modal/hotelModalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, FastField } from 'formik';

const HotelModal = () => {
  const dispatch = useDispatch();
  const openHotelModal = useSelector(selectIsOpenHotel);

  const handleCreate = values => {
    console.log('', values);
  };

  return ReactDOM.createPortal(
    <div>
      <Modal
        title="Створення готелю"
        centered
        open={openHotelModal}
        onCancel={() => dispatch(setOpenHotel(false))}
        className="hotelModal"
      >
        <Formik
          initialValues={{
            hotelName: '',
            country: '',
            city: '',
            address: '',
            price: '',
            capacity: '',
            description: '',
            image: '',
          }}
          validate={''}
          onSubmit={handleCreate}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <label className="label">
                <FastField type="text" name="hotelName" placeholder="Назва Готелю:" />
              </label>

              <label className="label">
                <FastField type="text" name="country" placeholder="Країна:" />
              </label>

              <label className="label">
                <FastField type="text" name="city" placeholder="Місто:" />
              </label>

              <label className="label">
                <FastField type="text" name="address" placeholder="Адреса:" />
              </label>

              <label className="label">
                <FastField type="number" name="price" placeholder="Ціна:" />
              </label>

              <label className="label">
                <FastField type="number" name="capacity" placeholder="Кількість місць:" />
              </label>

              <label className="label">
                <textarea type="text" name="description" placeholder="Опис:" />
              </label>

              <label className="label">
                <input type="file" name="image" className="file" />
              </label>

              <button className="btn btn-outline-primary" onClick={handleSubmit}>
                Створити
              </button>
            </form>
          )}
        </Formik>
      </Modal>
    </div>,
    document.getElementById('hotelModal')
  );
};

export default HotelModal;

import { useState, React } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';
import { selectIsOpenHotel, setOpenHotel } from '../../features/modal/hotelModalSlice';
import { useCreateHotelMutation } from '../../features/hotel/hotelApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, FastField, ErrorMessage } from 'formik';
import { hotelSchema } from '../../utils/validationSchema';
import { Loading, Report } from 'notiflix';

const HotelModal = () => {
  const dispatch = useDispatch();
  const openHotelModal = useSelector(selectIsOpenHotel);
  const [files, setFile] = useState();

  //fn Api
  const [createHotel] = useCreateHotelMutation();

  const handleCreate = async values => {
    const file = files;
    const formData = new FormData();

    for (let item of file) {
      formData.append('image', item);
    }
    formData.append('values', JSON.stringify(values));

    Loading.dots('Створення Готелю');
    //send data

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
            name: '',
            country: '',
            city: '',
            address: '',
            price: '',
            capacity: '',
            description: '',
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
                <FastField type="number" name="capacity" placeholder="Кількість місць:" />
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
  );
};

export default HotelModal;

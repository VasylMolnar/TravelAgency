import { useState, React, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';
import {
  useGetAirLineMutation,
  useCreateAirLineMutation,
  useUpdateAirLineMutation,
} from '../../features/airLine/airLineApiSlice';
import { Formik, FastField, ErrorMessage } from 'formik';
import { hotelSchema } from '../../utils/validationSchema';
import { Loading, Report } from 'notiflix';

const AirLineModal = ({
  isOpenModal,
  setIsOpenModal,
  updateAirLineId,
  setUpdateAirLineId,
}) => {
  const [files, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [airLineData, setHotelData] = useState({});

  //fn Api
  const [createAirLine] = useCreateAirLineMutation();
  const [dataUpdateAirLine] = useGetAirLineMutation();
  const [updateAirLine] = useUpdateAirLineMutation();

  useEffect(() => {
    const selectCurrentAirLine = async () => {
      Loading.dots('Завантаження');

      await dataUpdateAirLine(updateAirLineId)
        .then(result => {
          Loading.dots('Заватнаження');
          Loading.remove();

          setHotelData({ ...airLineData, ...result.data });
          setLoading(false);
        })
        .catch(error => {
          Loading.remove();
        });
    };

    if (updateAirLineId) {
      selectCurrentAirLine();
      setLoading(true);
    }
  }, [updateAirLineId]);

  const handleUpdate = async values => {
    const file = files;
    const formData = new FormData();

    for (let item of file) {
      formData.append('image', item);
    }
    formData.append('values', JSON.stringify(values));

    Loading.dots('Оновленя Авіакомпанії');

    //send data
    await updateAirLine({ id: updateAirLineId, formData })
      .then(response => {
        Loading.remove();
        Report.success('Авіакомпанію було оновлено', '');
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error, '');
      });
  };

  const handleCreate = async values => {
    const file = files;
    const formData = new FormData();

    for (let item of file) {
      formData.append('image', item);
    }
    formData.append('values', JSON.stringify(values));

    Loading.dots('Створення Авіакомпанії');
    //send data

    await createAirLine({ formData })
      .then(response => {
        Loading.remove();
        Report.success('Авіакомпанію було створено', '');
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
              title="Створення Авіакомпанії"
              centered
              open={isOpenModal}
              onCancel={() => {
                setIsOpenModal(false);
                setUpdateAirLineId(null);
              }}
              className="hotelModal"
            >
              <Formik
                initialValues={{
                  name: airLineData.name || '',
                  country: airLineData.country || '',
                  city: airLineData.city || '',
                  address: airLineData.address || '',
                  description: airLineData.description || '',
                }}
                onSubmit={updateAirLineId ? handleUpdate : handleCreate}
                validationSchema={hotelSchema}
              >
                {({ values, errors, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <label className="label">
                      <FastField
                        type="text"
                        name="name"
                        placeholder="Назва Авіакомпанії:"
                      />

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

export default AirLineModal;

import { useState, React, useEffect } from 'react';
import { Modal } from 'antd';
import {
  useGetAirCraftMutation,
  useCreateAirCraftMutation,
  useUpdateAirCraftMutation,
} from '../../features/airCraft/airCraftApiSlice';
import { Formik, FastField, ErrorMessage } from 'formik';
import { airCraftSchema } from '../../utils/validationSchema';
import { Loading, Report } from 'notiflix';
import { useParams } from 'react-router-dom';

const AirCraftModal = ({
  isOpenModal,
  setIsOpenModal,
  updateAirCraftId,
  setUpdateAirCraftId,
}) => {
  const { id: airLineId } = useParams();
  const [files, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [airCraftData, setAirCraftData] = useState({});

  //fn Api
  const [createAirCraft] = useCreateAirCraftMutation();
  const [dataUpdateAirCraft] = useGetAirCraftMutation();
  const [updateAirCraft] = useUpdateAirCraftMutation();

  useEffect(() => {
    const selectCurrentAirCraft = async () => {
      Loading.dots('Завантаження');

      await dataUpdateAirCraft({ airLineId, airCraftId: updateAirCraftId })
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

    if (updateAirCraftId) {
      selectCurrentAirCraft();
      setLoading(true);
    }
  }, [updateAirCraftId]);

  const handleUpdate = async values => {
    const file = files;
    const formData = new FormData();

    for (let item of file) {
      formData.append('image', item);
    }
    formData.append('values', JSON.stringify(values));

    Loading.dots('Оновленя Польоту');

    //send data
    await updateAirCraft({ airLineId, airCraftId: updateAirCraftId, formData })
      .then(response => {
        Loading.remove();
        Report.success('Політ було оновлено', '');
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
    formData.append(
      'values',
      JSON.stringify({ airLineId: airLineId, airLinePlane: [{ ...values }] })
    );

    Loading.dots('Створення Польоту');
    //send data

    await createAirCraft({ airLineId, formData })
      .then(response => {
        Loading.remove();
        Report.success('Політ було створено', '');
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
            title="Створення Польоту"
            centered
            open={isOpenModal}
            onCancel={() => {
              setIsOpenModal(false);
              setUpdateAirCraftId(null);
            }}
            className="hotelModal"
          >
            <Formik
              initialValues={{
                departure: airCraftData.departure || '',
                arrival: airCraftData.arrival || '',
                price: airCraftData.price || '',
                description: airCraftData.description || '',
              }}
              onSubmit={updateAirCraftId ? handleUpdate : handleCreate}
              validationSchema={airCraftSchema}
            >
              {({ values, errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <label className="label">
                    <FastField type="text" name="departure" placeholder="Відліт:" />

                    <ErrorMessage
                      name="departure"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <FastField type="text" name="arrival" placeholder="Приліт:" />
                    <ErrorMessage
                      name="Приліт"
                      component="div"
                      style={{ color: 'red', textTransform: 'upperCase' }}
                    />
                  </label>

                  <label className="label">
                    <FastField type="number" name="price" placeholder="Ціна польоту:" />
                    <ErrorMessage
                      name="price"
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
        </div>
      )}
    </>
  );
};

export default AirCraftModal;

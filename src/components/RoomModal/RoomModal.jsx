import { useState, React, useEffect } from 'react';
import { Modal } from 'antd';
import {
  useGetRoomMutation,
  useCreateRoomMutation,
  useUpdateRoomMutation,
} from '../../features/room/roomApiSlice';
import { Formik, FastField, ErrorMessage } from 'formik';
import { roomSchema } from '../../utils/validationSchema';
import { Loading, Report } from 'notiflix';
import { useParams } from 'react-router-dom';

const RoomModal = ({ isOpenModal, setIsOpenModal, updateRoomId, setUpdateRoomId }) => {
  const { id: hotelId } = useParams();
  const [files, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState({});

  //fn Api
  const [createRoom] = useCreateRoomMutation();
  const [dataUpdateRoom] = useGetRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();

  useEffect(() => {
    const selectCurrentRoom = async () => {
      Loading.dots('Завантаження');

      await dataUpdateRoom({ hotelId, roomId: updateRoomId })
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

    if (updateRoomId) {
      selectCurrentRoom();
      setLoading(true);
    }
  }, [updateRoomId]);

  const handleUpdate = async values => {
    const file = files;
    const formData = new FormData();

    for (let item of file) {
      formData.append('image', item);
    }
    formData.append('values', JSON.stringify(values));

    Loading.dots('Оновленя Готелю');

    //send data
    await updateRoom({ hotelId, roomId: updateRoomId, formData })
      .then(response => {
        Loading.remove();
        Report.success('Готель було оновлено', '');
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
      JSON.stringify({ hotelId: hotelId, hotelRooms: [{ ...values }] })
    );

    Loading.dots('Створення Кімнати');
    //send data

    await createRoom({ hotelId, formData })
      .then(response => {
        Loading.remove();
        Report.success('Кімнату було створено', '');
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
            title="Створення Кімнати"
            centered
            open={isOpenModal}
            onCancel={() => {
              setIsOpenModal(false);
              setUpdateRoomId(null);
            }}
            className="hotelModal"
          >
            <Formik
              initialValues={{
                roomNumber: roomData.roomNumber || '',
                roomFloor: roomData.roomFloor || '',
                price: roomData.price || '',
                capacity: roomData.capacity || '',
                description: roomData.description || '',
              }}
              onSubmit={updateRoomId ? handleUpdate : handleCreate}
              validationSchema={roomSchema}
            >
              {({ values, errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <label className="label">
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
                    <FastField type="number" name="roomFloor" placeholder="Поверх:" />
                    <ErrorMessage
                      name="roomFloor"
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
        </div>
      )}
    </>
  );
};

export default RoomModal;

import { useState, React } from 'react';
import GalleryCard from '../GalleryCard/GalleryCard';
import { FcAddImage } from 'react-icons/fc';
import { Loading, Report } from 'notiflix';
import {
  useCreateImageMutation,
  useGetGalleryListQuery,
} from '../../features/gallery/galleryApiSlice';

const GalleryUser = ({ userID, userName }) => {
  //select User Gallery List By User ID
  const { data, isLoading, isSuccess } = useGetGalleryListQuery({ userID });

  // console.log(data);

  //fn Api
  const [createImage] = useCreateImageMutation();

  const handleCreate = async file => {
    const title = window.prompt('Введіть назву до зображення.');
    const formData = new FormData();

    for (let item of file) {
      formData.append('image', item);
    }
    formData.append('values', JSON.stringify({ userID, userName, title }));

    Loading.dots('Створення Готелю');
    //send data

    await createImage({ formData, userID })
      .then(response => {
        Loading.remove();
        Report.success('Фото було додано', '');
      })
      .catch(error => {
        Loading.remove();
        Report.failure(error, '');
      });
  };

  return (
    <main className="section gallery">
      <div className="container">
        <h1 className="title">Галерея</h1>
        {isSuccess && data.length > 0 ? (
          <div className="gallery_content">
            {data.map((item, index) => (
              <GalleryCard
                item={item}
                key={index}
                currentImgID={item.currentImgID}
                userID={item.userID}
              />
            ))}
          </div>
        ) : (
          <div className="gallery_content">
            <label htmlFor="file-input">
              <FcAddImage style={{ width: '50px', height: '50px', cursor: 'pointer' }} />
            </label>
            <input
              id="file-input"
              style={{ display: 'none' }}
              type="file"
              name="image"
              className="file"
              required
              multiple
              onChange={e => {
                handleCreate(e.target.files);
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default GalleryUser;

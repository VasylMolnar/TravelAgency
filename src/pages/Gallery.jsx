import { useState, React } from 'react';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import Search from '../components/Search/Search';
import { useGetAllGalleryListQuery } from '../features/gallery/galleryApiSlice';
import { Loading, Report } from 'notiflix';

const Gallery = () => {
  const [search, setSearch] = useState('');

  const { data, isLoading, isSuccess, error } = useGetAllGalleryListQuery();

  return (
    <main className="section gallery">
      <div className="container">
        {isLoading ? Loading.dots('Завантаження') : Loading.remove(300)}
        {error && (Report.failure('Error', `${error.data}`), Loading.remove())}

        <Search setSearch={setSearch} />

        {isSuccess ? (
          <div className="gallery_content">
            {data.map((item, index) => {
              console.log(item);
              // <GalleryCard
              //   item={item}
              //   key={index}
              //   userName={data.userName}
              //   //userID={userID}
              // />;
            })}
          </div>
        ) : (
          <div className="gallery_content">
            <h1 className="title"> Список порожній</h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default Gallery;

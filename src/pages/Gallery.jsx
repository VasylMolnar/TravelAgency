import { useState, React } from 'react';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import Search from '../components/Search/Search';

const Gallery = () => {
  const [search, setSearch] = useState('');
  const data = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 120,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      reactions: {
        thumbsUp: 1,
        wow: 2,
        heart: 10,
        rocket: 12,
      },
    },
  ];

  return (
    <main className="section gallery">
      <div className="container">
        <Search setSearch={setSearch} />

        <div className="gallery_content">
          {data.map(item => (
            <GalleryCard item={item} key={item.title} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Gallery;

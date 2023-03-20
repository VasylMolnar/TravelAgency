import React from 'react';
import GalleryCard from '../components/GalleryCard/GalleryCard';

const Gallery = () => {
  //fetch data img from server gallery folder
  const datas = [
    {
      img: require('../img/2.jpg'),
      title: 'title 1',
      authorName: 'user 1',
      reactions: {
        thumbsUp: 1,
        wow: 1,
        heart: 1,
        rocket: 3,
        coffee: 0,
      },
      date: new Date().getDate(),
    },
    {
      img: require('../img/2.jpg'),
      title: 'title 2',
      authorName: 'user 2',
      reactions: {
        thumbsUp: 1,
        wow: 1,
        heart: 11,
        rocket: 13,
        coffee: 10,
      },
      date: new Date().getDate(),
    },
    {
      img: require('../img/2.jpg'),
      title: 'title 3',
      authorName: 'user 3',
      reactions: {
        thumbsUp: 1,
        wow: 3,
        heart: 13,
        rocket: 0,
        coffee: 0,
      },
      date: new Date().getDate(),
    },
    {
      img: require('../img/2.jpg'),
      title: 'title 4',
      authorName: 'user 4',
      reactions: {
        thumbsUp: 1,
        wow: 41,
        heart: 1,
        rocket: 43,
        coffee: 4,
      },
      date: new Date().getDate(),
    },
    {
      img: require('../img/2.jpg'),
      title: 'title 5',
      authorName: 'user 5',
      reactions: {
        thumbsUp: 11,
        wow: 1,
        heart: 15,
        rocket: 3,
        coffee: 10,
      },
      date: new Date().getDate(),
    },
    {
      img: require('../img/2.jpg'),
      title: 'title 4',
      authorName: 'user 4',
      reactions: {
        thumbsUp: 1,
        wow: 41,
        heart: 1,
        rocket: 43,
        coffee: 4,
      },
      date: new Date().getDate(),
    },
    {
      img: require('../img/2.jpg'),
      title: 'title 5',
      authorName: 'user 5',
      reactions: {
        thumbsUp: 11,
        wow: 1,
        heart: 15,
        rocket: 3,
        coffee: 10,
      },
      date: new Date().getDate(),
    },
    {
      img: require('../img/2.jpg'),
      title: 'title 4',
      authorName: 'user 4',
      reactions: {
        thumbsUp: 1,
        wow: 41,
        heart: 1,
        rocket: 43,
        coffee: 4,
      },
      date: new Date().getDate(),
    },
    {
      img: require('../img/2.jpg'),
      title: 'title 5',
      authorName: 'user 5',
      reactions: {
        thumbsUp: 11,
        wow: 1,
        heart: 15,
        rocket: 3,
        coffee: 10,
      },
      date: new Date().getDate(),
    },
  ];

  return (
    <main className="section gallery">
      <div className="container">
        {datas.map(data => (
          <GalleryCard data={data} />
        ))}
      </div>
    </main>
  );
};

export default Gallery;

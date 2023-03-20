import React from 'react';
import ReactionButtons from '../ReactionButtons/ReactionButtons';

let GalleryCard = ({ data }) => {
  return (
    <div className="galleryCard">
      <img src={data.img} alt="" className="card_img" />

      <div className="content">
        <p>{data.authorName}</p>
        <p>{data.title}</p>
        <p>{data.date}</p>

        <div className="button_list">
          <ReactionButtons reactions={data.reactions} />
        </div>
      </div>
    </div>
  );
};

GalleryCard = React.memo(GalleryCard);
export default GalleryCard;

import React from 'react';
import ReactionButtons from '../ReactionButtons/ReactionButtons';
import {
  useDeleteImgMutation,
  useUpdateImgMutation,
} from '../../features/gallery/galleryApiSlice';
import { useSelector } from 'react-redux';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { FcFullTrash } from 'react-icons/fc';
import { Loading, Report } from 'notiflix';

let GalleryCard = ({ item, userID, currentImgID }) => {
  const { id } = useSelector(state => state.auth);

  //fn API
  const [deleteIMG] = useDeleteImgMutation();

  //for AUTH User only owner
  const handleDeleteImg = async (userID, currentImgID) => {
    Loading.dots('Видалення зображення ... ');
    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteIMG({ userID, currentImgID })
        .then(data => {
          Loading.remove();
          Report.success('Зображення було видалено', '');
        })
        .catch(error => {
          Loading.remove();
          Report.failure(error || 'Помилка видалення', '');
        });
    } else {
      Loading.remove();
      Report.info('Видалення скасовано', '');
    }
  };

  //all AUTH User in ReactionButtons.jsx

  return (
    <ImageListItem>
      <img src={item.data} srcSet={item.data} alt={item.userName} loading="lazy" />
      <ImageListItemBar
        title={item.userName}
        subtitle={item.title}
        actionIcon={
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {id === userID && (
              <FcFullTrash
                style={{ width: '35px', height: '35px', cursor: 'pointer' }}
                onClick={() => handleDeleteImg(userID, currentImgID)}
              />
            )}
            {id && (
              <Box
                sx={{
                  transform: 'translateZ(0px)',
                  flexGrow: 1,
                }}
              >
                <div className="box_content">
                  <SpeedDialIcon className="box_icon" />
                  <ReactionButtons
                    reactions={item.reactions}
                    userID={userID}
                    currentImgID={currentImgID}
                  />
                </div>
              </Box>
            )}
          </div>
        }
      />
    </ImageListItem>
  );
};

GalleryCard = React.memo(GalleryCard);
export default GalleryCard;

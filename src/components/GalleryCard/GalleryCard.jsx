import React from 'react';
import ReactionButtons from '../ReactionButtons/ReactionButtons';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

let GalleryCard = ({ item, userName, userID }) => {
  ////userID
  return (
    <ImageListItem>
      <img src={item.data} srcSet={item.data} alt={userName} loading="lazy" />
      <ImageListItemBar
        title={userName}
        subtitle={'TRAVELING'}
        actionIcon={
          <Box
            sx={{
              transform: 'translateZ(0px)',
              flexGrow: 1,
            }}
          >
            <div className="box_content">
              <SpeedDialIcon className="box_icon" />
              <ReactionButtons reactions={item.reactions} />
            </div>
          </Box>
        }
      />
    </ImageListItem>
  );
};

GalleryCard = React.memo(GalleryCard);
export default GalleryCard;

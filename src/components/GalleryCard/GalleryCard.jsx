import React from 'react';
import ReactionButtons from '../ReactionButtons/ReactionButtons';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

let GalleryCard = ({ item }) => {
  return (
    <ImageListItem>
      <img
        src={`${item.img}?w=248&fit=crop&auto=format`}
        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
      />
      <ImageListItemBar
        title={item.title}
        subtitle={item.author}
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

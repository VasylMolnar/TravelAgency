import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHotelById } from '../../features/hotel/hotelApiSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

let HotelCard = ({ id }) => {
  const dispatch = useDispatch();

  //selector
  const {
    id: hotelId,
    hotelName,
    country,
    city,
    address,
    img,
    price,
    capacity,
    description,
  } = useSelector(state => selectHotelById(state, id));

  //fn Api

  return (
    <Card sx={{ maxWidth: 345 }} id="ant_card">
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title={hotelName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hotelName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

HotelCard = React.memo(HotelCard);
export default HotelCard;

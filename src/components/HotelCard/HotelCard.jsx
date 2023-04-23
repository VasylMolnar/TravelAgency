import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { setOpenHotel, setUpdateHotelId } from '../../features/modal/hotelModalSlice';
import {
  selectHotelById,
  useDeleteHotelMutation,
} from '../../features/hotel/hotelApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Loading, Report } from 'notiflix';

let HotelCard = ({ id, setUpdateHotelId, setIsOpenModal }) => {
  //for admin page Hotel Card list other style
  const navigate = useNavigate();

  //selector
  const { name, country, description, imagesUrl } = useSelector(state =>
    selectHotelById(state, id)
  );

  //fn Api
  const [deleteHotel] = useDeleteHotelMutation();

  const handleDelete = async () => {
    Loading.dots('Видалення Готелю ... ');

    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteHotel({ id })
        .then(data => {
          Loading.remove();
          Report.success('Готель було видалено', '');
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

  return (
    <>
      <Card sx={{ maxWidth: 345 }} id="ant_card">
        <Link to={`/hotels/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <CardMedia
            sx={{ height: 200 }}
            image={imagesUrl[0] || require('../../img/avatar.jpg')}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              {country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.split('').slice(0, 225)}
            </Typography>
          </CardContent>
        </Link>
        <CardActions
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: '10px',
            marginBottom: '10px',
            cursor: 'pointer',
          }}
        >
          <AddCircleOutlineIcon
            key="setting"
            //onClick={() => dispatch(setOpenHotel(true))}
            onClick={() => setIsOpenModal(true)}
          />
          <DriveFileRenameOutlineIcon
            onClick={() => {
              setUpdateHotelId(id);
              setIsOpenModal(true);
            }}
          />
          <MeetingRoomIcon
            onClick={() => {
              sessionStorage.setItem('hotelID', id);
              navigate(`/userPage/hotelList/roomList/${id}`);
            }}
          />
          <DeleteForeverIcon key="ellipsis" onClick={() => handleDelete(id)} />
        </CardActions>
      </Card>
    </>
  );
};

HotelCard = React.memo(HotelCard);
export default HotelCard;

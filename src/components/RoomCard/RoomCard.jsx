import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDeleteRoomMutation } from '../../features/room/roomApiSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LuggageIcon from '@mui/icons-material/Luggage';
import { Loading, Report } from 'notiflix';

let RoomCard = ({ data, setUpdateRoomId, setIsOpenModal }) => {
  //for Admin
  const { id: hotelId } = useParams();
  const roomId = data.id;

  //fn Api
  const [deleteRoom] = useDeleteRoomMutation();

  const handleDelete = async () => {
    Loading.dots('Видалення Кімнати ... ');

    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteRoom({ hotelId, roomId })
        .then(data => {
          Loading.remove();
          Report.success('Кімнату було видалено', '');
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
    <Card sx={{ maxWidth: 345 }} id="ant_card">
      <Link
        to={`/hotels/${hotelId}/rooms/${roomId}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <CardMedia
          sx={{ height: 200 }}
          image={data.imagesUrl[0] || require('../../img/avatar.jpg')}
          title={data.roomNumber}
        />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Номер кімнати: {data.roomNumber}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            Поверх: {data.roomFloor}
          </Typography>

          <Typography gutterBottom variant="p" component="div">
            Ціна: {data.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description.split('').slice(0, 225)}
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
        <AddCircleOutlineIcon key="setting" onClick={() => setIsOpenModal(true)} />
        <DriveFileRenameOutlineIcon
          onClick={() => {
            setUpdateRoomId(roomId);
            setIsOpenModal(true);
          }}
        />
        <LuggageIcon />
        <DeleteForeverIcon key="ellipsis" onClick={() => handleDelete(roomId)} />
      </CardActions>
    </Card>
  );
};

RoomCard = React.memo(RoomCard);
export default RoomCard;

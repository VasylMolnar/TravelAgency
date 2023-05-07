import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDeleteAirCraftMutation } from '../../features/airCraft/airCraftApiSlice';
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

let AirCraftCard = ({ data, setUpdateAirCraftId, setIsOpenModal, setIsBookingTable }) => {
  //for Admin
  const { id: airLineId } = useParams();
  const airCraftId = data.id;

  //fn Api
  const [deleteAirCraft] = useDeleteAirCraftMutation();

  const handleDelete = async () => {
    Loading.dots('Видалення Польоту ... ');

    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteAirCraft({ airLineId, airCraftId })
        .then(data => {
          Loading.remove();
          Report.success('Політ було видалено', '');
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
        to={`/airline/${airLineId}/aircraft/${airCraftId}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <CardMedia
          sx={{ height: 200 }}
          image={data.imagesUrl[0] || require('../../img/avatar.jpg')}
          title={data.departure}
        />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Відліт: {data.departure}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            Приліт: {data.arrival}
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
            setUpdateAirCraftId(airCraftId);
            setIsOpenModal(true);
          }}
        />
        <LuggageIcon
          onClick={() => {
            setIsBookingTable(true);
            setUpdateAirCraftId(airCraftId);
          }}
        />
        <DeleteForeverIcon key="ellipsis" onClick={() => handleDelete(airCraftId)} />
      </CardActions>
    </Card>
  );
};

AirCraftCard = React.memo(AirCraftCard);
export default AirCraftCard;

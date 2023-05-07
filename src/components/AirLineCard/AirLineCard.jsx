import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectAirLineById,
  useDeleteAirLineMutation,
} from '../../features/airLine/airLineApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Loading, Report } from 'notiflix';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

let AirLineCard = ({ id, setUpdateAirLineId, setIsOpenModal }) => {
  //for admin page Hotel Card list other style
  const navigate = useNavigate();

  //selector
  const { nameAirLine, country, description, imagesUrl } = useSelector(state =>
    selectAirLineById(state, id)
  );

  //fn Api
  const [deleteAirLine] = useDeleteAirLineMutation();

  const handleDelete = async () => {
    Loading.dots('Видалення Авіакомпанії ... ');

    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteAirLine({ id })
        .then(data => {
          Loading.remove();
          Report.success('Авіакомпанію було видалено', '');
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
        <Link to={`/airline/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <CardMedia
            sx={{ height: 200 }}
            image={imagesUrl[0] || require('../../img/avatar.jpg')}
            title={nameAirLine}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {nameAirLine}
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
          <AddCircleOutlineIcon key="setting" onClick={() => setIsOpenModal(true)} />
          <DriveFileRenameOutlineIcon
            onClick={() => {
              setUpdateAirLineId(id);
              setIsOpenModal(true);
            }}
          />
          <AirplanemodeActiveIcon
            onClick={() => navigate(`/userPage/airlineList/airCraftLins/${id}`)}
          />
          <DeleteForeverIcon key="ellipsis" onClick={() => handleDelete(id)} />
        </CardActions>
      </Card>
    </>
  );
};

AirLineCard = React.memo(AirLineCard);
export default AirLineCard;

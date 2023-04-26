import React from 'react';
import { styled } from '@mui/material/styles';
import TableMu from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Table = ({ data, content }) => {
  //for user booking table
  //data this is hotel rooms id
  //fetch or find in redux by id. hotel, find room by hotel id + room id or all rooms,we change fetch by content
  const rows = [
    {
      name: 'Hotel 1',
      rooms: [
        {
          id: '1',
          room: '1',
          dateStart: '12',
          dateEnd: '13',
          price: '100',
        },
        {
          id: '2',
          room: '13',
          dateStart: '16',
          dateEnd: '20',
          price: '100',
        },
      ],
    },
    {
      name: 'Hotel 2',
      rooms: [
        {
          id: '13',
          room: '3',
          dateStart: '1',
          dateEnd: '3',
          price: '50',
        },
        {
          id: '12',
          room: '51',
          dateStart: '2',
          dateEnd: '25',
          price: '100',
        },
      ],
    },
  ]; //example hotel and rooms

  //Object.entries(data).map(([hotel, rooms]) => console.log(hotel, rooms));

  return (
    <TableContainer component={Paper} style={{ marginTop: '50px' }}>
      <p className="title" style={{ padding: '0' }}>
        {content === 'hotelContent' ? 'Інформація про Готель' : 'Інформація про Польоти'}
      </p>

      <TableMu sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              {content === 'hotelContent' ? 'Готель' : 'Аеропорт '}
            </StyledTableCell>
            <StyledTableCell>
              {content === 'hotelContent' ? 'Кімнати' : 'Літак'}
            </StyledTableCell>
            <StyledTableCell>
              {content === 'hotelContent' ? 'Дата початку' : 'Куди'}
            </StyledTableCell>
            <StyledTableCell>
              {content === 'hotelContent' ? 'Дата кінця ' : 'Дата польоту'}
            </StyledTableCell>
            <StyledTableCell>Ціна</StyledTableCell>
            <StyledTableCell>Опції</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => {
            return row.rooms.map(el => (
              <StyledTableRow key={el.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>

                <StyledTableCell>{el.room}</StyledTableCell>
                <StyledTableCell>{el.dateStart}</StyledTableCell>
                <StyledTableCell>{el.dateEnd}</StyledTableCell>
                <StyledTableCell>{el.price}</StyledTableCell>

                <StyledTableCell style={{ width: '300px' }}>
                  <button
                    className="btn btn-outline-warning"
                    style={{ marginRight: '10px' }}
                  >
                    Редагувати
                  </button>
                  <button className="btn btn-outline-danger">Скасувати</button>
                </StyledTableCell>
              </StyledTableRow>
            ));
          })}
        </TableBody>
      </TableMu>
    </TableContainer>
  );
};

export default Table;

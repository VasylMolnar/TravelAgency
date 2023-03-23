import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const UserPage = () => {
  return (
    <main className="section userPage">
      <div className="container">
        <div className="user_content">
          <div className="user">
            <Avatar
              className="img"
              src={require('../img/team/Igor-desk2x.jpg')}
              alt="Remy Sharp"
              sx={{ width: 200, height: 200 }}
            />

            <p
              style={{
                marginTop: '30px',
                marginBottom: '30px',
              }}
            >
              Ігор Дем'яненко
            </p>
          </div>

          <div className="userEdit">
            <h1>edit</h1>
          </div>
        </div>

        <div className="hotel_content">{/* list of hotel */}</div>
        <div className="tickets_content">{/* list of tickets */}</div>

        <div className="gallery_content"></div>
      </div>
    </main>
  );
};

export default UserPage;

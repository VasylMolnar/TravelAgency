import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../features/user/userApiSlice';

const Card = ({ id }) => {
  const { username } = useSelector(state => selectUserById(state, id));

  return (
    <main className="section userPage">
      <div className="container">
        <div className="user_content">
          <div className="user">
            {/* <Avatar
              className="img"
              src={require('../img/team/Igor-desk2x.jpg')}
              alt="Remy Sharp"
              sx={{ width: 200, height: 200 }}
            /> */}

            <p
              style={{
                marginTop: '30px',
                marginBottom: '30px',
              }}
            >
              {username}
            </p>

            <input
              className="custom-file-input"
              type="file"
              style={{ marginBottom: '10px' }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Card;

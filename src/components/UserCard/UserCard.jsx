import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../features/user/userApiSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDeleteUserMutation } from '../../features/user/userApiSlice';
import { setIsLogIn } from '../../features/modal/authModalSlice';
import { Avatar, Card } from 'antd';
import { Loading, Report } from 'notiflix';
import { useDispatch } from 'react-redux';
import { FcApproval, FcExpired } from 'react-icons/fc';

const { Meta } = Card;

let UserCard = ({ id }) => {
  const dispatch = useDispatch();
  const { username, email, date } = useSelector(state => selectUserById(state, id));

  //Api fn
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    Loading.dots('Видалення користувача ... ');

    const confirmDelete = window.confirm('Підтвердити видалення.');

    if (confirmDelete) {
      await deleteUser({ id })
        .then(data => {
          Loading.remove();
          Report.success('Користувача було видалено', '');
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

  const currentYear = new Date().getFullYear().toString();
  const regDate = date.split('-')[0];

  return (
    <Card
      id="ant_card"
      style={{ width: '290px' }}
      cover={
        <img
          className="img"
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <AddCircleOutlineIcon key="setting" onClick={() => dispatch(setIsLogIn(true))} />,
        <DeleteForeverIcon key="ellipsis" onClick={() => handleDelete(id)} />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title={username}
        description={email}
      />
      <br />
      <p>
        {date} {currentYear === regDate ? <FcApproval /> : <FcExpired />}
      </p>
    </Card>
  );
};

UserCard = React.memo(UserCard);
export default UserCard;

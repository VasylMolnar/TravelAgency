import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../features/user/userApiSlice';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const UserCard = ({ id }) => {
  const { username, email, date } = useSelector(state => selectUserById(state, id));
  console.log(date);

  return (
    <main className="userCard">
      <Card
        style={{ width: 290 }}
        cover={
          <img
            className="img"
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
        className="userCard_card"
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={username}
          description={email}
        />
        <p>{date}</p>
      </Card>
    </main>
  );
};

export default UserCard;

///

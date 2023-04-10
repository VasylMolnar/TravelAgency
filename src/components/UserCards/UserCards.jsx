import React from 'react';
import Card from './Card';

const ListItem = ({ itemIDs }) => {
  return (
    <div className="userCards">
      {itemIDs.map(id => (
        <Card id={id} key={id} />
      ))}
    </div>
  );
};

export default ListItem;

import React from 'react';
import { useParams } from 'react-router-dom';

const Hotel = () => {
  const { id } = useParams();
  return <main className="section hotel">Hello hotel{id}</main>;
};

export default Hotel;

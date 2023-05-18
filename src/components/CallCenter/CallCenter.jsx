import React from 'react';
import CallCenterTable from '../UI/Table/CallCenterTable';

const CallCenter = () => {
  return (
    <section className="section call_center">
      <div className="container">
        <h1 className="title">Список</h1>
        <CallCenterTable />
      </div>
    </section>
  );
};

export default CallCenter;

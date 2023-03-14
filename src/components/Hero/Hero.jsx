import React from 'react';
import video from '../../img/vid-1.mp4';

const Hero = () => {
  return (
    <section className="hero">
      <div className="video-container">
        <video src={video} className="video" loop autoPlay muted></video>
      </div>
      <div className="content">
        <h3>Пригода варта того </h3>
        <p>Відкривайте нові місця разом з нами, пригоди чекають</p>
        <button
          className="btn"
          type="button"
          data-modal-open
          //onClick={toggleModal}
        >
          Замовити послугу
        </button>
      </div>
    </section>
  );
};

export default Hero;

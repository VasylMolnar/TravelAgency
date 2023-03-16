import { React, useState } from 'react';
import Hero from '../components/Hero/Hero';
import Team from '../components/Team/Team';
import Partners from '../components/Partners/Partners';
import Modal from '../components/Modal/Modal';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Hero setIsOpen={setIsOpen} />
      <Team />
      <Partners />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Home;

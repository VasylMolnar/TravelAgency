import { React, useState } from 'react';
import Hero from '../components/Hero/Hero';
import Team from '../components/Team/Team';
import Partners from '../components/Partners/Partners';
import Modal from '../components/Modal/Modal';
import Advantages from '../components/Advantages/Advantages';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Hero setIsOpen={setIsOpen} />
      <Advantages />
      <Team />
      <Partners />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Home;

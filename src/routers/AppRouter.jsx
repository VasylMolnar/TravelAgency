import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Missing from '../pages/Missing';
import Gallery from '../pages/Gallery';
import Hotels from '../pages/Hotels';
import Hotel from '../pages/Hotel';

const AppRouter = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path="hotels">
          <Route index element={<Hotels />} />
          <Route path=":id" element={<Hotel />} />
        </Route>

        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Missing from '../pages/Missing';

const AppRouter = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Home />} />

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

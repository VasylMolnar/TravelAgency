import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Missing from '../pages/Missing';
import Gallery from '../pages/Gallery';
import Hotels from '../pages/Hotels';
import Hotel from '../pages/Hotel';
import Rooms from '../pages/Rooms';
import Room from '../pages/Room';
import UserPage from '../pages/UserPage';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import allowedRoles from '../utils/roles_list.js';
import PersistLogin from '../components/PersistLogin/PersistLogin';

const AppRouter = () => {
  return (
    <Routes>
      <Route>
        {/* public routes */}
        <Route index element={<Home />} />

        <Route path="hotels">
          <Route index element={<Hotels />} />

          <Route path=":id">
            <Route index element={<Hotel />} />

            <Route path="rooms">
              <Route index element={<Rooms />} />
              <Route path=":id" element={<Room />} />
            </Route>
          </Route>
        </Route>

        <Route path="/gallery" element={<Gallery />} />

        {/* private routes */}
        {/* Persist Login */}
        <Route element={<PersistLogin />}>
          {/* User routes */}
          <Route element={<RequireAuth allowedRoles={[allowedRoles.User]} />}>
            <Route path="/userPage" element={<UserPage />} />
          </Route>

          {/* Admin routes */}
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

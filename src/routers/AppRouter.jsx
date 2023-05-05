import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Missing from '../pages/Missing';
import Gallery from '../pages/Gallery';
import Hotels from '../pages/Hotels/Hotels';
import HotelPage from '../pages/Hotels/HotelPage';
import Rooms from '../pages/Rooms/Rooms';
import RoomPage from '../pages/Rooms/RoomPage';
import UserPage from '../pages/Users/UserPage';
import UsersList from '../pages/Users/UsersList';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import allowedRoles from '../utils/roles_list.js';
import PersistLogin from '../components/PersistLogin/PersistLogin';
import HotelList from '../pages/Hotels/HotelList';
import RoomList from '../pages/Rooms/RoomList';
import { Flight } from '@mui/icons-material';
import FlightsPage from '../pages/Flights/FlightsPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route>
        {/* public routes */}
        <Route index element={<Home />} />

        <Route path="hotels">
          <Route index element={<Hotels />} />

          <Route path=":id">
            <Route index element={<HotelPage />} />

            <Route path="rooms">
              <Route index element={<Rooms />} />
              <Route path=":id" element={<RoomPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="flights">
          <Route index element={<Flight />} />

          <Route path=":id">
            <Route index element={<FlightsPage />} />
          </Route>
        </Route>

        <Route path="/gallery" element={<Gallery />} />

        {/* Persist Login */}
        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[allowedRoles.User]} />}>
            <Route path="userPage">
              {/* User routes */}
              <Route index element={<UserPage />} />

              {/* Admin routes */}
              <Route element={<RequireAuth allowedRoles={[allowedRoles.Admin]} />}>
                <Route path="hotelList">
                  <Route index element={<HotelList />} />
                  <Route path="roomList/:id" element={<RoomList />} />
                </Route>

                <Route path="userList">
                  <Route index element={<UsersList />} />
                  <Route path=":id" ex element={<UsersList />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

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
import Aircraft from '../pages/Aircraft/Aircraft';
import AircraftPage from '../pages/Aircraft/AircraftPage';
import Airlines from '../pages/Airlines/Airlines';
import AirlinesPage from '../pages/Airlines/AirlinesPage';
import AirlinesList from '../pages/Airlines/AirlinesList';
import AircraftList from '../pages/Aircraft/AircraftList';

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

        <Route path="airline">
          <Route index element={<Airlines />} />

          <Route path=":id">
            <Route index element={<AirlinesPage />} />

            <Route path="aircraft">
              <Route index element={<Aircraft />} />
              <Route path=":id" element={<AircraftPage />} />
            </Route>
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

                <Route path="airlineList">
                  <Route index element={<AirlinesList />} />
                  <Route path="airlineList/:id" ex element={<AircraftList />} />
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

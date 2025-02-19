import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Captainsignup from "./pages/Captain-signup";
import Captainlogin from "./pages/Captain-login";
import Usersignup from "./pages/User-signup";
import Userlogin from "./pages/User-login";
import UserHome from "./pages/UserHome";
import IsLoggedInUser from "./pages/IsLoggedInUser";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import IsLoggedInCaptain from "./pages/IsLoggedInCaptain";
import CaptainLogout from "./pages/CaptainLogout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/user-signup" element={<Usersignup />} />
        <Route path="/user-login" element={<Userlogin />} />
        <Route
          path="/user/home"
          element={
            <IsLoggedInUser>
              <UserHome />
            </IsLoggedInUser>
          }
        />
        <Route
          path="/user/logout"
          element={
            <IsLoggedInUser>
              <UserLogout />
            </IsLoggedInUser>
          }
        />
        <Route path="/captain-signup" element={<Captainsignup />} />
        <Route path="/captain-login" element={<Captainlogin/>} />
        <Route
          path="/captain/home"
          element={
            <IsLoggedInCaptain>
              <CaptainHome />
            </IsLoggedInCaptain>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <IsLoggedInCaptain>
              <CaptainLogout />
            </IsLoggedInCaptain>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

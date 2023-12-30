import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "./store/slices/auth/authSlice";
import AddEmail from "./pages/auth/AddEmail";
import AddOTP from "./pages/auth/AddOTP";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifayEmail from "./pages/auth/verifayEmail";
import VerifayEmailAlert from "./components/alerts/muiAlerts/VerifayEmailAlert";
import Navbar from "./components/navbar/Navbar";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((data) => data.auth);
  //useeffect to check if user is logged in and get data from local storage
  //and store it in redux state
  useEffect(() => {
    const userStoredData = localStorage.getItem("user");
    if (userStoredData) {
      dispatch(setLogin(JSON.parse(userStoredData)));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {user.email_active === "No" ? <VerifayEmailAlert /> : ""}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword-addemail" element={<AddEmail />} />
        <Route path="/forgotPassword-addotp" element={<AddOTP />} />
        <Route
          path="/forgotPassword-resetPassword/:otp"
          element={<ResetPassword />}
        />
        <Route path="/verifayEmail" element={<VerifayEmail />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;

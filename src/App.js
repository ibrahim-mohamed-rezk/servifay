import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import NavBar from "./components/navbar/NavBar";
import { useDispatch } from "react-redux";
import { setLogin } from "./store/slices/auth/authSlice";
import AddEmail from "./pages/auth/AddEmail";
import AddOTP from "./pages/auth/AddOTP";
import ResetPassword from "./pages/auth/ResetPassword";




const App = () => {
  const dispatch = useDispatch();
  //useeffect to check if user is logged in and get data from local storage
  //and store it in redux state
  useEffect(() => {
    const userStoredData = localStorage.getItem('user');
    if(userStoredData){
      dispatch(setLogin(JSON.parse(userStoredData)))
    }
  }, [dispatch]);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword-addemail" element={<AddEmail />} />
        <Route path="/forgotPassword-addotp" element={<AddOTP />} />
        <Route path="/forgotPassword-resetPassword/:otp" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;

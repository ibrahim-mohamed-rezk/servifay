import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import AddService from "./components/Add Service/AddService.jsx";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "./store/slices/auth/authSlice";
import AddEmail from "./pages/auth/AddEmail";
import AddOTP from "./pages/auth/AddOTP";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifayEmail from "./pages/auth/verifayEmail";
import VerifayEmailAlert from "./components/alerts/muiAlerts/VerifayEmailAlert";
import Navbar from "./components/navbar/NavBar.jsx";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/footer/Footer";
import Services from "./pages/services/Services";
import Booking from "./pages/booking/Booking";
import BookNow from "./components/Actions/BookNow.jsx";
import Rating from "./components/Actions/Rating.jsx";
import CancelOrder from "./components/Actions/CancelOrder.jsx";
import Chat from "./pages/chat/Chat.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIntl } from "react-intl";
import echo from "./echo";
const App = ({ changeLanguage }) => {
  const dispatch = useDispatch();
  const user = useSelector((data) => data.auth);
  const location = useLocation();
  const { locale } = useIntl();
  const shouldShowFooter = ![
    "/login",
    "/register",
    "/forgotPassword-addemail",
    "/forgotPassword-addOTP",
    "/forgotPassword-resetPassword",
  ].includes(location.pathname);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const channel = echo.channel("Servifay");
    channel.listen("ExampleEvent", (event) => {
      setMessage(event.data);
    });

    return () => {
      echo.leaveChannel("Servifay");
    };
  }, []);

  console.log(message);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const userStoredData = localStorage.getItem("user");
    if (userStoredData) {
      dispatch(setLogin(JSON.parse(userStoredData)));
    }
  }, [dispatch]);

  useEffect(() => {
    const loadLocaleCSS = async () => {
      switch (locale) {
        case "en":
          await import("./styles-en.css");
          break;
        case "ar":
          await import("./styles-ar.css");
          break;
        case "eg":
          await import("./styles-ar.css");
          break;
        default:
          await import("./styles-en.css");
          break;
      }
    };

    loadLocaleCSS();
  }, [locale]);

  return (
    <>
      <Navbar changeLanguage={changeLanguage} />
      {user.email_active === "No" ? <VerifayEmailAlert /> : ""}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword-addemail" element={<AddEmail />} />
        <Route path="/forgotPassword-addOTP" element={<AddOTP />} />
        <Route
          path="/forgotPassword-resetPassword/:otp"
          element={<ResetPassword />}
        />
        <Route path="/verifayEmail" element={<VerifayEmail />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Profile/:userId" element={<Profile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking/:pageName/:userID" element={<Booking />} />
        <Route path="/booking/:pageName" element={<Booking />} />
        <Route path="/BookNow/:userID" element={<BookNow />} />
        <Route path="/Rating/:userID" element={<Rating />} />
        <Route path="/CancelOrder/:orderID" element={<CancelOrder />} />
        <Route path="/CancelOrder" element={<CancelOrder />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AddService" element={<AddService />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:chatId" element={<Chat />} />
      </Routes>
      <ToastContainer />
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default App;

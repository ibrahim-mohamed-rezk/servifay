import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/auth/authSlice";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import FormInput from "../../styled-components/inputs/FormInput";
import backendURL from "../../axios/backend";
import handleGoogleSignIn from "../../firebase/loginWithGoogle";
import handleFacebookSignIn from "../../firebase/loginWithFacebook";

const Login = () => {
  const [fromData, setFromData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelSubmit = (event) => {
    event.preventDefault();
    backendURL
      .post("/login", fromData)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data.data, isLoggedIn: true })
        );
        dispatch(setLogin(res.data.data));
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const googleLogin = () => {
    handleGoogleSignIn()
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data.data, isLoggedIn: true })
        );
        dispatch(setLogin(res.data.data));
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  const facebookLogin = () => {
    handleFacebookSignIn()
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data.data, isLoggedIn: true })
        );
        dispatch(setLogin(res.data.data));
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  return (
    <>
      <div className={`container flex-col-c`}>
        <div className={styles.loginMobileLogo}>logo</div>
        <div className={styles.loginMobileWelcomeText}>
          <h2>Welcom back!!!</h2>
          <p>Welcome back , Do you have account?</p>
        </div>
        <h2 className={styles.brawserWelcomeText}>LOGIN</h2>
        <div className={styles.loginMobileForm}>
          <form>
            <FormInput
              placeholder="Email"
              type="text"
              onChange={(event) => {
                setFromData((prev) => ({ ...prev, email: event.target.value }));
              }}
            />
            <FormInput
              placeholder="Password"
              type="password"
              onChange={(event) => {
                setFromData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }));
              }}
            />
            <Link
              className={`${styles.mobileForgetPassword} ml-50`}
              to={"/forgotPassword-addemail"}
            >
              Forgot password?
            </Link>
            <OrangeButton type="submit" onClick={handelSubmit}>
              LOGIN
            </OrangeButton>
          </form>
        </div>
        <div className={styles.loginMobileGoToRejester}>
          Don't have an account?{" "}
          <Link
            style={{
              color: "#ff9300",
              textDecoration: "none",
              display: "inline",
            }}
            to={"/register"}
          >
            Sign up
          </Link>
        </div>
        <div className={styles.authWith}>
          <div className={styles.authWithChiled} onClick={googleLogin}>
            <GoogleIcon></GoogleIcon>
            <div className={styles.authWithChiledText}>Login With Google</div>
          </div>
          <div className={styles.authWithChiled} onClick={facebookLogin}>
            <FacebookIcon></FacebookIcon>
            <div className={styles.authWithChiledText}>Login With Facebook</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

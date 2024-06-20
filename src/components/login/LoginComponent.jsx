import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/auth/authSlice";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import backendURL from "../../axios/backend";
import handleGoogleSignIn from "../../firebase/loginWithGoogle";
// import handleFacebookSignIn from "../../firebase/loginWithFacebook";
import LoginIllustration from "../../assets/svg/LoginIllustration";
import GoogleLogniBtn from "../../assets/svg/GoogleLogniBtn";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

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
        toast.success("User Logged In Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.message || err.response.data.msg || "Error"
        );
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
        toast.success("User Logged In Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message || "Error ");
        toast.error("Error occurred! Please try again.");
      });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
        <h1 className="mt-30">servifay</h1>
        <LoginIllustration />
        <h2>
          <FormattedMessage id="loginHeroDesc" />
        </h2>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.loginMobileLogo}>Seervifay</div>
        <h2 className={styles.brawserWelcomeText}>
          <FormattedMessage id="welcomeBack" />
        </h2>
        <div className={styles.authWith}>
          <div className={styles.authWithChiled} onClick={googleLogin}>
            <GoogleLogniBtn />
          </div>
          {/* <div className={styles.authWithChiled} onClick={facebookLogin}>
            <GoogleLogniBtn />
          </div> */}
        </div>
        <div className={styles.loginForm}>
          <form>
            <div className={styles.inputGroup}>
              <label>
                <FormattedMessage id="email" />
              </label>
              <input
                type="text"
                onChange={(event) => {
                  setFromData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>
                <FormattedMessage id="password" />
              </label>
              <input
                type="password"
                onChange={(event) => {
                  setFromData((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                }}
              />
            </div>

            <Link
              className={styles.ForgetPassword}
              to={"/forgotPassword-addemail"}
            >
              <FormattedMessage id="forgetPassword" />
            </Link>
            <OrangeButton
              $w="50%"
              $m="0 auto 1.5em auto"
              type="submit"
              onClick={handelSubmit}
            >
              <FormattedMessage id="login" />
            </OrangeButton>
          </form>
        </div>
        <div className={styles.loginMobileGoToRejester}>
          <FormattedMessage id="doNotHaveAccount" />
          <Link
            style={{
              color: "#ff9300",
              textDecoration: "none",
              display: "inline",
            }}
            to={"/register"}
          >
            <FormattedMessage id="signup" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

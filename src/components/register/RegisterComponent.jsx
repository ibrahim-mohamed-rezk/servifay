import { Link, useNavigate } from "react-router-dom";
import styles from "../login/login.module.css";
import { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import FormInput from "../../styled-components/inputs/FormInput";
import backendURL from "../../axios/backend";

const Rejester = () => {
  const [fromData, setFromData] = useState({});
  const navigate = useNavigate();

  const handelSubmit = (event) => {
    event.preventDefault();
    backendURL
      .post("/register", fromData)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={`container flex-col-c` }>
        <div className={styles.loginMobileLogo}>logo</div>
        <div className={styles.loginMobileWelcomeText}>
          <h2>Register new accout</h2>
        </div>
        <h2 className={styles.brawserWelcomeText}>SIGN UP</h2>
        <div className={styles.loginMobileForm}>
          <form>
            <FormInput
              placeholder="Username"
              type="text"
              onChange={(event) => {
                setFromData((prev) => ({ ...prev, name: event.target.value }));
              }}
            />
            <FormInput
              placeholder="Email"
              type="email"
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
            <FormInput
              placeholder="Phone Number"
              type="number"
              onChange={(event) => {
                setFromData((prev) => ({ ...prev, phone: event.target.value }));
              }}
            />
            <OrangeButton onClick={handelSubmit} type="submit">
              Register
            </OrangeButton>
          </form>
        </div>
        <div className={styles.loginMobileGoToRejester}>
          Already have an account?
          <Link
            style={{ color: "#ff9300", textDecoration: "none" }}
            to={"/login"}
          >
            Login
          </Link>
        </div>
        <div className={styles.authWith}>
          <div className={styles.authWithChiled}>
            <GoogleIcon></GoogleIcon>
            <div className={styles.authWithChiledText}>Login With Google</div>
          </div>
          <div className={styles.authWithChiled}>
            <FacebookIcon></FacebookIcon>
            <div className={styles.authWithChiledText}>Login With Facebook</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rejester;

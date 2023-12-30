import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import FormInput from "../../styled-components/inputs/FormInput";
import styles from "./auth.module.css";
import backendURL from "../../axios/backend";

const ResetPassword = () => {
  const navigate = useNavigate();
  const user = useSelector((data) => data.auth);
  const [pass, setPass] = useState({});
  const location = useLocation();

  //redirect user to home page if it's logged in
  useEffect(() => {
    if (user.isloggedin === true && user.token !== "") {
      navigate("/");
    }
  }, [navigate, user.isloggedin, user.token]);

  const handelSubmit = (e) => {
    e.preventDefault();
    backendURL
      .post(`/reset/${location.pathname.split("/")[2]}`, pass)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={`container flex-col-c mt-100`}>
        <div className={`${styles.forgetPassChilds} flex-col-c`}>
          <h2>RESET PASSWORD</h2>
          <p>Enter The New Password</p>
        </div>
        <div className={`flex-col-c ${styles.forgetPassChilds}`}>
          <form className={`mt-50 flex-col-c`}>
            <FormInput
              placeholder="New Password"
              type="email"
              onChange={(event) => {
                setPass((prev) => ({ ...prev, password: event.target.value }));
              }}
            />
            <FormInput
              placeholder="Confirmation New Password"
              type="email"
              onChange={(event) => {
                setPass((prev) => ({
                  ...prev,
                  password_confirmation: event.target.value,
                }));
              }}
            />
            <OrangeButton type="submit" onClick={handelSubmit}>
              CONFIRM
            </OrangeButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

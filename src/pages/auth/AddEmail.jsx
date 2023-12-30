import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import FormInput from "../../styled-components/inputs/FormInput";
import backendURL from "../../axios/backend";

const AddEmail = () => {
  const navigate = useNavigate();
  const user = useSelector((data) => data.auth);
  const [email, setEmail] = useState("");

  //redirect user to home page if it's logged in
  useEffect(() => {
    if (user.isloggedin === true && user.token !== "") {
      navigate("/");
    }
  }, [navigate, user.isloggedin, user.token]);

  const handelSubmit = (e) => {
    e.preventDefault();
    backendURL
      .post("/forget", { email })
      .then(() => {
        navigate("/forgotPassword-addotp");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={`container flex-col-c mt-100`}>
        <div className={`${styles.forgetPassChilds} flex-col-c`}>
          <h2>FORGET PASSWORD</h2>
          <p>A Verificatio Code Will Be Send To Your Email</p>
        </div>
        <div className={`flex-col-c ${styles.forgetPassChilds}`}>
          <form className={`flex-col-c mt-50`}>
            <FormInput
              placeholder="Email"
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <OrangeButton type="submit" onClick={handelSubmit}>
              SEND
            </OrangeButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmail;

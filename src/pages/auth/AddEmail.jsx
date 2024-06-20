import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import FormInput from "../../styled-components/inputs/FormInput";
import backendURL from "../../axios/backend";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";

const AddEmail = () => {
  const navigate = useNavigate();
  const user = useSelector((data) => data.auth);
  const [email, setEmail] = useState("");
  const intl = useIntl();

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
        toast.success("Email sent successfully");
        navigate("/forgotPassword-addotp");
      })
      .catch((err) => {
        toast.error(
          err.response.data.msg[0] || err.response.data.message || "Error"
        );
      });
  };

  return (
    <>
      <div className={`container flex-col-c mt-100`}>
        <div className={`${styles.forgetPassChilds} flex-col-c`}>
          <h2>
            <FormattedMessage id="forgetPassword" />
          </h2>
          <p>
            <FormattedMessage id="enterYourEmailBelow" />
          </p>
        </div>
        <div className={`flex-col-c ${styles.forgetPassChilds}`}>
          <form className={`flex-col-c mt-50`}>
            <FormInput
              placeholder={intl.formatMessage({ id: "email" })}
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <OrangeButton
              disabled={email === ""}
              type="submit"
              onClick={handelSubmit}
            >
              <FormattedMessage id="send" />
            </OrangeButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmail;

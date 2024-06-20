import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import FormInput from "../../styled-components/inputs/FormInput";
import styles from "./auth.module.css";
import backendURL from "../../axios/backend";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";

const ResetPassword = () => {
  const navigate = useNavigate();
  const user = useSelector((data) => data.auth);
  const [pass, setPass] = useState({});
  const location = useLocation();
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
      .post(`/reset/${location.pathname.split("/")[2]}`, pass)
      .then(() => {
        toast.success("Password reset successfully");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(
          err.response.data.message || err.response.data.msg[0] || "Error"
        );
        console.log(err);
      });
  };

  return (
    <>
      <div className={`container flex-col-c mt-100`}>
        <div className={`${styles.forgetPassChilds} flex-col-c`}>
          <h2>
            <FormattedMessage id="resetPassword" />
          </h2>
          <p>
            <FormattedMessage id="enterTheNewPassword" />
          </p>
        </div>
        <div className={`flex-col-c ${styles.forgetPassChilds}`}>
          <form className={`mt-50 flex-col-c`}>
            <FormInput
              placeholder={intl.formatMessage({ id: "newPassword" })}
              type="text"
              onChange={(event) => {
                setPass((prev) => ({ ...prev, password: event.target.value }));
              }}
            />
            <FormInput
              placeholder={intl.formatMessage({ id: "confirmNewPassword" })}
              type="text"
              onChange={(event) => {
                setPass((prev) => ({
                  ...prev,
                  password_confirmation: event.target.value,
                }));
              }}
            />
            <OrangeButton type="submit" onClick={handelSubmit}>
              <FormattedMessage id="confirm" />
            </OrangeButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import FormInput from "../../styled-components/inputs/FormInput";
import styles from "./auth.module.css";
import CountdownTimer from "../../components/countdownTimer/CountdownTimer";
import backendURL from "../../axios/backend";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const AddOTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errms, setErrMs] = useState("");
  const navigate = useNavigate();
  const user = useSelector((data) => data.auth);

  //redirect user to home page if it's logged in
  useEffect(() => {
    if (user.isloggedin === true && user.token !== "") {
      navigate("/");
    }
  }, [navigate, user.isloggedin, user.token]);

  const handleChange = (index, value) => {
    if (/^\d+$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus the previous input field if a digit is deleted
      if (value === "" && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }

      // Focus the next input field if a digit is entered
      if (value !== "" && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    backendURL
      .post(`/otp/${otp.join("")}`)
      .then((res) => {
        if (res.data.status === false) {
          toast.error("code is not correct");
          setErrMs("OTP is not correct");
        } else {
          toast.success("Success");
          navigate(`/forgotPassword-resetPassword/${otp.join("")}`);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error");
      });
  };

  return (
    <div className={`container flex-col-c mt-100`}>
      <div className={`${styles.forgetPassChilds} flex-col-c`}>
        <h2>
          <FormattedMessage id="forgetPassword" />
        </h2>
        <p>
          <FormattedMessage id="enterFourDigitCode" />
        </p>
      </div>
      <p>{errms}</p>
      <div className={`flex-col-c ${styles.forgetPassChilds}`}>
        <form className={`mt-50 flex-col-c ${styles.otpForm}`}>
          <div className={`${styles.otpInputs} flex`}>
            {otp.map((digit, index) => (
              <FormInput
                $w="50px"
                $b="2px solid #ece9f7"
                $bgc="#fff"
                $br="10px"
                required
                key={index}
                type="text"
                id={`otp-input-${index}`}
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className={`${styles.forgetPassChilds} flex-col-c`}>
            <p>
              <FormattedMessage id="theVerifyCodeWillExpireIn" />
              <CountdownTimer initialTime={120} />
            </p>
            <p style={{ color: "#0055A5", cursor: "pointer" }}>
              <FormattedMessage id="resendCode" />
            </p>
          </div>

          <OrangeButton
            disabled={otp.join("").length !== 4}
            type="submit"
            onClick={handelSubmit}
          >
            <FormattedMessage id="confirm" />
          </OrangeButton>
        </form>
      </div>
    </div>
  );
};

export default AddOTP;

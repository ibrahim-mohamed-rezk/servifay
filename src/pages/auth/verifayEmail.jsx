import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import FormInput from "../../styled-components/inputs/FormInput";
import styles from "./auth.module.css";
import CountdownTimer from "../../components/countdownTimer/CountdownTimer";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../store/slices/auth/authSlice";
import backendURL from "../../axios/backend";

const VerifayEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errms, setErrMs] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((data) => data.auth);

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
      .post(`/verify-email/${otp.join("")}`)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, email_active: "Yes" })
        );
        dispatch(setLogin({ ...user, email_active: "Yes" }));
        res.data.status === false
          ? setErrMs("verifcation code is not correct")
          : navigate(`/`);
      })
      .catch(() => {
        setErrMs("verifcation code is not correct");
      });
  };

  return (
    <div className={`container flex-col-c mt-100`}>
      <div className={`${styles.forgetPassChilds} flex-col-c`}>
        <h2>Verify Email</h2>
        <p>Enter The 4-digits Code</p>
      </div>
      <p style={{ color: "red" }}>{errms}</p>
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
              The verify code will be expire in
              <CountdownTimer initialTime={120} />
            </p>
            <p style={{ color: "#0055A5", cursor: "pointer" }}>Resend code</p>
          </div>

          <OrangeButton
            disabled={otp.join("").length !== 4}
            type="submit"
            onClick={handelSubmit}
          >
            CONFIRM
          </OrangeButton>
        </form>
      </div>
    </div>
  );
};

export default VerifayEmail;

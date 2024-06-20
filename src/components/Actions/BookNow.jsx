import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import styles from "./BookNow.module.css";
import bookingCard from "../../assets/images/booking/bookingCard.png";
import { useNavigate, useParams } from "react-router-dom";
import backendURL from "../../axios/backend";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LocationNoFill from "../../assets/svg/LocationNoFill";
import { FormattedMessage, useIntl } from "react-intl";

function BookNow() {
  const user = useSelector((state) => state.auth);
  const params = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const intl = useIntl();
  const [inputs, setInputs] = useState({
    booking_date: "",
    booking_time: "",
    price: "",
    description: "",
    user_id: user.id,
    specialist_id: params.userID,
  });

  useEffect(() => {
    backendURL
      .get(`/specialist/${params.userID}`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        setUserInfo(res.data?.data);
      })
      .catch((err) => {
        // toast.error(err.response.data.message || "error");
        // toast.error("Error occurred! Please try again.");
        console.log(err.message);
      });
  }, [params.userID, user.token]);

  const handelChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      user_id: user.id,
    }));
  };

  const handelSubmit = () => {
    backendURL
      .post("/bookings", inputs, {
        headers: { Authorization: user.token },
      })
      .then(() => {
        toast.success("Booking created successfully");
        navigate(`/booking/watting/${user.id}`);
      })
      .catch((err) => {
        toast.error("Error occurred! Please try again. ");
        toast.error(err.message || "error");
      });
  };

  return (
    <div className={styles.BookNowContainer}>
      <div className={styles.BookNowTopDiv}>
        <div>
          <img
            src={userInfo.specialist_info?.image || bookingCard}
            alt="Booking Now"
            className={styles.BookingNowImg}
          />
        </div>
        <div>
          <h3 className="fw-bolder">{userInfo.specialist_info?.name}</h3>
          <h3 className="fw-bolder text-secondary ">
            {userInfo?.service_name}
          </h3>
          <h5
            style={{ display: "flex", alignItems: "center" }}
            className=" text-secondary "
          >
            <LocationNoFill />
            {userInfo.specialist_info?.location.governorate}/
            {userInfo.specialist_info?.location.country}
          </h5>
        </div>
      </div>
      <hr className={styles.line} />
      <div sm={1} md={1} lg={2} className={`g-4 mt-3 ${styles.BookNowBDiv}`}>
        <div className={`${styles.FirstDiv}`}>
          {/* <Col> */}
          <form action="" className={`${styles.form}`}>
            <label className=" fw-bolder fs-3">
              <FormattedMessage id="requiredTasks" />
            </label>
            <textarea
              name="description"
              placeholder={intl.formatMessage({ id: "writeHere" })}
              cols={50}
              rows={15}
              className={`mt-2 ${styles.textarea}`}
              onChange={handelChange}
            ></textarea>
          </form>
        </div>

        <div className={`${styles.SecondDiv}`}>
          <h4 className={` text-secondary ${styles.Head}`}>
            <FormattedMessage id="bookAppointment" />
          </h4>

          <form className={`${styles.formTwo}`}>
            <div className=" d-flex flex-column ">
              <label className="mb-3 mt-3 fs-3 fw-bolder ">
                <FormattedMessage id="day" />
              </label>
              <input name="booking_date" type="date" onChange={handelChange} />
            </div>

            <div className=" d-flex flex-column ">
              <label className="mb-3 mt-3 fs-3 fw-bolder ">
                <FormattedMessage id="time" />
              </label>
              <input name="booking_time" type="time" onChange={handelChange} />
            </div>

            <div className=" d-flex flex-column ">
              <label className="mb-3 mt-3 fs-3 fw-bolder ">
                <FormattedMessage id="price" />
              </label>
              <input
                name="price"
                type="number"
                placeholder="price"
                onChange={handelChange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className={`mt-5 ${styles.BTN}`}>
        <OrangeButton $w="200px" onClick={handelSubmit}>
          <FormattedMessage id="bookNow" />
        </OrangeButton>
      </div>
    </div>
  );
}

export default BookNow;

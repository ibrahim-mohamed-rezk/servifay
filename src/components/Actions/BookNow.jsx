import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import styles from "./BookNow.module.css";
import bookingCard from "../../assets/images/booking/bookingCard.png";
import { useNavigate, useParams } from "react-router-dom";
import backendURL from "../../axios/backend";
import { useSelector } from "react-redux";
function BookNow() {
  const user = useSelector((state) => state.auth);
  const params = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    booking_date: "",
    booking_time: "",
    price: "",
    description: "",
    user_id: user.id,
    specialist_id: params.userID,
  });

  const handelChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      user_id: user.id,
    }));
  };

  console.log(inputs);

  const handelSubmit = () => {
    backendURL
      .post("/bookings", inputs, {
        headers: { Authorization: user.token },
      })
      .then(() => {
        navigate(`/booking/watting/${user.id}`);
      });
  };

  return (
    <div className={styles.BookNowContainer}>
      <div className={styles.BookNowTopDiv}>
        <div>
          <img
            src={bookingCard}
            alt="Booking Now"
            className={styles.BookingNowImg}
          />
        </div>
        <div>
          <h3 className="fw-bolder">Ahmed Mohamed</h3>
          <h3 className="fw-bolder text-secondary ">Carpenter</h3>
          <h5 className=" text-secondary ">
            <img alt="ll" src="" />
            Damietta/Egypt
          </h5>
        </div>
      </div>
      <hr className={styles.line} />
      <div sm={1} md={1} lg={2} className={`g-4 mt-3 ${styles.BookNowBDiv}`}>
        <div className={`${styles.FirstDiv}`}>
          {/* <Col> */}
          <form action="" className={`${styles.form}`}>
            <label className=" fw-bolder fs-3">Required Tasks</label>
            <textarea
              name="description"
              placeholder="Write Here..."
              cols={50}
              rows={15}
              className={`mt-2 ${styles.textarea}`}
              onChange={handelChange}
            ></textarea>
          </form>
          {/* </Col> */}
        </div>

        <div className={`${styles.SecondDiv}`}>
          {/* <Col> */}
          <h4 className={` text-secondary ${styles.Head}`}>BOOK APPOINTMENT</h4>

          <form className={`${styles.formTwo}`}>
            <div className=" d-flex flex-column ">
              <label className="mb-3 mt-3 fs-3 fw-bolder ">Day</label>
              <input name="booking_date" type="date" onChange={handelChange} />
            </div>

            <div className=" d-flex flex-column ">
              <label className="mb-3 mt-3 fs-3 fw-bolder ">Time</label>
              <input name="booking_time" type="time" onChange={handelChange} />
            </div>

            <div className=" d-flex flex-column ">
              <label className="mb-3 mt-3 fs-3 fw-bolder ">Price</label>
              <input
                name="price"
                type="text"
                placeholder="price"
                onChange={handelChange}
              />
            </div>
          </form>
          {/* </Col> */}
        </div>
      </div>
      <div className={`mt-5 ${styles.BTN}`}>
        <OrangeButton onClick={handelSubmit}>Book Now</OrangeButton>
      </div>
    </div>
  );
}

export default BookNow;

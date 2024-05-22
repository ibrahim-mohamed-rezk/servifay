import React, { useEffect, useState } from "react";
import styles from "./BookNow.module.css";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import ReactStars from "react-rating-stars-component";
import imageCard from "../../assets/images/services/serviceImage.png";
import backendURL from "../../axios/backend";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
function Rating() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const user = useSelector((state) => state.auth);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const getRatingText = () => {
    if (rating === 0) {
      return "";
    } else if (rating <= 2) {
      return "Bad";
    } else if (rating <= 3) {
      return "Good";
    } else {
      return "Excellent";
    }
  };
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setUserId(location.pathname.split("/")[2]);
  }, [location]);

  const handelSubmit = () => {
    backendURL
      .post(
        `/specialist/${userId}/rating`,
        { rating: rating, review: review },
        {
          headers: {
            Authorization: user.token,
          },
        }
      )
      .then(() => {
        navigate(`/profile/${userId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={`container mt-3 ${styles.RatingContainer}`}>
      <div className={`${styles.ServiceDetail}`}>
        <div className="d-flex justify-content-center mt-3 ">
          <img
            src={imageCard}
            alt="service image"
            className={`${styles.serviceImg}`}
          />{" "}
        </div>
        <h5 className="mt-3 fw-bolder text-center ">Home maintenance work</h5>
        <p className="text-secondary fw-bolder  text-center ">2 hr</p>
      </div>
      <div className="d-flex flex-column align-items-center ">
        <h4 className="text-center fw-bolder mt-5">
          How would you rate the experience <br /> and service?
        </h4>
        <ReactStars
          count={5}
          size={24}
          isHalf={true}
          value={rating}
          onChange={handleRatingChange}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        <p className={`text-center fw-bolder  ${styles.StarsNum}`}>
          {rating} - Stars {getRatingText()}
        </p>
      </div>
      <div className={`${styles.WriteFeedback}`}>
        <textarea
          cols={100}
          rows={10}
          placeholder="Add Your Feedback"
          className={`${styles.textarea}`}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></textarea>
      </div>
      <div className={`mt-5 ms-4 ${styles.BTN1}`}>
        <OrangeButton onClick={() => handelSubmit()}>
          Submit Feedback
        </OrangeButton>
      </div>
    </div>
  );
}

export default Rating;

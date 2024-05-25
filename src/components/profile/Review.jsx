import React from "react";
import styles from "./review.module.css";
import ReactStars from "react-stars";
import img from "../../assets/images/hema.jpeg";

const Review = ({ review }) => {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.title}>
        <div className={styles.cardUserName}>
          <div className={styles.cardUserImage}>
            <img src={img} alt="userImage" />
          </div>
          <span
          // onClick={() => {
          //   navigate(`/Profile/${id}`);
          // }}
          >
            {review?.userReviewd}
          </span>
        </div>
        <div className={styles.stars}>
          <div>
            <ReactStars
              count={5}
              size={20}
              isHalf={true}
              value={review?.rating}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              edit={false}
            />
          </div>
          <div>{review?.created_at}</div>
        </div>
      </div>
      <div className={styles.description}>
        <p>{review?.review}</p>
      </div>
    </div>
  );
};

export default Review;

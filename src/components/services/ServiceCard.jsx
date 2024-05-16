import React from "react";
import styles from "./servicesCard.module.css";
import imageCard from "../../assets/images/services/serviceImage.png";
import userImage from "../../assets/images/services/userImg.png";
import LocationNoFill from "../../assets/svg/LocationNoFill";
import Chat from "../../assets/svg/Chat";
import Star from "../../assets/svg/Star";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({
  service_name,
  id,
  name,
  description,
  image,
  rating,
  location,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.ServicesCardImage}>
          <img src={imageCard} alt="imageCard" />
        </div>
        <div className={styles.servicesCardInfo}>
          <div className={styles.servicesCardRating}>
            <div className={styles.rate}>
              <Star />
              <span>{rating}</span>
            </div>
            <div className={styles.discount}>
              <span>Discount 10%</span>
            </div>
          </div>
          <div className={styles.cardUserName}>
            <div className={styles.cardUserImage}>
              <img
                src={image === "Not Found" ? userImage : image}
                alt="userImage"
              />
            </div>
            <span
              onClick={() => {
                navigate(`/Profile/${id}`);
              }}
            >
              {name}
            </span>
          </div>
          <h4 className={styles.cardCategory}>{service_name}</h4>
          <p className={styles.cardDescribtion}>{description}</p>
          <div className={styles.locationAndChat}>
            <div className={styles.cardLocation}>
              <LocationNoFill />
              <span>
                {location.governorate}/{location.country}
              </span>
            </div>
            <div className={styles.cardChat}>
              <Chat />
            </div>
          </div>
          <button className={styles.cardBTN}>Book now</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

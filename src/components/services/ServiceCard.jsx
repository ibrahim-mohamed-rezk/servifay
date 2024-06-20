import React from "react";
import styles from "./servicesCard.module.css";
import imageCard from "../../assets/images/services/serviceImage.png";
import userImage from "../../assets/images/services/userImg.png";
import LocationNoFill from "../../assets/svg/LocationNoFill";
import Chat from "../../assets/svg/Chat";
import Star from "../../assets/svg/Star";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToChatHistory } from "../../firebase/chat";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

const ServiceCard = ({
  service_name,
  id,
  specialist_id,
  name,
  description,
  image,
  rating,
  location,
}) => {
  const user = useSelector((state) => state.auth);
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
                if (!user.isloggedin) {
                  toast.warning("Please Login to Continue");
                  return;
                }
                if (user.email_active === "No") {
                  toast.warning("Please Active your Email");
                  return;
                }
                navigate(`/Profile/${specialist_id}`);
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
            <div
              onClick={() => {
                if (!user.isloggedin) {
                  toast.warning("Please Login to Continue");
                  return;
                }
                if (user.email_active === "No") {
                  toast.warning("Please Active your Email");
                  return;
                }
                const chatId = [id, user.id].sort((a, b) => a - b).join("_");
                addToChatHistory(user.id, chatId, id);
                navigate(`/chat/${chatId}`);
              }}
              className={styles.cardChat}
            >
              <Chat />
            </div>
          </div>
          <button
            className={styles.cardBTN}
            onClick={() => {
              if (!user.isloggedin) {
                toast.warning("Please Login to Continue");
                return;
              }
              if (user.email_active === "No") {
                toast.warning("Please Active your Email");
                return;
              }
              navigate(`/BookNow/${specialist_id}`);
            }}
          >
            <FormattedMessage id="bookNow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

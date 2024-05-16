import Star from "../../assets/svg/Star";
import LocationNoFill from "../../assets/svg/LocationNoFill";
import styles from "./bookingCard.module.css";

const BookingCard = ({
  date,
  image,
  name,
  location,
  rate,
  leftBtn,
  rightBtn,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.date}>{date}</div>
      <div className={styles.line}></div>
      <div className={styles.cardInfo}>
        <div className={styles.cardImg}>
          <img src={image} alt={name} />
        </div>
        <div className={styles.info}>
          <span>{name}</span>

          <div className={styles.cardLocation}>
            <LocationNoFill />
            <span>{location}</span>
          </div>
          <div className={styles.rate}>
            <span>{rate}</span>
            <Star />
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.cardBtns}>
        <button className={styles.leftBtn}>{leftBtn}</button>
        <button className={styles.rightBtn}>{rightBtn}</button>
      </div>
    </div>
  );
};

export default BookingCard;
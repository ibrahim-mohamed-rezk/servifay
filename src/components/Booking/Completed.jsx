import styles from "./styles.module.css";
import BookingCard from "./BookingCard";
import bookingCard from "../../assets/images/booking/bookingCard.png";

const Completed = () => {
  return (
    <div className={styles.cardsContainer}>
      <BookingCard
        date="10 am - March 13, 2024"
        image={bookingCard}
        name="ibrahim mohamed"
        location="Damietta/Egypt"
        rate="4.5"
        leftBtn="Add Rating"
        rightBtn="Re-Book"
        userId="1"
      />
    </div>
  );
};

export default Completed;

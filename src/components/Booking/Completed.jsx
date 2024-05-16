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
      />
      <BookingCard
        date="10 am - March 13, 2024"
        image={bookingCard}
        name="ibrahim mohamed"
        location="Damietta/Egypt"
        rate="4.5"
        leftBtn="Reschedule"
        rightBtn="Cancel"
      />
      <BookingCard
        date="10 am - March 13, 2024"
        image={bookingCard}
        name="ibrahim mohamed"
        location="Damietta/Egypt"
        rate="4.5"
        leftBtn="Reschedule"
        rightBtn="Cancel"
      />
      <BookingCard
        date="10 am - March 13, 2024"
        image={bookingCard}
        name="ibrahim mohamed"
        location="Damietta/Egypt"
        rate="4.5"
        leftBtn="Reschedule"
        rightBtn="Cancel"
      />
    </div>
  );
};

export default Completed;

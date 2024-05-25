import styles from "./styles.module.css";
import BookingCard from "./BookingCard";
import bookingCard from "../../assets/images/booking/bookingCard.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import backendURL from "../../axios/backend";

const UpComming = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    backendURL
      .get(`/bookings/${params.userID}?status=completed`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user]);
  return (
    <div className={styles.cardsContainer}>
      {data && data.length === 0
        ? "Waitting list empty"
        : data.map((card) => {
            return (
              <BookingCard
                key={card.id}
                date={`${card.booking_time.replace(/:00$/, "")} - ${
                  card.booking_date
                }`}
                image={bookingCard}
                name={card.specialist.specialist.name}
                location={`${card.specialist.specialist.location.governorate}/${card.specialist.specialist.location.country}`}
                rate={card.specialist.specialist.rating}
                leftBtn="Reschedule"
                rightBtn="Cancel"
                onclickLBTN={() => {}}
                onclickRBTN={() => {
                  navigate(`/CancelOrder/${card.id}`);
                }}
              />
            );
          })}
    </div>
  );
};

export default UpComming;

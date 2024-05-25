import styles from "./styles.module.css";
import BookingCard from "./BookingCard";
import bookingCard from "../../assets/images/booking/bookingCard.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import backendURL from "../../axios/backend";

const Canceled = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    backendURL
      .get(`/bookings/${params.userID}?status=canceled`, {
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
                leftBtn="Re-Book"
                rightBtn="Add Rating"
                onclickLBTN={() => {}}
                onclickRBTN={() =>
                  navigate(`/Rating/${card.specialist.specialist.id}`)
                }
              />
            );
          })}
    </div>
  );
};

export default Canceled;

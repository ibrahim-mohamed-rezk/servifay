import BookingCard from "./BookingCard";
import bookingCard from "../../assets/images/booking/bookingCard.png";
import { useEffect, useState } from "react";
import backendURL from "../../axios/backend";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";

const Watting = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    backendURL
      .get(`/bookings/${params.userID}?status=waitting`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        res.data.data ? setData(res.data.data) : setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user, params.userID]);
  return (
    <div className={styles.cardsContainer}>
      {data && !Array.isArray(data)
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
                leftBtn="Chat"
                rightBtn="Cancel"
                onclickLBTN={() => {
                  navigate("/chat");
                }}
                onclickRBTN={() => {
                  navigate(`/CancelOrder/${card.id}`);
                }}
              />
            );
          })}
    </div>
  );
};

export default Watting;

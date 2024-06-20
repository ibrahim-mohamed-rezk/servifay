import styles from "./styles.module.css";
import BookingCard from "./BookingCard";
import bookingCard from "../../assets/images/booking/bookingCard.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import backendURL from "../../axios/backend";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";

const Completed = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const intl = useIntl();

  useEffect(() => {
    backendURL
      .get(`/bookings/${params.userID}?status=completed`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        res.data.data ? setData(res.data.data) : setData(res.data);
      })
      .catch((error) => {
        toast.error(error.response.data.msg || "Error ");
      });
  }, [user, params.userID]);

  return (
    <div className={styles.cardsContainer}>
      {data && !Array.isArray(data)
        ? "Completed list empty"
        : data.map((card) => {
            return (
              <BookingCard
                key={card.id}
                date={`${card.booking_time.replace(/:00$/, "")} - ${
                  card.booking_date
                }`}
                image={card.specialist.specialist.image || bookingCard}
                name={card.specialist.specialist.name}
                location={`${card.specialist.specialist.location.governorate}/${card.specialist.specialist.location.country}`}
                rate={card.specialist.specialist.rating}
                leftBtn={intl.formatMessage({ id: "addRating" })}
                rightBtn={intl.formatMessage({ id: "rebook" })}
                onclickLBTN={() =>
                  navigate(`/Rating/${card.specialist.specialist.id}`)
                }
                onclickRBTN={() => {}}
              />
            );
          })}
    </div>
  );
};

export default Completed;

import styles from "./styles.module.css";
import BookingCard from "./BookingCard";
import bookingCard from "../../assets/images/booking/bookingCard.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import backendURL from "../../axios/backend";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { Spin } from "antd";

const Canceled = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const intl = useIntl();

  useEffect(() => {
    setLoading(true);
    backendURL
      .get(`/bookings/${params.userID}?status=canceled`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        setLoading(false);
        res.data.data ? setData(res.data.data) : setData(res.data);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg || "Error ");
      });
  }, [user, params.userID]);
  return (
    <div className={styles.cardsContainer}>
      {loading === true && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "98vh",
          }}
        >
          <Spin size="large" />
        </div>
      )}
      {data && !Array.isArray(data) ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          Canceled list empty
        </div>
      ) : (
        data?.map((card) => {
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
              leftBtn={intl.formatMessage({ id: "rebook" })}
              rightBtn={intl.formatMessage({ id: "addRating" })}
              onclickLBTN={() => {
                navigate(`/BookNow/${card.specialist.specialist.id}`);
              }}
              onclickRBTN={() =>
                navigate(`/Rating/${card.specialist.specialist.id}`)
              }
            />
          );
        })
      )}
    </div>
  );
};

export default Canceled;

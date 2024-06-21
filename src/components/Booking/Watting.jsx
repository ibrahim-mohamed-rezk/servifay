import BookingCard from "./BookingCard";
import bookingCard from "../../assets/images/booking/bookingCard.png";
import { useEffect, useState } from "react";
import backendURL from "../../axios/backend";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { addToChatHistory } from "../../firebase/chat";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { Spin } from "antd";

const Watting = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const intl = useIntl();
  useEffect(() => {
    setLoading(true);
    backendURL
      .get(`/bookings/${params.userID}?status=waitting`, {
        headers: {
          Authorization: user.token,
        },
      })
      .then((res) => {
        res.data.data ? setData(res.data.data) : setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response?.data.msg || "Error ");
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
          Waitting list empty
        </div>
      ) : (
        data.map((card) => {
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
              leftBtn={intl.formatMessage({ id: "chat" })}
              rightBtn={intl.formatMessage({ id: "cancel" })}
              onclickLBTN={() => {
                const chatId = [card.specialist.user_id, user.id]
                  .sort((a, b) => a - b)
                  .join("_");
                addToChatHistory(user.id, chatId, card.specialist.user_id);
                navigate(`/chat/${chatId}`);
              }}
              onclickRBTN={() => {
                navigate(`/CancelOrder/${card.id}`);
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default Watting;

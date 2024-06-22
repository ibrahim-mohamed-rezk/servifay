import React, { useEffect, useState } from "react";
import backendURL from "../../axios/backend";
import { useSelector } from "react-redux";
import BookingCard from "../../components/Booking/BookingCard";
import bookingCard from "../../assets/images/booking/bookingCard.png";
import { useIntl } from "react-intl";
import { Spin } from "antd";
import styles from "./bookingReq.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingReq = () => {
  const user = useSelector((state) => state.auth);
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const intl = useIntl();
  const navigate = useNavigate();

  const getReqs = () => {
    backendURL
      .get(`/specialist`, { headers: { Authorization: user.token } })
      .then((res) => {
        setReqs(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setReqs("not found");
        console.log("Error");
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getReqs();
  }, [user.token]);

  const handelCancel = (bookId) => {
    backendURL
      .post(
        `specialist/orders/${bookId}/cancel`,
        {},
        {
          headers: { Authorization: user.token },
        }
      )
      .then(() => {
        getReqs();
        toast.success("Canceled Succussfully");
      })
      .catch(() => {
        console.log("err");
      });
  };

  const handelAccept = (bookId) => {
    backendURL
      .post(
        `specialist/orders/${bookId}/accept`,
        {},
        {
          headers: { Authorization: user.token },
        }
      )
      .then(() => {
        getReqs();
        toast.success("Accepted Succussfully");
      })
      .catch(() => {
        console.log("err");
      });
  };

  return (
    <div className={styles.reqsContainer}>
      {loading && (
        <div style={{ textAlign: "center", height: "50vh" }}>
          <Spin size="large" />
        </div>
      )}
      {reqs === "not found" && (
        <div style={{ textAlign: "center" }}>No Results Founded</div>
      )}
      {reqs.length === 0 && (
        <div style={{ textAlign: "center", height: "50vh" }}>
          No Results Founded
        </div>
      )}
      {reqs &&
        reqs.length !== 0 &&
        reqs !== "not found" &&
        reqs.map((req) => {
          return (
            <div key={req.id}>
              <BookingCard
                key={req.id}
                date={` ${req.created_at}`}
                image={req.image === "Not Found" ? bookingCard : req.image}
                name={req.username}
                leftBtn={intl.formatMessage({ id: "accept" })}
                rightBtn={intl.formatMessage({ id: "cancel" })}
                onclickLBTN={() => handelAccept(req.id)}
                onclickRBTN={() => handelCancel(req.id)}
              />
            </div>
          );
        })}
    </div>
  );
};

export default BookingReq;

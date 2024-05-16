import Canceled from "../../components/Booking/Canceled";
import Completed from "../../components/Booking/Completed";
import UpComming from "../../components/Booking/UpComming";
import styles from "./booking.module.css";
import { Link, useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();

  return (
    <div className="container">
      <div className={styles.links}>
        <ul>
          <Link to="/booking/upcomming">
            <li
              className={
                location.pathname.split("/")[2] === "upcomming"
                  ? styles.active
                  : styles.orange
              }
            >
              Upcoming
            </li>
          </Link>
          <Link to="/booking/completed">
            <li
              className={
                location.pathname.split("/")[2] === "completed"
                  ? styles.active
                  : styles.orange
              }
            >
              Completed
            </li>
          </Link>
          <Link to="/booking/canceled">
            <li
              className={
                location.pathname.split("/")[2] === "canceled"
                  ? styles.active
                  : styles.orange
              }
            >
              Canceled
            </li>
          </Link>
        </ul>
      </div>
      {location.pathname.split("/")[2] === "upcomming" && <UpComming />}
      {location.pathname.split("/")[2] === "completed" && <Completed />}
      {location.pathname.split("/")[2] === "canceled" && <Canceled />}
    </div>
  );
};

export default Booking;

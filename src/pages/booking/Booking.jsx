import Canceled from "../../components/Booking/Canceled";
import Completed from "../../components/Booking/Completed";
import UpComming from "../../components/Booking/UpComming";
import Watting from "../../components/Booking/Watting";
import styles from "./booking.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Booking = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth);

  return (
    <div className="container ">
      <div className={styles.links}>
        <ul>
          <Link to={`/booking/watting/${user.id}`}>
            <li
              className={
                location.pathname.split("/")[2] === "watting"
                  ? styles.active
                  : styles.orange
              }
            >
              Waitting
            </li>
          </Link>
          <Link to={`/booking/upcomming/${user.id}`}>
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
          <Link to={`/booking/completed/${user.id}`}>
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
          <Link to={`/booking/canceled/${user.id}`}>
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
      {location.pathname.split("/")[2] === "watting" && <Watting />}
    </div>
  );
};

export default Booking;

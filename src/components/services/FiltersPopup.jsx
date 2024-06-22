import React, { useEffect, useState } from "react";
import styles from "./filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/slices/services/servicesSlice";
import ReactStars from "react-stars";
import backendURL from "../../axios/backend";
import { setServices } from "../../store/slices/services/serviceCardsSlice";
import { setSearch } from "../../store/slices/services/filtersSlice";
import { FormattedMessage } from "react-intl";

const FiltersPopup = ({ setOpenPopup }) => {
  const services = useSelector((data) => data.services.data);
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState({
    service: "Carpentry",
    rating: 0,
    name: "",
  });
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handelSubmit = () => {
    backendURL
      .get(
        `services/filter-specialists?service=${cardData.service}&name=${cardData.name}&rating=${cardData.rating}`,
        {
          headers: { Authorization: user.token },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setSearch(cardData.service));
        dispatch(setServices(res.data.data));
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
        setOpenPopup(false);
      })
      .catch(() => {
        dispatch(setSearch(cardData.service));
        dispatch(setServices("not found"));
        setOpenPopup(false);
      });
  };

  return (
    <div className={styles.popup}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>
            <FormattedMessage id="filter" />:
          </h2>

          <div
            style={{
              cursor: "pointer",
              fontWeight: "bolder",
              margin: "0 10px",
            }}
            onClick={() => {
              setOpenPopup(false);
              document.body.style.overflow = "auto";
              document.documentElement.style.overflow = "auto";
            }}
          >
            &#10005;
          </div>
        </div>
        <hr />
        <div className={styles.servicesCatigCont}>
          <h3>
            <FormattedMessage id="services" />:
          </h3>
          <div className={styles.servicesCatig}>
            {services &&
              services.map((service) => {
                return (
                  <div
                    className={
                      service.name === cardData.service
                        ? styles.service
                        : styles.serviceUnselected
                    }
                    key={service.id}
                    onClick={() =>
                      setCardData((prev) => ({
                        ...prev,
                        service: service.name,
                      }))
                    }
                  >
                    {service.name}
                  </div>
                );
              })}
          </div>
        </div>
        <hr />
        <div className={styles.servicesCatigCont}>
          <h3>
            <FormattedMessage id="rating" />:
          </h3>
          <div className={styles.servicesCatig}>
            <ReactStars
              count={5}
              size={40}
              value={cardData.rating}
              onChange={(newRating) => {
                setCardData((prev) => ({
                  ...prev,
                  rating: newRating,
                }));
              }}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
            />
          </div>
        </div>
        <hr />
        <div className={styles.servicesCatigCont}>
          <h3>
            <FormattedMessage id="name" />:
          </h3>
          <div className={styles.servicesCatig}>
            <input
              value={cardData.name}
              type="text"
              placeholder="Name"
              className={styles.nameInput}
              onChange={(e) => {
                setCardData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <hr />
        <div className={styles.cardBtns}>
          <button
            onClick={() => {
              setCardData({ rating: 0, service: "Carpentry", name: "" });
            }}
            className={styles.leftBtn}
          >
            <FormattedMessage id="applyFilter" />
          </button>
          <button onClick={handelSubmit} className={styles.rightBtn}>
            <FormattedMessage id="resetFilter" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersPopup;

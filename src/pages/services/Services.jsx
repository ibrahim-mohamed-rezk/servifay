import styles from "./services.module.css";
import ServiceCard from "../../components/services/ServiceCard";
import ServicesSearch from "../../components/services/ServicesSearch";
import { useEffect, useState } from "react";
import FiltersPopup from "../../components/services/FiltersPopup";
import { useDispatch, useSelector } from "react-redux";
import ServicesCatigories from "../../components/services/ServicesCatigories";
import { fetchServiceCard } from "../../store/slices/services/serviceCardsSlice";
import { Spin } from "antd";

const Services = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector((data) => data.filters.data);
  const serviceCard = useSelector((data) => data.serviceCard.data);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    filters.search !== "" && dispatch(fetchServiceCard(filters.search));
  }, [dispatch, filters.search]);

  return (
    <div className="container">
      {openPopup && <FiltersPopup setOpenPopup={setOpenPopup} />}
      <ServicesSearch setOpenPopup={setOpenPopup} />
      {filters.search === "" ? (
        <div className={styles.ServicesCatigories}>
          <ServicesCatigories />
        </div>
      ) : (
        <div className={styles.servicesCards}>
          {serviceCard === "loading" && (
            <div style={{ textAlign: "center" }}>
              <Spin size="large" />
            </div>
          )}
          {serviceCard === "not found" && (
            <div style={{ textAlign: "center" }}>No Results Founded</div>
          )}
          {serviceCard !== "loading" &&
            serviceCard !== "not found" &&
            serviceCard.length > 0 &&
            serviceCard.map((card) => {
              if (card.user_id === user.id) {
                return;
              }
              return (
                <ServiceCard
                  key={card.specialist.id}
                  service_name={card.service_name}
                  id={card.user_id}
                  specialist_id={card.specialist.id}
                  name={card.specialist.name}
                  description={card.specialist.description}
                  image={card.specialist.image}
                  rating={card.specialist.rating}
                  location={card.specialist.location}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Services;

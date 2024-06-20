import React, { useEffect } from "react";
import { fetchServices } from "../../store/slices/services/servicesSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../pages/home/home.module.css";
import { setSearch } from "../../store/slices/services/filtersSlice";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

const ServicesCatigories = () => {
  const services = useSelector((data) => data.services.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // services api
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  return (
    <div className={styles.ourServices}>
      {services.length > 0 ? (
        services.map((service) => {
          return (
            <div
              onClick={() => {
                dispatch(setSearch(service.name));
                navigate("/services");
              }}
              key={service.id}
              className={styles.ourServicesChild}
            >
              <div>
                <img src={service.image} alt={service.name} />
              </div>
              <div>
                <h5>{service.name}</h5>
                <p>{service.description}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default ServicesCatigories;

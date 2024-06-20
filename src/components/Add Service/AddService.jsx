import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import styles from "./style.module.css";
import FormInput from "../../styled-components/inputs/FormInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/slices/services/servicesSlice";
import { FormattedMessage, useIntl } from "react-intl";
import backendURL from "../../axios/backend";
import { setSpecialist } from "../../store/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddService() {
  const services = useSelector((data) => data.services.data);
  const dispatch = useDispatch();
  const intl = useIntl();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // services api
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  const [serviceData, setServiceData] = useState({
    service_id: "",
    service_name: "",
    description: "",
    num_of_experience: null,
    personal_card: null,
    personal_img: null,
  });

  const handelSubmit = () => {
    backendURL
      .post(`/specialist`, serviceData, {
        headers: { Authorization: user.token },
      })
      .then((res) => {
        dispatch(setSpecialist());
        toast.success("Service Added Successfuly");
        navigate("/services");
      })
      .catch((err) => toast.error("Error in Add Service, please try agine! "));
  };

  return (
    <div className={`${styles.AddService}`}>
      <form action="" className={`${styles.form}`}>
        <select
          value={serviceData.service_name}
          onChange={(event) => {
            setServiceData((prev) => ({
              ...prev,
              service_id: event.target.selectedIndex,
              service_name: event.target.value,
            }));
          }}
          className={`${styles.select}`}
        >
          <option value="" className={`${styles.form__defaulopetion}`}>
            <FormattedMessage id="chooseService" />
          </option>
          {services &&
            services.map((sercive, index) => {
              return (
                <option
                  id={sercive.id}
                  value={sercive.name}
                  className={`${styles.form__options}`}
                  key={index}
                >
                  {sercive.name}
                </option>
              );
            })}
        </select>
        {serviceData.service_name && (
          <p className={`${styles.form__p}`}>
            Selected Service: {serviceData.service_name}
          </p>
        )}
      </form>
      <hr />
      <input
        className={`${styles.textarea}`}
        type="number"
        placeholder={intl.formatMessage({ id: "expNum" })}
        onChange={(event) => {
          setServiceData((prev) => ({
            ...prev,
            num_of_experience: event.target.value,
          }));
        }}
      />
      <hr />
      <textarea
        placeholder={intl.formatMessage({ id: "serviceDesc" })}
        rows={8}
        className={`${styles.textarea}`}
        onChange={(event) => {
          setServiceData((prev) => ({
            ...prev,
            description: event.target.value,
          }));
        }}
      ></textarea>
      <hr />
      <div
        className={` d-flex  justify-content-center align-items-center  ${styles.uploadphoto}`}
      >
        <OrangeButton
          className={`w-25 ${styles.photo}`}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FormattedMessage id="addPhoto" />
        </OrangeButton>
      </div>

      {/* File input hidden */}
      <FormInput
        id="fileInput"
        type="file"
        onChange={(event) => {
          setServiceData((prev) => ({
            ...prev,
            personal_img: event.target.files[0],
          }));
        }}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Display the selected photo */}
      {serviceData.personal_img && (
        <div>
          <p>Selected photo:</p>
          <img
            style={{ maxWidth: "50%", margin: "0 auto", display: "block" }}
            src={URL.createObjectURL(serviceData.personal_img)}
            alt="Selected"
          />
        </div>
      )}
      <div className=" d-flex  justify-content-center ">
        <OrangeButton onClick={handelSubmit} className={`${styles.confirmbtn}`}>
          <FormattedMessage id="confirm" />
        </OrangeButton>
      </div>
    </div>
  );
}

export default AddService;

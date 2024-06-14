import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import styles from "./style.module.css";
import FormInput from "../../styled-components/inputs/FormInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/slices/services/servicesSlice";

function AddService() {
  const services = useSelector((data) => data.services.data);
  const dispatch = useDispatch();
  // services api
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };

  return (
    <div className={`${styles.AddService}`}>
      <form action="" className={`${styles.form}`}>
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className={`${styles.select}`}
        >
          <option value="" className={`${styles.form__defaulopetion}`}>
            Choose a Service
          </option>
          {services &&
            services.map((sercive) => {
              return (
                <option
                  value={sercive.name}
                  className={`${styles.form__options}`}
                >
                  {sercive.name}
                </option>
              );
            })}
        </select>
        {selectedOption && (
          <p className={`${styles.form__p}`}>
            Selected Service: {selectedOption}
          </p>
        )}
      </form>
      <hr />
      <textarea
        placeholder="Service Description"
        rows={8}
        className={`${styles.textarea}`}
      ></textarea>
      <hr />
      <div
        className={` d-flex  justify-content-center align-items-center  ${styles.uploadphoto}`}
      >
        <OrangeButton
          className={`w-25 ${styles.photo}`}
          onClick={() => document.getElementById("fileInput").click()}
        >
          Add Photo
        </OrangeButton>
      </div>

      {/* File input hidden */}
      <FormInput
        id="fileInput"
        type="file"
        onChange={handlePhotoChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Display the selected photo */}
      {selectedPhoto && (
        <div>
          <p>Selected photo:</p>
          <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" />
        </div>
      )}
      <div className=" d-flex  justify-content-center ">
        <OrangeButton className={`${styles.confirmbtn}`}>Confirm</OrangeButton>
      </div>
    </div>
  );
}

export default AddService;

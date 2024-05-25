import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row , Col ,Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import OrangeButton from '../../styled-components/buttons/OrangeButton';
import styles from "./style.module.css";
import FormInput from '../../styled-components/inputs/FormInput';
import { useState } from 'react';

function AddService() {
  const [selectedOption, setSelectedOption] = useState('');
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
      <form action='' className={`${styles.form}`}>
        <select value={selectedOption} onChange={handleSelectChange} className={`${styles.select}`}>
          <option value="" className={`${styles.form__defaulopetion}`}>Choose a Service</option>
          <option value="option1" className={`${styles.form__options}`}>Option 1</option>
          <option value="option2" className={`${styles.form__options}`}>Option 2</option>
          <option value="option3" className={`${styles.form__options}`}>Option 3</option>
          <option value="option4" className={`${styles.form__options}`}>Option 4</option>
        </select>
        {selectedOption && (
        <p className={`${styles.form__p}`}>Selected option: {selectedOption}</p>
        )}
      </form>
      <hr/>
      <textarea placeholder='Add Reasons Here' rows={8} className={`${styles.textarea}`}></textarea>
      <hr/>
      <div className={` d-flex  justify-content-center align-items-center  ${styles.uploadphoto}`}>
        <OrangeButton className={`w-25 ${styles.photo}`} onClick={() => document.getElementById('fileInput').click()}>Add Photo</OrangeButton>
      </div>

      {/* File input hidden */}
      <FormInput id="fileInput" type="file" onChange={handlePhotoChange} accept="image/*" style={{ display: 'none' }} />

      {/* Display the selected photo */}
      {selectedPhoto && (
        <div>
          <p>Selected photo:</p>
          <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" />
        </div>
      )}
      <div className=' d-flex  justify-content-center '>
        <OrangeButton className={`${styles.confirmbtn}`}>
          Confirm
        </OrangeButton>
      </div>
    </div>
  )
}

export default AddService;
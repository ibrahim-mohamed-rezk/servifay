import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import { Row , Col ,Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import OrangeButton from '../../styled-components/buttons/OrangeButton';
import styles from "./BookNow.module.css";
import bookingCard from "../../assets/images/booking/bookingCard.png";
function BookNow() {
  // const navigate = useNavigate();
  
  return (
    <div className={styles.BookNowContainer}>
      <div className={styles.BookNowTopDiv}>
        <div><img src={bookingCard} alt="Booking Now Image"  className={styles.BookingNowImg} /></div>
        <div>
          <h3 className='fw-bolder'>Ahmed Mohamed</h3>
          <h3 className='fw-bolder text-secondary '>Carpenter</h3>
          <h5 className=' text-secondary '><img src=''/>Damietta/Egypt</h5>
        </div>
      </div>
      <hr className={styles.line}/>
      <div sm={1} md={1} lg={2} className={`g-4 mt-3 ${styles.BookNowBDiv}`}>
        <div className={`${styles.FirstDiv}`}>
          {/* <Col> */}
            <form action='' className={`${styles.form}`}>
              <label className=' fw-bolder fs-3'>Required Tasks</label>
              <textarea placeholder='Write Here...' cols={50} rows={15} className={`mt-2 ${styles.textarea}`}></textarea>
            </form>
          {/* </Col> */}
        </div>

        <div className={`${styles.SecondDiv}`}>
          {/* <Col> */}
            <h4 className={` text-secondary ${styles.Head}`}>BOOK APPOINTMENT</h4>

            <form action='' className={`${styles.formTwo}`}>
              <div className=' d-flex flex-column '>
                <label className='mb-3 mt-3 fs-3 fw-bolder '>Day</label>
                <input type="date" />
              </div>

              <div className=' d-flex flex-column '>
                <label className='mb-3 mt-3 fs-3 fw-bolder '>Time</label>
                <input type="time" />
              </div>

              <div className=' d-flex flex-column '>
                <label className='mb-3 mt-3 fs-3 fw-bolder '>Price</label>
                <input type="text" placeholder='Price'/>
              </div>
            </form>
          {/* </Col> */}
        </div>
      </div>
    <div className={`mt-5 ${styles.BTN}`}>
    <OrangeButton>
      Book Now
    </OrangeButton>
    </div>
    </div>
  )
}

export default BookNow;
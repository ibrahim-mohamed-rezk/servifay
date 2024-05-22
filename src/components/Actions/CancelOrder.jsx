import React from 'react';
import styles from "./BookNow.module.css";
import OrangeButton from '../../styled-components/buttons/OrangeButton';
function CancelOrder() {
  return (
    <div className={`mt-5 ${styles.CancelOrder}`}>
      <div className={`${styles.cont}`}>
        <div className={`row ${styles.header}`}>
          <div className="col-12 m-auto mb-3">
              <div>
                <h4>Why do you want to cancel this specialist's reservation?</h4>
              </div>
          </div>
        </div>

    <div className={`row ${styles.canselReasons}`}>
      <div className="col-12 m-auto">
        <div className={`mb-2 ${styles.formCheck}`}>
            <input className={`${styles.formCheckInput}`} type="radio" id="reason1" name="reason"></input>
            <label for="reason1" className='ms-2'>Have you experienced changes in your personal circumstances?</label>
        </div>
        <div className={`mb-2 ${styles.formCheck}`}>
            <input className={`${styles.formCheckInput}`} type="radio" id="reason2" name="reason"></input>
            <label for="reason2" className='ms-2'>Did you encounter a problem with the service?</label>
        </div>
        <div className={`mb-2 ${styles.formCheck}`}>
            <input className={`${styles.formCheckInput}`} type="radio" id="reason3" name="reason"></input>
            <label for="reason3" className='ms-2'>Have you discovered better options for you?</label>
        </div>
        <div className={`mb-2 ${styles.formCheck}`}>
            <input className={`${styles.formCheckInput}`} type="radio" id="reason4" name="reason"></input>
            <label for="reason4" className='ms-2'>Are you facing unexpected financial problems?</label>
        </div>
        <div className={`mb-2 ${styles.formCheck}`}>
            <input className={`${styles.formCheckInput}`} type="radio" id="reason5" name="reason"></input>
            <label for="reason5" className='ms-2'>Travel plans</label>
        </div>
        <div className={`mb-2 ${styles.formCheck}`}>
            <input className={`${styles.formCheckInput}`} type="radio" id="reason6" name="reason"></input>
            <label for="reason6" className='ms-2'>Another reason</label>
        </div>
        <hr className="hr"></hr>
      </div>
    </div>
    <div className={`row ${styles.textAreaContainer}`}>
        <div className="col-12 m-auto">
          <div>
            <textarea className="form-control"  name="reason" id="writen-reason" placeholder="Add reason here"></textarea>
          </div>
        </div>
    </div>
    <div className={`d-flex justify-content-center align-items-center   mt-5 ms-4 ${styles.BTN2}`}>
        <OrangeButton>
          Confirm
        </OrangeButton>
      </div>
    </div>
    </div>
  )
}

export default CancelOrder;
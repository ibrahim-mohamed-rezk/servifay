import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';
import OrangeButton from '../../styled-components/buttons/OrangeButton';
import styles from "./style.module.css";
import FormInput from '../../styled-components/inputs/FormInput';
function ContactUs() {
  return (
    <div className={`${styles.contactus}`}>
      <div className={`${styles.contactusItems}`}>
        <Row sm={1} md={1} lg={2} className='g-4 '>
          <div>
            <Col>
              <h1 className={`${styles.contactus__h1}`}>Get In Touch</h1>
              <p className={`${styles.contactus__p}`}>WE TAKE PRIDE IN OFFERING THE KIND OF CUSTOMER SERVICE THAT EMPHASIZES OUR COMMITMENT TO CULTIVATING A LONG-TERM RELATIONSHIP WITH OUR CLIENTELE. WHILE WE RECOGNIZE THAT SOMETIMES THINGS DO GO WRONG, WE MAKE IT A PRIORITY TO HELP OUR CUSTOMERS FIND THE BEST RESOLUTION POSSIBLE TO ENSURE THEIR SATISFACTION.</p>
              <p className={`${styles.contactus__p}`}>01286096033</p>
              <p><a href='servifay@gmail.com' target='_blank' className={` fs-6 ${styles.contactus__p}`}>servifay@gmail.com</a></p>
              <p className={` fs-6 ${styles.contactus__p}`}>Damietta, Egypt</p>
            </Col>
          </div>

          <div>
            <Col>
              <form action='' className={`${styles.form}`}>
                <FormInput type='text' placeholder='Name'/>
                <FormInput type='text' placeholder='Phone'/>
                <FormInput type='email' placeholder='Email'/>
                <textarea placeholder='Message'  rows={10} className={`${styles.textarea}`}></textarea>
                <OrangeButton>
                  Send
                </OrangeButton>
              </form>
            </Col>
          </div>
        </Row>
      </div>
    </div>
  )
}

export default ContactUs;
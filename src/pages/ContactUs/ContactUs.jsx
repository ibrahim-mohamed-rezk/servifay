import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';
import OrangeButton from '../../styled-components/buttons/OrangeButton';
import styles from "./style.module.css";
import FormInput from '../../styled-components/inputs/FormInput';
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
function ContactUs() {
  const intl = useIntl();
  return (
    <div className={`${styles.contactus}`}>
      <div className={`${styles.contactusItems}`}>
        <Row sm={1} md={1} lg={2} className="g-4 ">
          <div>
            <Col>
              <h1 className={`${styles.contactus__h1}`}>
                <FormattedMessage id="getInToutch" />
              </h1>
              <p className={`${styles.contactus__p}`}>
                <FormattedMessage id="getInToutchDesc" />
              </p>
              <p className={`${styles.contactus__p}`}>01286096033</p>
              <p>
                <a
                  href="servifay@gmail.com"
                  target="_blank"
                  className={` fs-6 ${styles.contactus__p}`}
                >
                  servifay@gmail.com
                </a>
              </p>
              <p className={` fs-6 ${styles.contactus__p}`}>Damietta, Egypt</p>
            </Col>
          </div>

          <div>
            <Col>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Email sent successfully");
                }}
                className={`${styles.form}`}
              >
                <FormInput
                  type="text"
                  placeholder={intl.formatMessage({ id: "name" })}
                />
                <FormInput
                  type="text"
                  placeholder={intl.formatMessage({ id: "phoneNumber" })}
                />
                <FormInput
                  type="email"
                  placeholder={intl.formatMessage({ id: "email" })}
                />
                <textarea
                  placeholder={intl.formatMessage({ id: "message" })}
                  rows={10}
                  className={`${styles.textarea}`}
                ></textarea>
                <OrangeButton>
                  {intl.formatMessage({ id: "send" })}
                </OrangeButton>
              </form>
            </Col>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default ContactUs;
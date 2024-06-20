import React from "react";
import { FormattedMessage } from "react-intl";
import EmailIcon from "../../assets/svg/EmailIcon";
import FacebookIcon from "../../assets/svg/FacebookIcon";
import InstagramIcon from "../../assets/svg/InstagramIcon";
import TwitterIcon from "../../assets/svg/TwitterIcon";
import YoutubeIcon from "../../assets/svg/YoutubeIcon";
import styles from "./footer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row } from "react-bootstrap";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Row sm={1} md={3} lg={3} className={`m-3 g-4 ${styles.footerContent}`}>
        <div className={styles.leftSide}>
          <h1 className="ms-5">
            <FormattedMessage id="footerTitle" />
          </h1>
          <p className="ms-5">
            <FormattedMessage id="footerDescription" />
          </p>
          <div className={`ms-5 ${styles.mediaIcons}`}>
            <YoutubeIcon />
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
            <EmailIcon />
          </div>
        </div>
        <div className={`${styles.footeritem}`}>
          <div className={`me-5 ${styles.company}`}>
            <h3>
              <FormattedMessage id="companyTitle" />
            </h3>
            <ul>
              <li>
                <FormattedMessage id="companyServices" />
              </li>
              <li>
                <FormattedMessage id="companyAboutUs" />
              </li>
              <li>
                <FormattedMessage id="companyContact" />
              </li>
            </ul>
          </div>
          <div className={`ms-5 ${styles.legal}`}>
            <h3>
              <FormattedMessage id="legalTitle" />
            </h3>
            <ul>
              <li>
                <FormattedMessage id="legalTerms" />
              </li>
              <li>
                <FormattedMessage id="legalPrivacy" />
              </li>
              <li>
                <FormattedMessage id="legalLicense" />
              </li>
              <li>
                <FormattedMessage id="legalCookies" />
              </li>
            </ul>
          </div>
        </div>
      </Row>
      <hr />
      <p className={styles.copyRights}>
        <FormattedMessage id="footerRightsReserved" />
      </p>
    </div>
  );
};

export default Footer;

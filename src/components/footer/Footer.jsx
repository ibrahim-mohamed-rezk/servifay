import EmailIcon from "../../assets/svg/EmailIcon";
import FacebookIcon from "../../assets/svg/FacebookIcon";
import InstagramIcon from "../../assets/svg/InstagramIcon";
import TwitterIcon from "../../assets/svg/TwitterIcon";
import YoutubeIcon from "../../assets/svg/YoutubeIcon";
import styles from "./footer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row , Col } from 'react-bootstrap';
const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Row sm={1} md={1} lg={3}  className={`m-3 g-4 ${styles.footerContent}`}>
        <div className={styles.leftSide}>
          <h1 className="ms-5">Servifay</h1>
          <p className="ms-5">
            Servifay is your premier destination for top-notch smart <br/>home
            service and repair.
          </p>
          <div className={` ms-5 ${styles.mediaIcons}`}>
            <YoutubeIcon />
            <InstagramIcon />
            <FacebookIcon />
            <TwitterIcon />
            <EmailIcon />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.company}>
            <h3>Company</h3>
            <ul>
              <li>Services</li>
              <li>About us</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className={styles.legal}>
            <h3>Legal</h3>
            <ul>
              <li>Terms</li>
              <li>Privacy</li>
              <li>License</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
      </Row>
      <hr />
      <p className={styles.copyRights} >©2023 Servifay . All rights reserved</p>
    </div>
  );
};

export default Footer;

import EmailIcon from "../../assets/svg/EmailIcon";
import FacebookIcon from "../../assets/svg/FacebookIcon";
import InstagramIcon from "../../assets/svg/InstagramIcon";
import TwitterIcon from "../../assets/svg/TwitterIcon";
import YoutubeIcon from "../../assets/svg/YoutubeIcon";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.leftSide}>
          <h1>Servifay</h1>
          <p>
            Servifay is your premier destination for top-notch smart home
            service and repair.
          </p>
          <div className={styles.mediaIcons}>
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
      </div>
      <hr />
      <p className={styles.copyRights}>©2023 Servifay . All rights reserved</p>
    </div>
  );
};

export default Footer;

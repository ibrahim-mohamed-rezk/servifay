import React from "react";
import styles from "./heroSection.module.css";
import LIMG from "../../assets/images/heroSectionImages/Image.png";
import RIMG from "../../assets/images/heroSectionImages/RImage.png";
import CheckIcon from "@mui/icons-material/Check";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import Verification from "../../assets/svg/Verification";
import Clock from "../../assets/svg/Clock";
import Location from "../../assets/svg/Location";
import Calender from "../../assets/svg/Calender";
import Divider from "@mui/material/Divider";

const HeroSecton = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeftImg}>
          <img src={LIMG} alt="LIMG" />
        </div>
        <div className={styles.heroText}>
          <div className={styles.heroTextContent}>
            <div className={styles.content}>
              <div className={styles.tagLine}>
                <ul>
                  <li>Maintenances</li>
                  <li>Repairs </li>
                  <li>Improvements</li>
                </ul>
              </div>
              <div className={styles.title}>
                <h4>
                  Need improvement or repair your home? <br /> we can help!
                </h4>
              </div>
              <div className={styles.feature}>
                <div>
                  <CheckIcon />
                  <span> Free Quotes</span>
                </div>
                <div>
                  <CheckIcon />
                  <span> 100% Commitment-Free </span>
                </div>
              </div>
            </div>
            <OrangeButton
              className={` ${styles.callToAction}`}
              $w="fit-content"
              $fs="1.5vw"
              $h="fit-content"
              $m="1.5em auto 1.5em auto"
              $p=".5vw 2vw"
            >
              Get Started
            </OrangeButton>
          </div>
          <div className={styles.highlights}>
            <div>
              <Verification />
              <div>
                <div>Satisfaction</div>
                <div>Guarantee</div>
              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
              <Clock />
              <div>
                <div>24H</div>
                <div>Availability</div>
              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
              <Location />
              <div>
                <div>Local EG</div>
                <div>Professional</div>
              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
              <Calender />
              <div>
                <div>Flexible</div>
                <div>Appointments</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroRightImg}>
          <img src={RIMG} alt="RIMG" />
        </div>
      </div>
    </div>
  );
};

export default HeroSecton;

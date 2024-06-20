import React from "react";
import { FormattedMessage } from "react-intl";
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
                  <li>
                    <FormattedMessage id="maintenance" />
                  </li>
                  <li>
                    <FormattedMessage id="repairs" />
                  </li>
                  <li>
                    <FormattedMessage id="improvements" />
                  </li>
                </ul>
              </div>
              <div className={styles.title}>
                <h4>
                  <FormattedMessage id="heroSectionTitle" />
                </h4>
              </div>
              <div className={styles.feature}>
                <div>
                  <CheckIcon />
                  <span>
                    <FormattedMessage id="freeQuotes" />
                  </span>
                </div>
                <div>
                  <CheckIcon />
                  <span>
                    <FormattedMessage id="commitmentFree" />
                  </span>
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
              onClick={() => {
                user.isloggedin ? navigate("/services") : navigate("/login");
              }}
            >
              <FormattedMessage id="getStarted" />
            </OrangeButton>
          </div>
          <div className={styles.highlights}>
            <div>
              <Verification />
              <div>
                <div>
                  <FormattedMessage id="satisfaction" />
                </div>
                <div></div>
              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
              <Clock />
              <div>
                <div>
                  <FormattedMessage id="availability" />
                </div>
              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
              <Location />
              <div>
                <div>
                  <FormattedMessage id="localProfessional" />
                </div>
              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div>
              <Calender />
              <div>
                <div>
                  <FormattedMessage id="flexibleAppointments" />
                </div>
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

export default HeroSection;

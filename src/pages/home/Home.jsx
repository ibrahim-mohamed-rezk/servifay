import React from "react";
import { FormattedMessage } from "react-intl";
import HeroSecton from "../../components/hero-section/HeroSecton";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import SImage from "../../assets/images/homePage/SImage.png";
import HImage from "../../assets/images/homePage/HImage.png";
import CheckMark from "../../assets/svg/CheckMark";
import HomeFeature from "../../assets/svg/HomeFeature";
import ServicesCatigories from "../../components/services/ServicesCatigories";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeroSecton />
      {/* Home page content */}
      {/* Professional Services section */}
      <div className={`container ${styles.servicesSectionContainer}`}>
        <div className={styles.servicesSectionContent}>
          <div>
            <h4>
              <FormattedMessage
                id="professionalTitle"
                defaultMessage="Professional for your home services"
              />
            </h4>
            <p>
              <FormattedMessage
                id="professionalDescription"
                defaultMessage="We offer a range of professional services to meet your home needs."
              />
            </p>
          </div>
          <div className={styles.services}>
            <ul>
              <li>
                <CheckMark />
                <p>
                  <FormattedMessage
                    id="service1"
                    defaultMessage="Repair and Installation"
                  />
                </p>
              </li>
              <li>
                <CheckMark />
                <p>
                  <FormattedMessage
                    id="service2"
                    defaultMessage="Maintenance"
                  />
                </p>
              </li>
              <li>
                <CheckMark />
                <p>
                  <FormattedMessage id="service3" defaultMessage="Carpentry" />
                </p>
              </li>
            </ul>
            <ul>
              <li>
                <CheckMark />
                <p>
                  <FormattedMessage id="service4" defaultMessage="Plumbing" />
                </p>
              </li>
              <li>
                <CheckMark />
                <p>
                  <FormattedMessage
                    id="service5"
                    defaultMessage="Budget-friendly"
                  />
                </p>
              </li>
              <li>
                <CheckMark />
                <p>
                  <FormattedMessage
                    id="service6"
                    defaultMessage="Electricity"
                  />
                </p>
              </li>
            </ul>
          </div>
          <div>
            <OrangeButton
              className={`${styles.btn}`}
              onClick={() => navigate("/services")}
            >
              <FormattedMessage
                id="callToAction"
                defaultMessage="We offer 24-hour fast services to help you."
              />
            </OrangeButton>
          </div>
        </div>
        <div className={styles.servicesSectionIMG}>
          <img src={SImage} alt="Service" />
        </div>
      </div>

      {/* Our services section */}
      <div className={`container ${styles.ourServicesContainer}`}>
        <div className={styles.ourServicesHeader}>
          <h1>
            <FormattedMessage
              id="ourServicesTitle"
              defaultMessage="Our Services"
            />
          </h1>
          <p>
            <FormattedMessage
              id="ourServicesDescription"
              defaultMessage="We assist with leaking pipes, broken wood, and more!"
            />
          </p>
        </div>

        <ServicesCatigories />
      </div>
      {/* Home feature section as svg */}
      <HomeFeature />
      {/* How it works section */}
      <div className={`container ${styles.howWorkContainer}`}>
        <div className="d-flex justify-content-center align-items-center">
          <img src={HImage} alt="How it works" />
        </div>
        <div className={styles.howWorkContent}>
          <h4>
            <FormattedMessage
              id="howWorksTitle"
              defaultMessage="How SERVIFAY works?"
            />
          </h4>
          <div className={styles.steps}>
            <ol>
              <li>
                <div>
                  <span>1.</span>
                  <span>
                    <FormattedMessage
                      id="step1Title"
                      defaultMessage="Request the service at any time"
                    />
                  </span>
                  <span>
                    <FormattedMessage
                      id="step1Description"
                      defaultMessage="You can quickly request the service through us."
                    />
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <span>2.</span>
                  <span>
                    <FormattedMessage
                      id="step2Title"
                      defaultMessage="Schedule Service"
                    />
                  </span>
                  <span>
                    <FormattedMessage
                      id="step2Description"
                      defaultMessage="Our experts will answer your questions and provide flexible appointment times."
                    />
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <span>3.</span>
                  <span>
                    <FormattedMessage
                      id="step3Title"
                      defaultMessage="Your request is completed"
                    />
                  </span>
                  <span>
                    <FormattedMessage
                      id="step3Description"
                      defaultMessage="Our technician will diagnose the problem and provide an estimate. If you decide to continue, the technician will get to work."
                    />
                  </span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import HeroSecton from "../../components/hero-section/HeroSecton";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import SImage from "../../assets/images/homePage/SImage.png";
import HImage from "../../assets/images/homePage/HImage.png";
import CheckMark from "../../assets/svg/CheckMark";
import styles from "./home.module.css";
import HomeFeature from "../../assets/svg/HomeFeature";
import ServicesCatigories from "../../components/services/ServicesCatigories";
const Home = () => {
  return (
    <div>
      <HeroSecton />
      {/* home  page content */}
      {/* Proffesional Services section */}
      <div className={`container ${styles.servicesSectionContainer}`}>
        <div className={styles.servicesSectionContent}>
          <div>
            <h4>Professional for your home services</h4>
            <p>
              Do you need help with home care? We specialize in home care. We
              provide many services that support home services
            </p>
          </div>
          <div className={styles.services}>
            <ul>
              <li>
                <CheckMark />
                <p>Repair and Installation</p>
              </li>
              <li>
                <CheckMark />
                <p>Maintenance</p>
              </li>
              <li>
                <CheckMark />
                <p>Carpentry</p>
              </li>
            </ul>
            <ul>
              <li>
                <CheckMark />
                <p>Plumbing</p>
              </li>
              <li>
                <CheckMark />
                <p>Budget-friendly</p>
              </li>
              <li>
                <CheckMark />
                <p>Electricity</p>
              </li>
            </ul>
          </div>
          <div>
            <OrangeButton
              $w="fit-content"
              $fs="1vw"
              $h="fit-content"
              $m="1.5em auto 1.5em auto"
              $p=".5vw 2vw"
            >
              We already 24 hours fast services to help you.
            </OrangeButton>
          </div>
        </div>
        <div className={styles.servicesSectionIMG}>
          <img src={SImage} alt="SImage" />
        </div>
      </div>

      {/* our services section */}
      <div className={`container ${styles.ourServicesContainer}`}>
        <div className={styles.ourServicesHeader}>
          <h1>Our Services</h1>
          <p>
            You have problems with leaking pipes, broken wood, and of course you
            need our help!
          </p>
        </div>

        <ServicesCatigories />
      </div>
      {/* Home feature section as svg */}
      <HomeFeature />
      {/* how work section */}
      <div className={`container ${styles.howWorkContainer}`}>
        <div>
          <img src={HImage} alt="HImage" />
        </div>
        <div className={styles.howWorkContent}>
          <h4>How  SERVIFAY <br/> works?</h4>
          <div className={styles.steps}>
            <ol>
              <li>
                <div>
                  <span>1.</span>
                  <span>Request the service at any time</span>
                  <span>You can request the service quickly through us</span>
                </div>
              </li>
              <li>
                <div>
                  <span>2.</span>
                  <span>Schedule Service</span>
                  <span>
                    After connecting your call, our home care experts will
                    answer your questions and provide flexible appointment times
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <span>3.</span>
                  <span>Your request is complated</span>
                  <span>
                    Once your technician arrives, he will diagnose the problem
                    and provide an estimate. If you decide to continue, the
                    technician will get to work
                  </span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div> 
      {/* Review section */}
      {/* <div>
        <h4>Here our original reviews from trusted platform</h4>
        <div>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src={HImage} alt="First slide" />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={SImage}
                  alt="Second slide"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>  */}
    </div>
  );
};

export default Home;

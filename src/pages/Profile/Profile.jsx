import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserLogin from "../../hooks/useUserLogin";
import styles from "./profile.module.css";
import { Avatar } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
// import backendURL from "../../axios/backend";
import LocationNoFill from "../../assets/svg/LocationNoFill";
import Rating from "../../assets/svg/Rating";
import Customers from "../../assets/svg/Customers";
import Exprince from "../../assets/svg/Exprince";
import Erning from "../../assets/svg/Erning";
import { fetchProfile } from "../../store/slices/profile/profileSlice";
import useCurrentProfile from "../../hooks/useCurrentProfile";
import GoogleMaps from "../../components/maps/GoogleMaps";
import Review from "../../components/profile/Review";
import Star from "../../assets/svg/Star";
import Myprofile from "../../components/myProfile/MyProfile";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { Spin } from "antd";

const Profile = () => {
  const user = useCurrentProfile();
  const navigate = useNavigate();
  const userLogin = useUserLogin();
  const [isHovered, setIsHovered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user.image);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const current_user = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userLogin) {
      navigate("/login");
    }
  }, [navigate, userLogin]);

  useEffect(() => {
    setLoading(true);
    const profileId = location.pathname.split("/")[2];
    if (profileId !== undefined) {
      dispatch(fetchProfile(profileId))
        .unwrap()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, location]);

  const handleAvatarHover = () => {
    setIsHovered(true);
  };

  const handleAvatarHoverOut = () => {
    setIsHovered(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container flex-col-c">
      {user.data?.specialist_info ? (
        <>
          <div className={`${styles.avatarSection} flex-col-c`}>
            <div
              className={styles.avatarWrapper}
              onMouseEnter={handleAvatarHover}
              onMouseLeave={handleAvatarHoverOut}
            >
              <Avatar
                sx={{ width: 100, height: 100, cursor: "pointer" }}
                alt={user.name}
                src={previewUrl}
                onClick={handleAvatarClick}
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {isHovered && (
                <div
                  className={styles.hoverOverlay}
                  style={{ background: "#F5F5F5" }}
                >
                  <CameraAlt style={{ background: "#F5F5F5", color: "#000" }} />
                </div>
              )}
            </div>
            <h4 className={styles.avatarUserName}>
              {user.data?.specialist_info?.name}
            </h4>
            <span className={styles.role}>{user.data?.service_name}</span>
            <div className={styles.location}>
              <LocationNoFill />
              {user.data?.specialist_info?.location.governorate}/
              {user.data?.specialist_info?.location.country}
            </div>
          </div>
          <div className={styles.userAch}>
            <div className={styles.ach}>
              <Rating />
              <div className={styles.achName}>
                <span>
                  <FormattedMessage id="rating" />
                </span>
                <span>+{user.data?.specialist_info?.rating}</span>
              </div>
            </div>
            <div className={styles.ach}>
              <Customers />
              <div className={styles.achName}>
                <span>
                  <FormattedMessage id="customers" />
                </span>
                <span>+{user.data?.specialist_info?.num_of_customers}</span>
              </div>
            </div>
            <div className={styles.ach}>
              <Exprince />
              <div className={styles.achName}>
                <span>
                  <FormattedMessage id="experience" />
                </span>
                <span>+{user.data?.specialist_info?.num_of_experience}</span>
              </div>
            </div>
            <div className={styles.ach}>
              <Erning />
              <div className={styles.achName}>
                <span>
                  <FormattedMessage id="earnings" />
                </span>
                <span>+{user.data?.specialist_info?.earnings}</span>
              </div>
            </div>
          </div>
          <div className={styles.descriptionAndWorktime}>
            <div className={styles.description}>
              <label>description</label>
              <p>{user.data?.specialist_info?.description}</p>
            </div>
            <div className={styles.workTime}>
              <label>
                <FormattedMessage id="worktime" />
              </label>
              <div className={styles.times}>Saturday 09:00 am - 05:00 pm</div>
            </div>
          </div>
          <div className={styles.mapAndReviews}>
            <div className={styles.map}>
              <GoogleMaps loc={user.data?.specialist_info.location} />
            </div>
            <div className={styles.reviews}>
              <div className={styles.head}>
                <h4>Review</h4>
                <div className={styles.rate}>
                  <Star />
                  <span>4.5</span>
                </div>
              </div>
              <div className={styles.reviewsContainer}>
                {user.data?.reviews && user.data?.reviews.length === 0
                  ? "no reviews yet"
                  : user.data?.reviews &&
                    user.data?.reviews.map((review, index) => (
                      <Review key={index} review={review} />
                    ))}
              </div>
            </div>
          </div>
          <div className={styles.bookNow}>
            <button
              onClick={() => {
                if (current_user.email_active === "No") {
                  toast.warning("Please Active your Email");
                  return;
                }
                navigate(`/BookNow/${user.data?.specialist_info?.id}`);
              }}
            >
              <FormattedMessage id="bookNow" />
            </button>
          </div>
        </>
      ) : (
        <Myprofile user={user} />
      )}
    </div>
  );
};

export default Profile;

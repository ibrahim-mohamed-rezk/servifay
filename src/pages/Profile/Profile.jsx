import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserLogin from "../../hooks/useUserLogin";
import styles from "./profile.module.css";
import { Avatar } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useSelector } from "react-redux";
import hema from "../../assets/images/hema.jpeg";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import backendURL from "../../axios/backend";
const Profile = () => {
  const navigate = useNavigate();
  const userLogin = useUserLogin();
  const user = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!userLogin) {
      navigate("/login");
    }
  }, [navigate, userLogin]);

  // const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(hema);
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
      // setSelectedFile(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handelVerfyEmail = () => {
    backendURL
      .post("/send-verification-code", { email: user.email })
      .then(() => {
        navigate("/verifayEmail");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container flex-col-c">
      <div className={`${styles.avatarSection} flex-col-c`}>
        <div
          className={styles.avatarWrapper}
          onMouseEnter={handleAvatarHover}
          onMouseLeave={handleAvatarHoverOut}
        >
          <Avatar
            sx={{ width: 120, height: 120, cursor: "pointer" }}
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
      </div>
      {/* user information */}
      <div className={`${styles.userInfoCard} flex-col-c`}>
        <div className={`${styles.info}`}>
          <div className={`${styles.text}`}>
            <label htmlFor="username">Username</label>
            <span>{user.name}</span>
          </div>
          <button>Edit</button>
        </div>
        <div className={`${styles.info}`}>
          <div className={`${styles.text}`}>
            <label htmlFor="email">Email</label>
            <span>{user.email}</span>
          </div>
          {user.email_active === "Yes" ? (
            <CheckBoxRoundedIcon sx={{ color: "#51f429", fontSize: "30px" }} />
          ) : (
            <OrangeButton
              onClick={handelVerfyEmail}
              $w="90px"
              $h="36px"
              $m="0"
              $p="5px"
            >
              Verify email
            </OrangeButton>
          )}
        </div>
        <div className={`${styles.info}`}>
          <div className={`${styles.text}`}>
            <label htmlFor="phone">Phone</label>
            <span>{user.phone}</span>
          </div>
          <button>Edit</button>
        </div>
        <div className={`${styles.info}`}>
          <div className={`${styles.text}`}>
            <label htmlFor="address">Address</label>
            <span>egypt-damitta-domyat</span>
          </div>
          <button>Edit</button>
        </div>
        <div className={`${styles.info}`}>
          <div className={`${styles.text}`}>
            <label htmlFor="gender">Gender</label>
            <span>male</span>
          </div>
        </div>
        <div className={`${styles.info}`}>
          <div className={`${styles.text}`}>
            <label htmlFor="country">Country</label>
            <span>egypt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

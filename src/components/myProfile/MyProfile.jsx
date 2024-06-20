import styles from "./myProfile.module.css";
import avatar from "../../assets/images/profile/avatar.png";
import { FormattedMessage } from "react-intl";

const ProfileCard = ({ user }) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <img
          src={user.image !== "Not Found" ? user.image : avatar}
          alt="Profile"
          className={styles.profilePicture}
        />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.profileItem}>
          <div className={styles.itemInfo}>
            <label>
              <FormattedMessage id="username" />
            </label>
            <span>{user.name}</span>
          </div>
          <a href="#edit" className={styles.editLink}>
            <FormattedMessage id="edit" />
          </a>
        </div>
        <div className={styles.profileItem}>
          <div className={styles.itemInfo}>
            <label>
              <FormattedMessage id="email" />
            </label>
            <span className={styles.email}>{user.email}</span>
          </div>
          {user.email_active === "No" ? (
            <a href="#edit" className={styles.editLink}>
              <FormattedMessage id="active" />
            </a>
          ) : (
            <button className={styles.checkmark}>
              <span>&#x2714;</span>
            </button>
          )}
        </div>
        <div className={styles.profileItem}>
          <div className={styles.itemInfo}>
            <label>
              <FormattedMessage id="phoneNumber" />
            </label>
            <span>{user.phone}</span>
          </div>
          <a href="#edit" className={styles.editLink}>
            <FormattedMessage id="edit" />
          </a>
        </div>
        <div className={styles.profileItem}>
          <div className={styles.itemInfo}>
            <label>
              <FormattedMessage id="address" />
            </label>
            <span>{user.governorate}</span>
          </div>
          <a href="#edit" className={styles.editLink}>
            <FormattedMessage id="edit" />
          </a>
        </div>

        <div className={styles.profileItem}>
          <div className={styles.itemInfo}>
            <label>
              <FormattedMessage id="country" />
            </label>
            <span>{user.country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

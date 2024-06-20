import { Link, useNavigate } from "react-router-dom";
import styles from "../login/login.module.css";
import { useState } from "react";
import OrangeButton from "../../styled-components/buttons/OrangeButton";
import backendURL from "../../axios/backend";
import handleGoogleSignIn from "../../firebase/loginWithGoogle";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/auth/authSlice";
import LoginIllustration from "../../assets/svg/LoginIllustration";
import GoogleLogniBtn from "../../assets/svg/GoogleLogniBtn";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseConf } from "../../firebase/firebase-init";
import { toast } from "react-toastify";

const Rejester = () => {
  const [fromData, setFromData] = useState({
    country_id: "1",
    governorate_id: "1",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firestoreDB = getFirestore(firebaseConf);

  const handelSubmit = (event) => {
    event.preventDefault();
    backendURL
      .post("/register", fromData)
      .then((res) => {
        setDoc(doc(firestoreDB, "userChats", `${res.data.data.id}`), {
          chats: [],
        }).then(() => {
          toast.success("User Create Account Successfully");
          navigate("/login");
        });
      })
      .catch((error) => {
        toast.error(error.message || "Error ");
        toast.error("Error occurred! Please try again.");
      });
  };

  const googleLogin = () => {
    handleGoogleSignIn()
      .then((res) => {
        const userId = res.data.data.id;
        const userDocRef = doc(firestoreDB, "userChats", `${userId}`);

        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              console.log("User document already exists, skipping update");
            } else {
              setDoc(userDocRef, { chats: [] })
                .then(() => {
                  console.log("User document created successfully");
                })
                .catch((error) => {
                  console.error("Error creating user document:", error);
                });
            }

            localStorage.setItem(
              "user",
              JSON.stringify({ ...res.data.data, isLoggedIn: true })
            );
            dispatch(setLogin(res.data.data));
            toast.success("User account created successfully");
            navigate("/");
          })
          .catch((error) => {
            console.error("Error fetching user document:", error);
            toast.error(error.message || "Error occurred! Please try again.");
          });
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        toast.error(error.message || "Error occurred! Please try again.");
      });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
        <h1 className="mt-30">servifay</h1>
        <LoginIllustration />
        <h2>Online Community For The daily business</h2>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.loginMobileLogo}>logo</div>
        <h2 className={styles.brawserWelcomeText} style={{ marginTop: "30px" }}>
          SIGN UP
        </h2>
        <div className={styles.authWith}>
          <div className={styles.authWithChiled} onClick={googleLogin}>
            <GoogleLogniBtn />
          </div>
          {/* <div className={styles.authWithChiled}>
            <GoogleLogniBtn />
          </div> */}
        </div>
        <div className={styles.loginForm}>
          <form>
            <div className={styles.inputGroup}>
              <label>UserName</label>
              <input
                type="text"
                onChange={(event) => {
                  setFromData((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }));
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                onChange={(event) => {
                  setFromData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => {
                  setFromData((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                onChange={(event) => {
                  setFromData((prev) => ({
                    ...prev,
                    password_confirmation: event.target.value,
                  }));
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input
                type="number"
                onChange={(event) => {
                  setFromData((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }));
                }}
              />
            </div>
            <OrangeButton
              onClick={handelSubmit}
              type="submit"
              $w="50%"
              $m="0 auto 1.5em auto"
            >
              Register
            </OrangeButton>
          </form>
        </div>
        <div
          className={styles.loginMobileGoToRejester}
          style={{ marginBottom: "40px" }}
        >
          Already have an account?{" "}
          <Link
            style={{
              color: "#ff9300",
              textDecoration: "none",
              display: "inline",
            }}
            to={"/login"}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rejester;

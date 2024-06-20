// handleGoogleSignIn.js
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import backendURL from "../axios/backend.js";
import { firebaseConf } from "./firebase-init.js";

const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider(firebaseConf);
  const auth = getAuth();

  return signInWithPopup(auth, provider)
    .then((result) => {
      const data = backendURL.post(
        `/login/google/callback/${result.user.uid}`,
        { country_id: 1, governorate_id: 10 }
      );
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export default handleGoogleSignIn;

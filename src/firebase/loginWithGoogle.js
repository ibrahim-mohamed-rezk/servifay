// handleGoogleSignIn.js
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import backendURL from "../axios/backend.js";
import { firebaseConf } from "./firebase-init.js";

const handleGoogleSignIn = () => {
  const provider = new GoogleAuthProvider(firebaseConf);
  const auth = getAuth();

  return signInWithPopup(auth, provider)
    .then((result) => {
      return backendURL.get(`/login/google/callback/${result.user.uid}`);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export default handleGoogleSignIn;

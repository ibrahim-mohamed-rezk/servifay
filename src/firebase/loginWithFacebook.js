import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import backendURL from "../axios/backend.js";
import { firebaseConf } from "./firebase-init.js";

const handleFacebookSignIn = () => {
  const provider = new FacebookAuthProvider(firebaseConf);
  const auth = getAuth();

  return signInWithPopup(auth, provider)
    .then((result) => {
      return backendURL.get(`/login/facebook/callback/${result.user.uid}`);
    })
    .catch((error) => {
      throw error;
    });
};

export default handleFacebookSignIn;

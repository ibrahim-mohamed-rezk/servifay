import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const useCurrentProfile = () => {
  const location = useLocation();
  const myProfile = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.profile);
  if (location.pathname.split("/")[2] === undefined) {
    return myProfile;
  } else {
    return userProfile;
  }
};

export default useCurrentProfile;

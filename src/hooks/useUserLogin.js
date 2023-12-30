import { useState, useEffect } from "react";

const useUserLogin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userLogin, setUserLogin] = useState(
    user !== null ? user.isLoggedIn === true && user.token !== "" : false
  );
  useEffect(() => {
    if (user != null) {
      if (user?.isLoggedIn === true && user?.token !== "") {
        setUserLogin(true);
      } else {
        setUserLogin(false);
      }
    } else {
      setUserLogin(false);
    }
  }, [user]);

  return userLogin;
};

export default useUserLogin;

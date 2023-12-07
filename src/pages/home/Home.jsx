import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((data) => data.auth);
  return (
    // just for test
    <>
      <div>{user.name !== "" ? `hello..! ${user.name} ` : "pleas login"}</div>
    </>
  );
};

export default Home;

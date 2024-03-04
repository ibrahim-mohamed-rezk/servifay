import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeroSecton from "../../components/hero-section/HeroSecton";

const Home = () => {
  const user = useSelector((data) => data.auth);
  return (
    // just for test
    // <>
    //   <div>{user.name !== "" ? `hello..! ${user.name} ` : <>please <Link to={`/login`}>login</Link></>}</div>
    // </>
    <div>
      <HeroSecton />
    </div>
  );
};

export default Home;

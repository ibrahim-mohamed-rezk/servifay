import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        textAlign: "center",
        color: "#FF9300",
        flexDirection: "column",
        marginTop: "50px",
        fontWeight: "bolder",
      }}
    >
      <h1 style={{ fontSize: "2em" }}>404</h1>
      <p style={{ fontSize: "1.5em", color: "#000" }}>Page not found!</p>
      <p>Oops! The page you are looking for does not exist.</p>
      <p style={{ color: "#000" }}>
        Try checking the URL or go back to the
        <Link to={`/`}>
          <span style={{ color: "#FF9300" }}>Home</span>
        </Link>
        .
      </p>
    </div>
  );
};

export default Page404;

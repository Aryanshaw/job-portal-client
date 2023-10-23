import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <img
        src={require("../../assets/image/loader-icon.png")}
        alt=""
        className="loader-icon"
      />
      <p>Loading awesome content for you</p>
    </div>
  );
};

export default Loader;

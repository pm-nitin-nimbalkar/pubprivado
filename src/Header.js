// src/components/Header.js
import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
        <div style={logoStyle}>
            <img src="https://cdn.pubmatic.com/common/pmcc/latest/img/pubmatic-logo-sm.png" alt="Company Logo" style={logoImageStyle} />
            <h1>Compliance Analyser</h1>
        </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#1d2b41",
  color: "#fff",
  paddingLeft: "20px",
  fontSize: "14px"
};


const logoStyle = {
    display: "flex",
    alignItems: "center",
   // justifyContent: "center",
  };
  
  const logoImageStyle = {
    // width: "40px",
    // height: "40px",
    marginRight: "1rem",
  };

export default Header;

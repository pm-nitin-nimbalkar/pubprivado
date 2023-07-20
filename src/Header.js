// src/components/Header.js
import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Compliance Analyser</h1>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#4fc8ed",
  color: "#fff",
  paddingLeft: "20px",
  fontSize: "14px"
};

export default Header;

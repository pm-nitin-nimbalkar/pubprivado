// src/components/Sidebar.js
import React, { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { grey } from '@mui/material/colors';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div style={sidebarStyle}>
        
      <ul style={listStyle}>
        <li
          onClick={() => handleItemClick("Dashboard")}
          style={activeItem === "Dashboard" ? activeListItemStyle : listItemStyle}
        >
          <HomeIcon sx={{color: grey[700], marginTop: "10px" }}/> <span>Dashboard</span>
        </li>
        {/* <li
          onClick={() => handleItemClick("About")}
          style={activeItem === "About" ? activeListItemStyle : listItemStyle}
        >
          About
        </li>
        <li
          onClick={() => handleItemClick("Contact")}
          style={activeItem === "Contact" ? activeListItemStyle : listItemStyle}
        >
          Contact
        </li> */}
        {/* Add more navigation items here */}
      </ul>
    </div>
  );
};

const sidebarStyle = {
  backgroundColor: "#f4f4f4",
  height: "100%",
  width: "200px",
  //padding: "1rem",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  cursor: "pointer",
  padding: "0px"
};

const listItemStyle = {
  //padding: "0.5rem 1rem",
};

const activeListItemStyle = {
  //backgroundColor: "#007BFF",
  color: "grey",
  fontWeight: 900,
  padding: "0.5rem 1rem",
};

export default Sidebar;

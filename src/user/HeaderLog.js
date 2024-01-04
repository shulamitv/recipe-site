import React from "react";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../Image/homePage.jpg"; 
const HeaderLog = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem", 
        }}
      >
        <Link
          to="/SignUp"
          style={{
            color: 'red',
            fontSize: 18,
            textDecoration: 'none',
            backgroundColor: 'transparent',
            padding: '0.9rem 3rem',
            borderRadius: '10px',
            borderColor: 'white',
            borderWidth: '2px',
            boxShadow: '0 0 10px 6px #222',
              }}
        >
          הרשמה
        </Link>
        <Link
        to="/LogIn"
        style={{
          color: 'red',
          fontSize: 18,
          textDecoration: 'none',
          backgroundColor: 'transparent',
          padding: '0.9rem 3rem',
          borderRadius: '10px',
          borderColor: 'white',
          borderWidth: '2px',
          boxShadow: '0 0 10px 6px #222',
          
            }}
        >
          כניסה
        </Link>
      </div>
    </Paper>
  );
};
export default HeaderLog;

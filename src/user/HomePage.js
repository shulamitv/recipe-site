import React from "react";
import { Box, Paper, TextField, Button } from '@mui/material';
import backgroundImage from "../Image/homePage.jpg"; 
import { useNavigate } from "react-router-dom";
import HeaderMenu from './HeaderMenu';
const HomePage = () => {
  return (<>
   <HeaderMenu></HeaderMenu>
     <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'black',
          padding: '1rem',
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      </div> 
  </>);
}
export default HomePage
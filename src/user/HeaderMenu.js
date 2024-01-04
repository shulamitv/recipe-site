import React from "react";
import { Box, Paper, TextField, Button } from '@mui/material';
import backgroundImage from "../Image/homePage.jpg"; 
import { useNavigate } from "react-router-dom";
const HeaderMenu = () => {
  const naving = useNavigate();
  const nav = () => {
    naving("/AllRecipes")
  }
  const nav2 = () => {
    naving("/AddRecipe")
  }
  const nav3 = () => {
    naving("/DisplayCategory")
  }
  const nav4 = () => {
    naving("/Shoppinglist")
  }
  return (<>
   
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'black',
          padding: '1rem',
        }}
      >

        <button
          onClick={() => nav()}
          style={{
            fontSize: 18,
            textDecoration: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            padding: '0.9rem 3rem',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 10px 6px #222',
          }}

        >
          להצגת המתכונים      </button>
        <button
          onClick={() => nav2()}
          style={{
            fontSize: 18,
            textDecoration: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            padding: '0.9rem 3rem',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 10px 6px #222',
          }}
        >
          להוספת מתכון      </button>
        <button
          onClick={() => nav3()}
          style={{
            fontSize: 18,
            textDecoration: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            padding: '0.9rem 3rem',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 10px 6px #222',
          }}
        >
          להצגת הקטגוריות      </button>
        <button
          onClick={() => nav4()}
          style={{
            fontSize: 18,
            textDecoration: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            padding: '0.9rem 3rem',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 10px 6px #222',
          }}
        >
          לרשימת הקניות      </button>
      </div>
  </>);
}
export default HeaderMenu
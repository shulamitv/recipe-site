import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { Button } from '@mui/base';
import { TextField, Grid } from '@mui/material';
import { useRef } from "react";
import { Box } from "@mui/material";
import Paper from '@mui/material/Paper';
import backgroundImage from "../Image/homePage.jpg";
const SignUp = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const recipeData = useSelector(state => state?.resipes)
  const schema = yup.object({
    Username: yup.string().required('Username is required').max(20, 'Username must be less than 20 characters'),
    Password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    Name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    Phone: yup.string().required('Phone is required').min(8, 'Phone must be at least 8 characters'),
    Email: yup.string().required('Email is required').email('Invalid email format'),
    Tz: yup.string(),
  });
  const formRef = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios.post(`http://localhost:8080/api/user/sighin`, data)
      .then((response) => {
        dispatch({ type: "GET_USER", data: response.data })
        console.log("fatchdata")
        //קריאת שרת לכל המתכונים
        axios.get(`http://localhost:8080/api/recipe`)
          .then(response => {
            const fetchData = response.data;
            dispatch({ type: 'GET_RECIPES', data: fetchData })
          })
        navigation('/LogIn');
      })
      .catch((error) => {
        console.error((error.response.data));
      });
  };
  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        sx={{
          padding: '2rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0)',
        }}
      >
        {Object.entries(errors).map(([fieldName, error]) => (
          <p key={fieldName}>{error.message}</p>
        ))}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            {...register('Username')}
            label="שם משתמש"
            variant="outlined"
            fullWidth
            margin="normal"
            style={{ borderColor: 'white', color: 'white' }}
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}

          />
          <TextField
            {...register('Password')}
            label="סיסמה"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            style={{ borderColor: 'white', color: 'white' }}
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}


          />
          <TextField
            {...register('Name')}
            label="שם"
            variant="outlined"
            fullWidth
            margin="normal"
            style={{ borderColor: 'white', color: 'white' }}
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}


          />
          <TextField
            {...register('Phone')}
            label="טלפון"
            variant="outlined"
            fullWidth
            margin="normal"
            style={{ borderColor: 'white', color: 'white' }}
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}


          />
          <TextField
            {...register('Email')}
            label="מייל"
            variant="outlined"
            fullWidth
            margin="normal"
            style={{ borderColor: 'white', color: 'white' }}
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}

          />
          <TextField
            {...register('Tz')}
            label="מזהה"
            variant="outlined"
            fullWidth
            margin="normal"
            style={{ borderColor: 'white', color: 'white' }}
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}

          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}
            style={{
              color: 'red',
              backgroundColor: 'white',
              borderRadius: 10, 
              padding: '15px', 
              fontSize: '16px', 
            }}
          >
            הרשמה
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
export default SignUp;

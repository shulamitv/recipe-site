
import React from 'react';
import { useForm} from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { Box, Paper, TextField, Button } from '@mui/material';
import backgroundImage from "../Image/homePage.jpg";
const LogIn = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const shopping = useSelector(state => state.shoppingList)
  const schema = yup.object({
    Username: yup.string().required('Username is required').max(20, 'Username must be less than 20 characters'),
    Password: yup.string().required('Password is required').min(3, 'Password must be at least 3 characters'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    //קריאת שרת ל USER
    axios.post(`http://localhost:8080/api/user/login`, data)
      .then((response) => {
        const currentUser = response.data;
        dispatch({ type: "GET_USER", data: response.data })
        //קריאת שרת לכל המתכונים
        axios.get(`http://localhost:8080/api/recipe`)
          .then(response => {
            const fetchData = response.data;
            dispatch({ type: 'GET_RECIPES', data: fetchData })
          })
          .catch(error => {
            alert((error.response.data));
          });

        axios.get(`http://localhost:8080/api/bay/${currentUser.Id}`)
          .then(response => {
            const fetchData = response.data;
            dispatch({ type: 'GET_SHOPPINGLIST', data: fetchData })
          })
          .catch(error => {
            alert((error.response.data));
          });
        //לקטגוריות
        axios.get(`http://localhost:8080/api/category`)
          .then(response => {
            const fetchData = response.data;
            dispatch({ type: 'GET_CATEGORY', data: fetchData })
          })
          .catch(error => {
            alert((error.response.data));
          });
        navigation('/HomePage');
      })
      .catch((error) => {
        alert((error.response.data));
        navigation('/SignUp')
      });

  }

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
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}
            margin="normal"
          />
          <TextField
            {...register('Password')}
            label="סיסמה"
            variant="outlined"
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}
            margin="normal"
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ color: 'red', backgroundColor: 'white' }}
          >
            כניסה
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
export default LogIn;

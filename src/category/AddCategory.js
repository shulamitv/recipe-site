import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import HeaderMenu from '../user/HeaderMenu';
import { Box, Paper, TextField, Button } from '@mui/material';
import backgroundImage from "../Image/homePage.jpg";
const AddCategory = () => {
  const dispatch = useDispatch();
  const schema = yup.object({
    Name: yup.string().required('שם קטגוריה הינו שדה חובה').max(20, 'שם קטגוריה יכיל מקסימום 20 תוים'),
    Id: yup.string().required('מזהה הינו שדה חובה').max(8, 'מזהה יכיל מקסימום 8 תוים'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema), 
  });
  const onSubmit = (data) => {
    axios.post(`http://localhost:8080/api/category`, data)
      .then((response) => {
        console.log("response: ", response.data)
        dispatch({ type: "ADD_CATEGORY", data: response.data })
        alert("קטגוריה נוספה בהצלחה :)")
      })
      .catch((error) => {
        console.log(error)
        alert((error.response.data));
      });
  };
  return (<>
    <HeaderMenu></HeaderMenu>
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
            {...register('Name')}
            label="שם"
            variant="outlined"
            type="text" placeholder="Enter your name"
            style={{ borderColor: 'white', color: 'white' }}
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}
            margin="normal"
          />
          <TextField
            {...register('Id')}
            label="מזהה"
            variant="outlined"
            margin="normal"
            type="number"
            placeholder="Enter your id"
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
              borderRadius: 8, 
              padding: '10px', 
              fontSize: '16px', 
            }}
          >
            הוספה
          </Button>
        </form>
      </Paper>
    </Box>
  </>
  );
};
export default AddCategory;

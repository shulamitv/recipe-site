
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useState } from "react";
import HeaderMenu from "../user/HeaderMenu";
import { Box,Grid, Button, Checkbox, TextField } from '@mui/material';
import backgroundImage from "../Image/homePage.jpg"; 
const ShoppingList = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state?.user.Id);
  const listdata = useSelector((state) => state?.shoppingList)
  const [checked, setChecked] = useState([]);
  const [editCountProduct, seteditCountProduct] = useState(0);
  const deleteProduct = (x) => {
    axios.post(`http://localhost:8080/api/bay/Delete/${x.Id}`)
      .then(response => {
        dispatch({ type: "DELETE_PRODUCT", data: x.Id })
        alert("המוצר נמחק בהצלחה:)")
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }
  const editProductCount = (x) => {
    axios.post(`http://localhost:8080/api/bay/Delete/${x.Id}`)
    .then(response => {
            dispatch({type:"DELETE_PRODUCT",data:x.Id})
            axios.post(`http://localhost:8080/api/bay`, { Name: x.Name, UserId: userId, Count: editCountProduct, Id: 2 })
            console.log("edicountProduct:",editCountProduct)
           .then(response => {
             console.log("response.data",response.data)
dispatch({ type: "ADD_PRODUCT", data: response.data })
          })
        })
            .catch(error => {
                console.error(error);
            });
    }

  const handleChangeCheckbox = (index, product) => {
    const newChecked = [...checked];
    if (newChecked[index]) {
      { deleteProduct(product) }
      newChecked.splice(index, 1);
      setChecked(newChecked)
    }
    else {
      newChecked[index] = !newChecked[index]
      setChecked(newChecked);
    }
  }
  return (
    <>
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
    <Grid container spacing={2} direction="column" alignItems="center">
      {listdata?.map((x, index) => (
        <Grid item key={x.Id} sx={{ border: '1px solid white', padding: '1em', borderRadius: '8px', marginBottom: '0.5em' 
        }}>
          <div>
          <Grid container direction="row" alignItems="center">
              <span style={{ fontSize: '1.2em', marginLeft: '5em', color: 'white' }}>{x.Name}</span>
              <span style={{ fontSize: '1.2em', marginLeft: '3em', color: 'white' }}>{x.Count}</span>
            </Grid>
            <Button style={{ color: 'white' }} onClick={() => deleteProduct(x)}>
              מחיקה
            </Button>
            <TextField
              type="number"
              defaultValue="הכנס עדכון כמות"
              onChange={(e) => seteditCountProduct(e.target.value)}
              sx={{ color: 'white', width: '80px', fontSize: '0.5em' }}
            InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}

            />
            <Button style={{ color: 'white' }} onClick={() => editProductCount(x)}>
              עדכון כמות
            </Button>
          
            <div>
              <label style={{color:'white'}}>קניתי מוצר?</label>
              <Checkbox
                checked={checked[index] || false}
                onChange={() => handleChangeCheckbox(index, x)}
                value="checked"
                style={{ color: 'white' }}
              />
            </div>
           
          </div>
        </Grid>
      ))}
    </Grid>
    </Box>
    </>
  )
}
export default ShoppingList
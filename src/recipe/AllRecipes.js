import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Grid, Button } from '@mui/material';
import HeaderMenu from '../user/HeaderMenu';
const AllRecipes = () => {
  const navigate = useNavigate()
  const recipes = useSelector(state => state.resipes)
  const categories = (useSelector((state) => state?.category))
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [categoryId, setCategoryId] = useState()
  const [duration, setDuration] = useState()
  const [difficulty, setDifficulty] = useState()
  useEffect(() => {
    setFilteredRecipes(recipes.filter(f => (!categoryId || f.CategoryId == categoryId) && (!duration || f.Duration <= duration) && (!difficulty || f.Difficulty <= difficulty)))
  }, [categoryId, duration, difficulty])
  return (<>
    <HeaderMenu></HeaderMenu>
    <Fragment>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'black',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <select
            onChange={(i) => setCategoryId(i.target.value)}
            style={{
              width: '150px',
              borderRadius: '8px',
              padding: '0.5rem',
              border: '1px solid #222',
              backgroundColor: '(rgba(255, 255, 255, 0.8)',
              marginRight: '10px', // Add space between the selects
            }}
          >
            <option>קטגוריה</option>
            {categories?.map((c) => (
              <option key={c.Id} value={c.Id}>
                {c.Name}
              </option>
            ))}
          </select>
          <select
            onChange={(d) => setDuration(d.target.value)}
            style={{
              width: '150px',
              borderRadius: '8px',
              padding: '0.5rem',
              border: '1px solid #222',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <option>זמן הכנה</option>
            {recipes?.map((c) => (
              <option key={c.Id} value={c.Duration}>
                {"דקות "}
                {c.Duration}
              </option>
            ))}
          </select>
          <select
            onChange={(d) => setDifficulty(d.target.value)}
            style={{
              width: '150px',
              borderRadius: '8px',
              padding: '0.5rem',
              border: '1px solid #222',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <option>קושי</option>
            {recipes?.map((c) => (
              <option key={c.Id} value={c.Difficulty}>
                {c.Difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(to bottom, black, black)', minHeight: '100vh' }}>
        <Grid container spacing={2}>
          {filteredRecipes?.map((x) => (
            <Grid item key={x.Id} xs={12} sm={6} md={4}>
              <div style={{ height: '300px', marginBottom: '10px', position: 'relative' }}>
                <div>{x?.Name}</div>
                <img
                  src={x.Img}
                  alt="Recipe"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                />
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    onClick={() => navigate("/DisplayRecipe", { state: x })}
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: 'brown', color: 'white', '&:hover': { backgroundColor: '#222', color: 'white' } }}
                  >
                    להצגת המתכון
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  </>
  );
};
export default AllRecipes;




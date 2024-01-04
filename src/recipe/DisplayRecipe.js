import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Grid, Button } from '@mui/material';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import HeaderMenu from '../user/HeaderMenu';
import axios from "axios";
const DisplayRecipe = () => {
  const oncli = () => { window.print(); }
  const dispatch = useDispatch();
  const userId = useSelector(state => state?.user.Id)
  const AdminUser = "ShulamitBrachi";
  const naving = useNavigate();
  const { state } = useLocation();
  const selectRecipe = state;
  const deleteRecipe = (x) => {
    axios.post(`http://localhost:8080/api/recipe/Delete/${x.Id}`)
      .then(response => {
        dispatch({ type: "DELETE_RECIPE", data: x.Id })
        alert("the recipe deleted successfuly")
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });

  }
  const addProduct = (x) => {
    axios.post("http://localhost:8080/api/bay", { Name: x.Name, UserId: userId, Count: x.Count, Id: 2 })
    .then( () => {
      dispatch({ type: "ADD_PRODUCT", data: x })
      alert("המוצר נוסף בהצלחה:)")
    })
      .catch(error => {
        alert((error.response.data));
      });
  }
  return (<>
    <HeaderMenu></HeaderMenu>
    <div style={{backgroundColor:'black'}}>
      <button
        onClick={oncli}
        style={{
          backgroundColor: 'black',
           color: 'white',
          padding: '15px',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <i style={{ marginRight: '5px' }} className="fas fa-print" /> להדפסת המתכון
      </button>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      <h1 style={{ color: '#6d3d1e' }}>{state.Name}</h1>
      <img src={state.Img} alt="Recipe" />
      <h2>{state.Description}</h2>
      <h2 style={{ color: '#6d3d1e', fontSize:'20px' }}>קטגוריה: {state.CategoryId}</h2>
      <h2 style={{ color: '#6d3d1e', fontSize:'20px' }}>זמן הכנה: {state.Duration} דקות</h2>
      <h2 style={{ color: '#6d3d1e', fontSize:'20px' }}>קושי: {state.Difficulty}</h2>
      <h2 style={{ color: '#6d3d1e', fontSize:'20px' }}>מצרכים:</h2>
      {state.Ingrident?.map((x) => (
        <div key={x.Name} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>{x.Count} {x.Name} {x.Type}</p>
          <button
            onClick={() =>addProduct(x)}
            style={{
              backgroundColor: '#6d3d1e',
              color: 'black',
              padding: '0.5px 0.5px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            להוספה לרשימת הקניות
          </button>
        </div>
      ))}
      <h2 style={{ color: '#6d3d1e' }}>הוראות הכנה</h2>

      {state.Instructions?.map((x, index) => (
        <div key={index}>{x}</div>
      ))}
      <Grid item xs={12} style={{ width: '50%', margin: 'auto' }}>
        <Button
          onClick={() => deleteRecipe(selectRecipe)}
          disabled={selectRecipe.UserId !== userId}
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#6d3d1e', color: 'white', '&:hover': { backgroundColor: 'white', color: 'brown' } }}
        >
          למחיקת מתכון
        </Button>
      </Grid>
      <Grid item xs={12} style={{ width: '50%', margin: 'auto' }}>
        <Button
          disabled={selectRecipe.UserId !== userId && userId !== AdminUser}
          onClick={() => naving("/AddRecipe", { state: selectRecipe })}
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#6d3d1e', color: 'white', '&:hover': { backgroundColor: 'white', color: '#6d3d1e' } }}
        >
          עדכון מתכון
        </Button>
      </Grid>
    </div>
  </>
  )
}
export default DisplayRecipe;


























import HeaderLog from './user/HeaderLog';
import './App.css';
import SignUp from './user/SignUp';
import { Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import LogIn from './user/LogIn';
import HomePage from './user/HomePage';
import AllRecipes from './recipe/AllRecipes';
import AddRecipe from './recipe/AddRecipe';
import DisplayRecipe from './recipe/DisplayRecipe';
import DisplayCategory from './category/DisplayCategory';
import AddCategory from './category/AddCategory'
import ShoppingList from './shoppingList/Shoppinglist';
import HeaderMenu from './user/HeaderMenu';
function App() {
  return (<>
    <Routes>
     <Route path="/" element={<HeaderLog/>}/> 
    <Route path="/SignUp" element={<SignUp/>}/>   
    <Route path="/LogIn" element={<LogIn/>}/> 
    <Route path="/HomePage" element={<HomePage/>}/>  
    <Route path="/AllRecipes" element={<AllRecipes/>}/>  
    <Route path="/AddRecipe" element={<AddRecipe/>}/>
    <Route path="/DisplayRecipe" element={<DisplayRecipe/>}/>
    <Route path="/DisplayCategory" element={<DisplayCategory/>}/>
    <Route path="/AddCategory" element={<AddCategory/>}/>
    <Route path="/ShoppingList" element={<ShoppingList/>}/>
    <Route path="/HeaderMenu" element={<HeaderMenu/>} ></Route>
  </Routes>
</>);
}
export default App;

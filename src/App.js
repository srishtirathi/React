import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';

const App=()=>{
const APP_ID='3a76d14b'
const APP_KEY='9c68e994a6351caa87fd417b4ed5f18d'

const [recipes,setRecipes]=useState([]);
const [search,setSearch]=useState('');
const [query,setQuery]=useState('pizza')

useEffect(()=>{
getRecipes();
},[query])

const getRecipes= async()=>{
  const response= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data=await response.json();
  console.log(data.hits);
  setRecipes(data.hits);
  console.log(data.hits)
}

const updateSearch=e=>{
  setSearch(e.target.value);
}

const getSearch=e=>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
} 
  return(
    <div className="App">
    <h1 className="heading">Cook ,Eat ,Repeat</h1>
    <h3 className="heading">Search your favourite recipes</h3>
    <form onSubmit={getSearch} className="search-form">
    <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
    <button type="submit" className="search-button">Search</button>
    </form>
    <div className="recipes">
   {
     recipes.map(recipe=>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
     ))
   }
   </div>
    </div>
  )
}

export default App;

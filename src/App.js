import React,{useEffect , useState} from 'react';
import Recipe from "./recipe";
import "./App.css";

const App=() => {

  const APP_ID = "6a331ca5";
  const APP_KEY = "6c048bc3d42e2353da30d23272ee2b44";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch]= useState("");
  const [query, setQuery] = useState('chicken')


  useEffect(() => {
    getRecipes();
  }, [query]);
  const getRecipes= async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }
 const updateSearch = e => {
  setSearch(e.target.value);
 }
const getsearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return (
    <div className="app">
      <form onSubmit={getsearch}  className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
           search
        </button>
      </form>
      <div className="recepies">
      {recipes.map(recipe => (<Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
        ))} 
      </div>
    </div>
  );
}

export default App;


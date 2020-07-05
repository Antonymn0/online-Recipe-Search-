import React, {useState} from 'react';
import SingleRecipe from './SingleRecipe.js'

export default function App() {
  
  
  const APP_ID = '74297ddd'
  const APP_KEY = '72f971ad082fafc08d206a1300a1d0c2'
 

  //initialize usteState
  const [Recipes, setRecipes] = useState([])
  const [searchTerm , setsearchTerm ] = useState('')
  const [errtxt, seterrtxt] = useState('')
  
  //build API fetch string
  var REQUEST = `https://api.edamam.com/search?q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY} `

// fetch data from the API 
  const fetchAPI = async () => {
    if(searchTerm){
      seterrtxt('')
     try {
        var responce = await fetch(REQUEST)
        var data = await responce.json()
        console.log('Fetching data...')
        console.log(data.hits)
        setRecipes(data.hits)
     } catch (err) {
        console.log(err)
     } } else {
       seterrtxt('* Please type something *')
     }
  }
  return (
     
    <div className="todo-list-app"> 
    <div className='badgediv'>
       <h1 className='header'> Search for recipe</h1> 
     <div id="edamam-badge" data-color="white" className='Ebadge'> Edamam </div>
      </div>
       <div className='seachbar-container'> 
       <input type='text'  
       placeholder='Search here...' className='search-bar'
        onChange={(e)=> setsearchTerm (e.target.value) }/>
        <button className='search-button' onClick={fetchAPI}>Search </button>
        
       
</div> <div className='typingErr'>{errtxt} </div>

        <div className='recipeContainer'> 
        {/* display recipes */ }
        { Recipes.map( recipe => (
          <div className='recipe'> 
            <h2 className='recipeHeader'>  {recipe.recipe.label}</h2>
            {/* display ingridients */}
            <h3 className='ingridients'> Ingredients </h3> 
             <ol className='ingridients-orderlist'> 
            {recipe.recipe.ingredientLines.map( ingridient => (           
                  <li className='listElement'> {ingridient}</li>            
          ) ) }
           </ol>
          <p className='calories'> Calories: {Math.round(recipe.recipe.calories *100)/100} </p>
        <img src={recipe.recipe.image} className='image' />
        </div>
     ) )  }
</div> 

    </div>
  )
}

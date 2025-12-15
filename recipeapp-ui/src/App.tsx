import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import { NavBar } from './components/NavBar'
import { Home } from './components/Home'
import { RecipeList } from './components/RecipeList'
import { SchoppingList as ShoppingList } from './components/ShoppingList'
import { AddRecipe } from './components/AddRecipe'
import type { Recipe } from './types'

function App() {
  // const [refreshKey, setRefreshKey] = useState(0);

  // const handleRecipeCreated = (recipe: Recipe) => {
  //   console.log("recipe created: ", recipe);
  //   setRefreshKey(prev => prev +1 );
  // }
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/RecipeList' element={<RecipeList />} />
        <Route path='/ShoppingList' element={<ShoppingList />} />
        <Route path='/AddRecipe' element={<AddRecipe/>} />
      </Routes>
    </>
  )
}

export default App

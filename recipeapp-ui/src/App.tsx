import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import { NavBar } from './components/NavBar'
import { Home } from './components/Home'
import { RecipeList } from './components/RecipeList'
import { SchoppingList as ShoppingList } from './components/ShoppingList'
import { AddRecipe } from './components/AddRecipe'
import { RecipeComponent } from './components/RecipeComponent'

import type { RecipeIngredientDetails, Recipe } from './types'

function App() {  
  const [shoppinglist, setShoppinglist] = useState<RecipeIngredientDetails[]>([]);
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<RecipeComponent />} />
        <Route 
          path='/RecipeList' 
          element={<RecipeList shoppinglist={shoppinglist} setShoppinglist={setShoppinglist}/>} />
        <Route 
          path='/ShoppingList' 
          element={<ShoppingList items={shoppinglist}/>} />
        <Route path='/AddRecipe' element={<AddRecipe/>} />
      </Routes>
    </>
  )
}

export default App

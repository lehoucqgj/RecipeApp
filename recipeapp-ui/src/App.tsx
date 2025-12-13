import './App.css'
import { RecipeList } from './components/RecipeList'
import { NavBar } from './components/NavBar'

function App() {
  
  return (
    <>
      <NavBar/>
      <h1 className="text-gray-300 text-4xl mb-2">Recipe App</h1>
      <RecipeList/>
    </>
  )
}

export default App

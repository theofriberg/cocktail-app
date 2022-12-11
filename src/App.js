import Layout from "./components/Layout"
import Home from "./components/Home"
import NewCocktail from "./components/NewCocktail"
import CocktailPage from "./components/CocktailPage"
import EditCocktail from "./components/EditCocktail"
import About from "./components/About"
import Missing from "./components/Missing"
import api from './api/cocktails'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
  const [cocktails, setCocktails] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [cocktailName, setCocktailName] = useState('')
  const [liqourBase, setLiqourBase] = useState('')
  const [cocktailDesc, setCocktailDesc] = useState('')
  const [cocktailImage, setCocktailImage] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await api.get('/cocktails')
        setCocktails(response.data)
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.message)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }

    fetchCocktails()
  }, [])

  useEffect(() => {
    if (filter === 'All') {  
      const filteredResults = cocktails.filter(cocktail =>
        ((cocktail.name).toLowerCase()).includes(search.toLowerCase()))
        setSearchResults(filteredResults)
    } else {
      const filteredResults = cocktails.filter(cocktail =>
        ((cocktail.name).toLowerCase()).includes(search.toLowerCase())
        && ((cocktail.alcoholbase).toLowerCase()).includes(filter.toLowerCase()))
        setSearchResults(filteredResults)
    }
  }, [cocktails, search, filter])

  const handleDelete = async (id) => {
    try {
      await api.delete('/cocktails', {
        data: {
          id: id
        }
      })
      const cocktailList = cocktails.filter(cocktail => cocktail._id !== id)
      setCocktails(cocktailList)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home 
            cocktails={searchResults}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter} />} 
          />
          <Route path="cocktail">
            <Route index element={<NewCocktail 
              cocktails={cocktails} 
              setCocktails={setCocktails} 
              cocktailName={cocktailName}
              setCocktailName={setCocktailName}
              liqourBase={liqourBase}
              setLiqourBase={setLiqourBase}
              cocktailDesc={cocktailDesc}
              setCocktailDesc={setCocktailDesc}
              cocktailImage={cocktailImage}
              setCocktailImage={setCocktailImage} 
              navigate={navigate} />} 
            />
            <Route path=":id" element={<CocktailPage cocktails={cocktails} handleDelete={handleDelete} />} 
            />
            <Route path="edit/:id" element={<EditCocktail 
              cocktails={cocktails} 
              setCocktails={setCocktails} 
              cocktailName={cocktailName}
              setCocktailName={setCocktailName}
              liqourBase={liqourBase}
              setLiqourBase={setLiqourBase}
              cocktailDesc={cocktailDesc}
              setCocktailDesc={setCocktailDesc}
              cocktailImage={cocktailImage}
              setCocktailImage={setCocktailImage}
              navigate={navigate} />} 
            />
          </Route> {/* END COCKTAIL ROUTE */}
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route> {/* END INDEX ROUTE */}
      </Routes>
    </>
  )
}

export default App;

import { useState, useEffect, useContext } from 'react'
import { COCKTAILS_URL } from '../api/apiURL'
import axios from '../api/axios'
import CocktailContext from '../context/CocktailContext'
import Feed from './Feed'
import Pagination from './Pagination'

const Home = () => {
  const { 
    cocktails, setCocktails, 
    liqourList,
    nmbrOfPages, setNmbrOfPages
   } = useContext(CocktailContext)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  
  useEffect(() => {
    const sendQuery = async () => {
      setPage(1)
      try {
        const response = await axios.get(`${COCKTAILS_URL}?page=${page}&search=${search}&alcoholbase=${filter}`)
        const { nmbrOfPages, cocktails } = response.data
        setCocktails(cocktails)
        setNmbrOfPages(nmbrOfPages)
      } catch (err) {
        console.log(err)
      }
    }

    sendQuery()
  }, [search, filter])
  
  const handlePageBack = async () => {
    try {
      const response = await axios.get(`${COCKTAILS_URL}?page=${page - 1}&search=${search}&alcoholbase=${filter}`)
      const cocktails = response.data.cocktails
      setCocktails(cocktails)
      setPage(prev => prev - 1)
    } catch (err) {
      console.log(err)
    }
  }
  
  const handlePageForward = async () => {
    try {
      const response = await axios.get(`${COCKTAILS_URL}?page=${page + 1}&search=${search}&alcoholbase=${filter}`)
      const cocktails = response.data.cocktails
      setCocktails(cocktails)
      setPage(prev => prev + 1)
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <main className="Home">
      <form className="Home__search-form" onSubmit={(e) => e.preventDefault()}>
        <input 
          className="search-form__input"
          type="text"
          htmlFor="Search"
          placeholder="Search cocktails..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
        <label className="search-form__label">Filter liqour base:</label>
        <select 
          className="search-form__select" 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          {liqourList.map(liqour => (
            <option>{liqour}</option>
          ))}
        </select>
      </form>
      {cocktails.length ? (
        <>
          <Feed cocktails={cocktails} />
          <Pagination 
            page={page} 
            nmbrOfPages={nmbrOfPages} 
            handlePageBack={handlePageBack}
            handlePageForward={handlePageForward}
          />
        </>
      ) : (
          <p style={{ marginTop: "2rem" }}>
              No cocktails to display.
          </p>
      )}
    </main>
  )
}

export default Home

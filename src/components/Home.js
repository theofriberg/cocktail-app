import React from 'react'
import Feed from './Feed'

const Home = ({ cocktails, search, setSearch, filter, setFilter }) => {
  const spiritBaseList = [...new Set(cocktails.map(cocktail => cocktail.alcoholbase))]

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
        <label className="search-form__label">Filter spirit base:</label>
        <select 
          className="search-form__select" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          {spiritBaseList.map(spiritBase => (
            <option>{spiritBase}</option>
          ))}
        </select>
      </form>
      {cocktails.length ? (
          <Feed cocktails={cocktails} />
      ) : (
          <p style={{ marginTop: "2rem" }}>
              No cocktails to display.
          </p>
      )}
    </main>
  )
}

export default Home

import React, { useEffect } from 'react'
import api from '../api/cocktails'

const NewCocktail = ({ 
  cocktails, setCocktails, cocktailName, setCocktailName, liqourBase, setLiqourBase, 
  cocktailDesc, setCocktailDesc, cocktailImage, setCocktailImage, navigate
}) => {

  useEffect(() => {
    if (cocktails) {
      setCocktailName('')
      setLiqourBase('')
      setCocktailDesc('')
    }
  }, [cocktails, setCocktailName, setLiqourBase, setCocktailDesc])
  
  
  const handleNewCocktail = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("name", cocktailName)
    data.append("alcoholbase", liqourBase)
    data.append("description", cocktailDesc)
    data.append("cocktailImage", cocktailImage)
    try {
      const response = await api.post('/cocktails', data, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      const allCocktails = [...cocktails, response.data]
      setCocktails(allCocktails)
      setCocktailName('')
      setLiqourBase('')
      setCocktailDesc('')
      setCocktailImage()
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <main className="NewEditCocktail">
      <h2>Create New Cocktail</h2>
      <form className="NewEditCocktail__form" onSubmit={handleNewCocktail}>
        <div className="NewEditCocktail__input-container">
          <label className="nowrap" htmlFor="cocktailName">Cocktail name:</label>
          <input 
            className="NewEditCocktail__input-field"
            id="name" 
            type="text" 
            value={cocktailName}
            onChange={(e) => setCocktailName(e.target.value)}
            required />
        </div>
        <div className="NewEditCocktail__input-container">
          <label className="nowrap" htmlFor="liqourBase">Liqour base:</label>
          <input
            className="NewEditCocktail__input-field"
            id="liqourBase" 
            type="text" 
            value={liqourBase}
            onChange={(e) => setLiqourBase(e.target.value)}
            required />
        </div>
        <div className="NewEditCocktail__input-container">
          <label className="nowrap" htmlFor="cocktailDesc">Description:</label>
          <textarea
            className="NewEditCocktail__textarea"
            id="cocktailDesc"
            value={cocktailDesc}
            onChange={(e) => setCocktailDesc(e.target.value)}
            required
          >
          </textarea>
        </div>
        <div className="NewEditCocktail__input-container">
          <label className="nowrap" htmlFor="cocktailImage">Cocktail image:</label>
          <input 
            id="image" 
            type="file" 
            onChange={(e) => setCocktailImage(e.target.files[0])}
            required />
        </div>
        <button className="text-btn" type="submit">Create</button>
      </form>
    </main>
  )
}

export default NewCocktail
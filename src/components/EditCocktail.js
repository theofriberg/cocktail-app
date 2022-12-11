import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import api from '../api/cocktails'

const EditCocktail = ({
    cocktails, setCocktails, cocktailName, setCocktailName, liqourBase, setLiqourBase, 
  cocktailDesc, setCocktailDesc, cocktailImage, setCocktailImage, navigate
}) => {
    const { id } = useParams()
    const cocktail = cocktails.find(cocktail => (cocktail._id).toString() === id)

    useEffect(() => {
        if (cocktail) {
            setCocktailName(cocktail.name)
            setLiqourBase(cocktail.alcoholbase)
            setCocktailDesc(cocktail.description)
        }
    }, [cocktail, setCocktailName, setLiqourBase, setCocktailDesc])

    const handleEdit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("id", id)
        data.append("name", cocktailName)
        data.append("alcoholbase", liqourBase)
        data.append("description", cocktailDesc)
        if (cocktailImage != null) {
            data.append("cocktailImage", cocktailImage)
        }
        try {
            const response = await api.patch('/cocktails', data, {
            headers: { "Content-Type": "multipart/form-data" }
            })
            setCocktails(cocktails.map(cocktail => cocktail._id === id ? {...response.data} : cocktail))
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
      <h2>Edit {cocktail.name}</h2>
      <form className="NewEditCocktail__form" onSubmit={handleEdit}>
        <div className="NewEditCocktail__input-container">
          <label className="nowrap" htmlFor="cocktailName">Cocktail name:</label>
          <input 
            className="NewEditCocktail__input-field"
            id="name" 
            type="text" 
            value={cocktailName}
            onChange={(e) => setCocktailName(e.target.value)}
            required 
            />
        </div>
        <div className="NewEditCocktail__input-container">
          <label className="nowrap" htmlFor="liqourBase">Liqour base:</label>
          <input
            className="NewEditCocktail__input-field"
            id="liqourBase" 
            type="text" 
            value={liqourBase}
            onChange={(e) => setLiqourBase(e.target.value)}
            required 
        />
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
            />
        </div>
        <button className="text-btn" type="submit">Update</button>
      </form>
    </main>
  )
}

export default EditCocktail
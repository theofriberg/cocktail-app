import './cocktail.css'
import { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import CocktailContext from '../../context/CocktailContext'
import useAuth from '../../hooks/useAuth'
import useCloudinary from '../../hooks/useCloudinary'
import { COCKTAILS_URL } from '../../api/apiURL'

const NewCocktail = () => {
  const {
    cocktails, setCocktails, cocktailName, setCocktailName, liqourBase, setLiqourBase, 
  cocktailDesc, setCocktailDesc, cocktailImage, setCocktailImage
  } = useContext(CocktailContext)

  const [previewSource, setPreviewSource] = useState('')
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const uploadToCloudinary = useCloudinary()
  const navigate = useNavigate()

  useEffect(() => {
    if (cocktails) {
      setCocktailName('')
      setLiqourBase('')
      setCocktailDesc('')
    }
  }, [cocktails, setCocktailName, setLiqourBase, setCocktailDesc])

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
    setCocktailImage(file)
  }

  const handleNewCocktail = async (e) => {
    e.preventDefault()
    try {
      const cloudinaryRes = await uploadToCloudinary(cocktailImage)

      const data = { name: cocktailName, alcoholbase: liqourBase, description: cocktailDesc, userId: auth.userId,
         image: cloudinaryRes }

      const response = await axiosPrivate.post(COCKTAILS_URL, data)
      const newCocktail = response.data
      const allCocktails = [...cocktails, newCocktail]

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
            onChange={handleFileInputChange}
            required />
        </div>
        <button className="text-btn" type="submit">Create</button>
      </form>

      {previewSource && (
          <img
              className="NewEditCocktail__preview-img"
              src={previewSource}
              alt="chosen"
              height="300"
              width="300"
          />
        )}
    </main>
  )
}

export default NewCocktail
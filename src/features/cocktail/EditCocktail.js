import './cocktail.css'
import { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import CocktailContext from '../../context/CocktailContext'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { COCKTAILS_URL } from '../../api/apiURL'
import useCloudinary from '../../hooks/useCloudinary'

const EditCocktail = () => {
    const { 
      cocktails, setCocktails, cocktailName, setCocktailName, liqourBase, setLiqourBase,
      cocktailDesc, setCocktailDesc, cocktailImage, setCocktailImage
    } = useContext(CocktailContext)

    const [previewSource, setPreviewSource] = useState()
    const { id } = useParams()
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const uploadToCloudinary = useCloudinary()

    useEffect(() => {

      const getCocktail = async () => {
        try {
          const response = await axiosPrivate.get(`${COCKTAILS_URL}/${id}`)
          const cocktail = response.data
          setCocktailName(cocktail.name)
          setLiqourBase(cocktail.alcoholbase)
          setCocktailDesc(cocktail.description)
        } catch (err) {
          console.log(err)
        }
      }
  
      getCocktail()
  
    }, [])

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

    const handleEdit = async (e) => {
        e.preventDefault()
        
        try {
          const cloudinaryRes = cocktailImage ? await uploadToCloudinary(cocktailImage) : null
          
          const data = { name: cocktailName, alcoholbase: liqourBase, description: cocktailDesc,
            image: cloudinaryRes }

            const response = await axiosPrivate.patch(COCKTAILS_URL, data)
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
      <h2>Edit {cocktailName}</h2>
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
            onChange={handleFileInputChange}
            />
        </div>
        <button className="text-btn" type="submit">Update</button>
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

export default EditCocktail
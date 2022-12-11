import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../api/apiURL'

const CocktailPage = ({ cocktails, handleDelete }) => {
  const { id } = useParams()
  const cocktail = cocktails.find(cocktail => (cocktail._id).toString() === id)

  return (
    <article className="CocktailPage">
      <h2>{cocktail.name}</h2>
      <img 
        src={`${API_URL}/${cocktail.imageName}`}
        alt={cocktail.name}
        height="500"
        width="500"
      />
      <p className="CocktailPage__p-tags CocktailPage__date-added">Date added: {cocktail.createdAt.slice(0, 10)}</p>
      <p className="CocktailPage__p-tags CocktailPage__liqour-base">Liqour base: {cocktail.alcoholbase}</p>
      <p className="CocktailPage__p-tags CocktailPage__description">Description: <span>{cocktail.description}</span></p>
      <div className="CocktailPage__btn-container">
        <button className="text-btn CocktailPage__delete-btn" 
            onClick={() => handleDelete(cocktail._id)}>
          Delete Cocktail</button>
        <Link to={`/cocktail/edit/${cocktail._id}`}>
          <button className="text-btn CocktailPage__edit-btn">Edit Cocktail</button>
        </Link>
      </div>
    </article>
  )
}

export default CocktailPage
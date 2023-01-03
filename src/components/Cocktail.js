import { Link } from 'react-router-dom'
import { CLOUDINARY_DELIVERY_URL } from '../api/cloudinaryConfig'

const Cocktail = ({ cocktail }) => {

  return (
    <figure className="Cocktail">
          <Link to={`/cocktail/${cocktail._id}`}>
            <img
                className="Cocktail__img" 
                src={`${CLOUDINARY_DELIVERY_URL}/${cocktail.imageName}`}
                alt={cocktail.name}
                height="150"
                width="150"
            />
          </Link>
        <figcaption className="Cocktail__name">{cocktail.name}</figcaption>
    </figure>
  )
}

export default Cocktail
import './cocktail.css'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { CLOUDINARY_DELIVERY_URL } from '../../api/cloudinaryConfig'
import { COCKTAILS_URL, USERS_URL } from '../../api/apiURL'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import CocktailContext from '../../context/CocktailContext'
import useAuth from '../../hooks/useAuth'
import CommentSection from './CommentSection'
import Modal from '../../components/Modal'
import useWindowSize from '../../hooks/useWindowSize'

const CocktailPage = () => {
  const [user, setUser] = useState({})
  const [cocktail, setCocktail] = useState({})
  const [dateString, setDateString] = useState('')
  const [isShowingPopup,  setIsShowingPopup] = useState(false)
  const { auth } = useAuth()
  const { cocktails, setCocktails } = useContext(CocktailContext)
  const { width } = useWindowSize()
  const { id } = useParams()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()

  const formatISOString = (str) => {
    return str.slice(0,10) + ', ' + str.slice(11,16)
  }

  useEffect(() => {
    const getCocktail = async () => {
      try {
        const response = await axiosPrivate.get(`${COCKTAILS_URL}/${id}`)
        console.log(response)
        const cocktail = response.data
        setCocktail(cocktail)
        setDateString(formatISOString(response.data.createdAt))
      } catch (err) {
        console.log(err)
      }
    }

    getCocktail()

  }, [])

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`${USERS_URL}/${cocktail.user}`)
        const user = response.data
        setUser(user)
      } catch (err) {
        console.log(err)
      }
    }

    cocktail.user && getUser()
  }, [cocktail])

  const handleDelete = async (id) => {
    if (auth.userId !== cocktail.user) return

    try {
      await axiosPrivate.delete(COCKTAILS_URL, {
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
    <article className="CocktailPage">
      <h2>{cocktail.name}</h2>
      <img 
        src={`${CLOUDINARY_DELIVERY_URL}/${cocktail.imageName}`}
        alt={cocktail.name}
        height={width-32} // to make img height same as width, (-32 is for margin and padding)
      />

      {cocktail.user &&
        <p className="CocktailPage__p-tags CocktailPage__user">
          Posted by:
          <FontAwesomeIcon icon={faUser} />
          <Link 
            to={`/users/${user._id}`}
            onMouseEnter={() => setIsShowingPopup(true)}
            onMouseLeave={() => setIsShowingPopup(false)} 
          >{user.username}</Link>
        </p>
      }

      {isShowingPopup &&
        <Modal top='650px' left='50%'>
          <div className="CocktailPage__user-popup">
            <h3 className="nowrap user-popup__username">{user.username}</h3>
            {user.aboutMe &&
              <p className="user-popup__about">{user.aboutMe}</p>
            }
          </div>
        </Modal>
      }

      <p className="CocktailPage__p-tags CocktailPage__date-added">
        Date added: {dateString}
      </p>
      <p className="CocktailPage__p-tags CocktailPage__liqour-base">Liqour base: {cocktail.alcoholbase}</p>
      <p className="CocktailPage__p-tags CocktailPage__description">Description: <span>{cocktail.description}</span></p>
      
      {(auth?.userId === cocktail.user || auth?.roles.includes(2)) &&
        <div className="CocktailPage__btn-container">
          <button className="text-btn CocktailPage__delete-btn" 
              onClick={() => handleDelete(cocktail._id)}>
            Delete Cocktail
          </button>
          <Link to={`/cocktail/edit/${cocktail._id}`}>
            <button className="text-btn CocktailPage__edit-btn">Edit Cocktail</button>
          </Link>
        </div>
      }

      <CommentSection cocktail={cocktail} />
    </article>
  )
}

export default CocktailPage
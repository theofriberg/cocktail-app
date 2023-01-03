import './user.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { USERS_URL } from '../../api/apiURL'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import Feed from '../../components/Feed'
import Pagination from '../../components/Pagination'

const UserProfile = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

    const [user, setUser] = useState({})
    const [cocktails, setCocktails] = useState([])

    const [nmbrOfPages, setNmbrOfPages] = useState(0)
    const [page, setPage] = useState(1)

    const [aboutMe, setAboutMe] = useState('')
    const [isEditingAboutMe, setIsEditingAboutMe] = useState(false)

    const [favDrink, setFavDrink] = useState('')
    const [isEditingFavDrink, setIsEditingFavDrink] = useState(false)

    const [leastFavDrink, setLeastFavDrink] = useState('')
    const [isEditingLeastFav, setIsEditingLeastFav] = useState(false)

    const isDisabled = (!aboutMe && !favDrink && !leastFavDrink) ? true : false    

    useEffect(() => {
        
        const fetchUser = async () => {
            try {
                const response = await axiosPrivate.get(`${USERS_URL}/${auth.userId}?wantsCocktails=true`)
                const { user, cocktails, nmbrOfPages } = response.data
                setUser(user)
                setCocktails(cocktails)
                setNmbrOfPages(nmbrOfPages)
                setPage(1)
            } catch (err) {
                console.log(err)
            }
        }

        fetchUser()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { aboutMe, favDrink, leastFavDrink, userId: auth.userId }
        try {
            const response = await axiosPrivate.patch(USERS_URL, data)
            const updatedUser = response.data
            setUser(updatedUser)
            setAboutMe('')
            setFavDrink('')
            setLeastFavDrink('')
        } catch (err) {
            console.log(err)
        }
    }

    const handlePageBack = async () => {
        try {
          const response = await axiosPrivate.get(`${USERS_URL}/${auth.userId}?wantsCocktails=true&page=${page - 1}`)
          const cocktails = response.data.cocktails
          setCocktails(cocktails)
          setPage(prev => prev - 1)
        } catch (err) {
          console.log(err)
        }
    }
      
    const handlePageForward = async () => {
        try {
            const response = await axiosPrivate.get(`${USERS_URL}/${auth.userId}?wantsCocktails=true&page=${page + 1}`)
            const cocktails = response.data.cocktails
            setCocktails(cocktails)
            setPage(prev => prev + 1)
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditBtnClick = (e, fn) => {
        e.preventDefault()
        fn(prev => !prev)
    }

    const aboutMeLabel = user.aboutMe ? 'Edit About Me description' : 'Add About Me description'
    const favDrinkLabel = user.favDrink ? 'Edit Favourite Drink' : 'Add Favourite Drink'
    const leastFavDrinkLabel = user.leastFavDrink ? 'Edit Least Favourite Drink' : 'Add Least Favourite Drink'

  return (
    <main className="UserProfile">
        <h1 className="UserProfile__title">Hello {user.username}!</h1>
        <div className="UserProfile__customization-container">
            <div className="UserProfile__user-info">
                {user.aboutMe &&
                    <h3 className="UserProfile__info-tags">
                        About Me: <p>{user.aboutMe}</p>
                    </h3>
                }
                {user.favDrink &&
                    <h3 className="UserProfile__info-tags">
                        Favourite Drink: <p className="nowrap">{user.favDrink}</p>
                    </h3>
                }
                {user.leastFavDrink &&
                    <h3 className="UserProfile__info-tags">
                        Least Favourite Drink: <p className="nowrap">{user.leastFavDrink}</p>
                    </h3>
                }
            </div>

            <form className="UserProfile__form">
                <div className="UserProfile__edit-container">
                    <label
                        htmlFor="aboutMe"
                        className="UserProfile__form-label"
                    >
                        {aboutMeLabel}
                    </label>
                    <button className="icon-btn" onClick={(e) => handleEditBtnClick(e, setIsEditingAboutMe)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>

                {isEditingAboutMe &&
                    <textarea
                        className="UserProfile__form-aboutMe"
                        type="text"
                        id="aboutMe"
                        placeholder={user.aboutMe ? user.aboutMe : 'Add About Me'}
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                    ></textarea>
                }

                <div className="UserProfile__edit-container">
                    <label
                        htmlFor="favDrink"
                        className="UserProfile__form-label"
                    >
                        {favDrinkLabel}
                    </label>
                    <button className="icon-btn" onClick={(e) => handleEditBtnClick(e, setIsEditingFavDrink)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>

                {isEditingFavDrink &&
                    <input
                        className="UserProfile__form-input"
                        type="text"
                        id="favDrink"
                        placeholder={user.favDrink ? user.favDrink : 'Add Favourite Drink'}
                        value={favDrink}
                        onChange={(e) => setFavDrink(e.target.value)}
                    />
                }

                <div className="UserProfile__edit-container">
                    <label
                        htmlFor="leastFavDrink"
                        className="UserProfile__form-label"
                    >
                        {leastFavDrinkLabel}
                    </label>
                    <button className="icon-btn" onClick={(e) => handleEditBtnClick(e, setIsEditingLeastFav)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>

                {isEditingLeastFav &&
                    <input
                        className="UserProfile__form-input"
                        type="text"
                        id="leastFavDrink"
                        placeholder={user.leastFavDrink ? user.leastFavDrink : 'Add Least Favourite Drink'}
                        value={leastFavDrink}
                        onChange={(e) => setLeastFavDrink(e.target.value)}
                    />
                }

                {(isEditingAboutMe || isEditingFavDrink || isEditingLeastFav) &&
                    <button className="text-btn" onClick={handleSubmit} disabled={isDisabled}>
                        Save
                    </button>
                }   

            </form>
        </div>

        {cocktails?.length ? (
            <>
                <p className="UserPage__feed-title">Your collection:</p>
                <Feed cocktails={cocktails} />
                <Pagination
                    page={page}
                    nmbrOfPages={nmbrOfPages}
                    handlePageBack={handlePageBack}
                    handlePageForward={handlePageForward}
                />
            </>
        ) : (
            <p>No cocktails to display.</p>
        )}
    </main>
  )
}

export default UserProfile
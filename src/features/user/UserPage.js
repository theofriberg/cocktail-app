import './user.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { USERS_URL } from '../../api/apiURL'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Feed from '../../components/Feed'
import Pagination from '../../components/Pagination'

const UserPage = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [cocktails, setCocktails] = useState([])
    const [page, setPage] = useState(1)
    const [nmbrOfPages, setNmbrOfPages] = useState(0)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get(`${USERS_URL}/${id}?wantsCocktails=true`)
                const { user, cocktails, nmbrOfPages } = response.data
                setUser(user)
                setCocktails(cocktails)
                setNmbrOfPages(nmbrOfPages)
            } catch (err) {
                console.log(err)
            }
        }

        getUser()
    }, [])

    const handlePageBack = async () => {
        try {
          const response = await axiosPrivate.get(`${USERS_URL}/${id}?wantsCocktails=true&page=${page - 1}`)
          const cocktails = response.data.cocktails
          setCocktails(cocktails)
          setPage(prev => prev - 1)
        } catch (err) {
          console.log(err)
        }
      }
      
    const handlePageForward = async () => {
        try {
            const response = await axiosPrivate.get(`${USERS_URL}/${id}?wantsCocktails=true&page=${page + 1}`)
            const cocktails = response.data.cocktails
            setCocktails(cocktails)
            setPage(prev => prev + 1)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <main className="UserPage">
        <h1 className="UserPage__username">{user.username}</h1>
        <div className="UserPage__user-info">
            {user.aboutMe &&
                <h3 className="UserPage__info-tags">
                    About Me: <p>{user.aboutMe}</p>
                </h3>
            }
            {user.favDrink &&
                <h3 className="UserPage__info-tags">
                    Favourite Drink: <p className="nowrap">{user.favDrink}</p>
                </h3>
            }
            {user.leastFavDrink &&
                <h3 className="UserPage__info-tags">
                    Least Favourite Drink: <p className="nowrap">{user.leastFavDrink}</p>
                </h3>
            }
        </div>
        {cocktails?.length ? (
            <>
                <p className="UserPage__feed-title">{`${user.username}s collection:`}</p>
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

export default UserPage
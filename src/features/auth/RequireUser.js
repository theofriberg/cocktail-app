import { useEffect, useState } from "react"
import { Navigate, useLocation, useParams, Outlet } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"
import { COCKTAILS_URL } from "../../api/apiURL"

const RequireUser = () => {
    const [cocktail, setCocktail] = useState({})
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const location = useLocation()
    const { id } = useParams()

    useEffect(() => {
        const getCocktail = async () => {
            try {
                const response = await axiosPrivate.get(`${COCKTAILS_URL}/${id}`)
                const cocktail = response.data
                setCocktail(cocktail)
            } catch (err) {
                console.log(err)
            }
        }

        getCocktail()
        
    }, [])

    return (
        auth?.userId === cocktail.user || auth?.roles.includes(2)
            ? <Outlet />
            : auth?.accessToken
                ? <Navigate to="/" state={{ from: location }} />
                : <Navigate to="/login" state={{ from: location }} />
    )
}

export default RequireUser
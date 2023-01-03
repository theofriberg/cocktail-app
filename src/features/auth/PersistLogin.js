import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useRefreshToken from "../../hooks/useRefreshToken"
import useLocalStorage from "../../hooks/useLocalStorage"


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const sendRefreshToken = useRefreshToken()
    const { auth } = useAuth()
    const [persist] = useLocalStorage('persist', false)

    useEffect(() => {
        let isMounted = true

        const verifyRefreshToken = async () => {
            try {
                await sendRefreshToken()
            } catch (err) {
                console.log(err)
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

  return (
    <>
        {!persist
            ? <Outlet />
            : isLoading
                ? <p>Loading...</p>
                : <Outlet />
        }
    </>
  )
}

export default PersistLogin
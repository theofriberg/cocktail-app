import axios from "../api/axios"
import useAuth from "./useAuth"

const LOGOUT_URL = '/auth/logout'

const useLogout = () => {
    const { setAuth } = useAuth()

    const sendLogout = async () => {
        setAuth({})
        try {
            await axios.post(LOGOUT_URL, { withCredentials: true })
        } catch (err) {
            console.log(err)
        }
    }

    return sendLogout
}

export default useLogout
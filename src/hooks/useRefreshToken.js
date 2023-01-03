import useAuth from "./useAuth"
import axios from "../api/axios"

const REFRESH_URL = '/auth/refresh'

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const sendRefreshToken = async () => {
        const response = await axios.get(REFRESH_URL, { withCredentials: true })
        const { userId, roles, accessToken } = response.data
        setAuth({ userId, roles, accessToken })
        return response.data.accessToken
    }
    return sendRefreshToken
}

export default useRefreshToken
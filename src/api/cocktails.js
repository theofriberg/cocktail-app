import axios from 'axios'
import { API_URL } from './apiURL'

export default axios.create({
    baseURL: API_URL
})
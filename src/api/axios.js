import axios from 'axios'
import { API_URL } from './apiURL'

export default axios.create({
    baseURL: API_URL
})

export const axiosPublic = axios.create()

export const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'development'
    ? process.env.API_BASE_DEVELOPMENT_URL
    : process.env.API_BASE_PRODUCTION_URL

export const apiInstance = axios.create({
    baseURL: BASE_URL
})
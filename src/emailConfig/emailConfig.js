import nodemailer from 'nodemailer'
import logger from '../utils/logger.js'
import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const e = process.env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TOKEN_PATH = path.join(__dirname, 'token.json')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
    e.GMAIL_API_CLIENT_ID,
    e.GMAIL_API_CLIENT_SECRET,
    e.GMAIL_API_REDIRECT_URL
)

// Función para cargar tokens desde el archivo
const loadTokens = () => {
    try {
        const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'))
        oauth2Client.setCredentials(tokens)
        return tokens
    } catch (err) {
        logger.error('Error loading tokens from file:', err)
        return null
    }
}

// Función para guardar tokens en el archivo
const saveTokens = (tokens) => {
    try {
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens))
        logger.info('Tokens saved to file')
    } catch (err) {
        logger.error('Error saving tokens to file:', err)
    }
}

// Función para obtener un token de acceso válido
const getValidAccessToken = async() => {
    try {
        const tokens = loadTokens()
        if (!tokens) {
            throw new Error('No tokens available')
        }

        const accessToken = await oauth2Client.getAccessToken()
        if (accessToken.token) {
            return accessToken.token
        } else {
            throw new Error('No access token available')
        }
    } catch (error) {
        logger.error('Error getting access token, attempting manual refresh:', error)
        try {
            const tokens = loadTokens() // Asegurarse de cargar los tokens antes de usarlo
            if (!tokens) {
                throw new Error('No tokens available for refresh')
            }

            // Intentar renovar el token de acceso utilizando el refresh token
            const response = await oauth2Client.refreshTokenNoCache(tokens.refresh_token)
            const newTokens = response.tokens
            oauth2Client.setCredentials(newTokens)
            saveTokens(newTokens)
            return newTokens.access_token
        } catch (refreshError) {
            logger.error('Error refreshing access token manually:', refreshError)
            throw refreshError
        }
    }
}

// Función para autorizar al usuario (obtener nuevos tokens si es necesario)
const authorizeUser = async() => {
    try {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline', // Necesario para obtener un refresh token
            scope: ['https://www.googleapis.com/auth/gmail.send']
        })
    // Aquí el usuario debe seguir el enlace para autorizar la aplicación
    // Y luego debes intercambiar el código de autorización para obtener tokens
    } catch (error) {
        logger.error('Error during user authorization:', error)
        throw error
    }
}

// Crear el transporter de Nodemailer con OAuth2
let transporter

export const createTransporter = async() => {
    try {
        const accessToken = await getValidAccessToken()

        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: e.GMAIL_API_USER,
                clientId: e.GMAIL_API_CLIENT_ID,
                clientSecret: e.GMAIL_API_CLIENT_SECRET,
                refreshToken: oauth2Client.credentials.refresh_token,
                accessToken
            }
        })

        logger.info('Email transporter created successfully')
    } catch (error) {
        logger.error('Error while setting credentials in nodemailer transporter:', error)
        throw error
    }
}

// Exportar el transporter
export { transporter }
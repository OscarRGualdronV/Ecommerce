import { config as dotenv} from 'dotenv'

dotenv({path: '.env.development'})

export const config = {
    authRequired: false,
    auth0Logout:true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_AUDIENCE,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_BASE_URL,
}
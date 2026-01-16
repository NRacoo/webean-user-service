import { configDotenv } from 'dotenv';

configDotenv()

export const JWTConstants = {
    secret : process.env.JWT_SECRET
}
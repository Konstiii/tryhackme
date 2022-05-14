import useAdminDatabase from '@/server/utils/database/admin'
import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
    
    const { access_token } = useCookies(event)
    
    // const payloadEncoded = access_token.split('.')[1]
    // const payloadString = Buffer.from(payloadEncoded, 'base64').toString()
    // const payload = JSON.parse(payloadString) as { sub: string }

    const payload = jwt.decode(access_token) as { sub: string }

    const database = useAdminDatabase()
    const user = database.getUserByID(payload.sub)

    return user
})

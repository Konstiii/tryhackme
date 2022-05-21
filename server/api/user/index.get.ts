import jwt from 'jsonwebtoken'
import unauthorized from '@/server/utils/errors/unauthorized'
import Payload from '@/server/utils/models/payload'
import useDatabase from '@/server/utils/database/users'

export default defineEventHandler((event) => {
    const { access_token: accessToken } = useCookies(event)
    // console.log('API:', accessToken)

    if (!accessToken) {
        return unauthorized(event)
    }
    
    const payload = jwt.decode(accessToken) as Payload

    // if (payload.role != 'admin') {
    //     return unauthorized(event)
    // }

    const database = useDatabase()
    return database.getUserByID(payload.sub)
})

import jwt from 'jsonwebtoken'
import useDatabase from '@/server/utils/database/users'
import unauthorized from '@/server/utils/errors/unauthorized'
import Payload from '@/server/utils/models/payload'

export default defineEventHandler(async (event) => {

    const { access_token: accessToken } = useCookies(event)

    if (!accessToken) {
        return unauthorized(event)
    }

    const payload = jwt.decode(accessToken) as Payload

    if (payload.role != 'admin') {
        return unauthorized(event)
    }

    const users = useDatabase().getAllUsers()

    return users.map(user => {
        delete user.flag
        return user
    })
})

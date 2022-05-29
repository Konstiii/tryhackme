import jwt from 'jsonwebtoken'
import unauthorized from '@/server/utils/errors/unauthorized'
import Payload from '@/server/utils/models/payload'
import useDatabase from '@/server/utils/database/users'

interface Header {
    alg?: 'none' | string
}

export default defineEventHandler((event) => {
    try {
        const { access_token: accessToken } = useCookies(event)
        // console.log('API:', accessToken)

        if (!accessToken) {
            return unauthorized(event)
        }

        const components = accessToken.split('.')
        if (components.length != 3) {
            return unauthorized(event)
        }

        const header = JSON.parse(Buffer.from(components[0], 'base64').toString()) as Header
        var payload = JSON.parse(Buffer.from(components[1], 'base64').toString()) as Payload

        const database = useDatabase()

        if (header.alg != 'none') {
            payload = jwt.verify(accessToken, process.env.PREDICTABLE_SECRET) as Payload
        }
        
        if (!payload.sub) {
            return unauthorized(event)
        }
        
        return database.getUserByID(payload.sub)
    } catch (error) {
        return unauthorized(event)
    }

    // try {
        // const payload = jwt.verify(accessToken, 'some_secret') as Payload

        // if (!payload.sub) {
        //     return unauthorized(event)
        // }

        // const database = useDatabase()
        // return database.getUserByID(payload.sub)
    // } catch (error) {
    //     return unauthorized(event)
    // }
})

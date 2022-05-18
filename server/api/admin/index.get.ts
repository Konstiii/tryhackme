import useAdminDatabase from '@/server/utils/database/admin'

import jwt from 'jsonwebtoken'
import unauthorized from '@/server/utils/errors/unauthorized'
import Payload from '@/server/utils/models/payload'
import { randomUUID } from 'crypto'

export default defineEventHandler((event) => {
    // const { access_token: accessToken } = useCookies(event)

    // const { authorization } = event.req.headers
    
    // if (!authorization) {
    //     return unauthorized(event)
    // }

    // // Authorization token must have `Bearer ` prefix
    // if (!authorization.startsWith('Bearer ')) {
    //     return unauthorized(event)
    // }

    // const [ _, accessToken ] = authorization.split('Bearer ')

    // console.log(accessToken)

    const { access_token: accessToken } = useCookies(event)
    const payload = jwt.decode(accessToken) as Payload

    if (payload.role != 'admin') {
        return unauthorized(event, true)
    }

    console.log('Returning flag...')
    return {
        flag: 'THM{a855a70c-eb2e-4f25-b6da-e894bb1a1a4d}'
    }
    





    // if (!access_token) {
    //     event.res.statusCode = 401

    //     return {
    //         message: 'missing access token'
    //     }
    // }
    
    // const payloadEncoded = access_token.split('.')[1]
    // const payloadString = Buffer.from(payloadEncoded, 'base64').toString()
    // const payload = JSON.parse(payloadString) as { sub: string }

    // console.log('AccessToken', access_token)

    // const payload = jwt.decode(access_token) as { sub: string }

    // // console.log('Payload:', payload)

    // const database = useAdminDatabase()
    // const user = database.getUserByID(payload.sub)

    // return user
})

// MARK: - Helpers

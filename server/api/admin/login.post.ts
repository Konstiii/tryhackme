import { sendError } from 'h3'
import jwt from 'jsonwebtoken'

import useAdminDatabase from '@/server/utils/database/admin'
import { randomUUID } from 'crypto'

interface Body {
    username: string
    password: string
}

export default defineEventHandler(async (event) => {
    const body = await useBody<Body>(event)

    const database = useAdminDatabase()

    const user = database.getUserByUsernamdAndPassword(
        body.username,
        body.password
    )
    
    if (user == null) {
        const err = createError({
            statusCode: 400,
            statusMessage: 'Bad Request'
        })
        return sendError(event, err)
    }

    const token = createJWT(user.id, user.role)

    setCookie(event, 'access_token', token, {
        httpOnly: true,
        secure: true,
        path: '/api/admin',
        sameSite: true
    })

    appendHeader(event, 'Content-Type', 'application/json')

    return user
})

const createJWT = (uid: string, role: string): string => {
    return jwt.sign({ sub: uid, role: role }, randomUUID())

    // // Create and encode jwt header
    // const headerString = JSON.stringify({ alg: 'HS256', typ: 'JWT' })
    // const headerEncoded = Buffer.from(headerString).toString('base64')

    // // Create and encode jwt payload...
    // const payloadString = JSON.stringify({ sub: uid, role: role })
    // const payloadEncoded = Buffer.from(payloadString).toString('base64')

    // // Remove padding characters...
    // return `${headerEncoded}.${payloadEncoded}`.replaceAll('=', '')
}

import jwt from 'jsonwebtoken'
import notFound from '@/server/utils/errors/not-found'
import useDatabase from '@/server/utils/database/users'
import { randomUUID } from 'crypto'
import badRequest from '~~/server/utils/errors/bad-request'

interface Body {
    readonly username: string
    readonly password: string
}

export default defineEventHandler(async (event) => {
    // Decode request body...
    const { username, password } = await useBody<Body>(event)

    const database = useDatabase()
    const user = database.getUserByUsernamdAndPassword(username, password)

    if (!user) {
        return badRequest(event)
    }

    const accessToken = jwt.sign({
        role: user.role
    }, process.env.PREDICTABLE_SECRET, {
        subject: user.id,
        issuer: 'hogwarts',
        expiresIn: '1d'
    })

    setCookie(event, 'access_token', accessToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        // sameSite: true
    })

    return user
})

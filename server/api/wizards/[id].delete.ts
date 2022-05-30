import fs from 'fs'
import jwt from 'jsonwebtoken'
import Payload from '@/server/utils/models/payload'
import useDatabase from '@/server/utils/database/users'

import unauthorized from '~~/server/utils/errors/unauthorized'
import badRequest from '~~/server/utils/errors/bad-request'
import { forbidden } from '~~/server/utils/errors/forbidden'

export default defineEventHandler(event => {
    try {
        // Validate access token...
        const { access_token: accessToken } = useCookies(event)
        const payload = jwt.verify(accessToken, 'horcrux') as Payload

        const database = useDatabase()
        const user = database.getUserByID(payload.sub)

        if (!user) {
            return unauthorized(event)
        }

        if (!user.evil) {
            return badRequest(event)
        }

        const id = event.context.params.id

        if (user.id == id) {
            return forbidden(event)
        }

        database.deleteUser(id)

        return {
            flag: 'THM{be4605bbcb8c4147a3e39e1a7089517a}'
        }
    } catch (error) {
        return unauthorized(event)
    }
})

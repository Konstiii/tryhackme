import useAdminDatabase from '@/server/utils/database/admin'

import jwt from 'jsonwebtoken'
import unauthorized from '@/server/utils/errors/unauthorized'
import Payload from '@/server/utils/models/payload'

export default defineEventHandler((event) => {
    const { access_token: accessToken } = useCookies(event)
    const payload = jwt.decode(accessToken) as Payload

    if (payload.role != 'admin') {
        return unauthorized(event, true)
    }

    return {
        // flag: 'THM{a855a70c-eb2e-4f25-b6da-e894bb1a1a4d}'
        flag: 'THM{always_verify_the_signature}'
    }
})

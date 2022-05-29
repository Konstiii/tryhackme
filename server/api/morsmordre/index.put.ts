import useDatabase from "~~/server/utils/database/users"

import jwt from 'jsonwebtoken'
import Payload from "~~/server/utils/models/payload"
import notFound from "~~/server/utils/errors/not-found"
import { forbidden } from "~~/server/utils/errors/forbidden"
import unauthorized from "~~/server/utils/errors/unauthorized"

interface Body {
    morsmordre: boolean
}

export default defineEventHandler(async (event) => {
    try {
        const body = await useBody<Body>(event)

        const { access_token: accessToken } = useCookies(event)
        const payload = jwt.verify(accessToken, '5468576D5A7134743777217A25432A462D4A614E645266556A586E3272357538') as Payload

        const database = useDatabase()
        const user = database.getUserByID(payload.sub)

        if (!user) {
            return notFound(event)
        }

        if (!user.evil) {
            return forbidden(event)
        }

        database.setMorsmordre(body.morsmordre)

        return {
            morsmordre: database.getMorsmordre(),
            flag: 'THM{16cccf2e745e4bb4bb123eb5ba274331}'
        }
    } catch (error) {
        return unauthorized(event)
    }
})

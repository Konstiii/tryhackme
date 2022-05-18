import { CompatibilityEvent, sendError } from 'h3'

export default function unauthorized(event: CompatibilityEvent, debug?: boolean) {
    const err = createError({
        statusCode: 401,
        statusMessage: 'unauthorized'
    })
    return sendError(event, err, debug)
}

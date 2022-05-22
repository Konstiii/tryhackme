import { CompatibilityEvent, sendError } from 'h3'

export default function unauthorized(event: CompatibilityEvent, message?: string, debug?: boolean) {
    const err = createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        data: { message }
    })
    return sendError(event, err, debug)
}

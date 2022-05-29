import { CompatibilityEvent, sendError } from 'h3'

export function forbidden(event: CompatibilityEvent, message?: string, debug?: boolean) {
    const err = createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
        data: { message }
    })
    return sendError(event, err, debug)
}

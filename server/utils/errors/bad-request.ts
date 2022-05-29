import { CompatibilityEvent, sendError } from 'h3'

export default function badRequest(event: CompatibilityEvent, message?: string, debug?: boolean) {
    const err = createError({
        statusCode: 400,
        statusMessage: 'BadRequest',
        data: { message }
    })
    return sendError(event, err, debug)
}

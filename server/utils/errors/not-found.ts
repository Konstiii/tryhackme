import { CompatibilityEvent, sendError } from 'h3'

export default function notFound(event: CompatibilityEvent, debug?: boolean) {
    const err = createError({
        statusCode: 404,
        statusMessage: 'Not Found'
    })
    return sendError(event, err, debug)
}

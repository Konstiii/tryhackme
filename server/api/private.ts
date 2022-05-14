
export default defineEventHandler(event => {

    const token = event.req.headers.authorization

    if (!token) {
        throw new Error('unauthorized')
    }

    return {
        flag: 'THM{eff1f9c7-12c8-40e8-b358-6ca2ef6f5b3b}'
    }
})

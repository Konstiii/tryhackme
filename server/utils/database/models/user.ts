
export default interface User {
    id: string
    username: string
    emailAddress: string
    firstname: string
    lastname: string
    role: 'user' | 'admin'
    // [key: string]: any
}

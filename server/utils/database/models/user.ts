
export default interface User {
    id: string
    username: string
    firstname: string
    lastname: string
    role: 'user' | 'admin',
    flag?: string
    // [key: string]: any
}

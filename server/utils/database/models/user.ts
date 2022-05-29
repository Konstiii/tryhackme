
export default interface User {
    id: string
    username: string
    avatar?: string
    firstname: string
    lastname: string
    role: 'muggle' | 'wizard',
    evil?: boolean
    flag?: string
    // [key: string]: any
}

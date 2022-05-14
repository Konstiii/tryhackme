
export interface User {
    id: string
    username: string
    role: 'user' | 'admin'
    [key: string]: any
}

export interface Database {

    getUserByID(id: string): User | null

    getUserByUsernamdAndPassword(username: string, password: string): User | null

}

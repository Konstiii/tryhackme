
import User from './models/user'

export default interface DatabaseService {

    getUserByID(id: string): Readonly<User> | null

    getUserByUsernamdAndPassword(username: string, password: string): Readonly<User> | null

    getAllUsers(): Readonly<User[]>

}

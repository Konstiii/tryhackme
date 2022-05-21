
import User from './models/user'

export default interface DatabaseService {

    getUserByID(id: string): User | null

    getUserByUsernamdAndPassword(username: string, password: string): User | null

}

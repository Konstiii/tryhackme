
import { Database, User } from '~~/server/utils/database/service'
import { randomUUID } from 'crypto'

export default function useAdminDatabase(): Database {
    return new AdminDatabase()
}

class AdminDatabase implements Database {

    private readonly users: User[] = [{
        id: '1',
        username: 'user',
        password: 'password123',
        role: 'user'
    }, {
        id: '2',
        username: 'karl penner',
        password: randomUUID(),
        role: 'admin',
        flag: 'THM{some_flag}',
    }]

    getUserByID(id: string): User {
        const user = this.users.find(user => user.id == id)
        delete user?.password
        return user
    }

    getUserByUsernamdAndPassword(username: string, password: string): User {
        const user = this.users.find(user => user.username == username && user.password == password)
        delete user?.password
        return user
    }

}

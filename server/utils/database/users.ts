import DatabaseService from '@/server/utils/database/service'
import User from '@/server/utils/database/models/user'
import { randomUUID } from 'crypto'

interface InternalUser extends User {
    password: string
}

export interface Database {
    users: InternalUser[]
}


class DatabaseServiceImpl implements DatabaseService {

    private database: Database = {
        users: [{
            id: '1fa99687-5ced-458e-858e-10638b645873',
            username: 'smemster',
            password: 'tryhackme',
            firstname: 'Tom',
            lastname: 'Riddle',
            role: 'user'
        }, {
            id: '9ed35740-3be5-4dea-ad87-d8607c30df60',
            username: 'TOneXPer',
            password: randomUUID(),
            firstname: 'Valerie',
            lastname: 'Tino',
            role: 'admin',
            flag: 'THM{6bc2a2546f0f413c8c1d23e11904226f}'
        }, {
            id: 'THM{de9a9f4938e849869f167b69c79e9c85}',
            username: 'TlestrOc',
            password: randomUUID(),
            firstname: 'Severin',
            lastname: 'Mega',
            role: 'user'
        }]
    }
    
    getUserByID(id: string): Readonly<User> | null {
        const user = this.database.users.find(user => user.id == id)
        delete user?.password
        return user
    }

    getUserByUsernamdAndPassword(username: string, password: string): Readonly<User> | null {
        const user = this.database.users.find(user => user.username == username && user.password == password)
        delete user?.password
        return user
    }

    getAllUsers(): Readonly<User[]> {
        const users = this.database.users.map(user => {
            return {
                ...user,
                password: undefined
            }
        })
        return users
    }

}

const service = new DatabaseServiceImpl()

export default function useDatabase(): DatabaseService {
    return service
}

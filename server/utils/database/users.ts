import DatabaseService from '@/server/utils/database/service'
import User from '@/server/utils/database/models/user'
import { randomUUID } from 'crypto'

interface InternalUser extends User {
    password: string
    flag?: string
}

export interface Database {
    users: InternalUser[]
}


class DatabaseServiceImpl implements DatabaseService {

    private database: Database = {
        users: [{
            id: '40a73841-3b69-4a76-ad7e-6d8ce71a4d64',
            username: 'johndoe',
            password: 'password',
            emailAddress: 'john.doe@tryhackme.com',
            firstname: 'John',
            lastname: 'Doe',
            role: 'user'
        }, {
            id: randomUUID(),
            username: 'masteradmin',
            password: randomUUID(),
            emailAddress: 'master.admin@tryhackme.com',
            firstname: 'Master',
            lastname: 'Admin',
            role: 'admin',
            flag: 'THM{some_admin_flag}'
        }]
    }
    
    getUserByID(id: string): User {
        const user = this.database.users.find(user => user.id == id)
        delete user?.password
        return user
    }

    getUserByUsernamdAndPassword(username: string, password: string): User {
        const user = this.database.users.find(user => user.username == username && user.password == password)
        delete user?.password
        return user
    }


}

const service = new DatabaseServiceImpl()

export default function useDatabase(): DatabaseService {
    return service
}

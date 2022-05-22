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
            username: 'lord_voldemort',
            password: 'tryhackme',
            avatar: 'https://s3-eu-central-1.amazonaws.com/vodafone-featured/wp-content/uploads/2021/02/19173439/harry-potter-szenen-640x360.jpg',
            firstname: 'Tom',
            lastname: 'Riddle',
            role: 'user'
        }, {
            id: '9ed35740-3be5-4dea-ad87-d8607c30df60',
            username: 'dumbl3d0r3',
            password: randomUUID(),
            avatar: 'https://assets.cdn.moviepilot.de/files/e2fbdbbc704768d582ebb4ab898ae38165dc39640eb6724312a68db3d7b7/fill/992/477/Albus%20Dumbledore.jpg',
            firstname: 'Albus', // Percival Wulfric Brian
            lastname: 'Dumbledore',
            role: 'admin',
            flag: 'THM{6bc2a2546f0f413c8c1d23e11904226f}'
        }, {
            id: 'THM{de9a9f4938e849869f167b69c79e9c85}',
            username: 't4tz3',
            password: randomUUID(),
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFpFufBSF2Xau__7rqlfH4ITVMc46QlC_FQ&usqp=CAU',
            firstname: 'Sirius',
            lastname: 'Black',
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

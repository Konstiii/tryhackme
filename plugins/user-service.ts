import User from '@/server/utils/database/models/user'

export default defineNuxtPlugin((/* nuxtApp */) => {
    return {
        provide: {
            users: new UserService()
        }
    }
})

class UserService {

    public async fetchCurrentUser(): Promise<User> {
        const [user, setUser] = useUser()
        if (!user.value) {
            const user = await $fetch<User>('/api/user', {
                headers: useRequestHeaders(['cookie'])
            })
            setUser(user)
        }
        return user.value
    }

    public async fetchUsers(): Promise<User[]> {
        // /users => only admins (extract admin id)
        // /user => logged in as admin
        return []
    }

}

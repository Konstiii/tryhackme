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
        // const [user, setUser] = useUser()
        // if (!user.value) {
            try {
                const user = await $fetch<User>('/api/user', {
                    headers: useRequestHeaders(['cookie'])
                })
                return user
            } catch (error) {
                throw error
                // throwError(error)
            }
        //     setUser(user)
        // }
        // return user.value
    }

    public async fetchUsers(): Promise<User[]> {
        return await $fetch<User[]>('/api/users', {
            headers: useRequestHeaders(['cookie'])
        })
    }

}

import User from '@/server/utils/database/models/user'

export default defineNuxtRouteMiddleware(async () => {
    const { $users } = useNuxtApp()
    
    try {
        const user = await $users.fetchCurrentUser()
        // Use user...
    } catch (error) {
        return navigateTo('/login')
    }
}) 

<script setup lang="ts">
import User from "@/server/utils/database/models/user"

definePageMeta({
    layout: 'center'
})

const error = ref('')
const setErrorMessage = (newValue: string) => error.value = newValue
const clearErrorMessage = () => error.value = ''

// const [_, setUser] = useUser()

const user = useState<User>('user')
const setUser = (newValue: User) => user.value = newValue

async function login(username: string, password: string) {
    clearErrorMessage()

    try {
        const user = await $fetch<User>('/api/auth/login', { method: 'post', body: { username, password } })
        setUser(user)
        await navigateTo('/user')
    } catch (error) {
        setErrorMessage('User not found or password incorrect')
    }
}

</script>

<template>
    <LoginForm @submit="login" :error="error"/>
</template>

<style lang="scss" scoped>

form {
    width: 100vw;
    max-width: 400px;
}

</style>

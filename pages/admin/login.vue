<script setup lang="ts">

interface SubmitEvent {
    username: string
    password: string
}

definePageMeta({
    title: 'Login - Admin',
    layout: 'center'
})

const submit = async (event: Readonly<SubmitEvent>) => {
    console.log('Submitting:', event)

    const resp = await useFetch('/api/admin/login', { method: 'post', body: event })
    console.log('Login Response:', resp)

    navigateTo('/admin')
}

</script>

<template>
    <div class="container">
        <Title>Login - Admin</Title>
        <LoginForm @submit="submit"/>
    </div>
</template>

<style lang="scss" scoped>

div.container {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}

</style>

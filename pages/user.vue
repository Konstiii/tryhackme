<script setup lang="ts">
import User from '@/server/utils/database/models/user'

definePageMeta({
    middleware: ['auth']
})

const { $users } = useNuxtApp()
const user = await $users.fetchCurrentUser()

</script>

<template>
    <div class="page">
        <img class="profile-image" :src="`https://gravatar.com/avatar/${user.id}?s=400&d=robohash&r=x`">
        <p class="fullname">{{ user.firstname }} {{ user.lastname }}</p>
        <p class="username">{{ user.username }}</p>
        <p class="email">{{ user.emailAddress }}</p>
    </div>
</template>

<style lang="scss" scoped>

div.page {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img.profile-image {
        width: 164px;
        height: 164px;
        background-color: white;
        border-radius: 100%;
        margin-bottom: 24px;
    }

    p.fullname {
        font-size: 34px;
        font-weight: 600;
    }

    p.username {
        font-size: 15px;
        opacity: 0.5;

        &::before {
            content: '@';
            text-transform: lowercase;
        }
    }

    p.email {
        margin-top: 24px;
        font-size: 17px;
    }

}

</style>

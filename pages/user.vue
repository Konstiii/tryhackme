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
        <ProfileImage :user="user" size="164"/>
        <p class="fullname">{{ user.firstname }} {{ user.lastname }}</p>
        <p class="username">{{ user.username }}</p>
        <p v-if="user.flag" class="flag dp3">{{ user.flag }}</p>
    </div>
</template>

<style lang="scss" scoped>

div.page {
    height: 100%;

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

    p.flag {
        margin-top: 24px;
        font-size: 17px;

        padding: 24px;
        background-color: var(--bg-secondary);
        border-radius: 16px;
    }

}

</style>

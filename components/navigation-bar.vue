<script setup lang="ts">
import User from '@/server/utils/database/models/user'

const { $users } = useNuxtApp()

const user = ref<User>(null)
try {
    user.value = await $users.fetchCurrentUser()
} catch (error) {
    
}

const loggedIn = computed(() => user.value != null)
const isAdmin = computed(() => loggedIn.value && user.value.role == 'wizard')
const isEvilWizard = computed(() => loggedIn.value && user.value.role == 'wizard' && user.value.evil)

const [morsmordre, setMorsmordre] = useMorsmordre()

async function castMorsmordre() {
    try {
        const data = await $fetch<{ morsmordre: boolean, flag: string }>('/api/morsmordre', {
            method: 'PUT',
            body: {
                morsmordre: true
            }
        })
        alert(data.flag)
        setMorsmordre(data.morsmordre)
        console.log()
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <nav>
        <NuxtLink class="navigation" to="/">Home</NuxtLink>
        <NuxtLink v-if="isAdmin" class="navigation" to="/wizards">Wizards</NuxtLink>
        <div class="spacer"></div>
        <button v-if="isEvilWizard" class="morsmordre" @click="castMorsmordre">Morsmordre</button>
        <div class="spacer"></div>
        <NuxtLink v-if="loggedIn" class="user" to="/user">
            <p class="fullname">{{ user.firstname }} {{ user.lastname }}</p>
            <p class="username">{{ user.username }}</p>
            <ProfileImage :user="user"/>
        </NuxtLink>
        <NuxtLink v-else class="login" to="/login">
            <IconUser/>
            Login
        </NuxtLink>
    </nav>
</template>

<style lang="scss" scoped>

nav {
    position: relative;
    left: 0;
    top: 0;
    right: 0;
    padding: 16px 24px;

    z-index: 100;
    border-bottom: 1px solid #FFFFFF20;

    background-color: #00000080;

    display: flex;
    align-items: center;
    gap: 12px;

    div.spacer {
        flex: 1;
    }

    a.navigation {
        position: relative;
        line-height: 44px;
        padding: 0 16px;

        text-decoration: none;

        color: var(--text-secondary);
        font-size: 17px;
        font-weight: 500;

        transition-property: color;
        transition-duration: 200ms;
        transition-timing-function: ease-out;

        &:hover {
            color: var(--text-primary);

            &::after {
                left: 0;
                width: 100%;
            }
        }

        &::after {
            content: '';

            position: absolute;
            left: 50%;
            bottom: 0;
            width: 0;
            height: 2px;

            background-color: var(--accent);

            transition-property: left, width;
            transition-duration: 200ms;
            transition-timing-function: ease-out;
        }
    }

    button.morsmordre {
        font-size: 20px;

        &:hover {
            color: green;
            text-shadow: green 0 0 24px;
        }
    }

    a.user {
        text-align: right;
        text-decoration: none;

        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        gap: 0 16px;

        p.fullname {
            font-size: 17px;
            font-weight: 500;
        }

        p.username {
            font-size: 13px;
            opacity: 0.5;

            &::before {
                content: '@';
            }
        }

        img {
            grid-column: 2 / 3;
            grid-row: 1 / span 2;

            width: 44px;
            height: 44px;

            background-color: white;
            border-radius: 100%;
        }
    }

    a.login {
        height: 44px;
        padding: 0 32px 0 28px;

        background-color: var(--accent);
        border-radius: 12px;

        font-size: 17px;
        font-weight: 500;
        color: var(--bg-primary);
        text-decoration: none;

        display: flex;
        align-items: center;
        gap: 12px;

        .icon {
            width: 14px;
            height: 14px;
        }
    }
}

</style>

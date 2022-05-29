<script setup lang="ts">
import User from '@/server/utils/database/models/user'

const users = ref<User[]>([])
const error = ref<Error>(null)

const green = ref(false)

fetchUsers()

async function fetchUsers() {
    try {
        users.value = await $fetch<User[]>('/api/wizards', {
            headers: useRequestHeaders(['cookie'])
        })
    } catch (err) {
        error.value = err
    }
}

async function deleteUser(id: string) {
    try {
        if (!window.confirm('Are you sure you want to cast this spell? Avada Kedavra (Killing Curse)')) return

        const { flag } = await $fetch<{ flag?: string }>('/api/wizards/' + id, {
            method: 'delete'
        })

        const user = users.value.find(user => user.id == id)

        const newUsers = await $fetch<User[]>('/api/wizards')

        const audio = new Audio('avada_kedavra.mp3')
        await audio.play()

        green.value = true

        setTimeout(() => users.value = newUsers, 1700)
        setTimeout(() => green.value = false, 2000)

        setTimeout(() => {
            if (user) alert('You killed ' + user.firstname + ' ' + user.lastname)
            if (flag) alert(flag)
        }, 2000)
        
    } catch (err) {
        switch (err.response.status) {
            case 400:
                alert('You are not allowed to cast this spell! Only evil wizards cast this spell!')
                break
            case 401:
                alert('You are not authorized! The Department of Magical Law Enforcement will keep an eye on you!')
                break
            case 403:
                alert('Cannot cast this spell on yourself!')
                break
        }
    }
}

</script>

<template>
    <div class="page" :green="green">
        <div v-if="error" class="error">
            <IconErrorTriangle/>
            <!-- <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_bdnjxekx.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"   controls autoplay></lottie-player> -->
            <h1 class="title">You are a Muggle!</h1>
            <p class="description">Only wizards are allowed to view this page!</p>
        </div>
        <table v-else>
            <tbody>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Role</th>
                </tr>
                <UserRow v-for="user in users" :key="user.id" :user="user" @delete="deleteUser"/>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>

div.page {
    padding-top: 64px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
}

div.page[green="true"]::after {
    content: '';

    z-index: 9999;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    animation: avada_kedavra;
    animation-duration: 600ms;
    animation-delay: 1.4s;
    animation-timing-function: ease-out;
}

@keyframes avada_kedavra {
    0% {
        background-color: transparent;
    }
    20% {
        background-color: #0bbc0b;
    }
    50% {
        background-color: #c5ecc5;
    }
    80% {
        background-color: #0bbc0b;
    }
    100% {
        background-color: transparent;
    }
}

div.error {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon.error-triangle {
        width: 180px;
        height: 180px;
        color: var(--error);
    }

    h1.title {
        margin-top: 32px;
        margin-bottom: 8px;
        font-size: 34px;
    }

    p.description {
        font-size: 15px;
        color: var(--text-secondary);
    }
}

table {
    margin: 32px;
    border-collapse: collapse;

    th {
        padding: 12px;
        color: var(--accent);

        font-size: 17px;
        font-weight: 400;
        text-align: left;
    }


    tr.user {
        .profile-image {
            cursor: url('@/assets/img/wand.svg') 16 16, pointer;
        }
    }
}

</style>

<script setup lang="ts">
import User from '@/server/utils/database/models/user'

const users = ref<User[]>([])
const error = ref<Error>(null)

try {
    users.value = await $fetch<User[]>('/api/users', {
        headers: useRequestHeaders(['cookie'])
    })
    console.log(users.value)
} catch (err) {
    console.log(err)
    error.value = err
}

</script>

<template>
    <div class="page">
        <div v-if="error" class="error">
            <IconErrorTriangle/>
            <!-- <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_bdnjxekx.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"   controls autoplay></lottie-player> -->
            <h1 class="title">Unauthorized</h1>
            <p class="description">You do not have sufficient permissions to access this data.</p>
        </div>
        <table v-else>
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Role</th>
                </tr>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.lastname }}</td>
                    <td class="role">{{ user.role }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>

div.page {
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
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

    td {
        padding: 12px;

        font-size: 17px;

        &.role {
            text-transform: capitalize;
            // font-style: italic;
            color: var(--text-secondary);
        }
    }

    tr {
        border-bottom: 1px solid var(--bg-tertiary);
    }
}

</style>

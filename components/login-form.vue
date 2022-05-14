<script lang="ts" setup>

const emit = defineEmits(['submit'])

const username = ref('')
const password = ref('')

const submit = () => {
    // Error handling...

    console.log('Submit', username.value, password.value)

    emit('submit', {
        username: username.value,
        password: password.value
    })
}

</script>

<template>
    <form @submit.prevent>
        <h1>Login</h1>
        
        <div class="input-wrapper">
            <IconUser/>
            <label for="username">Username</label>
            <input type="text" placeholder="Your username" v-model="username">
        </div>

        <div class="input-wrapper">
            <IconLock/>
            <label for="password">Password</label>
            <input type="password" placeholder="Your password" v-model="password">
        </div>

        <button type="button" @click="submit">Login</button>
    </form>
</template>

<style lang="scss" scoped>

form {
    padding: 24px 32px 32px 32px;

    width: 100%;
    max-width: 400px;

    background-color: var(--bg-secondary);
    border-radius: 24px;

    display: grid;
    grid-auto-flow: row;
    gap: 32px;

    div.input-wrapper {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        align-items: center;

        padding: 8px 0;
        gap: 4px 0;
        height: 56px;

        border-radius: 8px;
        background-color: var(--bg-tertiary);

        .icon {
            margin: 0 12px;
            width: 16px;
            height: 16px;

            grid-row: 1 / span 2;
        }

        label {
            font-size: 13px;
            color: var(--text-secondary);
        }

        input {
            background-color: transparent;

            font-size: 15px;
        }
    }

    button {
        padding: 16px;
        
        background-color: var(--accent);
        border-radius: 12px;

        color: var(--bg-primary);
        font-size: 15px;
        font-weight: 600;

        transition-property: background-color;
        transition-duration: 200ms;

        &:hover {
            background-color: var(--accent-dark);
        }
    }
}

</style>

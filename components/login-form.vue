<script setup lang="ts">

interface Props {
    error: string
}

interface Emits {
    (e: 'submit', username: string, password: string): void
}

const { error } = defineProps<Props>()
const emits = defineEmits<Emits>()

const username = ref('')
const password = ref('')

function submit() {
    // Error handling...

    emits('submit', username.value, password.value)
}
</script>

<template>
    <form @submit.prevent>
        <h1>Login</h1>

        <p v-if="error" class="error">{{ error }}</p>
        
        <BaseInput v-model.trim:username="username" label="Username"/>
        <BaseInput v-model.trim:password="password" label="Password" type="password"/>

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

    p.error {
        color: var(--error);
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

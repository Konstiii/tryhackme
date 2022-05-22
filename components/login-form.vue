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
    <form @submit.prevent class="dp3">
        <h1 class="title">Login</h1>

        <p v-if="error" class="error">{{ error }}</p>
        
        <div class="inputs">
            <BaseInput v-model.trim:username="username" label="Username"/>
            <BaseInput v-model.trim:password="password" label="Password" type="password"/>
        </div>

        <button class="login dp2" type="button" @click="submit">Login</button>
    </form>
</template>

<style lang="scss" scoped>

form {
    padding: 48px;

    width: 100vw;
    max-width: 500px;

    background-color: var(--bg-secondary);
    border-radius: 24px;

    display: grid;
    grid-auto-flow: row;
    // gap: 48px;

    p.error {
        color: var(--error);
        margin-top: 12px;
    }

    h1.title {
        font-size: 34px;
    }

    div.inputs {
        display: flex;
        flex-direction: column;
        gap: 16px;

        margin-top: 48px;
        margin-bottom: 32px;
    }

    button.login {
        padding: 16px;
        
        background-color: var(--accent);
        border-radius: 12px;

        color: var(--bg-primary);
        font-size: 17px;
        font-weight: 600;

        transition-property: background-color;
        transition-duration: 200ms;

        &:hover {
            background-color: var(--accent-dark);
        }
    }
}

</style>

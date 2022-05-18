<script setup lang="ts">

const flag = ref('')
const setFlag = (newValue: string) => flag.value = newValue

fetch()

// MARK: Methods

async function fetch() {
    try {
        const data = await $fetch<{ flag: string }>('/api/admin')
        setFlag(data.flag)
    } catch (error) {
        console.error(error)
    }
}

async function copy() {
    try {
        await navigator.clipboard.writeText(flag.value)
        alert('Copied!')
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="container">
        
        <div v-if="flag" class="flag-container">
            <p class="flag">{{ flag }}</p>
        </div>

        <div v-else class="error-container">
            <IconErrorTriangle/>
            <p class="title">401 Unauthorized</p>
            <p class="description">You don't have sufficient privileges to access this page</p>
        </div>

    </div>
</template>

<style lang="scss" scoped>

div.container {
    height: 100vh;
    padding: 64px 24px;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    div.flag-container {
        background-color: var(--bg-secondary);
        border-radius: 16px;

        // margin: 64px 0;
        padding: 24px;

        p.flag {
            font-size: 17px;
        }

    }

    div.error-container {
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;

        .icon.error {
            color: var(--error);

            width: 100px;
            height: 100px;

            margin-bottom: 32px;
        }

        p.title {
            color: var(--text-primary);
            font-size: 34px;
            font-weight: bold;
        }

        p.description {
            color: var(--text-secondary);
            font-size: 15px;
        }
    }
}

</style>

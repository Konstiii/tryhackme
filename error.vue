<script setup>

const error = useError()

// const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div v-if="error" class="error">
        <IconErrorTriangle/>
        <!-- <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_bdnjxekx.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"   controls autoplay></lottie-player> -->
        <h1 class="title">{{ error.statusMessage }}</h1>
        <p class="description">{{ error }}</p>
    </div>
</template>

<style lang="scss" scoped>

div.error {
    width: 100vw;
    height: 100vh;

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

</style>

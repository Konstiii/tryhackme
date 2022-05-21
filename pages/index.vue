<script lang="ts" setup>

</script>

<template>
    <div class="page">
        <h1 class="title">Welcome</h1>
        <p class="subtitle">This website is 100% secure and under no circumstances hackable.</p>
    </div>
</template>

<style lang="scss" scoped>

div.page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

   h1.title {
        font-size: 128px;
    }

    p.subtitle {
        font-size: 20px;
        color: var(--text-primary);
        opacity: 0.5;
    }
}

</style>

<script setup>

const [morsmordre] = useMorsmordre()

</script>

<template>
    <div class="page" :background="!morsmordre">
        <h1 class="title">Wizarding World</h1>
        <p class="subtitle">Harry Potter</p>
    </div>
</template>

<style lang="scss" scoped>

div.page[background="true"] {
    position: relative;
    z-index: 0;

    background: url('@/assets/img/cover.jpeg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    &::before {
        content: '';

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        background-color: var(--bg-primary);
        opacity: 0.25;
        z-index: -1;
    }
}

</style>

<style lang="scss" scoped>

div.page {
    width: 100%;
    height: 100%;

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

    #tsparticles {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
}

</style>

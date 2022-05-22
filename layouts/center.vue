<template>
    <div class="layout">
        <slot/>
    </div>
</template>

<style lang="scss" scoped>

div.layout {
    position: relative;
    z-index: 0;
    
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 64px 24px;

    background: url('@/assets/img/mountains.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &::before {
        content: '';

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        background-color: var(--bg-primary);
        opacity: 0.75;
        z-index: -1;
    }
}

</style>

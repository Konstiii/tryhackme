<template>
    <div class="layout">
        <NavigationBar/>
        <slot/>
    </div>
</template>

<style lang="scss" scoped>

div.layout {
    position: relative;
    z-index: 0;
    
    width: 100vw;
    height: 100vh;

    // background: url('@/assets/img/mountains.svg');
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: cover;

    display: grid;
    grid-template-rows: auto 1fr;

    // &::before {
    //     content: '';

    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     right: 0;
    //     bottom: 0;

    //     background-color: var(--bg-primary);
    //     opacity: 0.5;
    //     z-index: -1;
    // }
}

</style>
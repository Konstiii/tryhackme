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

    nav {
        position: absolute;
    }
    
    width: 100vw;
    height: 100vh;
}

</style>
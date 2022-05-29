<script setup lang="ts">

useHead({
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png', type: 'image/png' },
    { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png', type: 'image/png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5BBAD5' }
  ],
  meta: [
    { name: 'msapplication-TileColor', color: '#DA532C' },
    { name: 'theme-color', color: '#FFFFFF' }
  ]
})

const state = await $fetch<boolean>('/api/morsmordre')
const [morsmordre] = useMorsmordre(state)

</script>

<template>
  <div class="app" :morsmorde="morsmordre">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">

html, body {
  width: 100%;
  height: 100%;

  background-color: black;
}

div.app {

  background-color: var(--bg-primary);

  &[morsmorde="true"] {
    background: url('@/assets/img/morsmordre.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}

</style>

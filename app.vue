<script setup>

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

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">

html, body {
  width: 100%;
  height: 100%;
  
  background-color: var(--bg-primary);
}

</style>

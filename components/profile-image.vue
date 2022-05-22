<script setup lang="ts">

interface Props {
    id: string
    size?: string
}

const { id } = defineProps<Props>()

</script>

<template>
    <img class="profile-image" :src="`https://www.gravatar.com/avatar/${id}?s=${size ?? 100}&d=identicon&r=PG`">
</template>

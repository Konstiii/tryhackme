<script setup lang="ts">
import User from '@/server/utils/database/models/user';


interface Props {
    user: User
    size?: string
}

const { user, size } = defineProps<Props>()

const imageURL = computed(() => {
    return user.avatar ?? `https://www.gravatar.com/avatar/${user.id}?s=${size ?? 100}&d=identicon&r=PG`
})

const style = {
    width: `${size}px`,
    height: `${size}px`,
}

</script>

<template>
    <img class="profile-image" :src="imageURL" :style="style">
</template>

<style lang="scss" scoped>

img {
    object-fit: cover;
    border-radius: 50%;
    aspect-ratio: 1;
}

</style>

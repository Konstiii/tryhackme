<script setup lang="ts">

export interface Wand {
    wood: string;
    core: string;
    length: any;
}

export interface Character {
    name: string;
    alternate_names: string[];
    species: string;
    gender: string;
    house: string;
    dateOfBirth: string;
    yearOfBirth: any;
    wizard: boolean;
    ancestry: string;
    eyeColour: string;
    hairColour: string;
    wand: Wand;
    patronus: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    actor: string;
    alternate_actors: string[];
    alive: boolean;
    image: string;
}

const characters = await $fetch<Character[]>("http://hp-api.herokuapp.com/api/characters")

</script>

<template>
    <div>
        <h1>Characters</h1>
        <div class="container">
            <div v-for="character in characters" :key="character.name" class="card">
                <img v-if="character.image" :src="character.image">
                <p class="name">{{ character.name }}</p>
                <p class="house">{{ character.house }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

h1 {
    font-size: 4vw;
    padding: 32px 64px;
}

div.container {
    padding: 32px 64px;
    
    --auto-grid-min-size: 16rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
    grid-gap: 2rem;

    div.card {
        padding: 24px;
        background-color: var(--bg-secondary);
        border-radius: 24px;

        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 50%;
            aspect-ratio: 1;
            border-radius: 50%;
            object-fit: cover;
            object-position: top;

            margin-bottom: 24px;
        }

        p.name {
            font-size: 24px;
            font-weight: 600;
        }

        p.house {
            color: var(--text-secondary);
            font-size: 15px;
        }
    }
}

</style>

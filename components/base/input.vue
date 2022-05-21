<script setup lang="ts">

interface Props {
    label: string
    modelValue: string
}

const { label } = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

function onInputEvent(event: InputEvent) {
    const el = event.target as HTMLInputElement
    emits('update:modelValue', el.value)
}

</script>

<template>
    <div class="wrapper">
        <input v-bind="$attrs" :value='modelValue' placeholder=" " @input='onInputEvent'>
        <label>{{ label }}</label>
    </div>
</template>

<style lang="scss" scoped>

div.wrapper {
    position: relative;
    height: 48px;

    background-color: var(--bg-tertiary);
    border-radius: 8px;

    label, input {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 0 12px;
    }

    label {
        color: var(--text-secondary);
        line-height: 48px;
        pointer-events: none;

        font-size: 15px;

        transition-property: line-height, font-size;
        transition-duration: 200ms;
        transition-timing-function: ease-out;
    }

    input {
        padding-top: 16px;
        background-color: transparent;
        font-size: 16px;
    }

    input:is(:focus, :not(:placeholder-shown)) + label {
        line-height: 24px;
        font-size: 12px;
    }

}

</style>

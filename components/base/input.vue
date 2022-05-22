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
    height: 56px;

    background-color: var(--bg-tertiary);
    border-radius: 12px;

    label, input {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        padding: 0 16px;
    }

    label {
        color: var(--text-secondary);
        line-height: 56px;
        pointer-events: none;

        font-size: 17px;

        transition-property: line-height, font-size, color;
        transition-duration: 200ms;
        transition-timing-function: ease-out;
    }

    input {
        padding-top: 16px;
        background-color: transparent;
        font-size: 17px;

        &:focus + label {
            color: var(--accent);
        }
    }

    input:is(:focus, :not(:placeholder-shown)) + label {
        line-height: 32px;
        font-size: 11px;
    }

}

</style>

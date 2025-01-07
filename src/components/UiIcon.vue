<template>
    <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
    >
        <use :href="symbolId" />
    </svg>
</template>

<script lang="ts" setup>
import pathToSprite from '~/assets/generated-sprite.svg'

const props = defineProps<{
    name: string
}>()

const symbolId = `${pathToSprite}#${props.name}`
</script>

<style lang="scss">
.icon {
    width: 16px;
    height: 16px;
}
</style>
